<template>
	<Dialog title="Add Youtube Video " :show="show" class="z-50" @close="closeDialog">
		<form @submit.prevent="onSubmit">
			<div class="flex flex-col space-y-5">
				<InputContainer>
					<Label for="input-add-youtube-url">Embedable Youtube Link</Label>
					<Input id="input-add-youtube-url" v-model="inputYoutubeUrlRef" type="url" required />
				</InputContainer>
				<div class="flex flex-row justify-end space-x-3">
					<button
						type="button"
						class="px-4 py-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
						@click="closeDialog"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="px-4 py-3 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-opacity-80"
					>
						Add
					</button>
				</div>
			</div>
		</form>
	</Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from './dialog.vue'
import InputContainer from './input-container.vue'
import Input from './input.vue'
import Label from './label.vue'

defineProps<{
	show: boolean
}>()

const emit = defineEmits(['close', 'insert'])

const inputYoutubeUrlRef = ref<string>('')

function closeDialog() {
	emit('close')
}

function onSubmit() {
	emit('insert', inputYoutubeUrlRef.value)
	inputYoutubeUrlRef.value = ''
	closeDialog()
}
</script>
