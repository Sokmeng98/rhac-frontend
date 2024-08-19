<template>
	<div v-if="slides - 2 > 1" class="absolute w-56 h-4 bg-yellow-400 -bottom-14">
		<Teleport to="#hero-swiper-container">
			<ul class="absolute flex items-center justify-center w-full h-4 list-none -bottom-8">
				<li
					v-for="n in slides - 2"
					:key="n"
					class="w-3 h-3 mx-1 rounded-full cursor-pointer"
					:class="n == active ? 'bg-primary' : 'bg-primary/40'"
					@click="swiper.slideTo(n)"
				></li>
			</ul>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { useSwiper } from 'swiper/vue'

const swiper = useSwiper()

const slides = ref(0)
const activeIndex = ref(0)
const active = ref(1)

onMounted(() => {
	swiper.value.on('update', () => {
		slides.value = swiper.value.slides.length
	})

	swiper.value.on('slideChange', () => {
		activeIndex.value = swiper.value.activeIndex

		active.value =
			activeIndex.value === 0 ? slides.value - 2 : activeIndex.value % (slides.value - 1) || 1
	})
})
</script>
