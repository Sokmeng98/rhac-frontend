<template>
	<div class="container pt-8 pb-[30px] md:pb-[60px] px-6 lg:px-0">
		<div class="container grid items-center md:grid-cols-2 sm:gap-5">
			<div class="flex flex-col gap-2 xl:gap-6">
				<h3 class="text-3xl font-semibold leading-normal lg:text-4xl">
					{{ $t(title) }}
				</h3>

				<p class="font-medium text-xl mb-5 lg:text-[20px] lg:mb-0 leading-normal">
					{{ $t(description) }}
				</p>
			</div>

			<NuxtImg
				class="object-cover w-full rounded-lg aspect-video"
				:src="img"
				format="webp"
				sizes="xs:256px sm:546px md:560px lg:334px xl:486px xxl:630px"
			/>
		</div>
	</div>

	<section class="container flex flex-col gap-8 px-6 py-6 lg:px-0">
		<div class="container">
			<h3 class="mb-6 text-2xl font-semibold md:text-4xl">{{ $t('all_article') }}</h3>

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
						post-detail-path="/method-bank/educator/"
						display-read-more-button
					/>
				</li>
			</ArticleList>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '~~/api'
import type { Post } from '~~/api/type'

const { grade } = defineProps<{
	grade: 'Grade 5' | 'Grade 7-9' | 'Grade 10-12'
}>()

const title = computed(() => {
	switch (grade) {
		case 'Grade 5':
			return 'primary_school_title'
		case 'Grade 7-9':
			return 'secondary_school_title'
		case 'Grade 10-12':
			return 'high_school_title'
	}
})

const description = computed(() => {
	switch (grade) {
		case 'Grade 5':
			return 'primary_school_desc'
		case 'Grade 7-9':
			return 'secondary_school_desc'
		case 'Grade 10-12':
			return 'high_school_desc'
	}
})

const img = computed(() => {
	switch (grade) {
		case 'Grade 5':
			return '/img/methodbank/primary_school_cover.jpg'
		case 'Grade 7-9':
			return '/img/methodbank/secondary_school_cover.jpg'
		case 'Grade 10-12':
			return '/img/methodbank/high_school_cover.jpg'
	}
})

const posts = ref<Post[]>([])

const requestParams = {
	search: '',
	type: grade,
	limit: 11,
	page: 1
}

const { getPosts, isLoadingMorePost, isMorePageAvailable } = useMoreMBPost('mb_professional')

const loadMore = async () => {
	requestParams.page += 1

	const morePosts = await getPosts(requestParams)

	if (morePosts.length > 0) {
		posts.value.concat(morePosts)
	}
}

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
