<template>
	<div class="container px-6 pt-16 lg:px-0">
		<div v-if="recentArticles?.length">
			<SectionHeader class="mb-8">
				{{ $t('recent_articles') }}
			</SectionHeader>

			<ClientOnly>
				<Swiper
					:modules="[Navigation]"
					:auto-height="true"
					:breakpoints="recentNewsOptions.breakpoints"
					:navigation="recentNewsOptions.navigation"
					class="relative w-full h-full first:my-0 [&>.swiper-wrapper]:my-0"
					:style="{
						'--swiper-navigation-color': '#1cc98f'
					}"
				>
					<SwiperSlide v-for="item in recentArticles" :key="item.id" class="w-full">
						<div class="h-full bg-[#F8F8F8]">
							<ArticleLargeCard :post="item" :post-detail-path="path" />
						</div>
					</SwiperSlide>

					<SwiperPrevAndNextNavigationButtons />
				</Swiper>
			</ClientOnly>

			<!-- v-if="recentArticleMeta && recentArticleMeta.total > 6" -->
			<div class="mt-10 text-center">
				<NuxtLink :to="`${path}articles`" class="btn btn-primary min-w-[200px] capitalize">
					{{ $t('view_all') }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { PaginationMeta } from '~~/api'
import type { Post } from '~~/api/type'

import 'swiper/css'
import 'swiper/css/navigation'

interface Props {
	articleType?: 'mb_learner' | 'mb_professional'
}

const { articleType } = defineProps<Props>()

const recentArticles = ref<Post[]>([])
const recentArticleMeta = ref<PaginationMeta>()

const path = computed(() => {
	return articleType === 'mb_learner' ? '/method-bank/student/' : '/method-bank/educator/'
})

const { data: res } = await useFetch<{ data: Post[]; meta: PaginationMeta }>(
	`/${articleType}?limit=6`,
	{
		baseURL: useBaseUrl()
	}
)

if (res.value) {
	recentArticles.value = res.value.data
	recentArticleMeta.value = res.value.meta
}

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
</script>
