<template>
	<ul v-if="pending" class="flex flex-col w-full gap-3 list-none animate-pulse">
		<li v-for="n in 3" :key="n">
			<ArticleSmallCardSkeleton />
		</li>
	</ul>

	<ul v-else class="flex flex-col w-full gap-3 list-none">
		<li v-for="article in articles" :key="article.id" class="text-black">
			<ArticleSmallCard
				:article="article"
				:article-path-without-slug="pathToArticleDetail"
				meta-items-class-name="text-gray-500"
			/>
		</li>
	</ul>
</template>

<script setup lang="ts">
import type { Post } from '~~/api/type'
import { useSuggestedArticleStore } from '~~/store/customer/suggested-article'

const { saveArticlesIntoStore } = useSuggestedArticleStore()

const { fetchURL } = defineProps<{
	pathToArticleDetail: string
	fetchURL: string
}>()

const articles = ref<Post[]>([])
const { path } = useRoute()

const { pending, data: res } = useLazyFetch<{ data: Post[] }>(fetchURL, {
	baseURL: useBaseUrl(),
	server: false,
	params: {
		essential: true
	}
})

watch(res, newRes => {
	if (newRes?.data) {
		articles.value = newRes.data.filter(
			// Exclude current article from suggested articles
			article => !path.endsWith(article.slug_en) || !path.endsWith(article.slug_kh)
		)

		saveArticlesIntoStore(fetchURL, newRes.data)
	}
})
</script>
