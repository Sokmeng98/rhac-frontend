import type { Post } from './type'
import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import { multipartFormDataHeader } from '.'
import type { PaginationMeta } from '.'

export type GetMbLearnerPostParam = {
	search?: string
	type?: string
	page?: number
	limit?: number
}

export type MbLearnerOperationStatus = {
	status?: number
	success: boolean
	message: string
	data?: Post[]
	meta?: PaginationMeta
}

const constructRequestUrl = (params?: GetMbLearnerPostParam) => {
	let url = `/mb_learner_admin?limit=10`
	if (params?.search) url += `&search=${params.search}`
	if (params?.type) url += `&type=${params.type}`
	if (params?.page) url += `&page=${params.page}`

	return url
}

export const getMbLearnerPostAPI = async (params?: GetMbLearnerPostParam) => {
	let operationStatus: MbLearnerOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: Post[]; meta: PaginationMeta; link: any }>(constructRequestUrl(params))
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Get article successfully',
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

export const getMbLearnerBySlugAPI = async (slug: string) => {
	let operationStatus: MbLearnerOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: Post[]; meta: PaginationMeta; link: any }>(`mb_learner/${slug}`)
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					success: true,
					message: 'Get article successfully',
					status,
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

export const createMbLearnerPostAPI = async (payload: FormData) => {
	let operationStatus: MbLearnerOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post<{ data: Post[] }>(`/mb_learner`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status === 201) {
				operationStatus = {
					message: 'Article created successfully',
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

export const updateMbLearnerPostAPI = async (payload: FormData, id: number) => {
	let operationStatus: MbLearnerOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post<{ data: Post[] }>(`/mb_learner/${id}`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Article updated successfully',
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

export const deleteMbLearnerPostAPI = async (id: number) => {
	let operationStatus: MbLearnerOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/mb_learner/${id}`, {
			headers: multipartFormDataHeader
		})
		.then(({ status }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Article deleted successfully',
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
