import type { PaginationMeta } from '~/api'
import type { VideoEducation } from '~/api/type'

export const useMoreVideo = () => {
	const baseURL = useBaseUrl()

	const isLoadingMoreVideo = ref(false)
	const isMorePageAvailable = ref(false)

	const getVideos = async (params?: {
		page: number
		subtype?: string
		maintype?: string
		limit?: number
	}) => {
		isLoadingMoreVideo.value = true

		const { data: res } = await useFetch<{ data: VideoEducation[]; meta: PaginationMeta }>(
			`/video`,
			{
				baseURL,
				params
			}
		)

		isLoadingMoreVideo.value = false

		// @ts-ignore
		if (res.value.last_page && res.value.current_page) {
			// @ts-ignore
			isMorePageAvailable.value = res.value.last_page > res.value.current_page
		}

		if (res.value?.meta) {
			isMorePageAvailable.value = res.value.meta.last_page > res.value.meta.current_page
		}

		if (res.value?.data) {
			return res.value.data
		}

		return []
	}

	return {
		isLoadingMoreVideo,
		getVideos,
		isMorePageAvailable
	}
}
