<script setup lang="ts">
import { IconListDetails, IconListNumbers } from '@tabler/icons-vue'
import { Editor } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()
</script>

<template>
	<TiptapToolbarGroup>
		<TiptapToolbarButton
			label="Bullet list"
			title="Bullet list. Ctrl Shift 8"
			:is-active="editor?.isActive('bulletList')"
			@click="editor?.chain().focus().toggleBulletList().run()"
		>
			<IconListDetails class="w-5 h-5" />
		</TiptapToolbarButton>

		<TiptapToolbarButton
			label="Ordered list"
			title="Ordered list. Ctrl Shift 7"
			:is-active="editor?.isActive('orderedList')"
			@click="editor?.chain().focus().toggleOrderedList().run()"
		>
			<IconListNumbers class="w-5 h-5" />
		</TiptapToolbarButton>
	</TiptapToolbarGroup>
</template>
