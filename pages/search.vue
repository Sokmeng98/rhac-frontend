<template>
	<div class="container px-6 lg:px-0">
		<div class="container">
			<div class="flex flex-col w-full gap-4 pt-8 lg:w-1/2">
				<div class="">
					<SearchBar
						:pending="isLoadingSearchResult"
						:on-search="handleSearch"
						:initial-search-value="searchQuery as string"
					/>
				</div>

				<div class="w-full sm:w-56">
					<CategorySelect :categories="categories" @change="onOptionChange" />
				</div>
			</div>

			<div class="w-full mt-10">
				<ArticleList
					:is-loading-more-post="isLoadingMorePost"
					:is-more-page-available="isMorePageAvailable && posts.length > 0"
					:load-more="loadMore"
					:pending="isLoadingSearchResult"
					:error="posts.length === 0 && !isLoadingSearchResult"
				>
					<li
						v-for="post in posts"
						:key="post.id"
						class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2 shadow-lg rounded-lg overflow-hidden"
					>
						<ArticleLargeCard :post="post" post-detail-path="/" display-read-more-button />
					</li>
				</ArticleList>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Post, PostCategory, VideoEducation } from '~/api/type'
import { useBaseUrl } from '~/composables'

definePageMeta({
	layout: 'customer'
})

const posts = ref<(Post | VideoEducation)[]>([])
const categories = ref<PostCategory[]>([])
const isLoadingSearchResult = ref(false)

const { getPosts, isLoadingMorePost, isMorePageAvailable } = useMorePost()
const baseURL = useBaseUrl()
const {
	query: { q: searchQuery }
} = useRoute()

const requestParams = {
	search: searchQuery as unknown as string,
	type: '',
	subtype: '',
	essential: true,
	limit: 11,
	page: 1
}

// Fetch category
const { data: categoryRes } = await useLazyFetch<{ data: PostCategory[] }>(`/post_category`, {
	baseURL,
	server: false
})

watch(categoryRes, newCategoryRes => {
	if (newCategoryRes?.data) {
		categories.value = newCategoryRes.data
	}
})

// Fetch posts
const initialPostList = await getPosts(requestParams)
posts.value = initialPostList

const onOptionChange = async (id: string) => {
	// reset page
	requestParams.page = 1

	const selectedCategory = categories.value.find(item => item.id === Number(id))

	requestParams.type = selectedCategory ? selectedCategory.slug_en || selectedCategory.slug_kh : ''

	isLoadingSearchResult.value = true
	const postList = await getPosts(requestParams)
	isLoadingSearchResult.value = false

	posts.value = postList
}

const loadMore = async () => {
	requestParams.page += 1

	const postList = await getPosts(requestParams)

	postList.length && (posts.value = posts.value.concat(postList))
}

const handleSearch = async (query: string) => {
	requestParams.search = query
	requestParams.page = 1

	isLoadingSearchResult.value = true
	const postList = await getPosts(requestParams)
	isLoadingSearchResult.value = false

	posts.value = postList
}

useSchemaOrg([
	defineWebPage({
		'@type': ['CollectionPage', 'SearchResultsPage']
	})
])
</script>
