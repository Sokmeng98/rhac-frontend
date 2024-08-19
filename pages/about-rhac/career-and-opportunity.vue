<template>
	<Head>
		<Title>Rhac Organization | Career</Title>
		<Meta
			name="description"
			content="RHAC Career and Opportunity. Join RHAC. ចូលរួមជាមួយរ៉ាក់."
		></Meta>
	</Head>

	<main class="relative">
		<HeroImg src="/img/job_hero.jpg" alt="rhac clinic services cover">
			<div
				class="container absolute inset-0 top-0 flex items-center justify-center px-6 lg:px-0 lg:justify-start bg-white/80 sm:bg-transparent"
			>
				<div class="container">
					<figcaption
						class="flex items-center h-full bg-transparent sm:h-fit sm:rounded-lg sm:bg-white/80 lg:bg-transparent lg:w-1/2"
					>
						<div
							class="w-full bg-transparent sm:px-6 sm:py-4 lg:border lg:bg-white md:py-5 sm:rounded-none md:rounded-3xl"
						>
							<h2
								class="font-['Nunito',sans-serif, cursive] font-bold text-[#16005C] text-2xl lg:text-3xl xl:text-4xl xl:leading-[2.9rem] 2xl:text-[40px] 2xl:leading-relaxed mb-5"
							>
								{{ $t('career_hero_title_01') }}
							</h2>

							<p
								class="font-normal text-[#0F0F0F] text-sm leading-5 lg:leading-7 lg:text-base xl:leading-8 xl:text-xl max-w-[360px] lg:max-w-[440px] xl:max-w-[566px] 2xl:max-w-[600px]"
							>
								{{ $t('career_hero_text') }}
							</p>
						</div>
					</figcaption>

					<div class="hidden w-full sm:block lg:w-1/2">
						<h3
							class="mt-4 sm:mt-10 mb-1 sm:ml-7 font-bold text-[#16005C] text-sm lg:text-base xl:text-xl"
						>
							{{ $t('career_hero_title_02') }}
						</h3>

						<SearchBar :pending="loadingSearchResults" :on-search="handleSearch" />
					</div>
				</div>
			</div>
		</HeroImg>

		<div class="container px-6 mt-8">
			<SearchBar :pending="loadingSearchResults" :on-search="handleSearch" class="sm:hidden" />
		</div>

		<section id="job-listing" class="container px-6 mb-10 lg:px-0">
			<div class="container">
				<div class="my-10">
					<SectionHeader>{{ $t('job_list') }}</SectionHeader>
				</div>

				<ArticleList
					:pending="pending || loadingSearchResults"
					:error="Boolean(error) || (posts.length === 0 && !pending)"
					:is-more-page-available="isMorePageAvailable"
					:is-loading-more-post="isLoadingMorePost"
					:load-more="loadMore"
				>
					<li
						v-for="post in posts"
						:key="post.id"
						class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2 shadow-lg rounded-lg overflow-hidden"
					>
						<ArticleLargeCard
							:post="post"
							display-read-more-button
							post-detail-path="/"
							display-sub-category
						/>
					</li>
				</ArticleList>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '~~/api'
import type { Post } from '~~/api/type'

definePageMeta({
	layout: 'customer'
})

const loadingSearchResults = ref(false)

const posts = ref<Post[]>([])

const { getPosts, isLoadingMorePost, isMorePageAvailable } = useMorePost()

const requestParams = {
	search: '',
	type: 'career-and-opportunity',
	subtype: '',
	limit: 11,
	page: 1
}

const loadMore = async () => {
	requestParams.page += 1

	const postList = await getPosts(requestParams)

	postList.length && (posts.value = posts.value.concat(postList))
}

const handleSearch = async (search: string) => {
	requestParams.search = search
	requestParams.page = 1

	loadingSearchResults.value = true
	const postList = await getPosts(requestParams)
	loadingSearchResults.value = false

	posts.value = postList
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
</script>
