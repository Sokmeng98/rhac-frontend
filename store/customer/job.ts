import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Post } from '~/api/type'
import type { PaginationMeta } from '~/api'

export type JobStore = {
	jobs: Post[]
	search: string
	type: string
	page: number
	meta: PaginationMeta
}

export const useJobStore = defineStore('job-store', () => {
	const jobState = reactive<JobStore>({
		jobs: [],
		search: '',
		type: '',
		page: 1,
		meta: {
			current_page: 1,
			from: 1,
			last_page: 1,
			total: 1,
			to: 1
		}
	})

	const getJob = async () => {
		// correct this line
		if (jobState.jobs.length > 0) return

		const { data: res } = await useFetch<{ data: Post[]; meta: PaginationMeta }>(
			'/post?type=career-and-opportunity&limit=6',
			{
				baseURL: useBaseUrl()
			}
		)

		if (res.value?.data) jobState.jobs = res.value.data
	}

	const getMoreJob = async () => {
		jobState.page += 1

		const { data: res } = await useFetch<{ data: Post[]; meta: PaginationMeta }>(
			`/post?type=career-and-opportunity&limit=6&search=${jobState.search}&page=${jobState.page}`,
			{
				baseURL: useBaseUrl()
			}
		)

		if (res.value?.data) jobState.jobs = [...jobState.jobs, ...res.value.data]
	}

	return {
		jobState,
		getJob,
		getMoreJob
	}
})
