<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { twMerge } from 'tailwind-merge'
import type { Post } from '~/api/type'

type Props = {
	article: Post
	// The base path would be "/"
	articlePathWithoutSlug: string
	hideDate?: boolean
	class?: string
	metaItemsClassName?: string
}

const { articlePathWithoutSlug, article } = defineProps<Props>()

const { locale } = useI18n()

const title = computed(() => {
	return locale.value === 'km'
		? article.title_kh || article.title_en
		: article.title_en || article.title_kh
})

const slug = computed(() => {
	return locale.value === 'km'
		? article.slug_kh || article.slug_en
		: article.slug_en || article.slug_kh
})

const link = computed(() => {
	return articlePathWithoutSlug.endsWith('/')
		? articlePathWithoutSlug + slug.value
		: articlePathWithoutSlug + '/' + slug.value
})

const date = computed(() => {
	if (article.date || article.updated_at || article.created_at)
		return dayjs(article.date || article.updated_at || article.created_at)
			.locale(locale.value)
			.format('DD MMM, YYYY')
	else return ''
})

const category = computed(() => {
	if (article.m_b__categories) {
		return locale.value === 'km'
			? // TODO: Fix this
			  article.m_b__categories[0].name || article.m_b__categories[0].name_en
			: article.m_b__categories[0].name_en || article.m_b__categories[0].name
	}

	if (article.post__categories) {
		return locale.value === 'km'
			? article.post__categories[0].name || article.post__categories[0].name_en
			: article.post__categories[0].name_en || article.post__categories[0].name
	}

	if ((article as Post).grade) {
		return article.grade?.[0] || ''
	}
})
</script>

<template>
	<NuxtLink
		class="relative flex flex-row items-center w-full h-20 gap-3 text-lg rounded-md cursor-pointer flex-nowrap group focus:outline-none focus-visible:ring-2 ring-0 ring-yellow-400 ring-offset-0 focus-visible:ring-offset-2 ring-offset-transparent"
		:to="link"
	>
		<figure
			class="h-full relative aspect-[100/66.6] max-w-[120px] rounded-lg overflow-hidden flex items-center"
		>
			<img
				loading="lazy"
				fit="cover"
				format="webp"
				:src="useFilePath(article.image?.replace(/.webp$/, '-sm.webp'))"
				:alt="title"
				width="120"
				height="80"
				class="object-cover w-full h-full"
			/>
		</figure>

		<div class="relative flex-1 h-full">
			<div class="flex flex-col justify-between h-full">
				<h3
					class="h-auto text-lg line-clamp-2 group-hover:underline group-focus:underline"
					:title="title"
				>
					{{ title }}
				</h3>

				<div :class="twMerge('flex items-center gap-6', metaItemsClassName)">
					<div
						v-if="!hideDate && date !== ''"
						class="flex items-center gap-2 lg:hidden xl:flex"
						:title="date"
					>
						<Icon icon="uiw:date" size="18" class="flex-shrink-0" />
						<span class="text-sm line-clamp-1">{{ date }}</span>
					</div>

					<div v-if="category" class="flex items-center gap-2" :title="category">
						<icon icon="octicon:stack-24" size="18" />
						<span class="text-sm line-clamp-1">{{ category }}</span>
					</div>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>
