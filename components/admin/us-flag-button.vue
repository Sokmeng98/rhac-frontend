<template>
	<NuxtLink :to="routeUrl">
		<Icon icon="twemoji:flag-united-states" :height="24" />
	</NuxtLink>
</template>

<script setup lang="ts">
interface Props {
	routeUrl: string
}

defineProps<Props>()
</script>
