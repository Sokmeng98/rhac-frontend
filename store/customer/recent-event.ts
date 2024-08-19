import { defineStore } from 'pinia'
import type { Post } from '~/api/type'

export const useCustomerRecentEventsStore = defineStore('customer-events-store', () => {
	const events = ref<Post[]>([])

	const getRecentEvents = async (): Promise<Post[]> => {
		if (events.value.length > 0) return events.value

		const { data: res, error } = await useFetch<{ data: Post[] }>('/post?type=training&limit=3', {
			baseURL: useBaseUrl()
		})

		if (error.value) return []

		if (res.value?.data) {
			events.value = res.value.data

			return events.value
		}

		return []
	}

	return {
		getRecentEvents
	}
})
