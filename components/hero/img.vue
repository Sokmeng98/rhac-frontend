<template>
	<figure class="relative w-full">
		<NuxtImg
			format="webp"
			:src="src"
			:alt="alt"
			:class="twMerge('object-cover object-right-top aspect-video max-h-[40rem] w-full', className)"
			sizes="xs:640px sm:768px md:1024px lg:1280px xl:1536px xxl:1920px"
			fit="contain"
			placeholder
		></NuxtImg>

		<!--  for figcaption    -->
		<slot></slot>
	</figure>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
defineProps<{
	src: string
	alt: string
	className?: string
}>()
</script>
