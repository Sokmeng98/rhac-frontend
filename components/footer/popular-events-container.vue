<template>
	<ul v-if="news.length" class="flex flex-col gap-3 list-none">
		<li v-for="item in news" :key="item.id" class="text-[#C0C0C0]">
			<ArticleSmallCard :article="item" article-path-without-slug="/" />
		</li>
	</ul>

	<template v-else>
		<FooterPopularEvents />
	</template>
</template>

<script setup lang="ts">
import { usePopularNews } from '~/store/customer/popular-news'

const { getNews } = usePopularNews()

const news = getNews()
</script>
