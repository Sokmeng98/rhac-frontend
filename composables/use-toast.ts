import { onUnmounted, ref } from 'vue'
import type { OperationStatus } from '~~/api/category'

export type Toast = 'pending' | 'succeed' | 'error'

export const useToast = (timeOut?: number) => {
	const TOAST_TIMEOUT = timeOut ?? 1000

	const isPending = ref(false)
	const isSucceed = ref(false)
	const isError = ref(false)

	const toastPendingMessage = ref('')
	const toastSuccessMessage = ref('')
	const toastErrorMessage = ref('')

	const timeOuts = ref<NodeJS.Timeout[]>([])

	onUnmounted(() => {
		timeOuts.value.forEach(id => {
			clearTimeout(id)
		})

		timeOuts.value = []
	})

	const toast = (toast: Toast, message: string) => {
		switch (toast) {
			case 'error':
				toastErrorMessage.value = message
				isError.value = true
				break

			case 'pending':
				toastPendingMessage.value = message
				isPending.value = true
				break

			case 'succeed':
				toastSuccessMessage.value = message
				isSucceed.value = true
				break
		}
	}

	const toastShouldHide = (toast: Toast) => {
		switch (toast) {
			case 'error':
				isError.value = false
				break

			case 'pending':
				isPending.value = false
				break

			case 'succeed':
				isSucceed.value = false
				break
		}
	}

	const toastAfterFetch = (operationStatus: OperationStatus<any>) => {
		if (operationStatus.success) {
			toast('succeed', operationStatus.message)

			const timeOutId = setTimeout(() => {
				toastShouldHide('succeed')
			}, TOAST_TIMEOUT)

			timeOuts.value.push(timeOutId)
		} else {
			toast('error', operationStatus.message)
		}
	}

	return {
		isError,
		isPending,
		isSucceed,
		toastErrorMessage,
		toastSuccessMessage,
		toastPendingMessage,
		toastShouldHide,
		toastAfterFetch,
		toast,
		timeOuts
	}
}
