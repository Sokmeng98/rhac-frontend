<template>
	<div>
		<div id="fb-root"></div>
		<div id="fb-customer-chat" class="fb-customerchat"></div>
	</div>
</template>

<script setup lang="ts">
onMounted(() => {
	const chatbox = document.getElementById('fb-customer-chat')

	if (chatbox) {
		chatbox.setAttribute('page_id', '427172080715542')
		chatbox.setAttribute('attribution', 'biz_inbox')
		// @ts-ignore
		window.fbAsyncInit = function () {
			// @ts-ignore
			FB.init({
				xfbml: true,
				version: 'v16.0'
			})
		}
		;(function (d, s, id) {
			let js
			const fjs = d.getElementsByTagName(s)[0]
			if (d.getElementById(id)) return
			// eslint-disable-next-line
			js = d.createElement(s)
			js.id = id
			// @ts-ignore
			js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js'
			// @ts-ignore
			fjs.parentNode.insertBefore(js, fjs)
		})(document, 'script', 'facebook-jssdk')
	}
})
</script>
