import { defineStore } from 'pinia'
import {
	createMbProfessionalPostAPI,
	updateMbProfessionalAPI,
	deleteMbProfessionalAPI,
	getMbProfessionalPostAPI
} from '~/api'
import type { PaginationMeta, GetMbProfessorPostParam, MbProfessorOperationStatus } from '~/api'

import type { Post } from '~/api/type'

export type MbProfessionalStore = {
	data: Post[]
	meta: PaginationMeta
	type: string
	search: string
}

export const useMbProfessionalStore = defineStore('mbprofessor-store', () => {
	const mbProfessionalState = reactive<MbProfessionalStore>({
		data: [],
		meta: { current_page: 0, from: 0, to: 0, last_page: 0, total: 0 },
		type: '',
		search: ''
	})

	const previousPage = async () => {
		if (mbProfessionalState.meta.current_page > 1) {
			mbProfessionalState.meta.current_page -= 1
			await getMbProfessional({
				search: mbProfessionalState.search,
				type: mbProfessionalState.type,
				page: mbProfessionalState.meta.current_page
			})
		}
	}

	const nextPage = async () => {
		if (mbProfessionalState.meta.current_page < mbProfessionalState.meta.last_page) {
			mbProfessionalState.meta.current_page += 1
			await getMbProfessional({
				search: mbProfessionalState.search,
				type: mbProfessionalState.type,
				page: mbProfessionalState.meta.current_page
			})
		}
	}

	const getMbProfessional = async (
		params?: GetMbProfessorPostParam
	): Promise<MbProfessorOperationStatus> => {
		if (params) {
			if (params.search) mbProfessionalState.search = params.search
			if (params.type) mbProfessionalState.type = params.type
		}

		const currentPage = mbProfessionalState.meta.current_page

		let operationStatus: MbProfessorOperationStatus

		// `res` is not always follow the shape
		// `res` could be { message: string } for example.
		const res = await getMbProfessionalPostAPI(params || { page: currentPage })
		operationStatus = res

		// If res has expected shape
		if (res.data) {
			const data = res.data
			const meta = res.meta

			// If data of fetched page is empty
			if (meta!.current_page >= 2 && data.length === 0) {
				const newResponse = await getMbProfessionalPostAPI({
					search: mbProfessionalState.search,
					type: mbProfessionalState.type,
					page: currentPage - 1
				})
				operationStatus = newResponse

				if (newResponse.data) {
					mbProfessionalState.data = newResponse.data
					mbProfessionalState.meta = newResponse.meta!
				}
			} else {
				mbProfessionalState.data = data
				mbProfessionalState.meta = meta!
			}
		} else {
			mbProfessionalState.data = []
			mbProfessionalState.meta = { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 }
		}

		return operationStatus
	}

	const createMbProfessionalPost = async (payload: FormData) => {
		return await createMbProfessionalPostAPI(payload)
	}

	const updateMbProfessionalPost = async (payload: FormData, id: number) => {
		return await updateMbProfessionalAPI(payload, id)
	}

	const deleteMbProfessionalPost = async (id: number) => {
		return await deleteMbProfessionalAPI(id)
	}

	return {
		getMbProfessional,
		createMbProfessionalPost,
		updateMbProfessionalPost,
		deleteMbProfessionalPost,
		mbProfessionalState,
		previousPage,
		nextPage
	}
})
