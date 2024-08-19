<template>
	<button class="w-32 btn btn-outline" @click="$emit('toggle-preview')">
		{{ isPreview ? 'Back' : 'Preview' }}
	</button>
</template>

<script setup lang="ts">
interface Props {
	isPreview: boolean
}

defineProps<Props>()
defineEmits<{
	(e: 'toggle-preview'): void
}>()
</script>
