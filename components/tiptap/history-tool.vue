<script setup lang="ts">
import { IconArrowBackUp, IconArrowForwardUp } from '@tabler/icons-vue'
import { Editor } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()
</script>

<template>
	<TiptapToolbarGroup>
		<TiptapToolbarButton
			label="Undo"
			title="Undo: Ctrl Z"
			:disabled="!editor?.can().chain().focus().undo().run()"
			@click="editor?.chain().focus().undo().run()"
		>
			<IconArrowBackUp class="w-5 h-5" />
		</TiptapToolbarButton>

		<TiptapToolbarButton
			label="Redo"
			title="Undo: Ctrl Shift Z or Ctrl Y"
			:disabled="!editor?.can().chain().focus().redo().run()"
			@click="editor?.chain().focus().redo().run()"
		>
			<IconArrowForwardUp class="w-5 h-5" />
		</TiptapToolbarButton>
	</TiptapToolbarGroup>
</template>
