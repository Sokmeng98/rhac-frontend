<template>
	<input :id="id" v-model="toggle" type="checkbox" class="modal-toggle" />
	<label class="cursor-pointer modal" :for="id">
		<label class="relative flex flex-col modal-box gap-y-5" for="">
			<p class="text-4xl font-bold text-center">{{ title }}</p>

			<div class="flex justify-center gap-2">
				<Icon icon="material-symbols:info-outline-rounded" class="w-6 h-6"></Icon>
				<span>{{ msg }}</span>
			</div>

			<div class="flex justify-center py-2 gap-x-4">
				<label class="px-6 border border-black rounded-full cursor-pointer" :for="id">
					<p class="py-2">{{ cancelText }}</p>
				</label>

				<label class="px-6 bg-red-700 rounded-full cursor-pointer" :for="id" @click="onConfirm()">
					<p class="py-2 text-white">{{ confirmText }}</p>
				</label>
			</div>
		</label>
	</label>
</template>

<script setup lang="ts">
type Props = {
	id: string
	title: string
	msg: string
	cancelText?: string
	confirmText?: string
	onConfirm: () => void

	onToggle?: (value: boolean) => void
}

const { onToggle } = withDefaults(defineProps<Props>(), {
	cancelText: 'No',
	confirmText: 'Yes',
	onToggle: () => {}
})

const toggle = ref(false)

watch(toggle, newValue => {
	onToggle?.(newValue)
})
</script>
