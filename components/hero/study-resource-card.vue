<template>
	<NuxtLink
		:to="link"
		class="focus:outline-none flex gap-2 lg:gap-4 flex-col items-center justify-center focus-visible:ring-2 ring-0 ring-yellow-400 ring-offset-0 focus-visible:ring-offset-2 py-6 rounded-lg hover:scale-[1.02] transition-transform duration-300 lg:px-8 xl:px-10 focus-visible:bg-yellow-600"
		:class="brightness === 'light' ? 'bg-[#149533]' : 'bg-[#0C5F19]'"
	>
		<svg class="w-[1.625rem] h-[1.625rem] text-white scale-150 lg:scale-[2.2]">
			<path
				fill="currentColor"
				d="M9.875 0a1 1 0 0 0-.406.156S8.204.952 6.844 1.813c-1.36.86-2.873 1.808-3.219 2a1 1 0 0 0-.063.03C2.306 4.618 2.045 5.884 2 6.594c-.003.033 0 .06 0 .095-.011.266 0 .437 0 .437v13.063C2 22.087 4.213 23 6.313 23c.7 0 1.4-.113 2-.313.4-.2.687-.6.687-1v-10.5c0-2.3.5-3.38 2-4.28.4-.2 4.594-3.095 4.594-3.095.2-.2.406-.606.406-.906v-.094c0-.4-.2-.706-.5-.906-.3-.2-.7-.2-1 0-.1.1-6.2 4.207-7.5 4.907-1.3.8-2.513.993-2.813.593-.093-.093-.174-.378-.187-.656v-.063c.001-.272.071-.784.625-1.125.562-.313 1.957-1.204 3.313-2.062.573-.363.644-.402 1.093-.688A1 1 0 0 0 11 2.5V1a1 1 0 0 0-1.125-1zm8 3.5a1 1 0 0 0-.438.188s-5.034 3.387-5.906 3.968a1 1 0 0 0-.031.032c-.724.543-1.153 1.189-1.344 1.78A3.264 3.264 0 0 0 10 10.5v.313a1 1 0 0 0 0 .093V23c0 1.9 2.188 3 4.188 3 .9 0 1.712-.194 2.312-.594 1.2-.7 7-5.218 7-5.218.3-.2.5-.482.5-.782v-13c0-.5-.194-.8-.594-1-.3-.2-.793-.106-1.093.094-1.6 1.2-5.907 4.588-6.907 5.188-1.4.8-2.719 1-3.219.5-.2-.2-.187-.388-.187-.688.006-.172.025-.32.063-.438.056-.174.17-.388.593-.718.02-.016.01-.015.031-.031.723-.483 2.934-1.99 4.376-2.97A1 1 0 0 0 19 6V4.5a1 1 0 0 0-1.125-1zM22 10.813v2l-5 3.874v-2l5-3.874z"
			/>
		</svg>

		<h3
			:id="title + question"
			class="mt-3 text-xl font-bold text-center text-white lg:text-2xl 2xl:text-3xl"
		>
			{{ title }}
		</h3>

		<p
			:aria-describedby="title + question"
			class="text-sm text-center text-white lg:text-xl sm:text-base 2xl:text-2xl"
		>
			{{ question }}
		</p>
	</NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
	link: string
	title: string
	question: string
	brightness: 'dark' | 'light'
}>()
</script>
