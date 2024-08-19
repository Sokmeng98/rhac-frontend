<script setup lang="ts">
import { IconCheck, IconSelector } from '@tabler/icons-vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { Editor } from '@tiptap/vue-3'

const { editor } = defineProps<{
	editor: Editor | undefined
}>()

const fontFamily = [
	{
		id: 1,
		name: 'Serif',
		tailwindClass: 'font-serif',
		font: 'serif'
	},
	{
		id: 2,
		name: 'Sans serif',
		tailwindClass: 'font-sans',
		font: 'sans'
	},
	{
		id: 3,
		name: 'Monospace',
		tailwindClass: 'font-mono',
		font: 'monospace'
	}
]
const selectedFont = ref(fontFamily[0])
</script>

<template>
	<TiptapToolbarGroup class="z-10 w-32">
		<Listbox
			v-model="selectedFont"
			by="id"
			@update:model-value="value => editor?.chain().focus().setFontFamily(value.font).run()"
		>
			<div class="relative">
				<ListboxButton
					class="relative w-full p-2 text-left bg-white rounded-lg cursor-pointer drop-shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
				>
					<span class="block truncate" :class="selectedFont.tailwindClass">{{
						selectedFont.name
					}}</span>
					<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
						<IconSelector class="w-5 h-5 text-gray-400" aria-hidden="true" />
					</span>
				</ListboxButton>

				<transition
					leave-active-class="transition duration-100 ease-in"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
				>
					<ListboxOptions
						class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
					>
						<ListboxOption
							v-for="font in fontFamily"
							v-slot="{ active, selected }"
							:key="font.id"
							:value="font"
							as="template"
							class="cursor-pointer"
						>
							<li
								:class="[
									active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
									'relative cursor-default select-none py-2 pl-10 pr-4',
									font.tailwindClass
								]"
							>
								<span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
									font.name
								}}</span>
								<span
									v-if="selected"
									class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
								>
									<IconCheck class="w-5 h-5" aria-hidden="true" />
								</span>
							</li>
						</ListboxOption>
					</ListboxOptions>
				</transition>
			</div>
		</Listbox>
	</TiptapToolbarGroup>
</template>
