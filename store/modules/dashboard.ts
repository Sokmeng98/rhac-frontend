import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const dashboardStore = defineStore('dashboard-store', () => {
	const stateImage = reactive({
		image: ''
	})

	return { stateImage }
})
