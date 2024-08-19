<template>
	<form class="flex w-full h-full gap-3" @submit.prevent="performNormalSearch()">
		<label
			for="search-box"
			class="relative flex-grow block text-gray-400 focus-within:text-gray-600"
		>
			<Icon
				icon="akar-icons:search"
				:height="16"
				class="absolute w-4 h-4 transform -translate-y-1/2 pointer-events-none top-1/2 left-3"
			/>

			<input
				id="search-box"
				v-model="search"
				type="text"
				:placeholder="$t('search_placeholder')"
				class="w-full rounded-full input input-bordered focus:border-0 pl-9"
			/>
		</label>

		<button
			:class="`${pending && 'loading'}`"
			class="text-base capitalize rounded-full btn-primary btn"
			:disabled="pending"
		>
			{{ $t('search') }}
		</button>
	</form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounceSearch } from '~/composables/use-debounce-search'

type Props = {
	onSearch: (searchQuery: string) => void
	pending: boolean
	initialSearchValue?: string
}

const { onSearch, pending, initialSearchValue } = defineProps<Props>()

const search = ref(initialSearchValue || '')

const { debounce } = useDebounceSearch()
const performDebounceSearch = debounce(() => {
	onSearch(search.value)
}, 800)

const performNormalSearch = () => {
	if (pending) return
	onSearch(search.value)
}

watch(search, val => {
	performDebounceSearch(val)
})
</script>
