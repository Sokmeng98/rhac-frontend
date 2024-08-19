<script setup lang="ts">
import { IconAlignLeft, IconAlignRight } from '@tabler/icons-vue'
import { NodeSelection } from '@tiptap/pm/state'
import { BubbleMenu, Editor, isNodeSelection } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()
</script>

<template>
	<BubbleMenu
		v-if="editor"
		id="tiptap-bubble-menu-for-image"
		:editor="editor"
		:tippy-options="{ duration: 100 }"
		class="z-0 flex flex-col gap-4 p-2 bg-white rounded-md drop-shadow-md"
		:should-show="
			({ state }) => {
				return isNodeSelection(state.selection) && state.selection.node.type.name == 'image'
			}
		"
		plugin-key="bubbleMenuForImage"
	>
		<!-- Align -->
		<div class="flex justify-center">
			<TiptapToolbarButton
				label="Align Left"
				:is-active="editor.isActive({ align: 'left' })"
				@click="
					editor.commands.updateAttributes('image', {
						align: editor.isActive({ align: 'left' }) ? 'unset' : 'left'
					})
				"
			>
				<IconAlignLeft class="w-5 h-5" />
			</TiptapToolbarButton>

			<TiptapToolbarButton
				label="Align Right"
				:is-active="editor.isActive({ align: 'right' })"
				@click="
					editor.commands.updateAttributes('image', {
						align: editor.isActive({ align: 'right' }) ? 'unset' : 'right'
					})
				"
			>
				<IconAlignRight class="w-5 h-5" />
			</TiptapToolbarButton>
		</div>

		<label for="tiptap-image-adjustment-menu-adjust-width"
			>Adjust width: {{ (editor.state.selection as NodeSelection).node?.attrs.width }}</label
		>
		<input
			id="tiptap-image-adjustment-menu-adjust-width"
			class="p-2 cursor-pointer"
			type="range"
			min="50"
			max="600"
			step="10"
			:value="parseInt((editor.state.selection as NodeSelection).node?.attrs.width)"
			@input="
				event => {
					if (isNodeSelection(editor?.state.selection)) {
						editor.commands.updateAttributes('image', {
							//@ts-ignore
							width: event.target?.value ?? 0
						})
					}
				}
			"
		/>
	</BubbleMenu>
</template>
