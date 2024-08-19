<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()

const serif = `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`
const sansSerif = `Poppins, sans-serif, 'Noto Sans Khmer', cursive`
const monospace = `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`
</script>

<template>
	<TiptapToolbarGroup class="z-10">
		<button
			class="h-8 px-2 font-serif"
			:class="[
				'inline-flex  shrink-0 flex-row items-center justify-center rounded-md disabled:bg-transparent disabled:text-gray-300',
				editor?.isActive({ fontFamily: serif })
					? 'bg-blue-200 text-blue-800 hover:bg-opacity-80'
					: 'text-gray-600 hover:bg-blue-50'
			]"
			@click="
				editor?.isActive({ fontFamily: serif })
					? editor.commands.unsetFontFamily()
					: editor?.chain().focus().setFontFamily(serif).run()
			"
		>
			Serif
		</button>

		<button
			class="h-8 px-2 font-sans"
			:class="[
				'inline-flex  shrink-0 flex-row items-center justify-center rounded-md disabled:bg-transparent disabled:text-gray-300',
				editor?.isActive({ fontFamily: sansSerif })
					? 'bg-blue-200 text-blue-800 hover:bg-opacity-80'
					: 'text-gray-600 hover:bg-blue-50'
			]"
			@click="
				editor?.isActive({ fontFamily: sansSerif })
					? editor.commands.unsetFontFamily()
					: editor?.chain().focus().setFontFamily(sansSerif).run()
			"
		>
			Sans
		</button>

		<button
			class="h-8 px-2 font-mono"
			:class="[
				'inline-flex  shrink-0 flex-row items-center justify-center rounded-md disabled:bg-transparent disabled:text-gray-300',
				editor?.isActive({ fontFamily: monospace })
					? 'bg-blue-200 text-blue-800 hover:bg-opacity-80'
					: 'text-gray-600 hover:bg-blue-50'
			]"
			@click="
				editor?.isActive({ fontFamily: monospace })
					? editor.commands.unsetFontFamily()
					: editor?.chain().focus().setFontFamily(monospace).run()
			"
		>
			Mono
		</button>
	</TiptapToolbarGroup>
</template>
