<template>
	<Head v-if="post">
		<Meta name="author" :content="post.author"></Meta>
		<Meta name="description" :content="post.title_kh + ' ' + post.title_en"></Meta>
	</Head>

	<ArticleDetail v-if="post" :post="post">
		<ArticleSideBar>
			<ArticleSuggestedContainer
				:heading="$t('recent_events')"
				fetch-u-r-l="/post?type=training-%26-event&limit=4"
				path-to-article-detail="/about-rhac/events/"
			/>

			<ArticleOurWorkSection />
		</ArticleSideBar>
	</ArticleDetail>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '~~/api'
import type { Post } from '~~/api/type'

definePageMeta({
	layout: 'customer'
})

const {
	params: { slug }
} = useRoute()

const post = ref<Post>()

const baseURL = useBaseUrl()

const { data: postData, error } = await useFetch<{
	data: Post[]
	meta: PaginationMeta
}>(`/post/${slug}`, {
	baseURL
})

if (error.value) {
	throw showError({ statusCode: 404, statusMessage: 'Page not found' })
}

if (postData.value) {
	post.value = postData.value.data[0]
}

useBlogPostSchemaOrg(post.value)
</script>
