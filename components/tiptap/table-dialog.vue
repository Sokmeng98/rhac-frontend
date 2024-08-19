<template>
	<Dialog title="Create Table" :show="show" @close="closeDialog">
		<form @submit.prevent="onSubmit">
			<div class="flex flex-col space-y-5">
				<div class="flex flex-row space-x-5">
					<InputContainer class="flex-1 w-full">
						<Label for="input-table-columns">Column</Label>
						<Input
							id="input-table-columns"
							v-model="inputColumnsRef"
							required
							type="number"
							min="1"
							class="w-full"
						/>
					</InputContainer>
					<InputContainer class="flex-1 w-full">
						<Label for="input-table-rows">Row</Label>
						<Input
							id="input-table-rows"
							v-model="inputRowsRef"
							required
							type="number"
							min="1"
							class="w-full"
						/>
					</InputContainer>
				</div>
				<SwitchGroup>
					<div class="flex flex-row items-center space-x-3">
						<Switch
							v-model="inputWithHeaderRef"
							:class="inputWithHeaderRef ? 'bg-blue-600' : 'bg-gray-200'"
							class="relative inline-flex items-center h-6 transition-colors rounded-full w-11 shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<span
								:class="inputWithHeaderRef ? 'translate-x-6' : 'translate-x-1'"
								class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
							/>
						</Switch>
						<SwitchLabel class="text-sm text-gray-600 select-none">Table Header</SwitchLabel>
					</div>
				</SwitchGroup>
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
						Create
					</button>
				</div>
			</div>
		</form>
	</Dialog>
</template>

<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { ref } from 'vue'
import Dialog from './dialog.vue'
import InputContainer from './input-container.vue'
import Input from './input.vue'
import Label from './label.vue'

type Table = {
	columns: number
	rows: number
	withHeader: boolean
}

defineProps<{
	show: boolean
}>()

const emit = defineEmits<{
	(e: 'close'): void
	(e: 'insert', table: Table): void
}>()

const inputColumnsRef = ref<number>(3)
const inputRowsRef = ref<number>(3)
const inputWithHeaderRef = ref<boolean>(true)

function closeDialog() {
	emit('close')
}

function onSubmit() {
	emit('insert', {
		rows: inputRowsRef.value,
		columns: inputColumnsRef.value,
		withHeader: inputWithHeaderRef.value
	})
	closeDialog()
}
</script>
