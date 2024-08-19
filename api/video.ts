import type { VideoForm, VideoEducation } from './type'
import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import type { PaginationMeta } from '.'
import { instance } from '@/composables/axios'

export type VideoOperationStatus = {
	status?: number
	success: boolean
	message: string
	data?: VideoEducation[]
	meta?: PaginationMeta
}

export const getVideoAPI = async (page: number) => {
	let operationStatus: VideoOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: VideoEducation[]; meta: PaginationMeta; link: any }>(`/video?limit=9&page=${page}`)
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					success: true,
					message: 'Get video successfully',
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

export const createVideoAPI = async (payload: VideoForm) => {
	let operationStatus: VideoOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post<{ data: VideoEducation[]; meta: PaginationMeta; link: any }>(`/video`, payload, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(({ status, data: res }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Video created successfully',
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

export const updateVideoAPI = async (id: number, payload: Partial<VideoForm>) => {
	let operationStatus: VideoOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.put<{ data: VideoEducation[] }>(`/video/${id}`, payload, {
			headers: { 'Content-Type': 'application/json' }
		})
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Video updated successfully',
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

export const deleteVideoAPI = async (id: number) => {
	let operationStatus: VideoOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/video/${id}`)
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Video deleted successfully',
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
