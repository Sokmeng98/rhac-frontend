<template>
	<form
		id="search-article-form"
		class="relative text-gray-400 focus-within:text-gray-600"
		@submit.prevent="searchHandler"
	>
		<Icon
			icon="akar-icons:search"
			:height="16"
			class="absolute w-4 h-4 transform -translate-y-1/2 pointer-events-none top-1/2 left-3"
		/>

		<input
			v-model="search"
			type="search"
			role="searchbox"
			:placeholder="$t('search_article_placeholder')"
			class="w-full rounded-full appearance-none focus:outline-none h-11 pl-9 focus:ring-2 ring-current ring-1 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-2"
		/>
	</form>
</template>

<script setup lang="ts">
const router = useRouter()
const search = ref('')

const searchHandler = () => {
	router.push(`/search?q=${search.value}`)
	search.value = ''
}
</script>

<style>
[type='search']::-webkit-search-cancel-button {
	-webkit-appearance: none;
	appearance: none;
}
</style>
