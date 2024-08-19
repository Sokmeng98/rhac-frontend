import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { addGalleryImageAPI, deleteGalleryImageAPI, getGalleryAPI } from '../../api'
import type { PaginationMeta } from '../../api'
import type { IGalleryImageResponse } from '~/api/type'

type GalleryState = {
	data: IGalleryImageResponse[]
	meta: PaginationMeta
}

export const useGalleryStore = defineStore('gallery-store', () => {
	const galleryState = reactive<GalleryState>({
		data: [],
		meta: { current_page: 1, from: 0, to: 0, last_page: 0, total: 0 }
	})

	const nextPage = async () => {
		if (galleryState.meta.current_page < galleryState.meta.last_page) {
			galleryState.meta.current_page += 1
			await getGallery()
		}
	}

	const previousPage = async () => {
		if (galleryState.meta.current_page > 1) {
			galleryState.meta.current_page -= 1
			await getGallery()
		}
	}

	const jumpToPage = async (page: number) => {
		galleryState.meta.current_page = page
		await getGallery()
	}

	const getGallery = async () => {
		const currentPage = galleryState.meta.current_page

		let operationStatus: Awaited<ReturnType<typeof getGalleryAPI>> = {
			success: false,
			message: ''
		}

		const res = await getGalleryAPI(currentPage)
		operationStatus = res

		if (res.success) {
			if (res.data && res.meta) {
				if (res.meta.current_page >= 2 && res.data.length === 0) {
					// Get previous page data
					const newResponse = await getGalleryAPI(currentPage - 1)

					if (newResponse.success) {
						if (newResponse.data && newResponse.data.length && newResponse.meta) {
							galleryState.data = newResponse.data
							galleryState.meta = newResponse.meta
						}
					}

					// If the new request is made,
					// operation status would be the new one
					operationStatus = newResponse
				} else {
					galleryState.data = res.data
					galleryState.meta = res.meta
				}
			} else {
				galleryState.data = []
				galleryState.meta = { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 }
			}
		}

		return operationStatus
	}

	const addImage = async (payload: FormData) => {
		return await addGalleryImageAPI(payload)
	}

	const deleteImage = async (id: number) => {
		return await deleteGalleryImageAPI(id)
	}

	return {
		galleryState,
		addImage,
		getGallery,
		deleteImage,
		previousPage,
		nextPage,
		jumpToPage
	}
})
