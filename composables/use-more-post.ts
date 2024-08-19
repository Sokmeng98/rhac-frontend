import type { PaginationMeta } from '~~/api'
import type { Post } from '~~/api/type'

export const useMorePost = () => {
	const baseURL = useBaseUrl()

	const isLoadingMorePost = ref(false)
	const isMorePageAvailable = ref(false)

	const getPosts = async (params?: {
		page: number
		search?: string
		type?: string
		subtype?: string
		limit?: number
	}) => {
		isLoadingMorePost.value = true

		const { data: res } = await useFetch<{ data: Post[]; meta: PaginationMeta }>(`/post`, {
			baseURL,
			params
		})

		isLoadingMorePost.value = false

		// @ts-ignore
		if (res.value?.last_page && res.value?.current_page) {
			// @ts-ignore
			isMorePageAvailable.value = res.value.last_page > res.value.current_page
		}

		if (res.value?.meta) {
			isMorePageAvailable.value = res.value.meta?.last_page > res.value.meta?.current_page
		}

		if (res.value?.data) {
			return res.value.data
		}

		return []
	}

	return {
		isLoadingMorePost,
		getPosts,
		isMorePageAvailable
	}
}
