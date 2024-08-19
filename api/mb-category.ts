import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import { multipartFormDataHeader } from '.'
import type { PaginationMeta } from '.'
import type { MBCategory } from '~/api/type'

export type OperationStatus = {
	status?: number
	success: boolean
	message: string
	data?: MBCategory[]
	meta?: PaginationMeta
}

const constructRequestUrl = (page?: number) => {
	let url = '/method_bank_category?limit'
	if (page) {
		url += `&page=${page}`
	}

	return url
}

export const getMBCategoryAPI = async (page?: number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: MBCategory[]; meta: PaginationMeta; links: any }>(constructRequestUrl(page))
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Get category successfully',
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

export const createMBCategoryAPI = async (payload: FormData) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/method_bank_category`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status === 200 || status === 201) {
				operationStatus = {
					message: 'Category created successfully',
					success: true,
					data: res.data,
					meta: res.meta,
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

export const deleteMBCategoryAPI = async (id: number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/method_bank_category/${id}`, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Category delete successfully',
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

export type MBCategoryUpdatePayload = {
	name?: string
	name_en?: string
	img?: string
}

export const updateMBCategoryAPI = async (payload: FormData, id: number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/method_bank_category/${id}`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Category updated successfully',
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
