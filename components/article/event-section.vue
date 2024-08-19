<template>
	<figure v-if="events.length" class="flex flex-col w-full gap-3">
		<figcaption>
			<ArticleSidebarHeader>{{ $t('recent_events') }}</ArticleSidebarHeader>
		</figcaption>

		<ul class="flex flex-col w-full gap-3 list-none">
			<li v-for="event in events" :key="event.id">
				<ArticleSmallCard :article="event" article-path-without-slug="/about-rhac/events/" />
			</li>
		</ul>
	</figure>
</template>

<script setup lang="ts">
import { useCustomerRecentEventsStore } from '~/store/customer/recent-event'
import type { Post } from '~~/api/type'

const events = ref<Post[]>([])

const { getRecentEvents } = useCustomerRecentEventsStore()

const { path } = useRoute()

const setEvents = (data: Post[]) => {
	const filtered = data.filter(post => !path.endsWith(post.slug_en) || !path.endsWith(post.slug_kh))

	events.value = filtered
}

const data = await getRecentEvents()
setEvents(data)
</script>
