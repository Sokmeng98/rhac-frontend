import type { Ref } from 'nuxt/dist/app/compat/capi'

export const useCurrentEditingLanguage = (currentLanguage: Ref<string>) => {
	const isKhmer = computed(() => currentLanguage.value === 'kh')
	const isEnglish = computed(() => currentLanguage.value === 'en')

	return { isKhmer, isEnglish }
}
