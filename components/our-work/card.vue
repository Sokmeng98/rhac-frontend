<template>
	<NuxtLink :to="work.link" class="w-full rounded-xl">
		<div
			class="flex w-full max-w-full flex-col gap-4 px-8 pt-5 pb-10 transition-all duration-300 transform bg-white rounded-md group lg:gap-8 lg:bg-transparent lg:hover:bg-primary/20 lg:flex-row hover:scale-[1.02]"
		>
			<div class="flex items-center flex-shrink-0 gap-4">
				<div
					class="flex items-center justify-center flex-shrink-0 h-full rounded-md shadow-xl lg:bg-white text-primary lg:w-24 lg:justify-center"
				>
					<div class="scale-[1.5] lg:scale-[2.5]" v-html="work.icon"></div>
				</div>

				<h3 class="text-2xl text-blue-950 lg:hidden line-clamp-1" :title="title">
					{{ title }}
				</h3>
			</div>

			<div class="relative gap-4 lg:max-w-[calc(100%-8rem)]">
				<h3 class="hidden text-2xl truncate text-blue-950 lg:block" :title="title">
					{{ title }}
				</h3>

				<p class="overflow-hidden text-lg line-clamp-3 lg:line-clamp-2 text-black/60 sm:text-xl">
					{{ content }}
				</p>

				<div class="absolute flex justify-end w-full h-10 rounded-md">
					<p class="flex items-center text-green-800 underline">
						{{ $t('read_more') }}
						<Icon
							icon="majesticons:chevron-up"
							class="transition-transform rotate-90 group-hover:translate-x-2"
						/>
					</p>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
type Props = {
	work: {
		link: string

		icon: string

		title_en: string
		title_kh: string

		content_en: string
		content_kh: string
	}
}

const { work } = defineProps<Props>()

const { locale } = useI18n()
const title = computed(() =>
	locale.value === 'km' ? work.title_kh || work.title_en : work.title_en || work.title_kh
)

const content = computed(() =>
	locale.value === 'km' ? work.content_kh || work.content_en : work.content_en || work.content_kh
)
</script>
