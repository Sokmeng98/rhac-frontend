import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import { multipartFormDataHeader } from '.'
import type { PaginationMeta } from '.'

export type mbPDFResponse = {
	pdf: string
	id: number
	created_at?: string
	updated_at?: string
}

type OperationStatus = {
	status?: number
	success: boolean
	message: string
	data?: mbPDFResponse[]
	meta?: PaginationMeta
}

export const getMbPDFAPI = async (page: number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: mbPDFResponse[]; meta: PaginationMeta }>(`/mb_pdf?page=${page}`)
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

export const addMbPDFAPI = async (payload: FormData) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/mb_pdf`, payload, {
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

export const deleteMbPDFAPI = async (id: number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/mb_pdf/${id}`)
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
