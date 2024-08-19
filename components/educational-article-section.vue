<template>
	<section id="home-recent-news" class="py-5 sm:py-14">
		<div class="md:container min-h-[32rem] max-h-[34rem]">
			<SectionHeader class="mb-8">{{ $t('recent_articles') }}</SectionHeader>

			<Swiper
				:modules="[Navigation]"
				:auto-height="true"
				:breakpoints="recentNewsOptions.breakpoints"
				:navigation="recentNewsOptions.navigation"
				class="relative w-full h-full [&>.swiper-wrapper]:my-0 max-h-[34rem]"
				:style="{
					'--swiper-navigation-color': '#1cc98f'
				}"
			>
				<SwiperSlide
					v-for="item in recentPosts"
					:key="item.id"
					class="w-full h-full"
					style="height: 100%"
				>
					<div class="h-full bg-[#F8F8F8] rounded-lg overflow-hidden">
						<ArticleLargeCard :post="item" post-detail-path="/" />
					</div>
				</SwiperSlide>

				<SwiperPrevAndNextNavigationButtons />
			</Swiper>

			<div class="mt-10 text-center">
				<ReadMoreButton link="/search">
					{{ $t('view_all') }}
				</ReadMoreButton>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Post } from '~~/api/type'

import 'swiper/css'
import 'swiper/css/navigation'
import { useCustomerRecentPostsStore } from '~~/store/customer/recent-post'

const recentPosts = ref<Post[]>([])

const { getRecentPosts } = useCustomerRecentPostsStore()

const recentNewsOptions = {
	navigation: {
		prevEl: '.swiper-button-prev',
		nextEl: '.swiper-button-next'
	},
	breakpoints: {
		1280: {
			slidesPerView: 3,
			spaceBetween: 30,
			centeredSlides: false
		},
		1024: {
			slidesPerView: 2,
			spaceBetween: 30,
			centeredSlides: false
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
			centeredSlides: false
		},
		0: {
			slidesPerView: 1.3,
			spaceBetween: 20,
			centeredSlides: true
		}
	}
}

const data = await getRecentPosts()
recentPosts.value = data
</script>
