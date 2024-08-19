<template>
	<section id="team" class="flex flex-col gap-6 px-4 my-10">
		<div class="container">
			<SectionHeader>{{ $t('national_council') }}</SectionHeader>

			<div class="h-8"></div>

			<Swiper
				:modules="[Navigation, Pagination, Autoplay]"
				:breakpoints="options.breakpoints"
				:navigation="options.navigation"
				:style="{
					'--swiper-navigation-color': '#1cc98f'
				}"
			>
				<SwiperSlide v-for="(person, index) in nationalCouncil" :key="index">
					<OurTeamCard :person="person" />
				</SwiperSlide>

				<SwiperOffsetPrevAndNextNavigationButton />
			</Swiper>
		</div>

		<div class="container">
			<SectionHeader>{{ $t('staff') }}</SectionHeader>

			<div class="h-8"></div>

			<Swiper
				:modules="[Navigation, Pagination, Autoplay]"
				:breakpoints="options.breakpoints"
				:navigation="options.navigation"
				:style="{
					'--swiper-navigation-color': '#1cc98f'
				}"
			>
				<SwiperSlide v-for="(person, index) in staff" :key="index">
					<OurTeamCard :person="person" />
				</SwiperSlide>

				<SwiperOffsetPrevAndNextNavigationButton />
			</Swiper>
		</div>
	</section>
</template>

<script setup lang="ts">
import { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { TeamMember } from '~/api/type'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

const nationalCouncil = ref<TeamMember[]>([])
const staff = ref<TeamMember[]>([])

const options = {
	navigation: {
		prevEl: '.swiper-button-prev',
		nextEl: '.swiper-button-next'
	},
	breakpoints: {
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
		640: {
			slidesPerView: 2,
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

const baseURL = useBaseUrl()

const nationalCouncilPromise = useFetch<{ data: TeamMember[] }>(
	'/teams_by_type/?type=National Council',
	{
		baseURL
	}
)

const staffPromise = useFetch<{ data: TeamMember[] }>('/teams_by_type/?type=Staff', {
	baseURL
})

const { data: nationalCouncilData } = await nationalCouncilPromise
const { data: staffData } = await staffPromise

if (nationalCouncilData.value?.data) {
	nationalCouncil.value = nationalCouncilData.value.data
}

if (staffData.value?.data) {
	staff.value = staffData.value.data
}
</script>
