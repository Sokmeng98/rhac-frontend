<template>
	<nuxt-layout name="dashboard">
		<div class="relative flex flex-col h-full overflow-hidden border-black">
			<div class="flex items-center justify-between">
				<div class="flex justify-between">
					<div class="text-3xl font-bold text-[rgb(34,40,74)]">Gallery</div>
				</div>

				<button
					class="btn gap-2 text-white bg-[#009987] border-none hover:bg-[#009987]"
					@click="onNewImageButtonClicked()"
				>
					<Icon icon="fluent:add-12-filled" />
					NEW IMAGE

					<input
						ref="file"
						type="file"
						accept="image/png,image/jpeg,image/jpg,image/webp"
						class="hidden"
						@change="onFileSelected"
					/>
				</button>
			</div>

			<div class="overflow-y-auto mt-7">
				<ul class="grid grid-cols-2 gap-2 list-none lg:grid-cols-4 lg:gap-4">
					<li
						v-for="item of galleryState.data"
						:key="item.id"
						class="group relative overflow-hidden rounded-xl aspect-[285/230]"
					>
						<img
							class="w-full h-full select-none"
							fit="cover"
							:src="useFilePath(item.image)"
							alt="Gallery image"
						/>

						<label
							for="gallery-action-confirm-modal"
							class="absolute text-red-400 transition-transform scale-0 border border-red-400 rounded-full cursor-pointer drop-shadow-md top-2 right-1 group-hover:scale-100"
							@click="setPendingDeleteId(item.id)"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</label>
					</li>
				</ul>
			</div>

			<!-- Modal for delete-->
			<ConfirmCard
				id="gallery-action-confirm-modal"
				title="DELETE IMAGE"
				cancel-text="Cancel"
				confirm-text="Delete"
				msg="Are you sure you want to delete this image?"
				:on-confirm="confirmDelete"
			/>

			<!-- Toast -->
			<div class="toast toast-end">
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

			<!-- Pagination -->
			<div
				v-if="galleryState.meta.last_page !== 1"
				class="flex items-center justify-center w-full py-8 mt-auto"
			>
				<PaginationButton
					:current="galleryState.meta.current_page"
					:last="galleryState.meta.last_page"
					:to-previous="previousPage"
					:to-next="nextPage"
					:on-change="jumpToPage"
				/>
			</div>
		</div>
	</nuxt-layout>
</template>

<script setup lang="ts">
import { useFilePath } from '~/composables'
import { resizeImage } from '~~/util/modify-gallery-image'

// auth middleware
definePageMeta({
	middleware: ['auth']
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

const { galleryState, addImage, getGallery, deleteImage, previousPage, nextPage, jumpToPage } =
	useGalleryStore()

const pendingDeleteId = ref<number>()
const file = ref<HTMLInputElement>()

const onNewImageButtonClicked = () => {
	file.value?.click()
}

const setPendingDeleteId = (id: number) => {
	pendingDeleteId.value = id
}

const confirmDelete = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deleting image')

		const res = await deleteImage(pendingDeleteId.value)

		toastAfterFetch(res)
		toastShouldHide('pending')

		if (res.success) await getGallery()
	}
}

// @ts-ignore
const onFileSelected = event => {
	const files = event.target.files as FileList

	if (files.length === 1) {
		const file = files[0]

		const fileType = file.type
		if (
			fileType === 'image/jpg' ||
			fileType === 'image/png' ||
			fileType === 'image/jpeg' ||
			fileType === 'image/webp'
		) {
			const formData = new FormData()

			resizeImage(file, async blob => {
				formData.append('image', blob as Blob, file.name)

				toast('pending', 'Adding image to gallery')

				const res = await addImage(formData)

				toastAfterFetch(res)
				toastShouldHide('pending')

				if (res.success) await getGallery()
			})
		} else {
			toast('error', 'Wrong image format')
		}
	}
}

// Fetch gally data
const res = await getGallery()
if (!res.success) toast('error', res.message)
</script>
