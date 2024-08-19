<template>
	<button
		v-show="shouldShow && !isAtTop"
		class="text-white border bg-primary p-2 rounded-md focus:outline-none border-white shadow-2xl fixed z-[9] right-[1.875rem] ring-offset-0 bottom-24 focus-visible:ring-2 ring-yellow-400 ring-0 focus-visible:ring-offset-2 ring-offset-transparent"
		:aria-label="$t('scroll_to_top')"
		@click="scrollToTop"
	>
		<icon icon="mdi:chevron-up" size="32" />
	</button>
</template>

<script setup lang="ts">
const shouldShow = ref(false)
const isAtTop = ref(true)

const scrollY = ref(0)

const scrollToTop = () => {
	window.scroll({ top: 0, behavior: 'smooth' })
	isAtTop.value = true
}

const onScroll = () => {
	const documentHeight = document.body.clientHeight

	// Cannot get delta from scroll event ( cannot use onwheel on mobile )
	// This is one way to get delta
	const delta = window.scrollY - scrollY.value
	scrollY.value = window.scrollY

	const isScrollingUp = delta < 0
	const isAtBottom = window.scrollY > documentHeight - window.innerHeight - 400

	isAtTop.value = window.scrollY < 400

	shouldShow.value = isAtBottom ? true : isScrollingUp
}

onMounted(() => {
	window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll)
})
</script>
