import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Img } from '~/api/slider'

export type HomeStore = {
	slider: Img[]
}

export const useHomeStore = defineStore('home', () => {
	const homeState = reactive<HomeStore>({
		slider: []
	})

	const getSlider = async () => {
		if (homeState.slider.length > 0) return homeState.slider

		const { data: res } = await useFetch<{ data: Img[] }>('/slider', {
			baseURL: useBaseUrl()
		})

		if (res.value?.data) {
			homeState.slider = res.value.data
			return homeState.slider
		}

		return []
	}

	return {
		homeState,
		getSlider
	}
})
