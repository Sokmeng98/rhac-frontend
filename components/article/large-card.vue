<template>
	<article>
		<figure class="relative w-full overflow-hidden">
			<iframe
				v-if="
					(post as Post).image?.startsWith('https://www.youtube.com') ||
					(post as VideoEducation).video_url
				"
				class="relative w-full bg-black aspect-video"
				:src="(post as Post).image || (post as VideoEducation).video_url"
				:title="$t('youtube_video')"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			>
			</iframe>

			<NuxtLink v-else :to="url">
				<img
					loading="lazy"
					format="webp"
					class="object-cover w-full text-white transition-transform duration-300 ease-in bg-black aspect-video lg:hover:scale-105 motion-reduce:lg:hover:scale-100"
					:src="useFilePath((post as Post).image?.replace(/.webp$/, '-md.webp'))"
					:alt="title"
				/>
			</NuxtLink>
		</figure>

		<section class="flex flex-col gap-2 p-4">
			<NuxtLink
				v-if="url"
				:to="url"
				:aria-label="title"
				class="text-base font-bold lg:text-lg line-clamp-2 hover:text-primary hover:underline"
				:title="title"
			>
				{{ title }}
			</NuxtLink>

			<p v-else class="text-base font-bold lg:text-lg line-clamp-2">
				{{ title }}
			</p>

			<section class="flex gap-6 text-gray-500">
				<div class="flex items-center gap-2">
					<Icon icon="uiw:date" size="18" class="flex-shrink-0" />

					<time :title="date" :datetime="date" class="text-sm 2xl:text-base line-clamp-1">
						{{ date }}
					</time>
				</div>

				<div v-if="category" class="flex items-center gap-2">
					<Icon icon="octicon:stack-24" size="18" class="flex-shrink-0" />
					<span :title="category" class="text-sm 2xl:text-base line-clamp-1">
						{{ category }}
					</span>
				</div>
			</section>

			<address class="text-sm text-gray-500 2xl:text-base empty:hidden">
				{{ (post as Post).author ? `${$t('article_by')}: ${(post as Post).author}` : '' }}
			</address>

			<div v-if="displayReadMoreButton" class="flex w-full text-end">
				<NuxtLink class="flex items-center ml-auto capitalize group text-primary" :to="url">
					{{ $t('read_more') }}

					<icon
						class="duration-300 ease-in-out group-hover:translate-x-1"
						icon="akar-icons:arrow-right"
						size="20"
					/>
				</NuxtLink>
			</div>
		</section>
	</article>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { Post, VideoEducation } from '~~/api/type'

const { post, postDetailPath, displayEducatorCategory, displaySubCategory } = defineProps<{
	post: Post | VideoEducation
	/**
	 * Path to post detail page. path without slug
	 */
	postDetailPath: string
	displayReadMoreButton?: boolean
	/**
	 * Whether to display educator category when use this card for method bank.
	 */
	displayEducatorCategory?: boolean
	/**
	 * Whether to display sub category instead of main category.
	 */
	displaySubCategory?: boolean
}>()

const { locale, t } = useI18n()

const title = computed(() => {
	return locale.value === 'km' ? post.title_kh || post.title_en : post.title_en || post.title_kh
})

const date = computed(() => {
	return dayjs((post as Post).date || post.created_at || post.updated_at)
		.locale(locale.value)
		.format('DD MMM, YYYY')
})

const category = computed<string>(() => {
	if (displayEducatorCategory) {
		const category = post.mb_professional?.[0] || (post as Post).grade?.[0]

		switch (category) {
			case 'Grade 5&6':
				return t('primary_school_grade')
			case 'Grade 7-9':
				return t('secondary_school_grade')
			case 'Grade 10-12':
				return t('high_school_grade')
		}
	}

	if (displaySubCategory) {
		const subCategory =
			locale.value === 'km'
				? post.post__subcategories?.[0]?.name
				: post.post__subcategories?.[0]?.name_en

		if (subCategory) {
			return subCategory
		}
	}

	// @ts-ignore
	if (post.category?.length) {
		// @ts-ignore
		return locale.value === 'km' ? post.category[0]?.name : post.category[0]?.name_en
	}

	if (post.m_b__categories?.length) {
		return locale.value === 'km' ? post.m_b__categories[0]?.name : post.m_b__categories[0]?.name_en
	}

	return locale.value === 'km'
		? post.post__categories?.[0]?.name || post.post__categories?.[0]?.name_en
		: post.post__categories?.[0]?.name_en || post.post__categories?.[0]?.name
})

const url = computed(() => {
	const slug =
		locale.value === 'km'
			? (post as Post).slug_kh || (post as Post).slug_en
			: (post as Post).slug_en || (post as Post).slug_kh

	if (slug) {
		if (!postDetailPath) return '/' + slug
		return postDetailPath.endsWith('/') ? postDetailPath + slug : postDetailPath + '/' + slug
	}
})
</script>
