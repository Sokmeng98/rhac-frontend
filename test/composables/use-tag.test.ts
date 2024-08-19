import { describe, expect, it } from 'vitest'
import { useTag } from '~/composables/use-tag'

describe('use tag', () => {
	it('initial tags to be empty array.', () => {
		const { tags } = useTag()

		expect(tags.value).toEqual([])
	})

	it('can inittialize tag from string', () => {
		const delimiter = ','

		const { tags, initTag } = useTag(delimiter)

		const words = ['test', 'tag', 'test tag']
		initTag(words.join(delimiter))

		expect(tags.value).toEqual(words)
	})

	it('can add new tag', () => {
		const { tags, addTag } = useTag()

		const words = ['test', 'tag', 'test tag']
		words.forEach(word => addTag(word))

		expect(tags.value).toEqual(words)
	})

	it('has maximun length of 5', () => {
		const { tags, addTag } = useTag()

		const words = ['test', 'tag', 'test tag', 'nice', 'good', 'awesome']
		words.forEach(word => addTag(word))

		expect(tags.value.length).toEqual(5)
	})

	it('has maximun length of 5 even when being initialized with more than 5 tag', () => {
		const { tags, initTag } = useTag()

		const tag = 'test,tag,test tag,nice,good,awesome'
		initTag(tag)

		expect(tags.value.length).toEqual(5)
	})

	it('tag initialization will not add empty tag', () => {
		const { tags, initTag } = useTag()

		const tag = ',tag,,nice,good job,'
		initTag(tag)

		expect(tags.value.length).toEqual(3)
	})

	it('tag initialization will not add empty tag', () => {
		const { tags, initTag } = useTag()

		const tag = ',tag,,nice,     ,,good job,,,,   '
		initTag(tag)

		expect(tags.value.length).toEqual(3)
	})

	it('will not add empty tag', () => {
		const { tags, addTag } = useTag()

		const words = [' ', 'good article', 'nice', 'good', 'awesome', '', '       ']
		words.forEach(word => addTag(word))

		expect(tags.value.length).toEqual(4)
	})

	it('serialize tag correctly', () => {
		const delimiter = ','

		const { initTag, getSerializedTag } = useTag(delimiter)

		const tag = ',,,,tag,,nice,good job,health'
		initTag(tag)

		expect(getSerializedTag()).toEqual('tag,nice,good job,health')
	})

	it('remove tag at the right index', () => {
		const { tags, initTag, removeTag } = useTag()

		const tag = 'tag,nice,good job,health'
		initTag(tag)

		removeTag(1)

		expect(tags.value).toEqual(['tag', 'good job', 'health'])
	})

	it('will not cause problem while trying to remove tag from empty tag list', () => {
		const { tags, removeTag } = useTag()

		expect(() => removeTag(2)).not.toThrow()
		expect(tags.value).toEqual([])
	})
})
