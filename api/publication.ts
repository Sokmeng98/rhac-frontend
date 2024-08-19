import type { PDFResponse } from './type'
import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import { multipartFormDataHeader } from '.'
import type { PaginationMeta } from '.'

type OperationStatus = {
	status?: number
	success: boolean
	message: string
	data?: PDFResponse[]
	meta?: PaginationMeta
}

export const getPublicationPDFAPI = async (page: number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: PDFResponse[]; meta: PaginationMeta }>(`/publication?page=${page}`)
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

export const addPublicationPDFAPI = async (payload: FormData) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/publication`, payload, {
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

export const updatePublicationPDFAPI = async (id: number, payload: FormData) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/publication/${id}`, payload, {
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

			if (error.response?.status === 409) operationStatus.message = 'Cannot udpate PDF'
		})

	return operationStatus
}

export const deletePublicationPDFAPI = async (id: number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/publication/${id}`)
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
