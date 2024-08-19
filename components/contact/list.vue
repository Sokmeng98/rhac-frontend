<template>
	<menu class="grid w-full grid-flow-row gap-3 text-base list-none">
		<li v-for="contact in contacts" :key="contact.number">
			<a
				:href="contact.link"
				class="flex items-center gap-3 px-4 py-3 text-gray-700 border rounded-lg border-primary ring-0 focus-visible:outline-none ring-yellow-400 focus-visible:ring-2 focus-visible:ring-offset-2"
			>
				<Icon icon="carbon:phone-voice-filled" size="24" class="shrink-0" />

				<span class="font-semibold">{{ $t(contact.localeName) }}</span>

				<span class="font-semibold text-primary min-w-fit">{{ contact.number }}</span>
			</a>
		</li>
	</menu>
</template>

<script setup lang="ts">
import type { Contact } from '~/util/contact'

defineProps<{
	contacts: Contact[]
}>()
</script>
