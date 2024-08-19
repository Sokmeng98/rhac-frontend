<template>
	<div class="py-8 overflow-hidden">
		<ArticleList
			:is-loading-more-post="isLoadingMorePost"
			:load-more="loadMore"
			:is-more-page-available="isMorePageAvailable"
			:error="Boolean(error)"
			:pending="pending"
		>
			<li
				v-for="article in articles"
				:key="article.id"
				class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2 shadow-lg rounded-lg overflow-hidden"
			>
				<ArticleLargeCard
					:post="article"
					post-detail-path="/method-bank/student/"
					display-read-more-button
				/>
			</li>
		</ArticleList>
	</div>
</template>

<script setup lang="ts">
import type { Post } from '~~/api/type'

defineProps<{
	pending: boolean
	error: any
	isLoadingMorePost: boolean
	isMorePageAvailable: boolean
	loadMore: () => void
	articles: Post[]
}>()
</script>
