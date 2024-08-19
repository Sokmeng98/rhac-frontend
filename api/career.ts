import type { Post } from './type'
import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import { multipartFormDataHeader } from '.'
import type { PaginationMeta } from '.'

export type GetCareerParams = {
	search?: string
	subType?: string
	page?: number
	limit?: number
}

export type CareerOperationStatus = {
	status?: number
	success: boolean
	message: string
	data?: Post[]
	meta?: PaginationMeta
}

const constructRequestUrl = (params?: GetCareerParams) => {
	let url = `/post?type=career-and-opportunity&limit=10`
	if (params?.search) url += `&search=${params.search}`
	if (params?.subType) url += `&subtype=${params.subType}`
	if (params?.page) url += `&page=${params.page}`
	if (params?.limit) url += `&limit=${params.limit}`

	return url
}

export const getCareerAPI = async (params?: GetCareerParams) => {
	let operationStatus: CareerOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: Post[]; meta: PaginationMeta; link: any }>(constructRequestUrl(params))
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

export const createCareerAPI = async (payload: FormData) => {
	let operationStatus: CareerOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/post`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Career created  successfully',
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

export const deleteCareerAPI = async (id: number) => {
	let operationStatus: CareerOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/post/${id}`, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Career deleted successfully',
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

export const updateCareerAPI = async (payload: FormData, id: number) => {
	let operationStatus: CareerOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/post/${id}`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Career updated successfully',
					status,
					data: res.data,
					meta: res.meta
				}

				if (res.message === 'No Data Change') {
					operationStatus.message = 'No Data Change'
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
