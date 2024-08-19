<script setup lang="ts">
const emit = defineEmits<{
	(e: 'click'): void
}>()
</script>

<template>
	<button class="w-10 h-10 p-2 rounded-md" @click="emit('click')">
		<slot></slot>
	</button>
</template>
