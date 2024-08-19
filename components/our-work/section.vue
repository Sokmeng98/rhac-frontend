<template>
	<section class="w-full py-10 bg-[#E5F6EC] lg:px-6">
		<div class="container flex flex-col w-full gap-6">
			<SectionHeader :is-centered="true">{{ $t('our_work') }}</SectionHeader>

			<ul class="flex flex-col w-full gap-4 px-6 list-none lg:px-10">
				<li v-for="work in ourWorks" :key="work.link" :work="work">
					<OurWorkCard :work="work" />
				</li>
			</ul>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ourWorks } from '~/util/about-rhac/our-work'
</script>
