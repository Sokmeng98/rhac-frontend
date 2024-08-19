<template>
	<div class="container px-6 my-10">
		<div class="container">
			<div class="flex flex-col gap-3 my-5">
				<div class="w-56 h-12 rounded-lg">
					<CategorySelect
						:categories="categories"
						default-text="All grade"
						@change="onCategoryChange"
					/>
				</div>
			</div>

			<h2 class="relative font-bold text-2xl lg:text-[2.5rem] py-4 text-primary">
				{{ $t('all_articles') }}
			</h2>

			<ArticleList
				:is-loading-more-post="isLoadingMorePost"
				:is-more-page-available="isMorePageAvailable"
				:pending="pending"
				:error="Boolean(error)"
			>
				<li
					v-for="article in articles"
					:key="article.id"
					class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2 shadow-lg rounded-lg overflow-hidden"
				>
					<ArticleLargeCard
						:post="article"
						post-detail-path="/method-bank/educator/"
						display-read-more-button
					/>
				</li>
			</ArticleList>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '~/api'
import type { Post, PostCategory } from '~~/api/type'

definePageMeta({
	layout: 'customer'
})

const articles = ref<Post[]>()

const categories = ref<(Omit<PostCategory, 'id'> & { id: string })[]>([
	{
		id: 'Grade 5&6',
		name: 'Grade 5&6',
		name_en: 'Grade 5&6',
		slug_kh: 'Grade 5&6',
		slug_en: 'Grade 5&6',
		post__subcategories: []
	},

	{
		id: 'Grade 7-9',
		name: 'Grade 7-9',
		name_en: 'Grade 7-9',
		slug_kh: 'Grade 7-9',
		slug_en: 'Grade 7-9',
		post__subcategories: []
	},

	{
		id: 'Grade 10-12',
		name: 'Grade 10-12',
		name_en: 'Grade 10-12',
		slug_kh: 'Grade 10-12',
		slug_en: 'Grade 10-12',
		post__subcategories: []
	}
])

const requestParams: {
	limit: number
	page: number
	type: string | undefined
} = {
	limit: 11,
	page: 1,
	type: undefined
}

const { getPosts, isLoadingMorePost, isMorePageAvailable } = useMoreMBPost('mb_professional')

const {
	data: res,
	pending,
	error
} = useLazyFetch<{ data: Post[]; meta: PaginationMeta }>('/mb_professional', {
	baseURL: useBaseUrl(),
	params: requestParams,
	server: false
})

watch(res, newRes => {
	if (newRes?.data) {
		articles.value = newRes.data
	}

	if (newRes?.meta) {
		isMorePageAvailable.value = newRes.meta?.current_page < newRes.meta?.last_page
	}

	// @ts-ignore
	if (newRes?.last_page && newRes?.current_page) {
		// @ts-ignore
		isMorePageAvailable.value = newRes.current_page < newRes.last_page
	}
})

const onCategoryChange = async (category: string) => {
	requestParams.page = 1

	if (category !== '') requestParams.type = category
	else requestParams.type = undefined

	const postList = await getPosts(requestParams)

	articles.value = postList
}
</script>
