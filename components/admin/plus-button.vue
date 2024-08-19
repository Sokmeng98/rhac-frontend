<template>
	<NuxtLink :to="routeUrl">
		<Icon icon="ic:baseline-plus" color="#009987" class="w-6" />
	</NuxtLink>
</template>

<script setup lang="ts">
interface Props {
	routeUrl: string
}

defineProps<Props>()
</script>
