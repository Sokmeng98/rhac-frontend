<template>
	<ul class="flex flex-col gap-2 list-none lg:gap-3 text-footerGray">
		<li v-for="(item, index) in ourWorks" :key="index">
			<NuxtLink
				:href="item.link"
				class="flex items-center gap-2 rounded-md lg:gap-3 hover:underline focus:underline focus:outline-none focus-visible:ring-2 ring-0 ring-yellow-400 focus-visible:ring-offset-2 ring-offset-0 ring-offset-black"
			>
				<div v-html="item.icon"></div>
				<span
					class="text-lg line-clamp-2"
					:title="$i18n.locale === 'km' ? item.title_kh : item.title_en"
				>
					{{ $i18n.locale === 'km' ? item.title_kh : item.title_en }}
				</span>
			</NuxtLink>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { ourWorks } from '@/util/about-rhac/our-work'
</script>
