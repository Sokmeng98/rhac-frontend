<template>
	<Dialog title="Add link" :show="show" @close="closeDialog">
		<form @submit.prevent="update">
			<div class="flex flex-col space-y-5">
				<InputContainer>
					<LabelComponent for="input-link-url">Enter a valid link</LabelComponent>
					<InputComponent id="input-link-url" v-model="inputLinkRef" type="url" />
				</InputContainer>

				<label for="as-button" class="cursor-pointer select-none">
					<input
						id="as-button"
						v-model="isButton"
						type="checkbox"
						name="As Button"
						class="w-4 h-4"
					/>
					As Button
				</label>

				<!-- Button Style -->
				<div class="p-3 border border-dashed rounded-md" :class="isButton ? 'block' : 'hidden'">
					<fieldset class="space-y-1">
						<legend class="text-sm text-gray-600">Padding:</legend>

						<div class="flex gap-4">
							<div class="flex items-center gap-1 select-none">
								<input
									id="padding-x-button"
									v-model="selectedPaddingX"
									type="checkbox"
									name="background"
									class="w-4 h-4 cursor-pointer"
								/>
								<label for="padding-x-button" class="capitalize">Left Right</label>
							</div>

							<div class="flex items-center gap-1 select-none">
								<input
									id="padding-y-button"
									v-model="selectedPaddingY"
									type="checkbox"
									name="background"
									class="w-4 h-4 cursor-pointer"
								/>
								<label for="padding-y-button" class="capitalize">Top Bottom</label>
							</div>
						</div>
					</fieldset>

					<fieldset
						class="mt-4 space-y-1"
						@input="
							event => {
								//@ts-ignore
								selectedBackgroundColor = event.target?.value
							}
						"
					>
						<legend class="text-sm text-gray-600">Background color:</legend>

						<div class="flex flex-wrap gap-4">
							<div v-for="color in colors" :key="color" class="flex items-center gap-1 select-none">
								<input
									:id="`color-${color}`"
									type="radio"
									name="background"
									:value="`${color}`"
									class="w-4 h-4 cursor-pointer"
								/>
								<label :for="`color-${color}`" class="capitalize">{{ color }}</label>
							</div>
						</div>
					</fieldset>

					<input
						id="color-reset"
						type="reset"
						name="reset"
						class="p-2 mt-5 text-white bg-teal-700 rounded-md cursor-pointer"
						@click="onReset"
					/>
				</div>

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
						Submit
					</button>
				</div>
			</div>
		</form>
	</Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Dialog from './dialog.vue'
import LabelComponent from './label.vue'
import InputComponent from './input.vue'
import InputContainer from './input-container.vue'

const props = defineProps<{ show: boolean; currentUrl?: string }>()

export type ColorSet = 'black' | 'blue' | 'green' | 'yellow' | 'rose' | 'orange' | 'teal' | 'cyan'
export type Button = { color?: ColorSet; paddingX?: boolean; paddingY?: boolean }
const colors: ColorSet[] = ['black', 'blue', 'green', 'yellow', 'rose', 'orange', 'teal', 'cyan']

const selectedPaddingX = ref(true)
const selectedPaddingY = ref(false)

const selectedBackgroundColor = ref<ColorSet>()

const onReset = () => {
	selectedPaddingX.value = true
	selectedPaddingY.value = false

	selectedBackgroundColor.value = undefined
}

const inputLinkRef = ref<string>()
const isButton = ref(false)

const emit = defineEmits<{
	(e: 'close'): void
	(e: 'update', url?: string, button?: Button): void
}>()

function closeDialog() {
	emit('close')
}

function update() {
	emit(
		'update',
		inputLinkRef.value,
		isButton.value
			? {
					color: selectedBackgroundColor.value,
					paddingX: selectedPaddingX.value,
					paddingY: selectedPaddingY.value
			  }
			: undefined
	)
	emit('close')
}

onMounted(() => {
	inputLinkRef.value = props.currentUrl ?? ''
})
</script>
