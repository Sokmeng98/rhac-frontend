import { ref } from 'vue'

export const useArticleThumbnail = () => {
	const thumbnailFile = ref<File>()
	const thumbnailObjectURL = ref('')

	const onThumbnailChange = (file: File, objectURL: string) => {
		thumbnailFile.value = file
		thumbnailObjectURL.value = objectURL
	}

	return {
		thumbnailFile,
		thumbnailObjectURL,
		onThumbnailChange
	}
}
