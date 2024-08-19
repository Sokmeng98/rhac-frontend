import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { addPDFAPI, getPDFAPI, deletePDFAPI, updatePDFAPI } from '@/api'
import type { PaginationMeta, GetAPIParams } from '@/api'
import type { PDFResponse } from '~/api/type'

type MbPDF = {
	data: PDFResponse[]
	meta: PaginationMeta
	type: string
}

export const useLearningCategoriesStore = defineStore('learning-categories-store', () => {
	const PDFState = reactive<MbPDF>({
		data: [],
		meta: { current_page: 1, from: 0, to: 0, last_page: 0, total: 0 },
		type: ''
	})

	const nextPage = async () => {
		if (PDFState.meta.current_page < PDFState.meta.last_page) {
			PDFState.meta.current_page += 1
			await getPDF({ page: PDFState.meta.current_page, type: PDFState.type })
		}
	}

	const previousPage = async () => {
		if (PDFState.meta.current_page > 1) {
			PDFState.meta.current_page -= 1
			await getPDF({ page: PDFState.meta.current_page, type: PDFState.type })
		}
	}

	const getPDF = async (params: GetAPIParams) => {
		const currentPage = PDFState.meta.current_page

		if (!params.type) params.type = PDFState.type

		let operationStatus: Awaited<ReturnType<typeof getPDFAPI>> = {
			success: false,
			message: ''
		}

		const res = await getPDFAPI({ page: currentPage, type: PDFState.type })
		operationStatus = res

		if (res.success && res.meta && res.data) {
			// If fetched page is empty
			if (res.meta?.current_page >= 2 && res.data?.length === 0) {
				const newResponse = await getPDFAPI({ page: currentPage - 1, type: PDFState.type })
				operationStatus = newResponse

				if (newResponse.success && newResponse.data && newResponse.meta) {
					PDFState.data = newResponse.data
					PDFState.meta = newResponse.meta
				}
			} else {
				PDFState.data = res.data
				PDFState.meta = res.meta
			}
		} else {
			PDFState.data = []
			PDFState.meta = { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 }
		}

		return operationStatus
	}

	const addPDF = async (payload: FormData) => {
		return await addPDFAPI(payload)
	}

	const updatePDF = async (id: number, payload: FormData) => {
		return await updatePDFAPI(id, payload)
	}

	const deletePDF = async (id: number) => {
		return await deletePDFAPI(id)
	}

	return {
		PDFState,
		getPDF,
		addPDF,
		updatePDF,
		deletePDF,
		nextPage,
		previousPage
	}
})
