<template>
	<input :id="modalId" v-model="checked" tabindex="-1" type="checkbox" class="modal-toggle peer" />

	<label
		:for="modalId"
		class="overflow-hidden transition-all duration-500 cursor-pointer modal backdrop-blur-0 peer-checked:backdrop-blur-sm"
	>
		<label
			class="absolute bottom-0 flex flex-col items-center justify-center w-full gap-6 px-3 pt-6 pb-2 transition-all duration-500 bg-white border rounded-t-lg sm:pb-6 sm:pt-8 sm:rounded-lg sm:w-auto sm:relative"
			:class="{
				'translate-y-0 sm:scale-100 opacity-100': checked,
				'translate-y-1/2 sm:translate-y-0 sm:scale-90 opacity-0': !checked
			}"
			for=""
		>
			<section class="w-full">
				<p class="mb-5 leading-normal text-center text-gray-700">
					{{ $t('call_us_description') }}
				</p>

				<ContactList :contacts="contacts" />
			</section>

			<label
				:for="modalId"
				tabindex="0"
				role="switch"
				class="w-full p-3 text-center text-xl focus-visible:ring-2 focus-visible:ring-offset-2 ring-yellow-400 text-white bg-black rounded-lg focus-visible:shadow-lg focus:outline-none cursor-pointer sm:bg-transparent sm:right-0 sm:w-9 sm:p-0 sm:absolute sm:text-black sm:top-0 sm:after:content-['✕'] sm:after:text-2xl"
				@keydown="event => event.key === 'Enter' && closeModal()"
				><span class="sm:hidden">{{ $t('close') }}</span></label
			>
		</label>
	</label>
</template>

<script setup lang="ts">
import { contacts } from '~/util/contact'
import { clickHTMLElement } from '~/util/click-element'

const { modalId } = defineProps<{
	modalId: string
}>()

const checked = ref(false)

// Accessibility improvement. When user press enter on the 'Call Us' button, it will show the modal.
const closeModal = () => {
	clickHTMLElement(modalId)
}
</script>
