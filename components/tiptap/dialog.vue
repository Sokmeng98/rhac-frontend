<template>
	<TransitionRoot appear :show="show" as="template">
		<Dialog as="div" :open="show" class="relative z-10" @close="closeDialog">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex items-center justify-center min-h-full p-6 text-center">
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel
							:class="[maxWidth ?? 'max-w-md']"
							class="flex flex-col w-full p-6 space-y-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl"
						>
							<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">{{
								title
							}}</DialogTitle>
							<slot />
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'

defineProps<{
	show: boolean
	title: string
	maxWidth?: string
}>()

const emit = defineEmits(['close'])

function closeDialog() {
	emit('close')
}
</script>
