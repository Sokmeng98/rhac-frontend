<template>
	<section class="w-full aspect-video max-h-[44rem]">
		<Swiper
			:modules="[Autoplay, Pagination]"
			:autoplay="{
				delay: 4000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			}"
			:pagination="{ clickable: true }"
			:loop="true"
			:space-between="32"
			class="z-0 w-full h-full select-none bg-primary"
			:style="{
				'--swiper-pagination-color': 'hsl(var(--p))'
			}"
		>
			<SwiperSlide v-for="URL in imageURLs" :key="URL" class="relative h-full">
				<NuxtImg
					:src="URL"
					class="object-cover object-top w-full h-full"
					alt="events image"
					format="webp"
					fit="cover"
					sizes="xs:640px sm:768px md:1024px lg:1280px xl:1536px xxl:1920px"
					placeholder
				/>
			</SwiperSlide>
		</Swiper>
	</section>

	<main class="container flex flex-col gap-5 px-4 mt-5 lg:mt-10 lg:px-0">
		<div class="container">
			<SectionHeader class="mb-8">{{ $t('recent_events') }}</SectionHeader>

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
							display-read-more-button
							post-detail-path="/about-rhac/events/"
						/>
					</li>
				</ArticleList>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Post } from '~/api/type'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import type { PaginationMeta } from '~~/api'

definePageMeta({
	layout: 'customer'
})

const imageURLs = [
	'/img/events/event.jpg',
	'/img/events/event-2.jpg',
	'/img/events/event-3.jpg',
	'/img/events/event-4.jpg',
	'/img/events/event-5.jpg',
	'/img/events/event-6.jpg'
]

const posts = ref<Post[]>([])

const { getPosts, isLoadingMorePost, isMorePageAvailable } = useMorePost()

const requestParams = {
	search: '',
	type: 'training-&-event',
	essential: true,
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
