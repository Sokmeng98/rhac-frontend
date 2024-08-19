<template>
	<div class="relative flex w-full">
		<label for="category-select" class="sr-only">Choose Category</label>

		<select
			id="category-select"
			v-model="selectedCategoryID"
			class="w-full px-4 py-2 rounded-lg appearance-none cursor-pointer select-none ring-black ring-2 focus:outline-black/50"
			:disabled="disabled"
			@change="emit('change', selectedCategoryID)"
		>
			<option value="" selected>
				{{ defaultText ? defaultText : $t('all_categories') }}
			</option>

			<option v-for="category in categories" :key="category.id" :value="category.id">
				{{ localeSubCategoryName(category) }}
			</option>
		</select>

		<!-- Dropdown arrow -->
		<div class="relative flex items-center pointer-events-none">
			<label for="category-select" class="absolute flex items-center not-sr-only -left-6">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="17"
					height="16"
					fill="none"
					class="w-full h-full"
				>
					<path
						fill="#0B1C3F"
						d="M8.82 11.17a.5.5 0 0 1-.36-.15L3.13 5.69a.5.5 0 0 1 .7-.71l4.99 4.98 4.98-4.98a.5.5 0 0 1 .7.7l-5.33 5.34a.5.5 0 0 1-.35.15Z"
					/>
				</svg>
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PostCategory } from '~/api/type'

type Props = {
	categories: PostCategory[]
	defaultText?: string
	disabled?: boolean
	initialSelectedCategoryId?: string
}

const { initialSelectedCategoryId } = defineProps<Props>()

const emit = defineEmits<{
	(event: 'change', id: string): void
}>()

const selectedCategoryID = ref(initialSelectedCategoryId || '')
const { locale } = useI18n()

const localeSubCategoryName = (category: PostCategory) => {
	return locale.value === 'km'
		? category.name || category.name_en
		: category.name_en || category.name
}
</script>
