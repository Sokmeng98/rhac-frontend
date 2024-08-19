<script setup lang="ts">
import { BubbleMenu, Editor, isTextSelection } from '@tiptap/vue-3'

import { IconBlockquote, IconHighlight, IconLink } from '@tabler/icons-vue'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()

const emit = defineEmits<{
	(e: 'addLink'): void
}>()
</script>

<template>
	<BubbleMenu
		v-if="editor"
		id="tiptap-bubble-menu-for-mark"
		:editor="editor"
		:tippy-options="{ duration: 100, zIndex: 10, offset: [100, 0] }"
		class="flex flex-col p-2 bg-white rounded-md drop-shadow-lg"
		:should-show="
			({ state }) => {
				return (
					isTextSelection(state.selection) &&
					!state.selection.empty &&
					!(state.selection.$anchor.parent.type.name === 'figcaption')
				)
			}
		"
		plugin-key="bubbleMenuForMark"
	>
		<div class="flex items-center divide-x divide-gray-400">
			<TiptapToolbarGroup>
				<TiptapToolbarButton
					label="Link"
					title="Link"
					:is-active="editor?.isActive('link')"
					@click="emit('addLink')"
				>
					<IconLink class="w-5 h-5" />
				</TiptapToolbarButton>

				<TiptapToolbarButton
					label="Blockquote"
					title="Blockquote"
					:is-active="editor?.isActive('blockquote')"
					@click="editor?.chain().focus().toggleBlockquote().run()"
				>
					<IconBlockquote class="w-5 h-5" />
				</TiptapToolbarButton>
			</TiptapToolbarGroup>

			<TiptapFontFamilyTool :editor="editor" />
		</div>

		<div class="divide-x">
			<TiptapHeadingTool :editor="editor" />
			<TiptapTextAlignTool :editor="editor" />
		</div>

		<div class="divide-x divide-gray-400">
			<TiptapMarksTool :editor="editor" />

			<TiptapToolbarGroup>
				<TiptapFontColorSelect :editor="editor" />

				<TiptapToolbarButton
					label="highlight"
					class="relative"
					:is-active="editor?.isActive('highlight', { color: 'yellow' })"
					@click="editor?.chain().focus().toggleHighlight({ color: 'yellow' }).run()"
				>
					<IconHighlight class="w-5 h-5" />
					<div class="absolute bottom-0 w-3/4 h-0.5 bg-yellow-400"></div>
				</TiptapToolbarButton>

				<TiptapListTool :editor="editor" />
			</TiptapToolbarGroup>
		</div>
	</BubbleMenu>
</template>
