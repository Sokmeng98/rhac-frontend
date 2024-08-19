import { defineStore } from 'pinia'
import {
	createMbLearnerPostAPI,
	updateMbLearnerPostAPI,
	deleteMbLearnerPostAPI,
	getMbLearnerPostAPI
} from '~/api'
import type { GetMbLearnerPostParam, PaginationMeta } from '~/api'

import type { Post } from '~/api/type'
import type { MbLearnerOperationStatus } from '~/api/mb-learner'

export type MBLearnerStore = {
	data: Post[]
	meta: PaginationMeta
	type: string
	search: string
}

export const useMbLearnerStore = defineStore('mblearner-store', () => {
	const mbLearnerState = reactive<MBLearnerStore>({
		data: [],
		meta: { current_page: 0, from: 0, to: 0, last_page: 0, total: 0 },
		type: '',
		search: ''
	})

	const previousPage = async () => {
		if (mbLearnerState.meta.current_page > 1) {
			mbLearnerState.meta.current_page -= 1
			await getMbLearner({
				search: mbLearnerState.search,
				type: mbLearnerState.type,
				page: mbLearnerState.meta.current_page
			})
		}
	}

	const nextPage = async () => {
		if (mbLearnerState.meta.current_page < mbLearnerState.meta.last_page) {
			mbLearnerState.meta.current_page += 1
			await getMbLearner({
				search: mbLearnerState.search,
				type: mbLearnerState.type,
				page: mbLearnerState.meta.current_page
			})
		}
	}

	const getMbLearner = async (params?: GetMbLearnerPostParam) => {
		if (params) {
			if (params.search) mbLearnerState.search = params.search
			if (params.type) mbLearnerState.type = params.type
		}

		const currentPage = mbLearnerState.meta.current_page

		let operationStatus: MbLearnerOperationStatus

		// `res` is not always follow the shape
		// `res` could be { message: string } for example (Match with Content Not Found).
		const res = await getMbLearnerPostAPI(params || { page: currentPage })
		operationStatus = res

		if (res.data) {
			const data = res.data
			const meta = res.meta

			// If the data of fetched page is empty
			if (meta!.current_page >= 2 && data.length === 0) {
				// Fetch pervious page
				const newResponse = await getMbLearnerPostAPI({
					search: mbLearnerState.search,
					type: mbLearnerState.type,
					page: currentPage - 1
				})
				operationStatus = newResponse

				if (newResponse.data) {
					mbLearnerState.data = newResponse.data
					mbLearnerState.meta = newResponse.meta!
				}
			} else {
				mbLearnerState.data = data
				mbLearnerState.meta = meta!
			}
		} else {
			mbLearnerState.data = []
			mbLearnerState.meta = { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 }
		}

		return operationStatus
	}

	const createMbLearnerPost = async (payload: FormData) => {
		return await createMbLearnerPostAPI(payload)
	}

	const updateMbLearnerPost = async (payload: FormData, id: number) => {
		return await updateMbLearnerPostAPI(payload, id)
	}

	const deleteMbLearnerPost = async (id: number) => {
		return await deleteMbLearnerPostAPI(id)
	}

	return {
		getMbLearner,
		createMbLearnerPost,
		updateMbLearnerPost,
		deleteMbLearnerPost,
		mbLearnerState,
		previousPage,
		nextPage
	}
})
