import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getMbPDFAPI, addMbPDFAPI, deleteMbPDFAPI, type PaginationMeta } from '@/api'

export type mbPDFResponse = {
	pdf: string
	id: number
	created_at?: string
	updated_at?: string
}

export type MbPDF = {
	data: mbPDFResponse[]
	meta: PaginationMeta
}

export const useMbPDFStore = defineStore('mb-pdf-store', () => {
	const mbPDFState = reactive<MbPDF>({
		data: [],
		meta: { current_page: 1, from: 0, to: 0, last_page: 0, total: 0 }
	})

	const nextPage = async () => {
		if (mbPDFState.meta.current_page < mbPDFState.meta.last_page) {
			mbPDFState.meta.current_page += 1
			await getPDF()
		}
	}

	const previousPage = async () => {
		if (mbPDFState.meta.current_page > 1) {
			mbPDFState.meta.current_page -= 1
			await getPDF()
		}
	}

	const getPDF = async () => {
		const currentPage = mbPDFState.meta.current_page

		let operationStatus: Awaited<ReturnType<typeof getMbPDFAPI>> = {
			success: false,
			message: ''
		}

		const res = await getMbPDFAPI(currentPage)
		operationStatus = res

		if (res.success && res.meta && res.data) {
			// If fetched page is empty
			if (res.meta?.current_page >= 2 && res.data?.length === 0) {
				const newResponse = await getMbPDFAPI(currentPage - 1)
				operationStatus = newResponse

				if (newResponse.success && newResponse.data && newResponse.meta) {
					mbPDFState.data = newResponse.data
					mbPDFState.meta = newResponse.meta
				}
			} else {
				mbPDFState.data = res.data
				mbPDFState.meta = res.meta
			}
		} else {
			mbPDFState.data = []
			mbPDFState.meta = { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 }
		}

		return operationStatus
	}

	const addPDF = async (payload: FormData) => {
		return await addMbPDFAPI(payload)
	}

	const deletePDF = async (id: number) => {
		return await deleteMbPDFAPI(id)
	}

	return {
		mbPDFState,
		getPDF,
		addPDF,
		deletePDF,
		nextPage,
		previousPage
	}
})
