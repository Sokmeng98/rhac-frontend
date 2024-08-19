import { onUnmounted } from 'vue'

export const useDebounceSearch = () => {
	let timeOutId: NodeJS.Timeout

	const debounce = (callback: (search: string) => void, delay = 1000) => {
		return (search: string) => {
			// If call again, clear time out
			clearTimeout(timeOutId)

			timeOutId = setTimeout(() => {
				callback(search)
			}, delay)
		}
	}

	onUnmounted(() => {
		clearTimeout(timeOutId)
	})

	return { debounce }
}
