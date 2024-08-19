<template>
	<div class="flex flex-col justify-between gap-3 mt-10 h-fit lg:flex-row">
		<div class="flex items-end">
			<h1 class="text-3xl font-bold text-[rgb(34,40,74)]">Hero Image</h1>
		</div>

		<div class="relative flex gap-4">
			<div class="relative flex flex-col justify-end mb-1">
				<p v-if="isImageMax" class="text-sm">You have uploaded maximum amount of images.</p>
				<p v-else class="text-sm">Image width should be less than 1000 pixel.</p>
			</div>

			<!-- Button for select the file -->
			<input
				id="slider-image-input"
				ref="file"
				type="file"
				accept="image/*"
				class="hidden"
				:disabled="isUploading || isImageMax"
				@change="onFileSelected"
			/>

			<label
				for="slider-image-input"
				:class="`rounded-lg flex items-center justify-center p-4 w-auto gap-2 text-white text-sm font-semibold border-none select-none ${
					isUploading || isImageMax
						? 'bg-neutral-400 cursor-not-allowed'
						: 'bg-[#009987] cursor-pointer transition duration-300 transform active:scale-95'
				}`"
			>
				<svg
					v-if="isUploading"
					aria-hidden="true"
					class="w-6 h-6 mr-2 text-gray-200 animate-spin fill-neutral-400"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<Icon
					v-else
					icon="ph:upload-fill"
					style="color: white"
					width="23"
					height="23"
					flip="horizontal"
				/>
				{{ isUploading ? `UPLOADING...` : `UPLOAD IMAGE ${images.length}/6` }}
			</label>
		</div>
	</div>

	<div
		class="mt-2.5 min-h-[175px] px-5 pt-5 bg-white border border-gray-200 shadow-md rounded-2xl flex relative flex-col"
	>
		<div class="flex flex-1">
			<ul v-if="pending" class="flex list-none gap-4 overflow-x-auto pb-3.5 mb-1.5 animate-pulse">
				<li
					v-for="n in 6"
					:key="n"
					class="w-80 aspect-[450/320] bg-gray-400 flex-shrink-0 rounded-lg"
				></li>
			</ul>

			<div v-else-if="!error && images.length" class="flex gap-4 overflow-x-auto pb-3.5 mb-1.5">
				<div v-for="image in images" :key="image.id" class="relative flex-shrink-0 group">
					<NuxtImg
						:src="useFilePath(image.img).replace('.webp', '-sm.webp')"
						class="aspect-[450/320] w-80 object-cover rounded-lg"
					/>

					<div
						class="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden transition duration-300 ease-in-out bg-fixed opacity-0 hover:opacity-100 focus-within:opacity-100"
						style="background-color: rgba(250, 250, 250, 0.4)"
					>
						<label
							:for="confirmModalId"
							tabindex="0"
							class="absolute transition-transform scale-0 rounded-full cursor-pointer drop-shadow-md top-2 right-2 group-hover:scale-100 focus-visible:scale-100 focus-visible:ring-2 focus-visible:ring-offset-2 ring-0 ring-yellow-400 focus:outline-none"
							@click="setPendingDeleteId(image.id)"
						>
							<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#a)">
									<rect width="24" height="24" rx="12" fill="#fff" />
									<path
										d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.993 5.376 18.625.007 12 0Zm4 14.587A1 1 0 1 1 14.587 16L12 13.414 9.414 16A1 1 0 0 1 8 14.586L10.586 12 8 9.414A1 1 0 0 1 9.414 8L12 10.586 14.587 8A1 1 0 1 1 16 9.413L13.414 12 16 14.587Z"
										fill="#E3130B"
									/>
								</g>
								<defs>
									<clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z" /></clipPath>
								</defs>
							</svg>
						</label>
					</div>
				</div>
			</div>

			<div v-else class="flex items-center justify-center w-full text-2xl text-slate-400">
				No image
			</div>
		</div>

		<!-- Modal for delete-->
		<ConfirmCard
			:id="confirmModalId"
			title="DELETE IMAGE"
			cancel-text="Cancel"
			confirm-text="Delete"
			msg="Are you sure you want to delete this image?"
			:on-confirm="confirmDelete"
		/>

		<!-- Toast -->
		<div class="z-50 toast toast-end">
			<ToastStatus
				:pending="isPending"
				:error="isError"
				:succeed="isSucceed"
				:should-hide="toastShouldHide"
				:pending-message="toastPendingMessage"
				:error-message="toastErrorMessage"
				:success-message="toastSuccessMessage"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { createSliderAPI, deleteSlider } from '~/api/slider'
import type { Img } from '~/api/slider'
import { resizeImage } from '~/util/image-util'

const MAXIMIUM_IMAGE = 6

const images = ref<Img[]>([])
const pendingDeleteId = ref<number>()
const isUploading = ref(false)
const isImageMax = ref(false)
const confirmModalId = 'slider-action-confirm-modal'

const {
	data: res,
	pending,
	error
} = useLazyFetch<{ data: Img[] }>('/slider', {
	baseURL: useBaseUrl(),
	server: false
})

watch(res, newRes => {
	if (newRes?.data) {
		images.value = newRes.data
		if (images.value.length === MAXIMIUM_IMAGE) isImageMax.value = true
	}
})

const {
	toast,
	isError,
	isPending,
	isSucceed,
	toastErrorMessage,
	toastPendingMessage,
	toastSuccessMessage,
	toastShouldHide,
	toastAfterFetch
} = useToast()

// @ts-ignore
const onFileSelected = event => {
	const files = event.target.files as FileList

	if (files.length === 1) {
		const file = files[0]

		const fileType = file.type
		if (fileType === 'image/jpg' || fileType === 'image/png' || fileType === 'image/jpeg') {
			const formData = new FormData()

			resizeImage(file, 1024, async blob => {
				if (blob) {
					formData.append('img', blob, file.name)
				}

				isUploading.value = true

				const res = await createSliderAPI(formData)

				isUploading.value = false
				toastAfterFetch(res)
				toastShouldHide('pending')

				if (res.success && res.data) {
					images.value.push(res.data)

					if (images.value.length === 6) isImageMax.value = true
					else isImageMax.value = false
				} else {
					toast('error', res.message)
				}
			})
		} else {
			toast('error', 'Wrong image format')
		}
	}
}

const setPendingDeleteId = (id: number) => {
	pendingDeleteId.value = id
}

const confirmDelete = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deleting image')

		const res = await deleteSlider(pendingDeleteId.value)

		if (res.success) {
			images.value = images.value.filter(img => img.id !== pendingDeleteId.value)
			isImageMax.value = false
		}

		toastAfterFetch(res)
		toastShouldHide('pending')
	}
}
</script>
