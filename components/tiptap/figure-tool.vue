<script setup lang="ts">
import { IconMovie, IconPhoto, IconTable } from '@tabler/icons-vue'

const emit = defineEmits<{
	(e: 'addImage'): void
	(e: 'addTable'): void
	(e: 'addYoutube'): void
}>()
</script>

<template>
	<TiptapToolbarGroup>
		<TiptapToolbarButton label="Image" title="Image" @click="emit('addImage')">
			<IconPhoto class="w-5 h-5" />
		</TiptapToolbarButton>

		<TiptapToolbarButton label="Table" title="Table" @click="emit('addTable')">
			<IconTable class="w-5 h-5" />
		</TiptapToolbarButton>

		<TiptapToolbarButton label="Youtube" title="Youtube" @click="emit('addYoutube')">
			<IconMovie class="w-5 h-5" />
		</TiptapToolbarButton>
	</TiptapToolbarGroup>
</template>
