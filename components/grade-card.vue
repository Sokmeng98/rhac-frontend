<template>
	<NuxtLink :to="link">
		<figure class="relative text-white">
			<NuxtImg
				class="object-cover w-full h-full"
				src="/img/blackboard.jpg"
				format="webp"
				fit="cover"
				:alt="$t(titleLocaleText) + ' ' + $t(gradeLocaleText)"
				sizes="xs:320px sm:690px md:260px lg:360px xl:440px xxl:520px"
			/>

			<figcaption class="absolute inset-0 flex flex-col items-center justify-center gap-4">
				<h3 class="md:text-sm lg:text-2xl">{{ $t(titleLocaleText) }}</h3>
				<h4 class="text-4xl text-center md:text-xl lg:text-4xl">{{ $t(gradeLocaleText) }}</h4>
			</figcaption>
		</figure>
	</NuxtLink>
</template>

<script setup lang="ts">
type Props = {
	titleLocaleText: string
	gradeLocaleText: string
	link: string
}

defineProps<Props>()
</script>
