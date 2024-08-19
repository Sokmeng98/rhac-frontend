<template>
	<select
		v-model="selectedCareerCategoryId"
		class="w-full select focus:outline-none focus:ring-1"
		:disabled="disabled"
		@change="onChange()"
	>
		<option value="" selected>{{ defaultText ? defaultText : 'All Category' }}</option>

		<option v-for="category in categories" :key="category.id" :value="category.id">
			{{ localeSubCategoryName(category) }}
		</option>
	</select>
</template>

<script setup lang="ts">
// At least the category should have these info
export type Category = {
	id: number | string
	name: string
	name_en: string

	slug_kh: string
	slug_en: string
}

type Props = {
	categories: Category[]
	onCategoryChange: (id: string) => void
	defaultText?: string
	disabled?: boolean
}

const { onCategoryChange } = defineProps<Props>()

const selectedCareerCategoryId = ref('')
const { locale } = useI18n()

const localeSubCategoryName = (category: Category) => {
	return locale.value === 'km'
		? category.name || category.name_en
		: category.name_en || category.name
}

const onChange = () => {
	onCategoryChange(selectedCareerCategoryId.value)
}

const forceChangeSelectedValueFromParent = (id?: string) => {
	selectedCareerCategoryId.value = id || ''
	onCategoryChange(selectedCareerCategoryId.value)
}

defineExpose({
	forceChangeSelectedValueFromParent
})
</script>
