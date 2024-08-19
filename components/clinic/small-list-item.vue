<template>
	<div class="flex items-center w-full h-auto gap-4 p-4 rounded-md">
		<NuxtImg :src="img" :alt="title" class="object-cover w-12 h-12" loading="lazy" />

		<p class="text-sm">{{ title }}</p>
	</div>
</template>

<script setup lang="ts">
type Props = {
	titleEn: string
	titleKh: string
	img: string
}

const { titleEn, titleKh } = defineProps<Props>()

const { locale } = useI18n()

const title = computed(() => {
	return locale.value === 'km' ? titleKh || titleEn : titleEn || titleKh
})
</script>
