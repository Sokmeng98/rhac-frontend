<script setup lang="ts">
defineProps<{
	isMorePageAvailable: boolean
	isLoadingMorePost: boolean
	pending: boolean
	error: boolean
	loadMore: () => void
}>()
</script>

<template>
	<section>
		<ul
			v-if="pending"
			class="grid grid-cols-1 gap-4 list-none sm:grid-cols-2 lg:grid-cols-6 animate-pulse"
		>
			<li
				v-for="n in 11"
				:key="n"
				class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2"
			>
				<ArticleLargeCardSkeleton />
			</li>
		</ul>

		<ul v-else class="grid grid-cols-1 gap-4 list-none sm:grid-cols-2 lg:grid-cols-6 empty:hidden">
			<slot></slot>
		</ul>

		<LoadMoreButton v-if="isMorePageAvailable" :is-loading="isLoadingMorePost" @click="loadMore" />

		<ArticleNoResultMessage v-if="error" />
	</section>
</template>
