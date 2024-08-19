<template>
	<section class="prose" v-html="content"></section>
</template>

<script setup lang="ts">
import type { Post } from '~~/api/type'

type Props = {
	post: Post
}

const { post } = defineProps<Props>()

const { locale } = useI18n()

const content = computed(() => {
	return locale.value === 'km'
		? post.content_kh || post.content_en
		: post.content_en || post.content_kh
})
</script>
