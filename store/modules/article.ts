import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { PaginationMeta } from '~/api'
import { createArticleAPI, deleteArticleAPI, getArticleAPI, updateArticleAPI } from '~/api/article'
import type { GetArticleParams } from '~/api/article'
import type { Post } from '~/api/type'

export type ArticleStore = {
	data: Post[]
	meta: PaginationMeta
	type: string
	search: string
}

export const useArticleStore = defineStore('articles-store', () => {
	const articleState = reactive<ArticleStore>({
		data: [],
		meta: { current_page: 0, from: 0, to: 0, last_page: 0, total: 0 },
		type: '',
		search: ''
	})

	const previousPage = async () => {
		if (articleState.meta.current_page > 1) {
			articleState.meta.current_page -= 1
			await getArticle({
				search: articleState.search,
				type: articleState.type,
				page: articleState.meta.current_page
			})
		}
	}

	const nextPage = async () => {
		if (articleState.meta.current_page < articleState.meta.last_page) {
			articleState.meta.current_page += 1
			await getArticle({
				search: articleState.search,
				type: articleState.type,
				page: articleState.meta.current_page
			})
		}
	}

	const jumpToPage = async (page: number) => {
		articleState.meta.current_page = page
		await getArticle({
			search: articleState.search,
			type: articleState.type,
			page
		})
	}

	const getArticle = async (params?: GetArticleParams) => {
		if (params) {
			if (params.search) articleState.search = params.search
			if (params.type) articleState.type = params.type
		}

		const currentPage = articleState.meta.current_page

		let operationStatus: Awaited<ReturnType<typeof getArticleAPI>> = {
			success: false,
			message: ''
		}

		const res = await getArticleAPI(params || { page: currentPage })
		operationStatus = res

		if (res.success) {
			if (res.data && res.data.length && res.meta) {
				// If fetched page is empty
				if (res.meta.current_page >= 2 && res.data.length === 0) {
					// Get previous page data
					const newResponse = await getArticleAPI({
						search: articleState.search,
						type: articleState.type,
						page: currentPage - 1
					})

					if (newResponse.success) {
						if (newResponse.data && newResponse.data.length && newResponse.meta) {
							articleState.data = newResponse.data
							articleState.meta = newResponse.meta
						}
					}

					operationStatus = newResponse
				} else {
					articleState.data = res.data
					articleState.meta = res.meta
				}
			} else {
				articleState.data = []
				articleState.meta = { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 }
			}
		} else {
			articleState.data = []
			articleState.meta = { current_page: 1, from: 0, to: 0, last_page: 1, total: 0 }
		}

		return operationStatus
	}

	const createArticle = async (payload: FormData) => {
		return await createArticleAPI(payload)
	}

	const deleteArticle = async (id: number) => {
		return await deleteArticleAPI(id)
	}

	const updateArticle = async (payload: FormData, id: number) => {
		return await updateArticleAPI(payload, id)
	}

	return {
		articleState,
		getArticle,
		createArticle,
		deleteArticle,
		updateArticle,
		previousPage,
		nextPage,
		jumpToPage
	}
})
