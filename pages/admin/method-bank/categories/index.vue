<template>
	<h1 class="text-3xl font-bold text-[rgb(34,40,74)]">Categories</h1>

	<main>
		<div class="flex mt-10 space-x-10">
			<div class="w-[300px]">
				<div class="text-[20px] font-bold text-[#303030] mb-7">Add New Category</div>

				<!-- Input Name in English -->
				<div>
					<div class="flex">
						<Icon icon="twemoji:flag-united-states" :height="24" />
						<p class="ml-[10px] mb-[6px] text-lg text-black">Name in English</p>
					</div>

					<input
						v-model="nameEn"
						type="text"
						class="w-full px-4 py-3 text-sm text-black rounded-lg focus:outline-none focus:ring-1"
						placeholder="Type here"
						required
					/>
					<span v-if="error.name_en" class="error">Name in English is required</span>
				</div>

				<!-- Input Name in Khmer -->
				<div class="mt-5">
					<div class="flex">
						<Icon icon="twemoji:flag-cambodia" :height="24" />
						<p class="ml-[10px] mb-[6px] text-lg text-black">Name In Khmer</p>
					</div>
					<input
						v-model="name"
						type="text"
						class="w-full px-4 py-3 text-sm text-black rounded-lg focus:outline-none focus:ring-1"
						placeholder="Type here"
					/>
				</div>

				<!-- For Learner -->
				<div class="mt-2 form-control" @click.prevent>
					<label class="flex justify-start label">
						<input checked type="checkbox" class="checkbox checkbox-secondary" />
						<span class="mx-3 text-lg label-text">For Learner</span>
					</label>
				</div>

				<!-- Keyword -->
				<div class="mt-2">
					<p class="mb-[6px] text-lg font-normal leading-normal text-black">Keyword</p>
					<input
						v-model="keyword"
						type="text"
						class="w-full px-4 py-3 text-sm text-black rounded-lg focus:outline-none focus:ring-1"
						placeholder="Type keyword"
					/>
					<p class="mt-[5px] text-xs leading-normal text-black">Add Keyword to improve SEO</p>
				</div>

				<!-- Upload Icon Image -->
				<div class="flex gap-3 mt-5">
					<div>
						<p class="mb-[6px] text-lg font-normal leading-normal text-black">Upload Icon Image</p>
						<button
							class="gap-2 text-white border-none btn bg-[#009987] hover:bg-[#009987]"
							@click="onNewButtonClicked()"
						>
							<Icon
								icon="ph:upload-fill"
								style="color: white"
								width="23"
								height="23"
								flip="horizontal"
							/>
							Upload Image
							<input
								ref="file"
								type="file"
								accept="image/*"
								class="hidden"
								@change="onImageInputChange"
							/>
						</button>
						<p class="mt-[5px] text-xs italic leading-normal text-gray-500">
							*Image format: png, jpg
						</p>
					</div>

					<div class="flex bg-white shadow w-28 rounded-xl">
						<img v-if="isCategoryHasImage" :src="image" class="object-contain" />
						<img v-else :src="imageUrl" class="object-contain" />
					</div>
				</div>

				<!-- Description -->
				<div class="mt-5">
					<p class="mb-[6px] text-lg font-normal leading-normal text-black">Description</p>
					<textarea
						v-model="description"
						type="text"
						class="w-full h-20 px-4 py-3 text-sm text-black rounded-xl focus:outline-none focus:ring-1"
						placeholder="Type here"
					/>
				</div>

				<!-- Save & Add New Category Button -->
				<div class="mt-5">
					<button
						v-if="isEditing"
						class="gap-2 text-white border-none btn bg-[#009987] hover:bg-[#009987]"
						@click="updateData"
					>
						Save
					</button>
					<button
						v-else
						class="gap-2 text-white border-none btn bg-[#009987] hover:bg-[#009987]"
						@click="createData"
					>
						Add New category
					</button>
				</div>
			</div>

			<!-- All Categories -->
			<div class="flex-auto p-5 text-base bg-white rounded-lg">
				<div class="mb-4 ml-4 text-xl font-bold text-[#303030]">All Categories</div>

				<!-- Method Bank Category Table -->
				<AdminMbCategoryTable
					:is-pending="isPending"
					:data="categoryState.data"
					:confirm-modal-id="confirmModalId"
					:on-edit-button-click="onEditButtonClick"
					:on-pending-delete="onPendingDelete"
				/>
			</div>
		</div>

		<!-- Pagination -->
		<div v-if="categoryState.meta.last_page !== 1" class="flex justify-center">
			<PaginationButton
				:current="categoryState.meta.current_page"
				:last="categoryState.meta.last_page"
				:to-previous="previousPage"
				:to-next="nextPage"
			/>
		</div>
	</main>

	<!-- Confirm delete -->
	<ConfirmCard
		:id="confirmModalId"
		msg="Are you sure you want to delete this category?"
		title="DELETE CATEGORY"
		:on-confirm="confirmDeleteCategory"
	/>

	<!-- Toast -->
	<div class="toast toast-end">
		<ToastStatus
			:pending="isPending"
			:error="isError"
			:succeed="isSucceed"
			:should-hide="toastShouldHide"
			:pending-message="toastPendingMessage"
			:success-message="toastSuccessMessage"
			:error-message="toastErrorMessage"
		/>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useImageUpload } from './uploadImage'
