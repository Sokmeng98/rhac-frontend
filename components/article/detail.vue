<template>
	<div class="container relative w-full h-full">
		<main class="container relative grid-cols-3 gap-10 px-4 my-12 lg:grid lg:px-0">
			<article class="flex flex-col col-span-2 gap-6 pb-6">
				<ArticleDetailDescription :post="post" />
				<ArticleContent :post="post" />

				<ArticlePdfSection v-if="post.pdf" :pdf="post.pdf" />

				<address>{{ $t('article_by') }}: {{ post.author }}</address>

				<LazyHowToApply v-if="isJob" />

				<CommentSection :post-id="post.id" post-type="post" />
			</article>

			<slot></slot>
		</main>
	</div>
</template>

<script setup lang="ts">
import type { Post } from '~/api/type'

const { post } = defineProps<{
	post: Post
}>()

const isJob = computed(() => {
	const category = post.post__categories?.find(cat => {
		const isIncludeJobRelatedWord =
			cat.name_en.toLocaleLowerCase().includes('job') ||
			cat.name_en.toLocaleLowerCase().includes('opportunity') ||
			cat.name_en.toLocaleLowerCase().includes('career')

		return isIncludeJobRelatedWord
	})

	if (category) {
		return true
	}

	return false
})
</script>
