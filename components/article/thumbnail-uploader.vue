<template>
	<div class="mb-8 bg-white rounded-md select-none">
		<h4 class="p-3 text-xl font-bold border-b">Thumbnail Image</h4>

		<div class="relative w-full p-4 aspect-video">
			<label
				for="thumbnail"
				class="flex flex-col items-center justify-center w-full h-full gap-4 overflow-hidden rounded-lg cursor-pointer"
			>
				<div v-if="imageUrl != ''" class="relative w-full h-full group">
					<img :src="imageUrl" alt="thumbnail" class="object-cover w-full h-full" />
					<div
						class="absolute inset-0 flex items-center justify-center invisible group-hover:visible hover:bg-black/10"
					>
						<p class="text-lg text-white drop-shadow-md">Update</p>
					</div>
				</div>

				<div
					v-else
					class="flex flex-col items-center justify-center w-full h-full gap-4 border-2 border-gray-200 border-dashed"
				>
					<img src="~/assets/img/image_icon.svg" alt="thumbnail" class="" />
					<p class="text-sm text-center">Browse image</p>
				</div>
			</label>

			<input id="thumbnail" type="file" accept="image/*" class="hidden" @change="onChange" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { resizeImage } from '~/util/image-util'

type Props = {
	onThumbnailChange: (file: File, objectURL: string) => void
	imageObjectUrl: string
}
const { onThumbnailChange, imageObjectUrl } = defineProps<Props>()

const imageUrl = ref(imageObjectUrl)
const file = ref<File>()

const resizeImageCallback = (blob: Blob | null) => {
	if (blob === null) return
	const objectURL = URL.createObjectURL(blob)
	const file = new File([blob], 'thumbnail', { type: blob.type })

	imageUrl.value = objectURL
	onThumbnailChange(file, objectURL)
}

const onChange = (event: Event) => {
	const target = event.target as HTMLInputElement
	const files = target?.files as FileList

	if (files.length === 0) return
	file.value = files[0]

	if (file.value.type.startsWith('image/')) {
		resizeImage(file.value, 1080, resizeImageCallback)
	} else {
		alert('Please upload an image file.')
	}
}
</script>
