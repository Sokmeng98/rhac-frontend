import cookie from 'js-cookie'
import { loadUserAPI } from '~~/api'

export default defineNuxtRouteMiddleware(() => {
	loadUserAPI()
		.then(() => {
			// Success
		})
		.catch(() => {
			cookie.set('t', '')
			navigateTo('/admin/login')
		})

	const token = useCookie('t')

	if (!token.value || token.value.length < 100) {
		return navigateTo('/admin/login')
	}
})
