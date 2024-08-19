import { ref } from 'vue'

export function usePfdUpload() {
	const newPdfFile = ref<File[]>([])
	const newPdfName = ref<string[]>([])

	function handlePdfSelected(e: Event) {
		const files = (<HTMLInputElement>e.target).files as FileList
		if (!files.length) return

		for (let i = 0; i < files.length; i++) {
			newPdfFile.value.push(files[i])
			newPdfName.value.push(files[i].name)
		}
	}

	function removePdf(index: number) {
		newPdfName.value.splice(index, 1)
		newPdfFile.value.splice(index, 1)
	}

	return {
		newPdfFile,
		newPdfName,
		handlePdfSelected,
		removePdf
	}
}
