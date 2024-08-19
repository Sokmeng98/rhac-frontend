<template>
	<NuxtLink :to="useFilePath(publication.pdf)" target="_blank">
		<article class="w-full h-full overflow-hidden bg-transparent rounded-md shadow-md">
			<div class="overflow-hidden">
				<NuxtImg
					loading="lazy"
					format="webp"
					class="object-cover w-full aspect-[16/9] transition-transform ease-in lg:hover:scale-105 duration-300"
					:src="useFilePath(publication.image)"
					:alt="title"
				/>
			</div>

			<div class="justify-between p-4">
				<div>
					<h3
						class="font-bold text-[16px] lg:text-[18px] hover:text-primary hover:underline line-clamp-2"
						:title="title"
					>
						{{ title }}
					</h3>
				</div>
			</div>
		</article>
	</NuxtLink>
</template>

<script setup lang="ts">
import type { Publication } from '~/api/type'
import { useFilePath } from '~/composables'

const { publication } = defineProps<{
	publication: Publication
}>()

const { locale } = useI18n()

const title = computed(() => {
	return locale.value === 'km'
		? publication.title_kh || publication.title_en
		: publication.title_en || publication.title_kh
})
</script>
