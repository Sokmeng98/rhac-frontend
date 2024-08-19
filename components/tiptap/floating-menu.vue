<script setup lang="ts">
import { IconBlockquote } from '@tabler/icons-vue'
import { Editor, FloatingMenu } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()

const emit = defineEmits<{
	(e: 'addImage'): void
	(e: 'addTable'): void
	(e: 'addYoutube'): void
}>()
</script>

<template>
	<FloatingMenu
		v-if="editor"
		:editor="editor"
		:tippy-options="{ duration: 100, zIndex: 0, offset: [35, 0] }"
		class="bg-white divide-x divide-gray-400 rounded-md drop-shadow-lg w-max"
	>
		<TiptapHeadingTool :editor="editor" />
		<TiptapListTool :editor="editor" />
		<TiptapFigureTool
			@add-image="emit('addImage')"
			@add-table="emit('addTable')"
			@add-youtube="emit('addYoutube')"
		/>

		<TiptapToolbarGroup>
			<TiptapToolbarButton
				label="Blockquote"
				title="Blockquote"
				:is-active="editor?.isActive('blockquote')"
				@click="editor?.chain().focus().toggleBlockquote().run()"
			>
				<IconBlockquote class="w-5 h-5" />
			</TiptapToolbarButton>
		</TiptapToolbarGroup>
	</FloatingMenu>
</template>
