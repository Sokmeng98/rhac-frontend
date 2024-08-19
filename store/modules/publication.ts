import { defineStore } from 'pinia'
import { reactive } from 'vue'
import {
	getPublicationPDFAPI,
	addPublicationPDFAPI,
	updatePublicationPDFAPI,
	deletePublicationPDFAPI,
	type PaginationMeta
} from '../../api'
import type { PDFResponse } from '~/api/type'

type MbPDF = {
	data: PDFResponse[]
	meta: PaginationMeta
}

export const usePublicationStore = defineStore('publication-store', () => {
	const PDFState = reactive<MbPDF>({
		data: [],
		meta: { current_page: 1, from: 0, to: 0, last_page: 0, total: 0 }
	})

	const nextPage = async () => {
		if (PDFState.meta.current_page < PDFState.meta.last_page) {
			PDFState.meta.current_page += 1
			await getPDF()
		}
	}

	const previousPage = async () => {
		if (PDFState.meta.current_page > 1) {
			PDFState.meta.current_page -= 1
			await getPDF()
		}
	}

	const getPDF = async () => {
		const currentPage = PDFState.meta.current_page

		let operationStatus: Awaited<ReturnType<typeof getPublicationPDFAPI>> = {
			success: false,
			message: ''
		}

		const res = await getPublicationPDFAPI(currentPage)
		operationStatus = res

		if (res.success && res.meta && res.data) {
			// If fetched page is empty
			if (res.meta?.current_page >= 2 && res.data?.length === 0) {
				const newResponse = await getPublicationPDFAPI(currentPage - 1)
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
		return await addPublicationPDFAPI(payload)
	}

	const updatePDF = async (id: number, payload: FormData) => {
		return await updatePublicationPDFAPI(id, payload)
	}

	const deletePDF = async (id: number) => {
		return await deletePublicationPDFAPI(id)
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
