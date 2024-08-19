<template>
	<div class="py-8 overflow-hidden">
		<ArticleList
			:is-loading-more-post="isLoadingMoreVideo"
			:load-more="loadMore"
			:is-more-page-available="isMorePageAvailable"
			:error="Boolean(error)"
			:pending="pending"
		>
			<li
				v-for="video in videos"
				:key="video.id"
				class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2 shadow-lg rounded-lg overflow-hidden"
			>
				<ArticleLargeCard :post="video" post-detail-path="/method-bank/student/" />
			</li>
		</ArticleList>
	</div>
</template>

<script setup lang="ts">
import type { VideoEducation } from '~/api/type'

defineProps<{
	pending: boolean
	error: any
	isLoadingMoreVideo: boolean
	isMorePageAvailable: boolean
	loadMore: () => void
	videos: VideoEducation[]
}>()
</script>
