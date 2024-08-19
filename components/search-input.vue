<template>
	<form class="relative flex items-center gap-1 mr-3 w-60" @submit.prevent="onSubmit(search)">
		<input
			v-model="search"
			type="text"
			:placeholder="placeholder ? placeholder : 'Search'"
			class="w-full h-12 pl-4 pr-12 bg-white rounded-lg focus:outline-none focus:ring-1"
		/>

		<button
			:disabled="disabled"
			type="submit"
			class="absolute w-6 h-6 right-4 disabled:opacity-60 disabled:cursor-progress"
		>
			<Icon icon="la:search" class="w-full h-full" />
		</button>
	</form>
</template>

<script setup lang="ts">
type Props = {
	onSubmit: (searchQuery: string) => void
	onInputChange: (searchQuery: string) => void
	placeholder?: string
	disabled?: boolean
}

const { onInputChange } = defineProps<Props>()

const search = ref('')
watch(search, () => {
	onInputChange(search.value)
})
</script>
