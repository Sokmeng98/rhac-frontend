<script setup lang="ts">
import { BubbleMenu, Editor } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()
</script>

<template>
	<BubbleMenu
		v-if="editor"
		id="tiptap-bubble-menu-for-table"
		:editor="editor"
		:tippy-options="{ duration: 100 }"
		class="z-0 flex gap-2 p-2 bg-white rounded-md drop-shadow-md"
		:should-show="
			({ state }) => {
				//@ts-ignore
				return state.selection.$anchorCell || state.selection.$headCell
			}
		"
		plugin-key="bubbleMenuForTable"
	>
		<TiptapTableTool :editor="editor" />
	</BubbleMenu>
</template>
