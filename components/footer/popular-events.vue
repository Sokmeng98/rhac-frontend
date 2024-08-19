<template>
	<ul
		v-if="pending || error"
		class="flex flex-col gap-3 list-none"
		:class="error ? 'no-animation' : 'animate-pulse'"
	>
		<li v-for="n in 3" :key="n">
			<ArticleSmallCardSkeleton />
		</li>
	</ul>

	<ul v-else class="flex flex-col gap-3 list-none">
		<li v-for="item in res?.data" :key="item.id" class="text-[#C0C0C0]">
			<ArticleSmallCard :article="item" article-path-without-slug="/" />
		</li>
	</ul>
</template>

<script setup lang="ts">
import type { Post } from '~~/api/type'
const { setNews } = usePopularNews()

const {
	pending,
	error,
	data: res
} = useLazyFetch<{ data: Post[] }>('/post?type=news&limit=3&video_filter=all', {
	baseURL: useBaseUrl(),
	server: false
})

watch(res, newRes => newRes?.data && setNews(newRes?.data))
</script>
