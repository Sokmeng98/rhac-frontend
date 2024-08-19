<template>
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7">
		<template v-for="video in videos" :key="video.id">
			<VideoCard :video="video" />
		</template>
	</div>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '~/api'

import type { VideoEducation } from '~/api/type'

type Props = {
	videoType?: 'mb_learner' | 'mb_professional' | 'post'
}

const { videoType } = defineProps<Props>()

const videos = ref<VideoEducation[]>()
const videosMeta = ref<PaginationMeta>()

const { data: res } = await useFetch<{ data: VideoEducation[]; meta: PaginationMeta }>(
	`/video?limit=6${videoType ? '&maintype=' + videoType : undefined}`,
	{
		baseURL: useBaseUrl()
	}
)

if (res.value) {
	videos.value = res.value.data
	videosMeta.value = res.value.meta
}
</script>
