<template>
	<div ref="menu" class="w-full h-full dropdown dropdown-start">
		<label
			ref="menuButton"
			tabindex="0"
			class="flex flex-row items-center h-full space-x-2 text-white cursor-pointer focus:outline-none focus-visible:ring-2 ring-0 ring-yellow-400 ring-inset"
			@blur="menuVisibility = false"
			@click="menuVisibility = !menuVisibility"
		>
			<Icon icon="fluent:phone-48-regular" size="24" />
			<div class="flex gap-1">
				<span class="text-lg font-medium select-none text-inherit"> {{ $t('call_us') }} </span>
				<span class="text-lg rotate-90 select-none text-inherit">></span>
			</div>
		</label>

		<div
			tabindex="0"
			class="text-black list-none dropdown-content menu min-w-max"
			@focus="menuVisibility = true"
		>
			<div class="w-full h-full" @click="callCardClicked()">
				<div class="bg-white p-5 rounded-lg border shadow-2xl max-w-[352px]">
					<p class="text-[16px] leading-normal text-gray-700 mb-5">
						{{ $t('call_us_description') }}
					</p>

					<h3 class="text-[20px] font-medium mb-3">{{ $t('connect_with_us') }}</h3>
					<ContactList :contacts="contacts" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Contact } from '~/util/contact'

type Props = {
	contacts: Contact[]
}

defineProps<Props>()

const menu = ref<HTMLElement>()
const menuButton = ref<HTMLElement>()
const menuVisibility = ref(false)

watch(menuVisibility, () => {
	if (!menuVisibility.value) {
		;(document.activeElement as HTMLElement)?.blur()
	} else if (menuVisibility.value && !menu.value?.contains(document.activeElement)) {
		menuVisibility.value = false
	}
})

const callCardClicked = () => {
	menuVisibility.value = false
}
</script>
