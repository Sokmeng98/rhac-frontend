<template>
	<label
		class="px-4 py-1 text-sm font-normal leading-6 text-white bg-red-500 cursor-pointer hover:bg-red-700 rounded-2xl"
		:for="confirmModalId"
		@click="onClick"
	>
		Delete
	</label>
</template>

<script setup lang="ts">
interface Props {
	confirmModalId: string
}

defineProps<Props>()

const emit = defineEmits<{
	(e: 'click'): void
}>()

const onClick = () => {
	emit('click')
}
</script>
