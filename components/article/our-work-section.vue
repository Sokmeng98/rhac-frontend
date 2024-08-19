<template>
	<section class="flex flex-col w-full gap-3">
		<ArticleSidebarHeader>{{ $t('our_work') }}</ArticleSidebarHeader>

		<menu class="flex flex-col w-full gap-3 list-none">
			<li v-for="work in ourWorks" :key="work.link">
				<NuxtLink
					:to="work.link"
					class="flex items-center w-full gap-2 p-2 transition-colors rounded-md shadow-md cursor-pointer hover:bg-primary/20 lg:gap-3 hover:underline focus:underline focus:outline-none focus-visible:ring-2 ring-0 ring-yellow-400 focus-visible:ring-offset-2 ring-offset-0"
				>
					<div class="flex items-center justify-center flex-shrink-0 w-12 aspect-square">
						<div class="scale-125 text-primary" v-html="work.icon"></div>
					</div>

					<p class="text-lg text-blue-950">
						{{
							$i18n.locale === 'km'
								? work.title_kh || work.title_en
								: work.title_en || work.title_kh
						}}
					</p>
				</NuxtLink>
			</li>
		</menu>
	</section>
</template>

<script setup lang="ts">
import { ourWorks } from '~/util/about-rhac/our-work'
</script>
