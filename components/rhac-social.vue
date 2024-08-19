<template>
	<div class="flex gap-3 mb-3 lg:mb-0">
		<NuxtLink
			:href="config.FACEBOOK_PAGE"
			target="_blank"
			class="transition-transform rounded-full hover:scale-110 ring-0 ring-offset-0 focus-visible:no-animation focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-current focus-visible:ring-yellow-400 focus-visible:outline-none"
			:aria-label="$t('facebook')"
		>
			<Icon icon="bi:facebook" size="28" color="white" />
		</NuxtLink>

		<NuxtLink
			:href="config.TELEGRAM_CONTACT"
			target="_blank"
			class="flex items-center justify-center bg-white rounded-full hover:scale-110 w-[28px] h-[28px] transition-transform ring-offset-0 focus-visible:no-animation focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-current focus-visible:ring-yellow-400 focus-visible:outline-none"
			:aria-label="$t('telegram')"
		>
			<Icon icon="mingcute:telegram-fill" size="23" class="ml-[-2px]" />
		</NuxtLink>

		<NuxtLink
			:href="config.YOUTUBE_CHANNEL"
			target="_blank"
			class="flex items-center justify-center bg-white rounded-full w-[28px] h-[28px] hover:scale-110 transition-transform ring-offset-0 focus-visible:no-animation focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-current focus-visible:ring-yellow-400 focus-visible:outline-none"
			:aria-label="$t('youtube')"
		>
			<Icon icon="mdi:youtube" size="24" />
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig().public
</script>
