import { defineStore } from 'pinia'
import { reactive } from 'vue'
import {
	GetPostSubcategoryAPI,
	CreatePostSubcategoryAPI,
	DeletePostSubcategoryAPI,
	UpdatePostSubcategoryAPI
} from '../../api'
import { CategoryState } from '~~/api/type'

export const postsubcategoryStore = defineStore('postsubcategory-store', () => {
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
		await GetPostSubcategoryAPI()
			.then(res => {
				stateCategory.category = res
			})
			.catch(() => {})
	}

	const createCategory = async (payload: FormData) => {
		return await CreatePostSubcategoryAPI(payload)
	}

	const deleteCategory = async (id: number) => {
		return await DeletePostSubcategoryAPI(id)
	}

	const updateCategory = async (payload: FormData, id: number) => {
		return await UpdatePostSubcategoryAPI(payload, id)
	}

	const getJob = async () => {
		await GetPostSubcategoryAPI()
			.then(res => {
				stateCategory.totalJob = res.data.filter(
					(item: any) => item.id === 6
				)[0].post__subcategories.length
			})
			.catch(() => {})
	}

	return { getCategory, createCategory, deleteCategory, updateCategory, getJob, stateCategory }
})
