import type { PaginationMeta } from '~~/api'
import type { Post } from '~~/api/type'

export const useMoreMBPost = (
	endPoint?: 'mb_learner' | 'mb_professional' | 'mb_learner_and_video'
) => {
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

		const { data: res } = await useFetch<{ data: Post[]; meta: PaginationMeta }>(
			`/${endPoint || 'search_mb'}`,
			{
				baseURL,
				params
			}
		)

		isLoadingMorePost.value = false

		// @ts-ignore
		if (res.value?.current_page && res.value?.last_page)
			// @ts-ignore
			isMorePageAvailable.value = res.value.last_page > res.value.current_page
		else if (res.value?.meta)
			isMorePageAvailable.value = res.value.meta.current_page < res.value.meta.last_page
		else isMorePageAvailable.value = false

		if (!res.value?.data) return []
		else return res.value.data
	}

	return {
		isLoadingMorePost,
		getPosts,
		isMorePageAvailable
	}
}
