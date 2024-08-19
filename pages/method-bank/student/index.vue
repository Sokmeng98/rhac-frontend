<template>
	<section class="w-full">
		<HeroImg src="/img/methodbank/for_learner_hero.jpg" alt="rhac clinic services cover">
			<div class="container absolute inset-0 top-0 flex items-center">
				<figcaption
					class="flex items-center w-full h-full sm:w-fit sm:h-fit sm:rounded-2xl bg-emerald-950/40 lg:bg-transparent"
				>
					<div
						class="px-6 py-4 text-white bg-transparent w-fit lg:border lg:bg-white md:py-5 sm:rounded-none md:rounded-3xl lg:w-1/2 lg:text-gray-800"
					>
						<h1 class="mb-2 text-xl font-semibold uppercase lg:mb-3 lg:text-3xl 2xl:text-4xl">
							{{ $t('for_learner') }}
						</h1>
						<h4 class="max-w-full text-sm sm:text-base md:font-normal md:leading-[22px] xl:text-xl">
							{{ $t('for_learner_desc') }}
						</h4>
					</div>
				</figcaption>
			</div>
		</HeroImg>

		<article class="flex flex-col w-full gap-6 py-10 bg-primary/10">
			<SectionHeader>{{ $t('study_topic') }}</SectionHeader>

			<ul v-if="categories.length" class="container flex flex-col gap-10 list-none">
				<li v-for="category in categories" :key="category.id" class="">
					<MethodBankTopicCard :category="category" />
				</li>
			</ul>
		</article>

		<section class="bg-white">
			<div class="container">
				<MbRecentArticles article-type="mb_learner" />
			</div>

			<section id="video-education" class="py-8">
				<SectionHeader>{{ $t('video_education') }}</SectionHeader>

				<div class="container mt-4">
					<HeroVideoEducation />
				</div>

				<div class="my-5 text-center">
					<NuxtLink to="/educational-video" class="btn-primary btn min-w-[200px]">
						{{ $t('view_all') }}
					</NuxtLink>
				</div>
			</section>
		</section>
	</section>
</template>

<script setup lang="ts">
import type { MBCategory } from '~/api/type'

definePageMeta({
	layout: 'customer'
})

const categories = ref<MBCategory[]>([])

const { data: res } = await useFetch<{ data: MBCategory[] }>(`/method_bank_category`, {
	baseURL: useBaseUrl()
})

if (res.value) {
	categories.value = res.value.data
}
</script>
