<template>
	<div class="w-full h-full">
		<Swiper
			v-if="videos.length > 0"
			:modules="[Navigation]"
			:auto-height="true"
			:breakpoints="carouselOption.breakpoints"
			:navigation="carouselOption.navigation"
			class="[&>.swiper-wrapper]:my-0"
			:style="{
				'--swiper-navigation-color': '#1cc98f'
			}"
		>
			<SwiperSlide v-for="video in videos" :key="video.id" class="w-full py-2" style="height: 100%">
				<div class="h-full rounded-md shadow-md">
					<VideoCard :video="video" class="h-full" />
				</div>
			</SwiperSlide>

			<SwiperPrevAndNextNavigationButtons />
		</Swiper>

		<HeroVideoEducation v-else />
	</div>
</template>

<script setup lang="ts">
import { Navigation } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import { useHomeEducationalVideo } from '~/store/customer/home-educational-video'
import type { VideoEducation } from '~/api/type'
const { getVideosFromStore } = useHomeEducationalVideo()

const videos = ref<VideoEducation[]>([])

const videosFromStore = getVideosFromStore()
videos.value = videosFromStore

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
