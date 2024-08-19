<template>
	<h2 class="heading" :class="align">{{ text }}</h2>
</template>

<script setup lang="ts">
interface Props {
	align?: string
	text?: string
}

defineProps<Props>()
</script>

<style scoped>
.heading {
	@apply relative font-bold text-[24px] lg:text-[32px] xl:text-[40px];
}
.heading:before {
	content: '';
	@apply lg:hidden absolute block w-[90px] h-[2px] rounded-xl left-0 bottom-0 bg-primary;
}
.heading.center {
	@apply text-center flex justify-center;
}
.heading.center::before {
	@apply bg-primary left-1/2 -translate-x-1/2;
}
</style>
