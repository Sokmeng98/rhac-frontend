<script setup lang="ts">
defineProps<{
	link: string
}>()
</script>

<template>
	<NuxtLink
		:to="link"
		class="bg-primary text-white hover:bg-green-700 btn min-w-[200px] text-lg focus-visible:bg-yellow-600 ring-0 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-2 ring-yellow-400 border-0 focus:outline-none"
	>
		<slot></slot>
	</NuxtLink>
</template>
