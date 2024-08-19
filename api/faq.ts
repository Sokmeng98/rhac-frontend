import type { QAndAForm } from './type'
import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import type { PaginationMeta } from '.'
import { instance } from '@/composables/axios'

export type Faq = {
	id: number
	question_kh: string
	question_en: string
	answer_kh: string
	answer_en: string
	type: string
	created_at: string
	updated_at: string
}

export type GetFaqResponse = {
	data: Faq[]
	meta: PaginationMeta
	links: Record<string, any>
}

export type FaqOperationStatus = {
	status?: number
	success: boolean
	message: string
	data?: Faq[]
	meta?: PaginationMeta
}

export type GetFaqParams = {
	search?: string
	type?: string
	page: number
	limit?: number
}

export const getFaqsAPI = async (params: GetFaqParams) => {
	let operationStatus: FaqOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<GetFaqResponse>('/faq', {
			params
		})
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Get FAQ successfully',
					success: true,
					data: res.data,
					meta: res.meta
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}

export const createFaqAPI = async (payload: QAndAForm) => {
	let operationStatus: FaqOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post<{ data: Faq[] }>(`/faq`, payload, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(({ status, data: res }) => {
			if (status === 201) {
				operationStatus = {
					message: 'FAQ created successfully',
					success: true,
					data: res.data
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}

export const updateFaqAPI = async (id: number, payload: Partial<QAndAForm>) => {
	let operationStatus: FaqOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.put<{ data: Faq[] }>(`/faq/${id}`, payload, {
			headers: { 'Content-Type': 'application/json' }
		})
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					message: 'FAQ updated successfully',
					success: true,
					data: res.data
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}

export const deleteFaqAPI = async (id: number) => {
	let operationStatus: FaqOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/faq/${id}`)
		.then(({ status }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Question deleted successfully',
					success: true
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}
