import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { createCareerAPI, deleteCareerAPI, getCareerAPI, updateCareerAPI } from '~/api/career'
import type { GetCareerParams } from '~/api/career'
import type { PaginationMeta } from '~/api'
import type { Post } from '~~/api/type'

export type CareerState = {
	data: Post[]
	meta: PaginationMeta
	subType: string
	search: string
}

export const useCareerStore = defineStore('career-store', () => {
	const careerState = reactive<CareerState>({
		data: [],
		meta: { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 },
		subType: '',
		search: ''
	})

	const previousPage = async () => {
		if (careerState.meta.current_page > 1) {
			careerState.meta.current_page -= 1
			await getCareerPost({
				search: careerState.search,
				subType: careerState.subType,
				page: careerState.meta.current_page
			})
		}
	}

	const nextPage = async () => {
		if (careerState.meta.current_page < careerState.meta.last_page) {
			careerState.meta.current_page += 1
			await getCareerPost({
				search: careerState.search,
				subType: careerState.subType,
				page: careerState.meta.current_page
			})
		}
	}

	const jumpToPage = async (page: number) => {
		careerState.meta.current_page = page
		await getCareerPost({
			search: careerState.search,
			subType: careerState.subType,
			page
		})
	}

	const getCareerPost = async (params?: GetCareerParams) => {
		if (params) {
			if (params.search) careerState.search = params.search
			if (params.subType) careerState.subType = params.subType
		}

		const currentPage = careerState.meta.current_page

		let operationStatus: Awaited<ReturnType<typeof getCareerAPI>> = {
			success: false,
			message: ''
		}

		// `res` is not always follow the shape
		// `res` could be { message: string } for example.
		const res = await getCareerAPI(params || { page: currentPage })
		operationStatus = res

		if (res.success) {
			// If res has expected shape
			if (res.data && res.meta) {
				if (res.meta.current_page >= 2 && res.data.length === 0) {
					const newResponse = await getCareerAPI({
						search: careerState.search,
						subType: careerState.subType,
						page: currentPage - 1
					})
					operationStatus = newResponse

					if (newResponse.data && newResponse.meta) {
						careerState.data = newResponse.data
						careerState.meta = newResponse.meta
					}
				} else {
					careerState.data = res.data
					careerState.meta = res.meta
				}
			} else {
				careerState.data = []
				careerState.meta = { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 }
			}
		} else {
			careerState.data = []
			careerState.meta = { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 }
		}

		return operationStatus
	}

	const createCareerPost = async (payload: FormData) => {
		return await createCareerAPI(payload)
	}

	const deleteCareerPost = async (id: number) => {
		return await deleteCareerAPI(id)
	}

	const updateCareerPost = async (payload: FormData, id: number) => {
		return await updateCareerAPI(payload, id)
	}

	return {
		createCareerPost,
		deleteCareerPost,
		updateCareerPost,
		getCareerPost,
		previousPage,
		nextPage,
		jumpToPage,
		careerState
	}
})
