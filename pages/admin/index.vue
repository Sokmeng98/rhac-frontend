<template>
	<h1 class="text-3xl font-bold text-[rgb(34,40,74)]">Welcome {{ user ? user.name : '' }}</h1>

	<section class="grid gap-4 mt-5 sm:grid-cols-2 xl:grid-cols-4">
		<template v-for="summary in summaries" :key="summary.title">
			<AdminCountCard
				:icon="summary.icon"
				:links="summary.links"
				:title="summary.title"
				:value="summary.value"
			/>
		</template>
	</section>

	<AdminHeroSlider />

	<section class="mt-10 flex justify-between h-[50px]">
		<div class="flex mt-[10px]">
			<h1 class="my-auto text-3xl font-bold text-[rgb(34,40,74)]">FAQ</h1>

			<NuxtLink
				to="/admin/faqs"
				class="text-[#009987] font-normal text-[16px] border-b-[1px] h-[25px] border-[#009987] ml-[16px] mt-[10px]"
			>
				View All
			</NuxtLink>
		</div>

		<div>
			<NuxtLink
				to="/admin/faqs/add?from=dashboard"
				class="btn-container btn gap-2 text-white bg-[#009987] border-none hover:bg-[#009987]"
			>
				<Icon icon="fluent:add-12-filled" />
				ADD NEW
			</NuxtLink>
		</div>
	</section>

	<section
		class="mt-2.5 w-auto rounded-2xl px-2 md:px-8 py-6 bg-white border border-gray-200 shadow-md"
	>
		<AdminFaqCard></AdminFaqCard>
	</section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { branchCount } from '~~/util/branches'

definePageMeta({
	middleware: ['auth'],
	layout: 'dashboard'
})

const { user } = storeToRefs(useAuthStore())

const summaries = [
	{
		title: 'Total Articles',
		icon: 'fluent:news-24-regular',
		links: [
			'/post?limit=1&essential=true',
			'/mb_professional?limit=1&essential=true',
			'/mb_learner?limit=1&essential=true'
		]
	},
	{
		title: 'Total Jobs',
		icon: 'ph:suitcase-simple',
		links: ['post?type=career-and-opportunity&limit=1&essential=true']
	},
	{
		title: 'Total Categories',
		icon: 'ph:stack',
		links: ['/post_category?limit=1&essential=true']
	},
	{
		title: 'Total Branches',
		icon: 'ep:map-location',
		value: branchCount
	}
]
</script>
