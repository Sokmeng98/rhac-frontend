<template>
	<div ref="menu" class="dropdown dropdown-end">
		<button
			ref="menuButton"
			tabindex="0"
			:aria-label="$t('choose_language')"
			class="text-white btn btn-ghost hover:bg-white/0 rounded-btn"
			@blur="menuVisibility = false"
			@click="menuVisibility = !menuVisibility"
		>
			<IconsCambodiaFlag v-if="locale === 'km'" />
			<IconsUnitedStatesFlag v-else />

			<Icon icon="mdi:chevron-down" :height="30" class="hidden lg:block" />
		</button>

		<menu
			tabindex="0"
			class="gap-2 p-3 mt-4 text-black list-none border rounded-md shadow menu dropdown-content bg-base-100 w-52"
			@focus="menuVisibility = true"
		>
			<li
				:class="locale === 'km' || !locale ? 'bg-[#E5F6EE]' : ''"
				class="rounded"
				@click="setLanguage('km')"
			>
				<div>
					<IconsCambodiaFlag />
					ខ្មែរ
				</div>
			</li>

			<li :class="locale === 'en' ? 'bg-[#E5F6EE]' : ''" class="rounded" @click="setLanguage('en')">
				<div>
					<IconsUnitedStatesFlag />
					English
				</div>
			</li>
		</menu>
	</div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

const menuButton = ref<HTMLElement>()
const menu = ref<HTMLElement>()

const menuVisibility = ref(false)

watch(menuVisibility, () => {
	if (!menuVisibility.value) {
		document.activeElement?.blur()
	} else if (menuVisibility.value && !menu.value?.contains(document.activeElement)) {
		menuVisibility.value = false
	}
})

const setLanguage = (language: string) => {
	setLocale(language)
	menuVisibility.value = false
}
</script>
