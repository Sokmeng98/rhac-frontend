<script setup lang="ts">
import { IconSubscript, IconSuperscript } from '@tabler/icons-vue'
import { Editor } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()
</script>

<template>
	<TiptapToolbarGroup>
		<TiptapToolbarButton
			label="Subscript"
			:is-active="editor?.isActive('subscript')"
			@click="editor?.chain().focus().toggleSubscript().run()"
		>
			<IconSubscript class="w-5 h-5" />
		</TiptapToolbarButton>

		<TiptapToolbarButton
			label="Superscript"
			:is-active="editor?.isActive('superscript')"
			@click="editor?.chain().focus().toggleSuperscript().run()"
		>
			<IconSuperscript class="w-5 h-5" />
		</TiptapToolbarButton>
	</TiptapToolbarGroup>
</template>
