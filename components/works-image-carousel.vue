<template>
	<div class="container mt-8 mb-5">
		<ClientOnly>
			<div>
				<Swiper
					ref="swiper"
					:modules="[Navigation, Pagination, Autoplay]"
					:loop="true"
					:autoplay="options.autoplay"
					:breakpoints="options.breakpoints"
					:navigation="options.navigation"
					:style="{
						'--swiper-navigation-color': '#1cc98f'
					}"
				>
					<SwiperSlide v-for="(image, index) in images.image" :key="index">
						<figure
							class="flex items-center justify-center w-full h-48 overflow-hidden aspect-auto sm:h-56 md:h-36 xl:h-40 rounded-xl"
						>
							<NuxtImg
								:src="image"
								:alt="images.alt"
								loading="lazy"
								format="webp"
								class="object-cover h-full"
								sizes="xs:540px sm:540px md:540px lg:540px xl:540px xxl:1024px"
							/>
						</figure>
					</SwiperSlide>
					<SwiperPrevAndNextNavigationButtons />
				</Swiper>
			</div>
		</ClientOnly>
	</div>
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

type Props = {
	workType: string
}

const { workType } = defineProps<Props>()

const images = ref()

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
			slidesPerView: 4,
			spaceBetween: 25,
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

const sliderImages = {
	establishHealthCenterServices: {
		alt: 'advertise activities',
		image: [
			'/img/works/advertising/1.jpg',
			'/img/works/advertising/2.jpg',
			'/img/works/advertising/3.jpg',
			'/img/works/advertising/4.jpg',
			'/img/works/advertising/5.jpg',
			'/img/works/advertising/6.jpg'
		]
	},
	advertise: {
		alt: 'advertise activities',
		image: [
			'/img/works/advertising/1.jpg',
			'/img/works/advertising/2.jpg',
			'/img/works/advertising/3.jpg',
			'/img/works/advertising/4.jpg',
			'/img/works/advertising/5.jpg',
			'/img/works/advertising/6.jpg'
		]
	},
	promoteYouthHealth: {
		alt: 'promote youth health activities',
		image: [
			'/img/works/promote-youth-health/1.jpg',
			'/img/works/promote-youth-health/2.jpg',
			'/img/works/promote-youth-health/3.jpg',
			'/img/works/promote-youth-health/4.jpg',
			'/img/works/promote-youth-health/5.jpg',
			'/img/works/promote-youth-health/6.jpg'
		]
	},
	rightAccessInfo: {
		alt: 'right access info activities',
		image: [
			'/img/works/right-access-info/1.jpg',
			'/img/works/right-access-info/2.jpg',
			'/img/works/right-access-info/3.jpg',
			'/img/works/right-access-info/4.jpg',
			'/img/works/right-access-info/5.jpg',
			'/img/works/right-access-info/6.jpg'
		]
	},
	womanInSexIndustry: {
		alt: 'woman in sex industry activities',
		image: [
			'/img/works/woman-in-sex-industry/1.jpg',
			'/img/works/woman-in-sex-industry/2.jpg',
			'/img/works/woman-in-sex-industry/3.jpg',
			'/img/works/woman-in-sex-industry/4.jpg',
			'/img/works/woman-in-sex-industry/5.jpg',
			'/img/works/woman-in-sex-industry/6.jpg'
		]
	}
}

switch (workType) {
	case 'establish health center services':
		images.value = sliderImages.establishHealthCenterServices
		break
	case 'advertise':
		images.value = sliderImages.advertise
		break
	case 'promote youth health':
		images.value = sliderImages.promoteYouthHealth
		break
	case 'right access info':
		images.value = sliderImages.rightAccessInfo
		break
	case 'woman in sex industry':
		images.value = sliderImages.womanInSexIndustry
		break

	default:
		images.value = undefined
		break
}
</script>
