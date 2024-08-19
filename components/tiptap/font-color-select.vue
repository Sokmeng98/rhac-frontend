<script setup lang="ts">
import { IconPalette } from '@tabler/icons-vue'
import { Editor } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()
</script>

<template>
	<button
		label="Text color"
		title="Text color"
		class="relative cursor-pointer group"
		:class="[
			'inline-flex h-8 w-8 shrink-0 flex-row items-center justify-center rounded-md disabled:bg-transparent disabled:text-gray-300',
			Boolean(editor?.getAttributes('textStyle').color)
				? 'bg-blue-200 text-blue-800 hover:bg-opacity-80'
				: 'text-gray-600 hover:bg-blue-50'
		]"
	>
		<IconPalette class="w-5 h-5" />

		<div
			tabindex="0"
			class="absolute left-0 hidden gap-2 p-2 bg-white border rounded-md top-full group-focus-within:flex"
		>
			<button
				title="Black"
				class="w-4 h-4 bg-black ring-blue-400"
				:class="
					editor?.getAttributes('textStyle').color === 'black'
						? 'ring-2 ring-offset-1'
						: 'ring-0 ring-offset-0'
				"
				@click="
					editor?.getAttributes('textStyle').color === 'black'
						? editor?.chain().focus().unsetColor().run()
						: editor?.chain().focus().setColor('black').run()
				"
			></button>

			<button
				title="White"
				class="w-4 h-4 bg-white border ring-blue-400"
				:class="
					editor?.getAttributes('textStyle').color === 'white'
						? 'ring-2 ring-offset-1'
						: 'ring-0 ring-offset-0'
				"
				@click="
					editor?.getAttributes('textStyle').color === 'white'
						? editor?.chain().focus().unsetColor().run()
						: editor?.chain().focus().setColor('white').run()
				"
			></button>

			<button
				title="Blue"
				class="w-4 h-4 bg-blue-400 ring-blue-400"
				:class="
					editor?.getAttributes('textStyle').color === 'blue'
						? 'ring-2 ring-offset-1'
						: 'ring-0 ring-offset-0'
				"
				@click="
					editor?.getAttributes('textStyle').color === 'blue'
						? editor?.chain().focus().unsetColor().run()
						: editor?.chain().focus().setColor('blue').run()
				"
			></button>

			<button
				title="Green"
				class="w-4 h-4 bg-green-500 ring-blue-400"
				:class="
					editor?.getAttributes('textStyle').color === 'green'
						? 'ring-2 ring-offset-1'
						: 'ring-0 ring-offset-0'
				"
				@click="
					editor?.getAttributes('textStyle').color === 'green'
						? editor?.chain().focus().unsetColor().run()
						: editor?.chain().focus().setColor('green').run()
				"
			></button>

			<button
				title="Yellow"
				class="w-4 h-4 bg-yellow-700 ring-blue-400"
				:class="
					editor?.getAttributes('textStyle').color === '#a16207'
						? 'ring-2 ring-offset-1'
						: 'ring-0 ring-offset-0'
				"
				@click="
					editor?.getAttributes('textStyle').color === '#a16207'
						? editor?.chain().focus().unsetColor().run()
						: editor?.chain().focus().setColor('#a16207').run()
				"
			></button>

			<button
				title="Red"
				class="w-4 h-4 bg-red-700 ring-blue-400"
				:class="
					editor?.getAttributes('textStyle').color === '#b91c1c'
						? 'ring-2 ring-offset-1'
						: 'ring-0 ring-offset-0'
				"
				@click="
					editor?.getAttributes('textStyle').color === '#b91c1c'
						? editor?.chain().focus().unsetColor().run()
						: editor?.chain().focus().setColor('#b91c1c').run()
				"
			></button>
		</div>
	</button>
</template>
