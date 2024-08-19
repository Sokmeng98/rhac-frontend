<script setup lang="ts">
import {
	IconAlignCenter,
	IconAlignJustified,
	IconAlignLeft,
	IconAlignRight
} from '@tabler/icons-vue'
import { Editor } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()
</script>

<template>
	<TiptapToolbarGroup>
		<TiptapToolbarButton
			label="Align Left"
			title="Align Left. Ctrl Shift L"
			:is-active="editor?.isActive({ textAlign: 'left' })"
			@click="editor?.chain().focus().setTextAlign('left').run()"
		>
			<IconAlignLeft class="w-5 h-5" />
		</TiptapToolbarButton>

		<TiptapToolbarButton
			label="Align Center"
			title="Align Center. Ctrl Shift E"
			:is-active="editor?.isActive({ textAlign: 'center' })"
			@click="editor?.chain().focus().setTextAlign('center').run()"
		>
			<IconAlignCenter class="w-5 h-5" />
		</TiptapToolbarButton>

		<TiptapToolbarButton
			label="Align Right"
			title="Align Right. Ctrl Shift R"
			:is-active="editor?.isActive({ textAlign: 'right' })"
			@click="editor?.chain().focus().setTextAlign('right').run()"
		>
			<IconAlignRight class="w-5 h-5" />
		</TiptapToolbarButton>

		<TiptapToolbarButton
			label="Align Justify"
			title="Align Justify. Ctrl Shift J"
			:is-active="editor?.isActive({ textAlign: 'justify' })"
			@click="editor?.chain().focus().setTextAlign('justify').run()"
		>
			<IconAlignJustified class="w-5 h-5" />
		</TiptapToolbarButton>
	</TiptapToolbarGroup>
</template>
