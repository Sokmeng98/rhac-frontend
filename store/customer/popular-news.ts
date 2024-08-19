import { defineStore } from 'pinia'
import type { Post } from '~/api/type'

export const usePopularNews = defineStore('customer-popular-news', () => {
	const news = ref<Post[]>([])
	const getNews = () => news.value
	const setNews = (list: Post[]) => (news.value = list)
	return { getNews, setNews }
})
