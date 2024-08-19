<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
	cardType?: string
	id?: string
	googleMap?: string
	image?: string
	nameKh?: string
	nameEn?: string
	locationKh?: string
	locationEn?: string
	origin?: { lat: number; lng: number }
	tel?: string[]
}

defineProps<Props>()
defineEmits<{ (e: 'close'): void }>()

const { locale } = useI18n()
</script>

<template>
	<div class="relative flex w-full h-full p-6 text-white bg-green-600">
		<div class="w-full md:w-1/2">
			<div class="absolute cursor-pointer right-3 top-3" @click="$emit('close')">
				<icon icon="mdi-close" size="32" />
			</div>

			<h1 class="font-semibold text-[24px] lg:text-[32px] mb-3">
				{{ locale === 'km' ? nameKh || nameEn : nameEn || nameKh }}
			</h1>

			<div class="flex flex-row gap-2 items-center lg:text-[24px] mb-3">
				<p class="leading-normal">
					{{ locale === 'km' ? locationKh || locationEn : locationEn || locationKh }}
				</p>
			</div>

			<div class="flex space-x-3 text-[18px] lg:text-[20px] mb-3">
				<span>{{ $t('tel') }}</span>
				<ul class="gap-2">
					<li v-for="(item, index) in tel" :key="index">{{ item }}</li>
				</ul>
			</div>

			<a
				:href="googleMap"
				target="_blank"
				class="h-auto p-0 font-normal text-yellow-300 capitalize min-h-auto btn btn-link"
				style="min-height: unset"
			>
				[Google Map]
			</a>
		</div>

		<figure class="items-center justify-center hidden w-1/2 md:flex max-w-[350px]">
			<nuxt-img
				loading="lazy"
				class="w-3/4 mt-5"
				:src="image"
				:alt="locale === 'km' ? nameKh || nameEn : nameEn || nameKh"
			/>
		</figure>
	</div>
</template>
