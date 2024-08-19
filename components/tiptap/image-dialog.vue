<template>
	<Dialog title="Choose image" :show="show" @close="closeDialog">
		<div class="p-4 border border-gray-300 rounded-lg">
			<PaginationButton
				:current="currentPage"
				:last="lastPage"
				:to-next="toNext"
				:to-previous="toPrevious"
				:on-change="onPageChange"
				class="justify-center w-full pb-2 h-fit"
			/>

			<form @submit.prevent="insertImage(imageURL, imageDescription)">
				<div v-if="isLoading" class="grid grid-cols-3 gap-3 sm:grid-cols-4">
					<div
						v-for="n in 12"
						:key="n"
						class="p-1 bg-gray-300 border border-gray-300 rounded-md aspect-square animate-pulse"
					></div>
				</div>

				<div v-else-if="imageListRef?.length > 0" class="grid grid-cols-3 gap-3 sm:grid-cols-4">
					<button
						v-for="image in imageListRef"
						:key="image.id"
						class="p-1 border-gray-300 rounded-md aspect-square"
						:class="useFilePath(image.image) === imageURL ? 'ring-2 ring-teal-700' : 'shadow-sm'"
						type="button"
						@click="imageURL = useFilePath(image.image)"
					>
						<img
							alt=""
							:src="useFilePath(image.image)"
							class="object-scale-down object-center aspect-square"
						/>
					</button>
				</div>

				<label for="tiptap-image-description-input" class="flex mt-4">Description :</label>

				<div class="space-y-2">
					<input
						id="tiptap-image-description-input"
						v-model="imageDescription"
						type="text"
						name="image description"
						class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 ring-teal-700"
						placeholder="Couple holding hand"
					/>

					<button class="w-full p-2 font-medium text-white bg-teal-700 rounded-md cursor-pointer">
						Add
					</button>
				</div>
			</form>

			<div
				v-bind="getRootProps()"
				:class="[isDragActive ? 'bg-gray-100' : '', 'mt-4 ']"
				class="px-8 py-12 border border-gray-300 border-dashed rounded-lg"
			>
				<input v-bind="getInputProps()" class="w-0 h-0" />

				<div v-if="isLoading" class="text-center">Loading...</div>

				<p v-else-if="isDragActive" class="text-sm font-medium text-center text-gray-700">
					Drop the files here ...
				</p>

				<div v-else class="text-sm font-medium text-center text-gray-700 cursor-pointer">
					<span>Choose file or Drop image here</span>
				</div>
			</div>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import axios, { type AxiosResponse } from 'axios'
import { onMounted, ref } from 'vue'
import { useDropzone } from 'vue3-dropzone'
import Dialog from './dialog.vue'
type ImageData = {
	id: number
	image: string
}

defineProps<{
	show: boolean
}>()
const emit = defineEmits<{
	(e: 'close'): void
	(e: 'insert', url: string, decscription: string): void
}>()

const isLoading = ref(false)

const { getRootProps, getInputProps, isDragActive } = useDropzone({
	accept: 'image/png,image/jpeg,image/webp',
	multiple: true,
	onDrop: onDropImage
})

const params = {
	limit: 12,
	page: 1
}

// #region pagination
const currentPage = ref(1)
const lastPage = ref(1)

const toNext = () => {
	params.page += 1
	loadData(params)
}

const toPrevious = () => {
	params.page -= 1
	loadData(params)
}

const onPageChange = (page: number) => {
	params.page = page
	loadData(params)
}
// #endregion pagination

const imageListRef = ref<ImageData[]>([])

const imageURL = ref('')
const imageDescription = ref('')

function closeDialog() {
	emit('close')
}

function onDropImage(acceptedFiles: any[]) {
	if (acceptedFiles.length === 0) {
		return
	}

	const promises: Promise<AxiosResponse<any, any>>[] = []

	// TODO: feature request
	// As the Back-End API don't allow to upload multiple files at once
	// We need to upload one by one instead
	acceptedFiles.forEach((file: File) => {
		const formData = new FormData()
		formData.append('image', file)
		promises.push(
			instance().post(useBaseUrl() + '/gallery', formData, {
				headers: {
					'Content-type': 'multipart/form-data'
				}
			})
		)
	})

	Promise.all(promises)
		.catch(error => {
			alert(error.message)
		})
		.finally(() => {
			params.page = 1
			loadData(params)
		})
}

function loadData(params: { limit: number; page: number }) {
	isLoading.value = true
	axios
		.get('/gallery', {
			baseURL: useBaseUrl(),
			params
		})
		.then(result => {
			currentPage.value = result.data.meta.current_page
			lastPage.value = result.data.meta.last_page

			imageListRef.value = result.data.data
		})
		.finally(() => {
			isLoading.value = false
		})
}

function insertImage(url: string, description: string) {
	if (url) {
		emit('insert', url, description)
		closeDialog()
	} else {
		alert('Please select an image.')
	}
}

onMounted(() => {
	loadData(params)
})
</script>
