<template>
	<ClientOnly>
		<Swiper
			:modules="[Navigation]"
			:auto-height="true"
			:breakpoints="carouselOption.breakpoints"
			:navigation="carouselOption.navigation"
			class="[&>.swiper-wrapper]:my-0"
			:style="{
				'--swiper-navigation-color': '#1cc98f'
			}"
		>
			<template v-if="pending">
				<SwiperSlide v-for="n in 4" :key="n" class="w-full py-2" style="height: 100%">
					<div class="h-full rounded-md shadow-md">
						<ArticleLargeCardSkeleton />
					</div>
				</SwiperSlide>
			</template>

			<template v-else-if="!error">
				<SwiperSlide
					v-for="video in videos"
					:key="video.id"
					class="w-full py-2"
					style="height: 100%"
				>
					<div class="h-full overflow-hidden rounded-lg shadow-md">
						<ArticleLargeCard :post="video" post-detail-path="/" />
					</div>
				</SwiperSlide>
			</template>

			<SwiperPrevAndNextNavigationButtons />
		</Swiper>
	</ClientOnly>
</template>

<script setup lang="ts">
import { Navigation } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import type { VideoEducation } from '~/api/type'

const { saveVideosIntoStore } = useHomeEducationalVideo()

const videos = ref<VideoEducation[]>([])

const {
	data: res,
	pending,
	error
} = useLazyFetch<{ data: VideoEducation[] }>('/video?limit=6', {
	baseURL: useBaseUrl(),
	server: false
})

watch(res, newRes => {
	if (newRes?.data) {
		videos.value = newRes.data

		saveVideosIntoStore(newRes.data)
	}
})

const carouselOption = {
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
			spaceBetween: 20,
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
</script>
