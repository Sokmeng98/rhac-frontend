<template>
	<button
		class="w-32 text-white border-none btn bg-[#009987] hover:bg-[#038575]"
		@click.prevent="$emit('click')"
	>
		{{ text }}
	</button>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
defineEmits<{
	(e: 'click'): void
}>()
</script>
