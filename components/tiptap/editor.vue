<script setup lang="ts">
import { IconMinus } from '@tabler/icons-vue'
import { FontFamily } from '@tiptap/extension-font-family'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { StarterKit } from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'

import { CharacterCount } from '@tiptap/extension-character-count'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Table } from '@tiptap/extension-table'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableRow } from '@tiptap/extension-table-row'
import { Typography } from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { Youtube } from '@tiptap/extension-youtube'
import { Image } from './image'

import type { Button } from './link-dialog.vue'

const emit = defineEmits<{
	(e: 'update', content: string): void
}>()

const { content } = defineProps<{
	content: string
}>()

const currentLinkInDialog = ref<string | undefined>()
const showLinkDialog = ref()
const showAddYoutubeDialog = ref(false)
const showAddTableDialog = ref(false)
const showAddImageDialog = ref(false)

type DataTable = {
	columns: number
	rows: number
	withHeader: boolean
}

const editor = useEditor({
	content,
	editorProps: {
		attributes: {
			class: 'w-full '
		}
	},
	extensions: [
		StarterKit.configure({
			heading: {
				levels: [1, 2, 3]
			},
			dropcursor: {
				width: 2,
				color: '#2563eb'
			}
		}),
		Placeholder.configure({
			placeholder: 'Write something ...'
		}),

		TextStyle,
		TextAlign.configure({
			types: ['heading', 'paragraph']
		}),
		Underline,
		FontFamily.configure({
			types: ['textStyle']
		}),
		Highlight.configure({
			multicolor: true
		}),
		Color,
		Typography,

		Subscript,
		Superscript,

		Image.configure({
			inline: true,
			allowBase64: true
		}),

		Youtube,

		Table.configure({
			resizable: false,
			allowTableNodeSelection: true
		}),
		TableHeader,
		TableCell,
		TableRow,

		Link.configure({
			openOnClick: false,
			protocols: [
				'ftp',
				'mailto',
				{
					scheme: 'tel',
					optionalSlashes: true
				}
			]
		}),
		CharacterCount
	],
	onUpdate: ({ editor }) => {
		emit('update', editor.getHTML())
	}
})

// #region toolbar functions

function openLinkDialog() {
	currentLinkInDialog.value = editor.value?.getAttributes('link').href

	showLinkDialog.value = true
}

function updateLink(value?: string, button?: Button) {
	if (!value) {
		editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
		return
	}

	let linkClass = ` rounded-md mx-1 `

	if (button) {
		switch (button.color) {
			case 'black':
				linkClass += 'bg-black'
				break
			case 'blue':
				linkClass += 'bg-blue-600'
				break
			case 'green':
				linkClass += 'bg-green-600'
				break
			case 'rose':
				linkClass += 'bg-rose-600'
				break
			case 'teal':
				linkClass += 'bg-teal-600'
				break
			case 'yellow':
				linkClass += 'bg-yellow-600'
				break
			case 'orange':
				linkClass += 'bg-orange-600'
				break
			case 'cyan':
				linkClass += 'bg-cyan-600'
				break
		}

		if (button.paddingX) {
			linkClass += ' px-2'
		}
		if (button.paddingY) {
			linkClass += ' py-2'
		}

		editor.value
			?.chain()
			.focus()
			.extendMarkRange('link')
			// @ts-ignore
			.setLink({ href: value, class: linkClass })
			.run()
	} else {
		editor.value?.chain().focus().extendMarkRange('link').setLink({ href: value }).run()
	}
}

function insertImage(url: string, description: string) {
	// @ts-ignore
	editor.value?.chain().focus().setImage({ src: url, alt: description, title: description }).run()
}

function insertYoutubeVideo(url: string) {
	editor.value?.commands.setYoutubeVideo({
		src: url,
		width: 400,
		height: 300
	})
}

function insertTable(table: DataTable) {
	editor.value
		?.chain()
		.focus()
		.insertTable({
			rows: table.rows,
			cols: table.columns,
			withHeaderRow: table.withHeader
		})
		.run()
}
// #endregion

onBeforeUnmount(() => {
	editor.value?.destroy()
})
</script>

<template>
	<section class="w-full h-full border">
		<div id="tiptap-toolbar" class="divide-x divide-gray-400">
			<TiptapHistoryTool :editor="editor" />
			<TiptapHeadingTool :editor="editor" />
			<TiptapTextAlignTool :editor="editor" />
			<TiptapSubSupScript :editor="editor" />

			<!-- Horizontal Line-->
			<TiptapToolbarGroup>
				<TiptapToolbarButton
					label="Horizontal Line"
					@click="editor?.chain().focus().setHorizontalRule().run()"
				>
					<IconMinus class="w-5 h-5" />
				</TiptapToolbarButton>
			</TiptapToolbarGroup>
		</div>
		<hr />

		<TiptapTextDecorationBubbleMenu :editor="editor" @add-link="openLinkDialog" />

		<TiptapImageAdjustmentMenu :editor="editor" />

		<TiptapFloatingMenu
			:editor="editor"
			@add-image="showAddImageDialog = true"
			@add-table="showAddTableDialog = true"
			@add-youtube="showAddYoutubeDialog = true"
		/>

		<TiptapTableBubbleMenu :editor="editor" />

		<EditorContent :editor="editor" class="w-full prose" />

		<div class="py-3 mx-4 text-sm text-right text-gray-500 border-t border-gray-300">
			{{ editor?.storage.characterCount.words() }} words (Cannot count Khmer word)
		</div>

		<!-- #region dialog -->
		<TiptapLinkDialog
			v-if="showLinkDialog"
			:show="showLinkDialog"
			:current-url="currentLinkInDialog"
			@close="showLinkDialog = false"
			@update="updateLink"
		/>
		<TiptapVideoDialog
			v-if="showAddYoutubeDialog"
			:show="showAddYoutubeDialog"
			@insert="insertYoutubeVideo"
			@close="showAddYoutubeDialog = false"
		/>
		<TiptapTableDialog
			v-if="showAddTableDialog"
			:show="showAddTableDialog"
			@close="showAddTableDialog = false"
			@insert="insertTable"
		/>
		<TiptapImageDialog
			v-if="showAddImageDialog"
			:show="showAddImageDialog"
			@close="showAddImageDialog = false"
			@insert="insertImage"
		/>
		<!-- #endregion -->
	</section>
</template>

<style lang="scss">
.tiptap {
	table {
		border-collapse: collapse;
		table-layout: fixed;
		width: 100%;
		margin: 0;
		overflow: hidden;

		td,
		th {
			min-width: 1em;
			border: 2px solid #ced4da;
			padding: 3px 5px;
			vertical-align: top;
			box-sizing: border-box;
			position: relative;

			> * {
				margin-bottom: 0;
			}
		}

		.selectedCell:after {
			z-index: 2;
			position: absolute;
			content: '';
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: rgba(200, 200, 255, 0.4);
			pointer-events: none;
		}

		.column-resize-handle {
			position: absolute;
			right: -2px;
			top: 0;
			bottom: -2px;
			width: 4px;
			background-color: #adf;
			pointer-events: none;
		}
	}
}
</style>
