<template>
	<Head v-if="post">
		<Meta name="author" :content="post.author"></Meta>
		<Meta name="description" :content="post.title_kh + ' ' + post.title_en"></Meta>
	</Head>

	<ArticleDetail v-if="post" :post="post">
		<ArticleSideBar
			:has-event-section="true"
			:has-other-article-section="true"
			:has-our-works-section="true"
			:has-rhac-services-section="false"
		/>
	</ArticleDetail>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '~/api'
import type { Post } from '~/api/type'

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
