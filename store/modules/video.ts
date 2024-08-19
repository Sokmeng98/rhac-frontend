import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getVideoAPI, createVideoAPI, deleteVideoAPI, updateVideoAPI } from '~/api/video'
import type { VideoOperationStatus } from '~/api/video'
import type { PaginationMeta } from '~/api'
import type { VideoForm, VideoEducation } from '~~/api/type'

type VideoStore = {
	data: VideoEducation[]
	meta: PaginationMeta
}

export const useVideoStore = defineStore('video-store', () => {
	const videoState = reactive<VideoStore>({
		data: [],
		meta: { current_page: 1, from: 0, to: 0, last_page: 0, total: 0 }
	})

	const previousPage = async () => {
		if (videoState.meta.current_page > 1) {
			videoState.meta.current_page -= 1
			await getVideo()
		}
	}

	const nextPage = async () => {
		if (videoState.meta.current_page < videoState.meta.last_page) {
			videoState.meta.current_page += 1
			await getVideo()
		}
	}

	const jumpToPage = async (page: number) => {
		videoState.meta.current_page = page
		await getVideo()
	}

	const getVideo = async (): Promise<VideoOperationStatus> => {
		const currentPage = videoState.meta.current_page
		let operationStatus: VideoOperationStatus

		const res = await getVideoAPI(currentPage)
		operationStatus = res

		if (res.data) {
			const data = res.data
			const meta = res.meta

			// If the data of fetched page is empty
			if (meta!.current_page >= 2 && data.length === 0) {
				// Fetch pervious page
				const newResponse = await getVideoAPI(currentPage)
				operationStatus = newResponse

				if (newResponse.data) {
					videoState.data = newResponse.data
					videoState.meta = newResponse.meta!
				}
			} else {
				videoState.data = data
				videoState.meta = meta!
			}
		} else {
			videoState.data = []
			videoState.meta = { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 }
		}

		return operationStatus
	}

	const createVideo = async (payload: VideoForm) => {
		return await createVideoAPI(payload)
	}

	const updateVideo = async (id: number, payload: Partial<VideoForm>) => {
		return await updateVideoAPI(id, payload)
	}

	const deleteVideo = async (id: number) => {
		return await deleteVideoAPI(id)
	}

	return {
		createVideo,
		updateVideo,
		deleteVideo,
		getVideo,
		previousPage,
		nextPage,
		jumpToPage,
		videoState
	}
})
