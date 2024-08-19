import type { AxiosError } from 'axios'
import type { Post } from './type'
import type { PaginationMeta } from '.'
import { multipartFormDataHeader } from '.'

export type ExtendedAxiosError = AxiosError<{
	message?: string
}>

export const getErrorMessage = (error: ExtendedAxiosError) => {
	return error.response?.data.message || error.message || 'Something went wrong!'
}

export type GetArticleParams = {
	search?: string
	type?: string
	page?: number
	limit?: number
}

type OperationStatus = {
	status?: number
	success: boolean
	message: string
	data?: Post[]
	meta?: PaginationMeta
}

export const getArticleAPI = async (params?: GetArticleParams) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: Post[]; meta: PaginationMeta; link: any }>(
			'post_admin?limit=10&except=career-and-opportunity',
			{
				params
			}
		)
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

export const getArticleBySlugAPI = async (slug: string) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: Post[]; meta: PaginationMeta; link: any }>(`post_admin/${slug}`)
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

export const createArticleAPI = async (payload: FormData) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/post`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Article created successfully',
					status
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

export const deleteArticleAPI = async (id: number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/post/${id}`, {
			headers: multipartFormDataHeader
		})
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Article deleted successfully',
					status
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

export const updateArticleAPI = async (payload: FormData, id: number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/post/${id}`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Article updated successfully',
					status
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
