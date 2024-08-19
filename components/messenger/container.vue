<template>
	<div
		:class="{ 'opacity-0 pointer-events-none': !messengerPluginVisible }"
		class="absolute left-0 transition-opacity"
	>
		<MessengerPlugin v-show="messengerPluginVisible" />
	</div>
</template>

<script setup lang="ts">
const messengerPluginVisible = ref(false)

const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			messengerPluginVisible.value = false
		} else {
			messengerPluginVisible.value = true
		}
	})
}

onMounted(() => {
	const observer = new IntersectionObserver(intersectionCallback)

	const messengerButton = document.getElementById('link-to-messenger')
	messengerButton && observer.observe(messengerButton)
})
</script>
