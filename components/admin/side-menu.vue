<template>
	<menu
		class="flex flex-col items-center w-full h-full gap-2 px-4 text-base list-none"
		aria-label="Main menu"
	>
		<li
			v-for="item in items"
			:key="item.id"
			class="relative w-full"
			:class="[$route.path === item.link && !item.tabs ? 'bg-[#ECFAF9] rounded-md' : '']"
		>
			<AdminSideMenuItem :item="item" />
		</li>
	</menu>
</template>

<script setup lang="ts">
import type { MenuItem } from './side-menu-item.vue'

const items: MenuItem[] = [
	{
		id: 0,
		icon: 'humbleicons:dashboard',
		name: 'Dashboard',
		link: `/admin`
	},

	{
		id: 1,
		icon: 'clarity:organization-line',
		name: 'Organization',
		link: `/admin/organization`
	},

	{
		id: 2,
		icon: 'ph:books-light',
		name: 'Method Bank',
		selfLink: `/admin/method-bank`,
		link: `/admin/method-bank/learner`,
		tabs: [
			{
				id: 0,
				name: 'For Learner',
				link: `/admin/method-bank/learner`
			},
			{
				id: 1,
				name: 'For Professor',
				link: `/admin/method-bank/professor`
			},
			{
				id: 2,
				name: 'Books & PDF',
				link: `/admin/method-bank/book-and-pdf`
			},
			{
				id: 3,
				name: 'Learning Categories',
				link: `/admin/method-bank/learning-categories`
			},
			{
				id: 4,
				name: 'Publication',
				link: `/admin/method-bank/publication`
			},
			{
				id: 5,
				name: 'Categories',
				link: `/admin/method-bank/categories`
			}
		]
	},

	{
		id: 3,
		icon: 'fluent:news-24-regular',
		name: 'Article',
		selfLink: `/admin/article`,
		link: `/admin/article`,
		tabs: [
			{
				id: 0,
				name: 'All Post',
				link: `/admin/article`
			},
			{
				id: 1,
				name: 'Add New Post',
				link: `/admin/article/new`
			},
			{
				id: 2,
				name: 'Categories',
				link: `/admin/article/categories`
			},
			{
				id: 3,
				name: 'Comments',
				link: `/admin/article/comment`
			}
		]
	},

	{
		id: 4,
		icon: 'ph:suitcase-simple',
		name: 'Career',
		link: '/admin/career'
	},

	{
		id: 5,
		icon: 'system-uicons:camera',
		name: 'Media',
		selfLink: `/admin/media`,
		link: `/admin/media/video`,
		tabs: [
			{
				id: 1,
				name: 'Video',
				link: `/admin/media/video`
			},
			{
				id: 2,
				name: 'Gallery',
				link: `/admin/media/gallery`
			}
		]
	},

	{
		id: 6,
		icon: 'wpf:faq',
		name: 'FAQs',
		link: `/admin/faqs`
	}
]
</script>
