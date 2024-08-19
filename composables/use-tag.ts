import { ref } from 'vue'

const serialize = (tags: string[], delimiter: string) => (tags.length ? tags.join(delimiter) : '')

const deserialize = (tag: string, delimiter: string) => tag.split(delimiter)

export const useTag = (delimiter?: string) => {
	const tagDelimiter = delimiter || ','

	const tags = ref<string[]>([])

	const initTag = (serializedTag: string) => {
		tags.value = []

		const deserializedTags = deserialize(serializedTag, tagDelimiter)

		for (let i = 0; i < deserializedTags.length; i++) {
			addTag(deserializedTags[i])
		}
	}

	const getSerializedTag = () => {
		return serialize(tags.value, tagDelimiter)
	}

	const addTag = (tag: string) => {
		// tag input might already contain delimiter
		tag.split(tagDelimiter).forEach(item => {
			if (item === '' || item.trim() === '' || tags.value.includes(item) || tags.value.length >= 5)
				return

			tags.value.push(item)
		})
	}

	const removeTag = (index: number) => {
		tags.value.splice(index, 1)
	}

	return {
		tags,
		addTag,
		removeTag,
		getSerializedTag,
		initTag
	}
}
