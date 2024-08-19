<template>
	<nuxt-link
		:to="routeUrl"
		class="px-4 py-1 text-sm font-normal leading-6 text-white bg-blue-500 hover:bg-blue-700 rounded-2xl"
	>
		Edit
	</nuxt-link>
</template>

<script setup lang="ts">
interface Props {
	routeUrl: string
}

defineProps<Props>()
</script>
