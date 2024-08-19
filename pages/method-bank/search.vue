<template>
	<div class="container flex flex-col px-6">
		<div class="container w-full pt-8">
			<div class="w-full lg:w-1/2">
				<SearchBar
					:pending="isLoadingSearchResult"
					:on-search="handleSearch"
					:initial-search-value="searchQuery as string"
				/>
			</div>
		</div>

		<div class="container w-full my-6">
			<ArticleList
				:is-loading-more-post="isLoadingMorePost"
				:is-more-page-available="isMorePageAvailable"
				:load-more="loadMore"
				:pending="isLoadingSearchResult"
				:error="posts.length === 0"
			>
				<li
					v-for="post in posts"
					:key="post.id"
					class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2 shadow-lg rounded-lg overflow-hidden"
				>
					<ArticleLargeCard
						:post="post"
						:post-detail-path="`${
							(post as Post).grade ? '/method-bank/educator/' : '/method-bank/student/'
						}`"
					/>
				</li>
			</ArticleList>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Post, VideoEducation } from '~/api/type'

definePageMeta({
	layout: 'customer'
})

const posts = ref<(Post | VideoEducation)[]>([])
const isLoadingSearchResult = ref(false)

const { getPosts, isLoadingMorePost, isMorePageAvailable } = useMoreMBPost()

const {
	query: { q: searchQuery }
} = useRoute()

const requestParams = {
	search: searchQuery as unknown as string,
	type: '',
	subtype: '',
	limit: 8,
	page: 1
}

const initialPostList = await getPosts(requestParams)
posts.value = initialPostList

const loadMore = async () => {
	requestParams.page += 1

	const postList = await getPosts(requestParams)

	postList.length && (posts.value = posts.value.concat(postList))
}

const handleSearch = async (query: string) => {
	isLoadingSearchResult.value = true

	requestParams.search = query
	requestParams.page = 1

	const postList = await getPosts(requestParams)
	posts.value = postList

	isLoadingSearchResult.value = false
}

useSchemaOrg([
	defineWebPage({
		'@type': ['CollectionPage', 'SearchResultsPage']
	})
])
</script>
