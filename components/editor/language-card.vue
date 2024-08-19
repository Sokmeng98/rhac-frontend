<template>
	<div class="mb-8 bg-white rounded-md">
		<h4 class="p-3 text-xl font-bold border-b">Language</h4>

		<div class="flex flex-col gap-4 p-3">
			<button
				class="flex items-center py-1 pl-2 rounded-md w-36"
				:class="language === 'kh' ? 'bg-[#f5fffe] ring-blue-500 ring-1' : 'bg-[#F2F2F2]'"
				@click="changeLanguage('kh')"
			>
				<Icon class="mr-2" icon="twemoji:flag-cambodia" :height="24" />
				<p class="text-lg input-title">Khmer</p>
			</button>

			<button
				class="flex items-center py-1 pl-2 rounded-md w-36"
				:class="language === 'en' ? 'bg-[#f5fffe] ring-blue-500 ring-1' : 'bg-[#F2F2F2]'"
				@click="changeLanguage('en')"
			>
				<Icon class="mr-2" icon="twemoji:flag-united-states" :height="24" />
				<p class="text-lg input-title">English</p>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
type Props = {
	language: string
	changeLanguage: (language: string) => void
}

const { language, changeLanguage } = defineProps<Props>()
</script>
