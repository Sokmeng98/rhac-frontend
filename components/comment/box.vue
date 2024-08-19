<template>
	<form class="flex w-full h-auto rounded-full bg-gray-50" @submit.prevent="submitForm()">
		<CommentIcon />

		<textarea
			v-model="content"
			class="w-full h-12 py-3 pr-3 overflow-hidden bg-transparent rounded-md appearance-none resize-none min-h-12 max-h-max focus:outline-none"
			:placeholder="$t('your_comment') + '...'"
		></textarea>

		<button
			:disabled="isAddingNewComment"
			class="flex items-center justify-center h-12 aspect-square text-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				class="w-5 h-5 transition-transform scale-125 rotate-90 skew-x-[15deg] -skew-y-[20deg] drop-shadow-lg hover:scale-150"
			>
				<path
					fill="currentColor"
					d="M10.9 2.55a1 1 0 0 0-1.8 0l-7 14a1 1 0 0 0 1.17 1.41l5-1.43a1 1 0 0 0 .73-.96V11a1 1 0 1 1 2 0v4.57a1 1 0 0 0 .72.96l5 1.43a1 1 0 0 0 1.17-1.4l-7-14Z"
				/>
			</svg>
		</button>
	</form>
</template>

<script setup lang="ts">
const { onSubmit } = defineProps<{
	onSubmit: (content: string) => void
	isAddingNewComment: boolean
}>()

const content = ref('')

const submitForm = () => {
	if (content.value !== '') {
		onSubmit(content.value)

		content.value = ''
	}
}
</script>
