<template>
	<Iconify :icon="icon" :width="size" :height="size" :color="color" />
</template>

<script setup lang="ts">
import { Icon as Iconify } from '@iconify/vue'

type Props = {
	icon: string
	size?: string
	color?: string
}

defineProps<Props>()
</script>
