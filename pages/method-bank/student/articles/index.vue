<template>
	<div class="container px-6 pt-8 lg:px-0">
		<div class="container">
			<select
				v-model="selectedCategoryId"
				class="w-full max-w-xs text-lg select select-bordered"
				@change="onOptionChange()"
			>
				<option value="" :text="$t('all_categories')">{{ $t('all_categories') }}</option>

				<option v-for="category in categories" :key="category.id" :value="category.id">
					{{ localeCategoryName(category) }}
				</option>
			</select>
		</div>

		<section class="container pb-8">
			<h2 class="relative font-bold text-2xl lg:text-[2.5rem] text-primary my-5 sm:my-8">
				{{ $t('article') }}
			</h2>

			<ArticleList
				:error="Boolean(articleError) || articles.length === 0"
				:pending="articlePending"
				:is-loading-more-post="isLoadingMorePost"
				:is-more-page-available="isMoreArticlePageAvailable"
				:load-more="loadMoreArticle"
			>
				<li
					v-for="article in articles"
					:key="article.id"
					class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2 shadow-lg rounded-lg overflow-hidden"
				>
					<ArticleLargeCard
						:post="article"
						post-detail-path="/method-bank/student/"
						display-read-more-button
					/>
				</li>
			</ArticleList>

			<h2 class="relative font-bold text-2xl lg:text-[2.5rem] text-primary my-5 sm:my-8">
				{{ $t('video_education') }}
			</h2>

			<ArticleList
				:videos="videos"
				:pending="videoPending"
				:error="Boolean(videoError) || videos.length === 0"
				:is-loading-more-post="isLoadingMoreVideo"
				:is-more-page-available="isMoreVideoPageAvailable"
				:load-more="loadMoreVideo"
			>
				<li
					v-for="video in videos"
					:key="video.id"
					class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2 shadow-lg rounded-lg overflow-hidden"
				>
					<ArticleLargeCard :post="video" post-detail-path="/" />
				</li>
			</ArticleList>
		</section>
	</div>
</template>

<script setup lang="ts">
import type { Post, PostCategory, VideoEducation } from '~/api/type'
import { useBaseUrl } from '~/composables'
import type { PaginationMeta } from '~/api'

definePageMeta({
	layout: 'customer'
})

const categories = ref<PostCategory[]>([])
const articles = ref<Post[]>([])
const videos = ref<VideoEducation[]>([])

const baseURL = useBaseUrl()

const {
	query: { category: categoryId }
} = useRoute()

const selectedCategoryId = ref(categoryId as unknown as string | '')

const { locale } = useI18n()

const localeCategoryName = (category: PostCategory) => {
	return locale.value === 'km' ? category.name : category.name_en
}

const videoRequestParams = {
	search: '',
	subtype: '',
	maintype: 'mb_learner',
	limit: 11,
	page: 1
}

const articleRequestParams = {
	search: '',
	type: '',
	subtype: '',
	limit: 11,
	page: 1
}

const updateCategory = () => {
	const selectedCategory = categories.value.find(
		category => category.id === Number(selectedCategoryId.value)
	)

	if (selectedCategory) {
		if (selectedCategory.name) {
			videoRequestParams.subtype = selectedCategory.name
			articleRequestParams.type = selectedCategory.name
		} else if (selectedCategory.name_en) {
			videoRequestParams.subtype = selectedCategory.name_en
			articleRequestParams.type = selectedCategory.name_en
		}
	} else {
		videoRequestParams.subtype = ''
		articleRequestParams.type = ''

		selectedCategoryId.value = ''
	}
}

// Fetch category
const { data: articleCategories } = await useLazyFetch<{ data: PostCategory[] }>(
	`/method_bank_category`,
	{
		baseURL,
		params: { limit: 0 },
		server: false
	}
)

watch(articleCategories, newArticleCategories => {
	if (newArticleCategories?.data) {
		categories.value = newArticleCategories.data

		updateCategory()
	}
})

const onOptionChange = async () => {
	updateCategory()

	articleRequestParams.page = 1
	videoRequestParams.page = 1

	articlePending.value = true
	videoPending.value = true

	const newArticlesPromise = getPosts(articleRequestParams)
	const newVideosPromise = getVideos(videoRequestParams)

	const [newArticles, newVideos] = await Promise.all([newArticlesPromise, newVideosPromise])

	articlePending.value = false
	videoPending.value = false

	videos.value = newVideos
	articles.value = newArticles
}

const {
	getVideos,
	isLoadingMoreVideo,
	isMorePageAvailable: isMoreVideoPageAvailable
} = useMoreVideo()

const {
	data: videoRes,
	pending: videoPending,
	error: videoError
} = useLazyFetch<{ data: VideoEducation[]; meta: PaginationMeta }>('/video?maintype=mb_learner', {
	baseURL: useBaseUrl(),
	params: videoRequestParams,
	server: false
})

watch(videoRes, newVideoRes => {
	if (newVideoRes?.data) {
		videos.value = newVideoRes.data
	}
	if (newVideoRes?.meta) {
		isMoreVideoPageAvailable.value = newVideoRes.meta?.current_page < newVideoRes.meta?.last_page
	}
	// @ts-ignore
	if (newVideoRes?.last_page && newVideoRes?.current_page) {
		// @ts-ignore
		isMoreVideoPageAvailable.value = newVideoRes.current_page < newVideoRes.last_page
	}
})

const loadMoreVideo = async () => {
	videoRequestParams.page += 1

	const morePosts = await getVideos(videoRequestParams)

	videos.value = videos.value.concat(morePosts)
}

const {
	getPosts,
	isLoadingMorePost,
	isMorePageAvailable: isMoreArticlePageAvailable
} = useMoreMBPost('mb_learner')

const {
	data: articleRes,
	pending: articlePending,
	error: articleError
} = useLazyFetch<{ data: Post[]; meta: PaginationMeta }>('/mb_learner', {
	baseURL: useBaseUrl(),
	params: articleRequestParams,
	server: false
})

watch(articleRes, newRes => {
	if (newRes?.data) {
		articles.value = newRes.data
	}

	if (newRes?.meta) {
		isMoreArticlePageAvailable.value = newRes.meta?.current_page < newRes.meta?.last_page
	}
	// @ts-ignore
	if (newRes?.last_page && newRes?.current_page) {
		// @ts-ignore
		isMoreArticlePageAvailable.value = newRes.current_page < newRes.last_page
	}
})

const loadMoreArticle = async () => {
	articleRequestParams.page += 1

	const morePosts = await getPosts(articleRequestParams)

	articles.value = articles.value.concat(morePosts)
}
</script>
