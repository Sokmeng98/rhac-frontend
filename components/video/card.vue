<template>
	<article class="flex flex-col w-full h-full overflow-hidden rounded-md">
		<div>
			<iframe
				:src="video.video_url"
				:aria-label="$t('youtube_video')"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				class="w-full h-full aspect-video"
			></iframe>
		</div>

		<div class="justify-between flex-1 p-4">
			<div class="flex flex-col gap-2">
				<a :href="video.video_url" class="hover:text-primary hover:underline line-clamp-2">
					<h3 class="text-base font-bold lg:text-lg" :title="title">
						{{ title }}
					</h3>
				</a>

				<div class="flex flex-row items-center gap-6 text-black/60">
					<div class="flex flex-row items-center gap-2" :title="date">
						<Icon icon="uiw:date" size="18" />

						<span class="text-sm 2xl:text-base line-clamp-1">
							{{ date }}
						</span>
					</div>

					<div
						v-if="category != undefined"
						class="flex flex-row items-center gap-2"
						:title="category"
					>
						<icon icon="octicon:stack-24" size="18" />
						<span class="text-sm 2xl:text-base line-clamp-1">
							{{ category }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { VideoEducation } from '~/api/type'

const { video } = defineProps<{
	video: VideoEducation
}>()

const { locale } = useI18n()

const date = computed(() => {
	return dayjs(video.created_at).locale(locale.value).format('DD MMM, YYYY')
})

const title = computed(() => {
	return locale.value === 'km' ? video.title_kh || video.title_en : video.title_en || video.title_kh
})

const category = computed(() => {
	if (video.m_b__categories?.length) {
		return locale.value === 'km'
			? // @ts-ignore
			  video.m_b__categories[0]?.name
			: // @ts-ignore
			  video.m_b__categories[0]?.name_en
	}

	return locale.value === 'km'
		? video.post__categories?.[0]?.name || video.post__categories?.[0]?.name_en
		: video.post__categories?.[0]?.name_en || video.post__categories?.[0]?.name
})
</script>
