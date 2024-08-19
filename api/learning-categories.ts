import type { PDFResponse } from './type'
import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import type { PaginationMeta } from '.'
import { multipartFormDataHeader } from '.'

type OperationStatus = {
	status?: number
	success: boolean
	message: string
	data?: PDFResponse[]
	meta?: PaginationMeta
}

export type GetAPIParams = {
	// search?: string
	type?: string
	page: number
}

const constructRequestUrl = (params: GetAPIParams) => {
	let url = `/mb_professional_learning?limit=10`
	if (params.page) url += `&page=${params.page}`
	// if (params.search) url += `&search=${params.search}`
	if (params.type) url += `&type=${params.type}`

	return url
}

export const getPDFAPI = async (params: GetAPIParams) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: PDFResponse[]; meta: PaginationMeta }>(constructRequestUrl(params))
		.then(({ status, data: res }) => {
			if (status === 200) {
				if (res.data && res.meta) {
					operationStatus = {
						success: true,
						message: 'Get PDF successfully',
						data: res.data,
						meta: res.meta,
						status
					}
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				success: false,
				message: getErrorMessage(error)
			}
		})

	return operationStatus
}

export const addPDFAPI = async (payload: FormData) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/mb_professional_learning`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'PDF created successfully',
					data: res.data,
					status
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				success: false,
				message: getErrorMessage(error)
			}
		})

	return operationStatus
}

export const updatePDFAPI = async (id: number, payload: FormData) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/mb_professional_learning/${id}`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					message: 'PDF updated successfully',
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

			if (error.response?.status === 409) operationStatus.message = 'Cannot update PDF'
		})

	return operationStatus
}

export const deletePDFAPI = async (id: number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/mb_professional_learning/${id}`)
		.then(({ status }) => {
			if (status === 200) {
				operationStatus = {
					success: true,
					message: 'PDF deleted successfully',
					status
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				success: false,
				message: getErrorMessage(error)
			}
		})

	return operationStatus
}
