<template>
	<ul class="list-none divide-y divide-black/30">
		<li v-for="comment in comments" :key="comment.id" class="w-full h-auto py-1 my-1">
			<div class="flex items-center justify-start w-full h-12 rounded-full">
				<CommentIcon />

				<p class="text-lg text-gray-600/90">{{ $t('visitor') }}</p>
			</div>

			<div class="pl-12">
				{{ comment.content }}
			</div>
		</li>
	</ul>
</template>

<script setup lang="ts">
export type Comment = {
	id: number

	content: string
}

type Props = {
	comments: Comment[]
}

defineProps<Props>()
</script>
