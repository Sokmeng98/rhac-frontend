<template>
	<ul class="flex flex-col gap-2 list-none cursor-pointer lg:gap-3 text-footerGray">
		<li v-for="item in quickLinks" :key="item.link">
			<NuxtLink
				:href="item.link"
				class="flex items-center gap-2 rounded-md lg:gap-3 hover:underline focus:underline focus:outline-none focus-visible:ring-2 ring-0 ring-yellow-400 focus-visible:ring-offset-2 ring-offset-0 ring-offset-black"
			>
				<span class="text-lg">
					{{ $t(item.titleInLocaleText) }}
				</span>
			</NuxtLink>
		</li>
	</ul>
</template>

<script setup lang="ts">
const quickLinks = [
	{
		link: '/about-rhac/events',
		titleInLocaleText: 'news_and_updates'
	},
	{
		link: `/clinic#rhac-branch`,
		titleInLocaleText: 'rhac_locations'
	},
	{
		link: `/method-bank/student`,
		titleInLocaleText: 'method_bank'
	},
	{
		link: `/about-rhac/career-and-opportunity`,
		titleInLocaleText: 'career_and_opportunity'
	},
	{
		link: `/about-rhac/contact`,
		titleInLocaleText: 'contact_us'
	},
	{
		link: `/clinic#faq`,
		titleInLocaleText: 'faq'
	}
]
</script>
