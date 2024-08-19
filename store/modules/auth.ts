import { defineStore } from 'pinia'
import { loadUserAPI } from '../../api'

export const authStore = defineStore('auth-store', () => {
	const user = ref<{ name: string; email: string; img: string }>()
	function getProfile() {
		loadUserAPI()
			.then(res => {
				user.value = res.data[0]
			})
			.catch(() => {})
	}
	return { user, getProfile }
})
