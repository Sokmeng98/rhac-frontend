<template>
	<h2 :class="twMerge('relative flex justify-center', className)">
		<span class="text relative font-bold text-2xl lg:text-[2.5rem] text-primary">
			<slot></slot>
		</span>
	</h2>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

defineProps<{
	className?: string
}>()
</script>

<style scoped>
.text:before {
	content: '';
	@apply lg:hidden left-1/2 -translate-x-1/2 absolute block w-[90px] h-[2px] rounded-xl  bottom-0 bg-primary;
}
</style>
