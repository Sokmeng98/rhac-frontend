<template>
	<main class="container px-6 pt-5 lg:px-0">
		<div class="container">
			<div class="my-5 lg:w-full">
				<div class="w-64 p-1 overflow-hidden">
					<CategorySelect :categories="categories" @change="onCategoryChange" />
				</div>
			</div>

			<section>
				<ArticleList
					:is-more-page-available="isMorePageAvailable"
					:is-loading-more-post="isLoadingMoreVideo"
					:load-more="loadMore"
					:pending="pending"
					:error="Boolean(error)"
				>
					<li
						v-for="video in videos"
						:key="video.id + category"
						class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2 shadow-lg rounded-lg overflow-hidden"
					>
						<ArticleLargeCard
							:post="video"
							post-detail-path="/"
							:display-educator-category="displayEducatorCategory"
						/>
					</li>
				</ArticleList>

				<div class="my-10 font-semibold">
					<p v-if="category === 'mb_learner'" class="text-lg">{{ $t('methodbank_for_student') }}</p>
					<p v-if="category === 'mb_professional'" class="text-lg">
						{{ $t('methodbank_for_educator') }}
					</p>
				</div>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '~/api'
import type { VideoEducation, PostCategory } from '~~/api/type'

definePageMeta({
	layout: 'customer'
})

const videos = ref<VideoEducation[]>([])

const category = ref<'mb_learner' | 'mb_professional' | ''>('')
const displayEducatorCategory = ref(false)

const baseURL = useBaseUrl()

const categories: PostCategory[] = [
	{
		id: 1,
		name: 'សិស្ស',
		name_en: 'Student',

		slug_kh: 'សិស្ស',
		slug_en: 'Student',
		post__subcategories: []
	},

	{
		id: 2,
		name: 'គ្រូបង្រៀន',
		name_en: 'Educator',

		slug_kh: 'គ្រូបង្រៀន',
		slug_en: 'Educator',
		post__subcategories: []
	}
]

const { getVideos, isLoadingMoreVideo, isMorePageAvailable } = useMoreVideo()

const filteredPostsParams = {
	maintype: '',
	limit: 11,
	page: 1
}

const {
	data: res,
	pending,
	error
} = await useLazyFetch<{ data: VideoEducation[]; meta: PaginationMeta }>(`/video`, {
	baseURL,
	params: filteredPostsParams,
	server: false
})

watch(res, newRes => {
	if (newRes?.data) videos.value = newRes?.data || []

	if (newRes?.meta) {
		isMorePageAvailable.value = newRes.meta.current_page < newRes.meta.last_page
		// @ts-ignore
	} else if (newRes.current_page && newRes.last_page) {
		// @ts-ignore
		isMorePageAvailable.value = newRes.current_page < newRes.last_page
	}
})

const loadMore = async () => {
	filteredPostsParams.page += 1

	const moreVideos = await getVideos(filteredPostsParams)
	videos.value = videos.value.concat(moreVideos)
}

const onCategoryChange = async (id: number | string) => {
	switch (id) {
		case 1:
			filteredPostsParams.maintype = 'mb_learner'
			category.value = 'mb_learner'
			displayEducatorCategory.value = false
			break
		case 2:
			filteredPostsParams.maintype = 'mb_professional'
			category.value = 'mb_professional'
			displayEducatorCategory.value = true
			break
		default:
			filteredPostsParams.maintype = ''
			category.value = ''
			displayEducatorCategory.value = false
			break
	}

	filteredPostsParams.page = 1
	const moreVideos = await getVideos(filteredPostsParams)
	videos.value = moreVideos
}
</script>
