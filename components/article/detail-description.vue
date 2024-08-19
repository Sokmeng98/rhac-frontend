<template>
	<figure class="flex flex-col w-full gap-6">
		<img
			class="flex-shrink-0 object-cover max-h-[30rem] w-full rounded-md aspect-video bg-slate-100"
			:alt="title"
			loading="lazy"
			:src="useFilePath(post.image)"
			:srcset="`
								${useFilePath(post.image?.replace('.webp', '-md.webp'))} 620w,
								${useFilePath(post.image?.replace('.webp', '-lg.webp'))} 740w,
							`"
			sizes="(max-width: 768px) 620px, 740px"
		/>

		<figcaption class="flex flex-col gap-4">
			<h1 class="text-primary sm:text-3xl xl:text-4xl">
				{{ title }}
			</h1>

			<div class="flex flex-row gap-3 text-gray-500 sm:gap-6">
				<div class="flex flex-row items-center gap-1 sm:gap-2">
					<Icon class="lg:hidden" icon="uiw:date" size="12" />
					<Icon class="hidden lg:block" icon="uiw:date" size="16" />

					<time
						:datetime="post.updated_at || post.created_at"
						class="text-xs font-normal sm:text-sm lg:text-base"
					>
						{{ date }}
					</time>
				</div>

				<div class="flex flex-row items-center flex-shrink gap-1 truncate sm:gap-2">
					<Icon class="lg:hidden" icon="octicon:stack-24" size="13" />
					<Icon class="hidden lg:block" icon="octicon:stack-24" size="18" />
					<span class="flex-1 text-xs font-normal truncate sm:text-sm lg:text-base">
						{{ category }}
					</span>
				</div>

				<div class="flex flex-row items-center gap-1 sm:gap-2">
					<Icon class="lg:hidden" icon="akar-icons:eye" size="13" />
					<Icon class="hidden lg:block" icon="akar-icons:eye" size="18" />
					<span class="text-xs font-normal sm:text-sm lg:text-base">{{ post.view }}</span>
				</div>
			</div>
		</figcaption>
	</figure>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { Post } from '~/api/type'

const { post } = defineProps<{
	post: Post
}>()

const { locale } = useI18n()

const title = computed(() => {
	return locale.value === 'km' ? post.title_kh || post.title_en : post.title_en || post.title_kh
})

const date = computed(() => {
	return dayjs(post.date || post.created_at || post.updated_at)
		.locale(locale.value)
		.format('DD MMMM, YYYY')
})

const category = computed(() => {
	if (post.post__categories && post.post__categories.length > 0) {
		return locale.value === 'km'
			? post.post__categories[0].name || post.post__categories[0].name_en
			: post.post__categories[0].name_en || post.post__categories[0].name
	} else if (post.m_b__categories && post.m_b__categories.length) {
		return locale.value === 'km'
			? post.m_b__categories[0].name || post.m_b__categories[0].name_en
			: post.m_b__categories[0].name_en || post.m_b__categories[0].name
	}
	return ''
})
</script>
