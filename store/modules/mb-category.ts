import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { PaginationMeta } from '~/api'
import {
	createMBCategoryAPI,
	deleteMBCategoryAPI,
	getMBCategoryAPI,
	updateMBCategoryAPI
} from '~/api'
import type { MBCategory } from '~/api/type'

type CategoryState = {
	data: MBCategory[]
	meta: PaginationMeta
}

export const useMbCategoryStore = defineStore('mb-category-store', () => {
	const categoryState = reactive<CategoryState>({
		data: [],
		meta: { current_page: 0, from: 0, to: 0, last_page: 0, total: 0 }
	})

	const previousPage = async () => {
		if (categoryState.meta.current_page > 1) {
			categoryState.meta.current_page -= 1
			await getCategory()
		}
	}

	const nextPage = async () => {
		if (categoryState.meta.current_page < categoryState.meta.last_page) {
			categoryState.meta.current_page += 1
			await getCategory()
		}
	}

	const getCategory = async () => {
		const res = await getMBCategoryAPI(categoryState.meta.current_page)
		if (res.success && res.data && res.meta) {
			categoryState.data = res.data
			categoryState.meta = res.meta
		} else {
			categoryState.data = []
			categoryState.meta = { current_page: 0, from: 0, to: 0, last_page: 0, total: 0 }
		}

		return res
	}

	const createCategory = async (payload: FormData) => {
		return await createMBCategoryAPI(payload)
	}

	const deleteCategory = async (id: number) => {
		return await deleteMBCategoryAPI(id)
	}

	const updateCategory = async (payload: FormData, id: number) => {
		return await updateMBCategoryAPI(payload, id)
	}

	return {
		getCategory,
		createCategory,
		deleteCategory,
		updateCategory,
		categoryState,
		previousPage,
		nextPage
	}
})
