import { describe, expect, it, vi } from 'vitest'
import { useArticleThumbnail } from '~/composables/use-article-thumbnail'

describe('use article thumbnail', () => {
	it('returns onThumbnailChange, thumbnailFile, and thumbnailObjectURL', () => {
		const { onThumbnailChange, thumbnailFile, thumbnailObjectURL } = useArticleThumbnail()

		expect(onThumbnailChange).toBeTruthy()
		expect(thumbnailFile).toBeTruthy()
		expect(thumbnailObjectURL).toBeTruthy()
	})

	it('initialize thumbnail file to undefined', () => {
		const { thumbnailFile } = useArticleThumbnail()

		expect(thumbnailFile.value).toBeUndefined()
	})

	it('initialize thumbnail thumbnail objectURL to empty string', () => {
		const { thumbnailObjectURL } = useArticleThumbnail()

		expect(thumbnailObjectURL.value).toBe('')
	})

	it('change the file and object url when call ', () => {
		const { onThumbnailChange, thumbnailFile, thumbnailObjectURL } = useArticleThumbnail()

		const file = new File(['this is the content of the file'], 'file name')

		global.URL.createObjectURL = vi.fn()

		const objectURL = URL.createObjectURL(file)

		onThumbnailChange(file, objectURL)

		expect(thumbnailFile.value).toBe(file)
		expect(thumbnailObjectURL.value).toBe(objectURL)
	})
})
