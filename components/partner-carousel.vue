<template>
	<section class="container">
		<Swiper
			:modules="[Navigation, Pagination, Autoplay]"
			:loop="true"
			:autoplay="options.autoplay"
			:breakpoints="options.breakpoints"
			:navigation="options.navigation"
			:style="{
				'--swiper-navigation-color': '#1cc98f'
			}"
		>
			<SwiperSlide v-for="(partner, index) in partnerLogo" :key="index">
				<figure
					class="flex items-center justify-center rounded-xl shadow-[0px_0px_16px_rgba(75,75,75,0.1)] overflow-hidden"
				>
					<NuxtImg
						:src="partner.logo"
						:alt="`Logo of ${partner['name']}`"
						loading="lazy"
						format="webp"
						class="h-full"
						sizes="sm:200px md:120px lg:240px xl:180px xxl:200px"
					/>
				</figure>
			</SwiperSlide>

			<SwiperPrevAndNextNavigationButtons />
		</Swiper>
	</section>
</template>

<script setup lang="ts">
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

const options = {
	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true
	},

	navigation: {
		prevEl: '.swiper-button-prev',
		nextEl: '.swiper-button-next'
	},
	breakpoints: {
		1280: {
			slidesPerView: 5,
			spaceBetween: 30,
			centeredSlides: false
		},
		1024: {
			slidesPerView: 4,
			spaceBetween: 20,
			centeredSlides: false
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 20,
			centeredSlides: false
		},
		0: {
			slidesPerView: 1.5,
			spaceBetween: 20,
			centeredSlides: true
		}
	}
}

const partnerLogo = [
	{
		name: 'ippf',
		logo: '/img/partner/1.png'
	},
	{
		name: 'rfsu',
		logo: '/img/partner/2.png'
	},
	{
		name: 'ministry of health',
		logo: '/img/partner/3.png'
	},
	{
		name: 'australian aid',
		logo: '/img/partner/4.png'
	},
	{
		name: 'arrow',
		logo: '/img/partner/5.png'
	},
	{
		name: 'saaf',
		logo: '/img/partner/6.png'
	},
	{
		name: 'levi strauss foundation',
		logo: '/img/partner/7.png'
	},
	{
		name: 'amaze',
		logo: '/img/partner/8.png'
	},
	{
		name: 'japan people',
		logo: '/img/partner/9.png'
	},
	{
		name: 'unfpa',
		logo: '/img/partner/10.png'
	},
	{
		name: 'joicfp',
		logo: '/img/partner/11.png'
	},
	{
		name: 'usaid',
		logo: '/img/partner/12.png'
	},
	{
		name: 'pkan',
		logo: '/img/partner/13.png'
	}
]
</script>
