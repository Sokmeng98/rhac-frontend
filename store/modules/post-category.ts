import { defineStore } from 'pinia'
import { reactive } from 'vue'
import {
	GetPostCategoryAPI,
	CreatePostCategoryAPI,
	deleteMBCategoryAPI,
	UpdatePostCategoryAPI
} from '../../api'
import { CategoryState } from '~~/api/type'

export const postcategoryStore = defineStore('postcategory-store', () => {
	const stateCategory: CategoryState = reactive({
		category: {
			data: [],
			meta: { current_page: 0, from: 0, last_page: 0, total: 0 }
		},
		totalJob: 0,
		getCategoryLoading: false,
		createCategoryLoading: false
	})

	const getCategory = async () => {
		await GetPostCategoryAPI()
			.then(res => {
				stateCategory.category = res
			})
			.catch(() => {})
	}

	const createCategory = async (payload: FormData) => {
		return await CreatePostCategoryAPI(payload)
	}

	const deleteCategory = async (id: number) => {
		return await deleteMBCategoryAPI(id)
	}

	const updateCategory = async (payload: FormData, id: number) => {
		return await UpdatePostCategoryAPI(payload, id)
	}

	const getJob = async () => {
		await GetPostCategoryAPI()
			.then(res => {
				stateCategory.totalJob = res.data.filter(
					(item: any) => item.id === 6
				)[0].post__categories.length
			})
			.catch(() => {})
	}

	return { getCategory, createCategory, deleteCategory, updateCategory, getJob, stateCategory }
})
