<template>
	<section class="flex flex-col w-full h-auto gap-4 px-4 py-4 mt-8 rounded-md bg-secondary/20">
		<div class="">
			<p class="my-2 text-2xl">{{ $t('comment') }}</p>

			<div class="w-full h-auto rounded-md min-h-12">
				<CommentBox :on-submit="addComment" :is-adding-new-comment="isAddingNewComment" />
				<p v-if="isErrorAddingComment" class="pl-12 text-lg tracking-wide text-red-700">Error!</p>
			</div>

			<div class="w-full h-auto mt-2 rounded-md min-h-12">
				<CommentListSkeleton v-if="pending" class="animate-pulse" />

				<CommentList :comments="comments" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '~/api'
import { createCommentAPI } from '~~/api/comment'
import type { CommentType } from '~~/api/comment'

export type Comment = {
	id: number
	content: string
	replies?: Comment[]
}

const comments = ref<Comment[]>([])
const isAddingNewComment = ref(false)
const isErrorAddingComment = ref(false)

const { postId, postType } = defineProps<{
	postId: number
	postType: CommentType
}>()

const { pending, data: res } = useLazyFetch<{
	data: Comment[]
	meta: PaginationMeta
}>(`/comment?id=${postId}&type=${postType}`, {
	baseURL: useBaseUrl(),
	server: false
})

watch(res, newRes => {
	if (newRes) {
		comments.value = newRes.data
	}
})

const addComment = async (content: string) => {
	if (isAddingNewComment.value) return

	const payload = new FormData()

	payload.append('content', content)
	switch (postType) {
		case 'mb_learner':
			payload.append('mb_learner_id', postId.toString())
			break
		case 'mb_professional':
			payload.append('mb_professional_id', postId.toString())
			break
		case 'post':
			payload.append('post_id', postId.toString())
			break
	}

	isAddingNewComment.value = true
	const res = await createCommentAPI(payload)
	isAddingNewComment.value = false

	if (res.success && res.data) {
		comments.value = [res.data, ...comments.value]
	} else {
		isErrorAddingComment.value = true
	}
}
</script>
