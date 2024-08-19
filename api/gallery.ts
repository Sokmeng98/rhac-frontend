import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import { multipartFormDataHeader } from '.'
import type { PaginationMeta } from '.'

export type Gallery = {
	created_at: string
	id: number
	updated_at: string
	image: string
}

export type GalleryOperationStatus = {
	status?: number
	success: boolean
	message: string
	data?: Gallery[]
	meta?: PaginationMeta
}

export const getGalleryAPI = async (page: number) => {
	let operationStatus: GalleryOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: Gallery[]; meta: PaginationMeta; link: any }>(`/gallery?page=${page}`)
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					success: true,
					message: 'Get images successfully',
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

export const addGalleryImageAPI = async (payload: FormData) => {
	let operationStatus: GalleryOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post<{ data: Gallery[]; meta: PaginationMeta; link: any }>(`/gallery`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Images created successfully',
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

export const deleteGalleryImageAPI = async (id: number) => {
	let operationStatus: GalleryOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/gallery/${id}`)
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Images deleted successfully',
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
