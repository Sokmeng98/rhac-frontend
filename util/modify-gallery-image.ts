const resize = (
	img: HTMLImageElement,
	type: string,
	quality: number,
	callback: (blob: Blob | null) => void
) => {
	const canvas = document.createElement('canvas')
	const context = canvas.getContext('2d')

	const aspecRatio = img.width / img.height

	const canvasWidth = 1024
	const canvasHeight = canvasWidth / aspecRatio

	canvas.width = canvasWidth
	canvas.height = canvasHeight

	if (context) {
		context.drawImage(img, 0, 0, canvasWidth, canvasHeight)

		canvas.toBlob(callback, type, quality)
	}
}

/**
 * Check dimension of the image (check width and height).
 * Resize it if its width greater than 1024 + 50 pixel.
 * @param file
 * @param formData
 */
export const resizeImage = (file: File, callback: (image: string | Blob) => void) => {
	const img = new Image()

	const objectUrl = URL.createObjectURL(file)

	img.onload = () => {
		// Tell the browser to not keep the reference to the file
		URL.revokeObjectURL(objectUrl)

		if (img.width > 1024 + 50) {
			resize(img, file.type, 100, blob => {
				if (blob) callback(blob)
				else callback(file)
			})
		} else {
			callback(file)
		}
	}

	img.src = objectUrl
}
