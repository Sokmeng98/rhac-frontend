import { defineStore } from 'pinia'
import { reactive } from 'vue'
import {
	CreatePostAPI,
	DeletePostAPI,
	UpdatePostAPI,
	GetPostAPI,
	GetPostByTypeAPI,
	type PaginationMeta
} from '@/api'
import type { PostState } from '~~/api/type'

export type CareerResponse = {
	title_en: string | null
	title_kh: string | null
	content_en: string | null
	content_kh: string | null
	imge: string | null
	id: number
	post__subcategories: { name: string; name_en: string }
	created_at?: string
	updated_at?: string
}

export type Career = {
	post: {
		data: CareerResponse[]
		meta: PaginationMeta
	}
}

export const postsStore = defineStore('posts-store', () => {
	const statePosts: PostState = reactive({
		posts: {
			data: [],
			meta: { current_page: 0, from: 0, last_page: 0, total: 0 }
		},
		getPostsLoading: false,
		createPostLoading: false
	})
	const postState = reactive<Career>({
		post: {
			data: [],
			meta: { current_page: 1, from: 0, to: 0, last_page: 0, total: 0 }
		}
	})

	const getPost = async () => {
		await GetPostAPI()
			.then(res => {
				statePosts.posts = res
			})
			.catch(() => {})
	}
	const getPostByType = async (type: string, page: number) => {
		const { data, meta } = await GetPostByTypeAPI(type, page)
		postState.post.data = data
		postState.post.meta = meta
	}
	const createPost = async (payload: FormData) => {
		return await CreatePostAPI(payload)
	}

	const deletePost = async (id: number) => {
		return await DeletePostAPI(id)
	}

	const updatePost = async (payload: FormData, id: number) => {
		return await UpdatePostAPI(payload, id)
	}

	return { createPost, deletePost, updatePost, getPost, getPostByType, postState, statePosts }
})
