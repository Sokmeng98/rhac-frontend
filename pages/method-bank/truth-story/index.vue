<template>
	<Head>
		<Title>RHAC Organization | Story</Title>
		<Meta name="description" content="Truth stories from communities"></Meta>
	</Head>

	<main class="container px-6 my-10 lg:px-0">
		<div class="container">
			<div class="pb-6">
				<SectionHeader>{{ $t('truth_story') }}</SectionHeader>
			</div>

			<section>
				<ArticleList
					:is-loading-more-post="isLoadingMorePost"
					:is-more-page-available="isMorePageAvailable"
					:load-more="loadMore"
					:pending="pending"
					:error="Boolean(error) || posts.length === 0"
				>
					<li
						v-for="post in posts"
						:key="post.id"
						class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2 shadow-lg rounded-lg overflow-hidden"
					>
						<ArticleLargeCard
							:post="post"
							post-detail-path="/method-bank/truth-story/"
							display-read-more-button
						/>
					</li>
				</ArticleList>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
import type { Post } from '~/api/type'
import type { PaginationMeta } from '~~/api'

definePageMeta({
	layout: 'customer'
})

const posts = ref<Post[]>([])

const { getPosts, isLoadingMorePost, isMorePageAvailable } = useMorePost()

const requestParams = {
	search: '',
	type: 'success-story',
	essential: 'true',
	subtype: '',
	limit: 11,
	page: 1
}

const {
	data: res,
	pending,
	error
} = useLazyFetch<{ data: Post[]; meta: PaginationMeta }>('/post', {
	baseURL: useBaseUrl(),
	params: requestParams,
	server: false
})

watch(res, newRes => {
	posts.value = newRes?.data || []

	if (newRes?.meta) {
		isMorePageAvailable.value = newRes.meta.current_page < newRes.meta.last_page
		// @ts-ignore
	} else if (newRes.current_page && newRes.last_page) {
		// @ts-ignore
		isMorePageAvailable.value = newRes.current_page < newRes.last_page
	}
})

const loadMore = async () => {
	requestParams.page += 1

	const postList = await getPosts(requestParams)

	postList.length && (posts.value = posts.value.concat(postList))
}
</script>
