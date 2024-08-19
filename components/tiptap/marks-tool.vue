<script setup lang="ts">
import { IconBold, IconItalic, IconStrikethrough, IconUnderline } from '@tabler/icons-vue'
import { Editor } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()
</script>

<template>
	<TiptapToolbarGroup>
		<TiptapToolbarButton
			label="Bold"
			title="Bold: Ctrl B"
			:is-active="editor?.isActive('bold')"
			@click="editor?.chain().focus().toggleBold().run()"
		>
			<IconBold class="w-5 h-5" />
		</TiptapToolbarButton>
		<TiptapToolbarButton
			label="Italic"
			title="Italic: Ctrl I"
			:is-active="editor?.isActive('italic')"
			@click="editor?.chain().focus().toggleItalic().run()"
		>
			<IconItalic class="w-5 h-5" />
		</TiptapToolbarButton>
		<TiptapToolbarButton
			label="Underline"
			title="Underline: Ctrl U"
			:is-active="editor?.isActive('underline')"
			@click="editor?.chain().focus().toggleUnderline().run()"
		>
			<IconUnderline class="w-5 h-5" />
		</TiptapToolbarButton>
		<TiptapToolbarButton
			label="Strikethrough"
			title="Strikethrough: Ctrl Shift S"
			:is-active="editor?.isActive('strike')"
			@click="editor?.chain().focus().toggleStrike().run()"
		>
			<IconStrikethrough class="w-5 h-5" />
		</TiptapToolbarButton>
	</TiptapToolbarGroup>
</template>
