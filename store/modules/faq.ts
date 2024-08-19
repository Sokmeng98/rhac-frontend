import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { PaginationMeta } from '~/api'
import type { Faq, FaqOperationStatus, GetFaqParams } from '~/api/faq'
import { createFaqAPI, deleteFaqAPI, getFaqsAPI, updateFaqAPI } from '~/api/faq'
import type { QAndAForm } from '~~/api/type'

type FaqStore = {
	data: Faq[]
	meta: PaginationMeta
	type: string
	search: string
}

export const useFaqStore = defineStore('faq-store', () => {
	const faqState = reactive<FaqStore>({
		data: [],
		meta: { current_page: 1, from: 0, to: 0, last_page: 0, total: 0 },
		type: '',
		search: ''
	})

	const previousPage = async () => {
		if (faqState.meta.current_page > 1) {
			faqState.meta.current_page -= 1
			await getFaqs({
				page: faqState.meta.current_page,
				search: faqState.search,
				type: faqState.type
			})
		}
	}

	const nextPage = async () => {
		if (faqState.meta.current_page < faqState.meta.last_page) {
			faqState.meta.current_page += 1
			await getFaqs({
				page: faqState.meta.current_page,
				search: faqState.search,
				type: faqState.type
			})
		}
	}

	const getFaqs = async (params: GetFaqParams): Promise<FaqOperationStatus> => {
		const currentPage = faqState.meta.current_page
		let operationStatus: FaqOperationStatus

		if (!params.search) params.search = faqState.search
		if (!params.type) params.type = faqState.type

		const res = await getFaqsAPI({
			page: currentPage,
			search: faqState.search,
			type: faqState.type,
			limit: params.limit
		})

		operationStatus = res

		if (res.data) {
			const data = res.data
			const meta = res.meta

			// If the data of fetched page is empty
			if (meta!.current_page >= 2 && data.length === 0) {
				// Fetch pervious page
				const newResponse = await getFaqsAPI({
					page: currentPage - 1,
					search: faqState.search,
					type: faqState.type,
					limit: params.limit
				})
				operationStatus = newResponse

				if (newResponse.data) {
					faqState.data = newResponse.data
					faqState.meta = newResponse.meta!
				}
			} else {
				faqState.data = data
				faqState.meta = meta!
			}
		} else {
			faqState.data = []
			faqState.meta = { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 }
		}

		return operationStatus
	}

	const createFaq = async (payload: QAndAForm) => {
		return await createFaqAPI(payload)
	}

	const updateFaq = async (id: number, payload: QAndAForm) => {
		return await updateFaqAPI(id, payload)
	}

	const deleteFaq = async (id: number) => {
		return await deleteFaqAPI(id)
	}

	return {
		createFaq,
		updateFaq,
		deleteFaq,
		getFaqs,
		previousPage,
		nextPage,
		faqState
	}
})
