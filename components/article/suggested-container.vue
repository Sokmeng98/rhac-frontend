<template>
	<section class="flex flex-col w-full gap-3">
		<ArticleSidebarHeader>{{ heading ? heading : $t('other_articles') }}</ArticleSidebarHeader>

		<ul v-if="articles?.length" class="flex flex-col w-full gap-3 list-none">
			<li v-for="article in articles" :key="article.id">
				<ArticleSmallCard :article="article" :article-path-without-slug="pathToArticleDetail" />
			</li>
		</ul>

		<template v-else>
			<ArticleSuggested :fetch-u-r-l="fetchURL" :path-to-article-detail="pathToArticleDetail" />
		</template>
	</section>
</template>

<script setup lang="ts">
import { useSuggestedArticleStore } from '~/store/customer/suggested-article'

const { fetchURL } = defineProps<{
	heading?: string
	pathToArticleDetail: string
	fetchURL: string
}>()

const { path } = useRoute()
const { getArticlesFromStore } = useSuggestedArticleStore()

const articles = getArticlesFromStore(fetchURL)?.filter(
	// Exclude current article from suggested articles
	article => !path.endsWith(article.slug_en) || !path.endsWith(article.slug_kh)
)
</script>