import { useFilePath } from '~/composables'
import type { MBCategory } from '~/api/type'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const {
	categoryState,
	getCategory,
	createCategory,
	deleteCategory,
	updateCategory,
	previousPage,
	nextPage
} = useMbCategoryStore()
const { imageFile, imageUrl, handleImageSelected } = useImageUpload()

const file = ref<HTMLInputElement>()

const pendingDeleteId = ref<number>()
const confirmModalId = 'delete-category-confirm-modal'

const onNewButtonClicked = () => {
	file.value?.click()
}

const isEditing = ref(false)
const editingId = ref(0)

const image = ref('')
const name = ref('')
const nameEn = ref('')
const keyword = ref('')
const description = ref('')
const error = ref({ name_en: false })

const isImageEverSelected = ref(false)

const isCategoryHasImage = ref(false)

const {
	isError,
	isPending,
	isSucceed,
	toast,
	toastErrorMessage,
	toastPendingMessage,
	toastSuccessMessage,
	toastShouldHide,
	toastAfterFetch
} = useToast()

// @ts-ignore
const onImageInputChange = event => {
	isImageEverSelected.value = true
	handleImageSelected(event)
	isCategoryHasImage.value = false
}

const editingCategoryItem = ref<MBCategory>()

const createData = async () => {
	if (!nameEn.value.trim()) {
		error.value.name_en = true
		return
	} else {
		error.value.name_en = false
	}

	const formData = new FormData()

	formData.append('name_en', nameEn.value)
	if (name.value) formData.append('name', name.value)
	if (imageFile.value) formData.append('img', imageFile.value)

	toast('pending', 'Creating category')

	const res = await createCategory(formData)

	toastAfterFetch(res)
	toastShouldHide('pending')

	if (res.success) {
		name.value = ''
		nameEn.value = ''
		imageFile.value = ''
		imageUrl.value = ''
	}

	await getCategory()
}

const onEditButtonClick = (category: MBCategory) => {
	editingCategoryItem.value = category

	if (editingCategoryItem.value) {
		if (editingCategoryItem.value.img) {
			isCategoryHasImage.value = true
		} else {
			isCategoryHasImage.value = false
		}

		image.value = useFilePath(editingCategoryItem.value.img)

		nameEn.value = editingCategoryItem.value.name_en
		name.value = editingCategoryItem.value.name
		isEditing.value = true
		editingId.value = editingCategoryItem.value.id
	}
}

const updateData = async () => {
	const formData = new FormData()

	formData.append('_method', 'PUT')

	if (editingCategoryItem.value?.name !== name.value) formData.append('name', name.value)
	if (editingCategoryItem.value?.name_en !== nameEn.value) formData.append('name_en', nameEn.value)

	if (imageFile.value) formData.append('img', imageFile.value)

	toast('pending', 'Updating category')

	const res = await updateCategory(formData, editingId.value)

	toastAfterFetch(res)
	toastShouldHide('pending')

	if (res.success) {
		name.value = ''
		nameEn.value = ''
		imageFile.value = ''
		imageUrl.value = ''
		image.value = ''
	}

	await getCategory()
}

const onPendingDelete = (id: number) => {
	pendingDeleteId.value = id
}

const confirmDeleteCategory = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deleting category')

		const res = await deleteCategory(pendingDeleteId.value)

		toastAfterFetch(res)
		toastShouldHide('pending')

		await getCategory()
	}
}

await getCategory()
</script>
