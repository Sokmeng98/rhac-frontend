import { defineStore } from 'pinia'
import type { Post } from '~/api/type'

export const useOtherArticleStore = defineStore('other-health-article-store', () => {
	const recentHealthArticles = ref<Post[]>([])
	const recentTruthStories = ref<Post[]>([])
	const recentMethodBankStudentPosts = ref<Post[]>([])
	const recentPublications = ref<Post[]>([])

	const getHealthArticles = async (): Promise<Post[]> => {
		if (recentHealthArticles.value.length > 0) return recentHealthArticles.value

		const { data: res, error } = await useFetch<{ data: Post[] }>(
			'/post?type=youth-health-news&limit=4',
			{
				baseURL: useBaseUrl()
			}
		)

		if (error.value) return []

		if (res.value?.data) {
			recentHealthArticles.value = res.value.data

			return recentHealthArticles.value
		}

		return []
	}

	const getTruthStories = async (): Promise<Post[]> => {
		if (recentTruthStories.value.length > 0) return recentTruthStories.value

		const { data: res, error } = await useFetch<{ data: Post[] }>(
			'/post?type=success-story&limit=4',
			{
				baseURL: useBaseUrl()
			}
		)

		if (error.value) return []

		if (res.value?.data) {
			recentTruthStories.value = res.value.data

			return recentTruthStories.value
		}

		return []
	}

	const getMethodBankStudentPosts = async (): Promise<Post[]> => {
		if (recentMethodBankStudentPosts.value.length > 0) return recentMethodBankStudentPosts.value

		const { data: res, error } = await useFetch<{ data: Post[] }>('/mb_learner?limit=4', {
			baseURL: useBaseUrl()
		})

		if (error.value) return []

		if (res.value?.data) {
			recentMethodBankStudentPosts.value = res.value.data

			return recentMethodBankStudentPosts.value
		}

		return []
	}

	const getMethodBankEducatorPosts = async (): Promise<Post[]> => {
		if (recentMethodBankStudentPosts.value.length > 0) return recentMethodBankStudentPosts.value

		const { data: res, error } = await useFetch<{ data: Post[] }>('/mb_professional?limit=4', {
			baseURL: useBaseUrl()
		})

		if (error.value) return []

		if (res.value?.data) {
			recentMethodBankStudentPosts.value = res.value.data

			return recentMethodBankStudentPosts.value
		}

		return []
	}

	const getPublications = async (): Promise<Post[]> => {
		if (recentPublications.value.length > 0) return recentPublications.value

		const { data: res, error } = await useFetch<{ data: Post[] }>(
			'/post?type=publication&limit=4',
			{
				baseURL: useBaseUrl()
			}
		)

		if (error.value) return []

		if (res.value?.data) {
			recentPublications.value = res.value.data

			return recentPublications.value
		}

		return []
	}

	return {
		getHealthArticles,
		getTruthStories,
		getMethodBankStudentPosts,
		getMethodBankEducatorPosts,
		getPublications
	}
})
