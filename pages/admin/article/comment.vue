<script lang="ts" setup>
import axios from 'axios'
import type { OperationStatus, PaginationMeta } from '~~/api'
import type { Comment } from '~~/api/comment'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const confirmModalId = 'comment-deletion-confirm-modal'

const {
	toast,
	isError,
	isPending,
	isSucceed,
	toastErrorMessage,
	toastPendingMessage,
	toastSuccessMessage,
	toastShouldHide,
	toastAfterFetch
} = useToast()

const comments = ref<Comment[]>([])

const {
	pending,
	data: res,
	error
} = useLazyFetch<{
	data: Comment[]
	meta: PaginationMeta
}>(`/comment`, {
	baseURL: useBaseUrl(),
	server: false
})

watch(res, newRes => {
	if (newRes?.data) {
		comments.value = newRes.data
	}
})

const pendingDeleteId = ref<number>()
const setPendingId = (id: number) => {
	pendingDeleteId.value = id
}

const deleteComment = () => {
	toast('pending', 'deleting comment...')

	if (pendingDeleteId) {
		axios
			.delete(`/comment/${pendingDeleteId.value}`, {
				baseURL: useBaseUrl()
			})
			.then(() => {
				toastShouldHide('pending')
				const operationStatus: OperationStatus = {
					message: 'comment deleted!',
					success: true
				}
				toastAfterFetch(operationStatus)
				comments.value = comments.value.filter(comment => comment.id !== pendingDeleteId.value)
			})
			.catch(() => {
				toast('error', 'cannot delete comment')
			})
	}
}
</script>

<template>
	<div class="text-3xl text-primary">Comments</div>

	<ul v-if="!pending" class="grid w-full gap-2 py-2 lg:grid-cols-2">
		<li
			v-for="comment in comments"
			:key="comment.id"
			class="relative p-2 space-y-2 list-none bg-white rounded-lg shadow-lg"
		>
			<AdminCommentCard
				:comment="comment"
				:confirm-modal-id="confirmModalId"
				:set-pending-id="setPendingId"
			/>
		</li>
	</ul>
	<div v-else-if="!error">Loading...</div>
	<div v-else class="text-red-500">Error!</div>

	<ConfirmCard
		:id="confirmModalId"
		msg="Are you sure you want to delete this comment?"
		title="DELETE COMMENT"
		:on-confirm="deleteComment"
	/>

	<div class="toast toast-end">
		<ToastStatus
			:pending="isPending"
			:error="isError"
			:succeed="isSucceed"
			:should-hide="toastShouldHide"
			:pending-message="toastPendingMessage"
			:error-message="toastErrorMessage"
			:success-message="toastSuccessMessage"
		/>
	</div>
</template>
