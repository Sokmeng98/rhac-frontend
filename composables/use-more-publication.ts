import type { PaginationMeta } from '~/api'
import type { Publication } from '~~/api/type'

export const useMorePublication = () => {
	const baseURL = useBaseUrl()

	const isLoadingMorePublication = ref(false)
	const isMorePageAvailable = ref(false)

	const getPublication = async (params?: { page: number; limit?: number }) => {
		isLoadingMorePublication.value = true

		const { data: res } = await useFetch<{ data: Publication[]; meta: PaginationMeta }>(
			`/publication`,
			{
				baseURL,
				params
			}
		)

		isLoadingMorePublication.value = false

		if (res.value?.data) {
			res.value.meta &&
				(isMorePageAvailable.value = res.value.meta.last_page > res.value.meta.current_page)

			return res.value.data
		}

		return []
	}

	return {
		isLoadingMorePublication,
		getPublication,
		isMorePageAvailable
	}
}
