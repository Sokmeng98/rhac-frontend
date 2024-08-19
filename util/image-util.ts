const resize = (params: {
	img: HTMLImageElement
	type: string
	maxWidth: number
	quality: number
	callback: (blob: Blob | null) => void
}) => {
	const canvas = document.createElement('canvas')
	const context = canvas.getContext('2d')

	const aspecRatio = params.img.width / params.img.height

	const canvasWidth = params.maxWidth
	const canvasHeight = canvasWidth / aspecRatio

	canvas.width = canvasWidth
	canvas.height = canvasHeight

	if (context) {
		context.drawImage(params.img, 0, 0, canvasWidth, canvasHeight)

		canvas.toBlob(params.callback, params.type, params.quality)
	}
}

export const resizeImage = (
	file: File,
	maxWidth: number,
	callback: (image: Blob | null) => void
) => {
	const img = new Image()

	const imageObjectURL = URL.createObjectURL(file)

	img.onload = () => {
		// Tell the browser to not keep the reference to the file
		URL.revokeObjectURL(imageObjectURL)

		if (img.width > maxWidth) {
			resize({
				img,
				type: file.type,
				maxWidth,
				quality: 100,
				callback: blob => {
					if (blob) callback(blob)
					else callback(file)
				}
			})
		} else {
			callback(file)
		}
	}

	// load the image
	img.src = imageObjectURL
}
