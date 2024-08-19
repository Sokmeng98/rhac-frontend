<template>
	<NuxtLink :to="routeUrl">
		<Icon icon="twemoji:flag-cambodia" :height="24" />
	</NuxtLink>
</template>

<script setup lang="ts">
interface Props {
	routeUrl: string
}

defineProps<Props>()
</script>
