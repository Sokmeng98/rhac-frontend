import { defineStore } from 'pinia'
import type { Post } from '~/api/type'

export const useSuggestedArticleStore = defineStore('suggested-articles-store', () => {
	const articles: Record<string, Post[]> = {}

	const getArticlesFromStore = (key: string) => articles[key]
	const saveArticlesIntoStore = (key: string, value: Post[]) => (articles[key] = value)

	return { getArticlesFromStore, saveArticlesIntoStore }
})
