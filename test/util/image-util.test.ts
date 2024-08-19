import { describe, expect, it } from 'vitest'
import { resizeImage } from '~/util/image-util'

describe('resize image', () => {
	it('is a function', () => {
		expect(resizeImage).toBeInstanceOf(Function)
	})
})
