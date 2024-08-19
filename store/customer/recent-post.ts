import { defineStore } from 'pinia'
import type { Post } from '~/api/type'

export const useCustomerRecentPostsStore = defineStore('customer-recent-post-store', () => {
	const posts = ref<Post[]>([])

	const getRecentPosts = async (): Promise<Post[]> => {
		if (posts.value.length > 0) return posts.value

		const { data: res, error } = await useFetch<{ data: Post[] }>('/post?limit=6&essential=true', {
			baseURL: useBaseUrl()
		})

		if (error.value) return []

		if (res.value?.data) {
			posts.value = res.value.data

			return posts.value
		}

		return []
	}

	return {
		getRecentPosts
	}
})
