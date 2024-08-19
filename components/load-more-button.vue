<template>
	<button
		class="flex items-center justify-center w-full h-24 btn-link btn text-primary no-animation bg-gradient-to-t from-white to-white/15"
		:class="`${isLoading ? 'loading' : ''}`"
		@click="emits('click')"
	>
		<Icon v-if="!isLoading" icon="bytesize:chevron-bottom" size="36" class="drop-shadow-xl" />
	</button>
</template>

<script setup lang="ts">
type Props = {
	isLoading: boolean
}
defineProps<Props>()

const emits = defineEmits<{
	(e: 'click'): void
}>()
</script>
