import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import { multipartFormDataHeader } from '.'
import type { PaginationMeta } from '.'

export type Img = {
	id: number
	img: string
	created_at?: string
	updated_at?: string
}

type OperationStatus<T = Img | Img[]> = {
	status?: number
	success: boolean
	message: string
	data?: T
	meta?: PaginationMeta
}

export const getSliderAPI = async () => {
	let operationStatus: OperationStatus<Img[]> = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: Img[]; meta: PaginationMeta; link: any }>('/slider')
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

export const createSliderAPI = async (payload: FormData) => {
	let operationStatus: OperationStatus<Img> = {
		message: '',
		success: false
	}

	await instance()
		.post<{ data: Img }>(`/slider`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Image uploaded successfully',
					data: res.data,
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

export const deleteSlider = async (id: number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/slider/${id}`, {
			headers: multipartFormDataHeader
		})
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Image deleted successfully',
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
