<template>
	<h2 class="px-4 mb-4 text-3xl sm:px-0">{{ categoryName }}</h2>

	<section class="flex flex-col gap-1 px-4 sm:px-0">
		<menu class="grid grid-cols-1 gap-2 md:grid-cols-3">
			<li
				v-for="(subCategory, index) in category.m_b__subcategories"
				:key="subCategory.id"
				class=""
			>
				<button
					aria-label="Switch sub category"
					class="flex items-center w-full h-full px-3 py-2 text-sm text-center rounded-lg lg:text-base"
					:class="{
						'bg-primary/30': activeTabIndex === index,
						'bg-white': activeTabIndex !== index
					}"
					@click="onTabChange(index)"
				>
					<span class="flex-1 -mr-2">{{ getSubCategoryName(subCategory) }}</span>

					<div class="mr-1 2xl:mr-3 w-fit">
						<p v-if="activeTabIndex === index" class="text-lg text-green-900">+</p>
						<p v-else class="text-xl text-green-900">-</p>
					</div>
				</button>
			</li>
		</menu>

		<section
			class="relative flex flex-col items-center justify-center gap-4 px-3 py-8 rounded-lg sm:px-8 bg-primary/30"
		>
			<div class="relative flex-shrink-0 w-full min-h-[17.5rem]">
				<div class="w-full h-full">
					<Swiper
						:modules="[Navigation]"
						:breakpoints="carouselOption.breakpoints"
						:auto-height="true"
						:navigation="carouselOption.navigation"
						class="relative flex w-full [&>.swiper-wrapper]:my-0"
						:style="{
							'--swiper-navigation-color': 'hsl(var(--p))'
						}"
					>
						<template v-if="pending">
							<SwiperSlide v-for="n in 3" :key="n" class="relative">
								<div class="bg-white rounded-md">
									<ArticleLargeCardSkeleton />
								</div>
							</SwiperSlide>
						</template>

						<template v-else-if="!error">
							<SwiperSlide
								v-for="post in posts"
								:key="post.id"
								class="relative"
								style="height: 100%"
							>
								<div class="w-full h-full overflow-hidden bg-white rounded-md">
									<ArticleLargeCard :post="post" post-detail-path="/method-bank/student/" />
								</div>
							</SwiperSlide>
						</template>

						<div class="absolute top-0 left-0 z-50 hidden w-12 h-full sm:block">
							<button class="swiper-button-prev"></button>
						</div>
						<div class="absolute top-0 right-0 z-50 hidden w-12 h-full sm:block">
							<button class="swiper-button-next"></button>
						</div>
					</Swiper>
				</div>
			</div>

			<ReadMoreButton link="/method-bank/student/articles">
				{{ $t('view_all') }}
			</ReadMoreButton>
		</section>
	</section>
</template>

<script setup lang="ts">
import { Navigation } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/vue'
import type { MBCategory, MBSubcategory, Post } from '~~/api/type'

import 'swiper/css'
import 'swiper/css/navigation'

const { category } = defineProps<{
	category: MBCategory
}>()

const activeTabIndex = ref(0)
const { locale } = useI18n()

const posts = ref<Post[]>([])

const categoryName = computed(() =>
	locale.value === 'km' ? category.name || category.name_en : category.name_en || category.name
)

const getSubCategoryName = (subCategory: MBSubcategory) =>
	locale.value === 'km'
		? subCategory.name || subCategory.name_en
		: subCategory.name_en || subCategory.name

const carouselOption = {
	navigation: {
		prevEl: '.swiper-button-prev',
		nextEl: '.swiper-button-next'
	},

	breakpoints: {
		1024: {
			slidesPerView: 3,
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

const requestParams = {
	limit: 5,
	type: category.slug_en || category.slug_kh || category.name_en || category.name || '',
	subtype:
		category.m_b__subcategories[activeTabIndex.value]?.slug_en ||
		category.m_b__subcategories[activeTabIndex.value]?.slug_kh ||
		''
}

const {
	data: res,
	pending,
	error
} = useLazyFetch<{ data: Post[] }>('/mb_learner_and_video', {
	baseURL: useBaseUrl(),
	params: requestParams,
	server: false
})

watch(res, newRes => {
	if (newRes?.data) {
		posts.value = newRes.data
	}
})

const onTabChange = async (tabIndex: number) => {
	activeTabIndex.value = tabIndex

	requestParams.subtype =
		category.m_b__subcategories[activeTabIndex.value]?.slug_en ||
		category.m_b__subcategories[activeTabIndex.value]?.slug_kh ||
		''

	const { data } = await $fetch<{
		data: Post[]
		current_page: number
		last_page: number
	}>('/mb_learner_and_video', {
		baseURL: useBaseUrl(),
		params: requestParams
	})

	if (data && data.length) {
		posts.value = data
	} else {
		posts.value = []
	}
}
</script>
