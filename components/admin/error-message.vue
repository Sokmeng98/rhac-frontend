<template>
	<span class="text-xs text-red-700">
		{{ message }}
	</span>
</template>

<script setup lang="ts">
defineProps<{ message: string }>()
</script>
