<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'

const { getSlider, homeState } = useHomeStore()

await getSlider()
</script>

<template>
	<section id="hero-swiper-container" class="relative w-full h-full">
		<div class="w-full h-full overflow-hidden rounded-md">
			<Swiper
				:modules="[Autoplay]"
				:autoplay="{
					delay: 5000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true
				}"
				:loop="true"
				:space-between="32"
				class="z-0 w-full top-0 h-full select-none [&>.swiper-wrapper]:my-0 [&>.swiper-wrapper]:relative"
			>
				<SwiperSlide
					v-for="(slide, index) in homeState.slider"
					:key="slide.id"
					class="relative overflow-hidden rounded-md"
				>
					<img
						:src="useFilePath(slide.img?.replace('.webp', '-lg.webp'))"
						class="object-cover w-full h-full overflow-hidden rounded-md aspect-video bg-slate-500"
						:alt="'slider image' + slide.id"
						:srcset="`
								${useFilePath(slide.img?.replace('.webp', '-sm.webp'))} 380w,
								${useFilePath(slide.img?.replace('.webp', '-md.webp'))} 620w,
								${useFilePath(slide.img?.replace('.webp', '-lg.webp'))} 740w,
							`"
						sizes="(max-width: 375px) 380px, (max-width: 768px) 620px, 740px"
						:loading="index === 0 || index === homeState.slider.length - 1 ? 'eager' : 'lazy'"
					/>
				</SwiperSlide>

				<div>
					<HeroSwiperNavigation />
				</div>
			</Swiper>
		</div>
	</section>
</template>
