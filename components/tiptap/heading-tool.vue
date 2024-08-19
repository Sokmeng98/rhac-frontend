<script setup lang="ts">
import { IconH1, IconH2, IconH3 } from '@tabler/icons-vue'
import { Editor } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()
</script>

<template>
	<TiptapToolbarGroup>
		<TiptapToolbarButton
			label="Heading 1"
			title="Heading 1. Ctrl Alt 1"
			:is-active="editor?.isActive('heading', { level: 1 })"
			@click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
		>
			<IconH1 class="w-5 h-5" />
		</TiptapToolbarButton>
		<TiptapToolbarButton
			label="Heading 2"
			title="Heading 2. Ctrl Alt 2"
			:is-active="editor?.isActive('heading', { level: 2 })"
			@click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
		>
			<IconH2 class="w-5 h-5" />
		</TiptapToolbarButton>
		<TiptapToolbarButton
			label="Heading 3"
			title="Heading 3. Ctrl Alt 3"
			:is-active="editor?.isActive('heading', { level: 3 })"
			@click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
		>
			<IconH3 class="w-5 h-5" />
		</TiptapToolbarButton>
	</TiptapToolbarGroup>
</template>
