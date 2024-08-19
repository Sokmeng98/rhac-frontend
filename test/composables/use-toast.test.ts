import { describe, expect, it } from 'vitest'
import { useToast } from '~/composables/use-toast'
import type { OperationStatus } from '~~/api/category'

describe('use toast: initialise value', () => {
	it('is a function', () => {
		expect(useToast).toBeInstanceOf(Function)
	})

	it('returns an object', () => {
		const useToastReturnValue = useToast()
		expect(useToastReturnValue).toBeInstanceOf(Object)
	})

	it('returns isPending as a reactive value (ref) initialized to false', () => {
		const { isPending } = useToast()
		expect(isPending.value).toBe(false)
	})

	it('returns isSucceed as a reactive value (ref) initialized to false', () => {
		const { isSucceed } = useToast()
		expect(isSucceed.value).toBe(false)
	})

	it('returns isError as a reactive value (ref) initialized to false', () => {
		const { isError } = useToast()
		expect(isError.value).toBe(false)
	})

	it('returns toastPendingMessage as a reactive value (ref) initialized to empty string', () => {
		const { toastPendingMessage } = useToast()
		expect(toastPendingMessage.value).toBe('')
	})

	it('returns toastSuccessMessage as a reactive value (ref) initialized to empty string', () => {
		const { toastSuccessMessage } = useToast()
		expect(toastSuccessMessage.value).toBe('')
	})

	it('returns toastErrorMessage as a reactive value (ref) initialized to empty string', () => {
		const { toastErrorMessage } = useToast()
		expect(toastErrorMessage.value).toBe('')
	})

	it('set timeout IDs to empty list', () => {
		const { timeOuts } = useToast()
		expect(timeOuts.value).toStrictEqual([])
	})
})

describe('use toast: toast function', () => {
	it('returns toast, toastShouldHide, and toastAfterFetch function', () => {
		const { toast, toastAfterFetch, toastShouldHide } = useToast()

		expect(toast).toBeInstanceOf(Function)
		expect(toastAfterFetch).toBeInstanceOf(Function)
		expect(toastShouldHide).toBeInstanceOf(Function)
	})

	it('toasts pending message properly', () => {
		const { toast, isPending, toastPendingMessage } = useToast()

		const message = 'pending message'

		toast('pending', message)

		expect(isPending.value).toBe(true)
		expect(toastPendingMessage.value).toBe(message)
	})

	it('toasts success message properly', () => {
		const { toast, isSucceed, toastSuccessMessage } = useToast()

		const message = 'success message'

		toast('succeed', message)

		expect(isSucceed.value).toBe(true)
		expect(toastSuccessMessage.value).toBe(message)
	})

	it('toasts error message properly', () => {
		const { toast, isError, toastErrorMessage } = useToast()

		const message = 'error message'

		toast('error', message)

		expect(isError.value).toBe(true)
		expect(toastErrorMessage.value).toBe(message)
	})
})

describe('use toast: hide toast', () => {
	it('hides pending message properly', () => {
		const { toast, toastShouldHide, isPending, toastPendingMessage } = useToast()

		const message = 'pending message'

		toast('pending', message)

		toastShouldHide('pending')
		expect(isPending.value).toBe(false)
		expect(toastPendingMessage.value).toBe(message)
	})

	it('hides success message properly', () => {
		const { toast, toastShouldHide, isSucceed, toastSuccessMessage } = useToast()

		const message = 'success message'

		toast('succeed', message)

		toastShouldHide('succeed')
		expect(isSucceed.value).toBe(false)
		expect(toastSuccessMessage.value).toBe(message)
	})

	it('hides error message properly', () => {
		const { toast, toastShouldHide, isError, toastErrorMessage } = useToast()

		const message = 'error message'

		toast('error', message)

		toastShouldHide('error')
		expect(isError.value).toBe(false)
		expect(toastErrorMessage.value).toBe(message)
	})
})

describe('use toast: toast after fetch', () => {
	it('is a function', () => {
		const { toastAfterFetch } = useToast()
		expect(toastAfterFetch).toBeInstanceOf(Function)
	})

	it('will not return anything', () => {
		const { toastAfterFetch } = useToast()

		const operationStatus: OperationStatus<any> = {
			success: true,
			message: 'operation successful',
			data: []
		}

		expect(toastAfterFetch(operationStatus)).toBeUndefined()
	})

	it('sets success and message state if operation success', () => {
		const { toastAfterFetch, isSucceed, toastSuccessMessage } = useToast()

		const operationStatus: OperationStatus<any> = {
			success: true,
			message: 'operation successful',
			data: []
		}

		toastAfterFetch(operationStatus)

		expect(isSucceed.value).toBe(true)
		expect(toastSuccessMessage.value).toBe(operationStatus.message)
	})

	it('sets error and message state if operation error', () => {
		const { toastAfterFetch, isError, toastErrorMessage } = useToast()

		const operationStatus: OperationStatus<any> = {
			success: false,
			message: 'operation failed'
		}

		toastAfterFetch(operationStatus)

		expect(isError.value).toBe(true)
		expect(toastErrorMessage.value).toBe(operationStatus.message)
	})

	it('sets timeout for success message to hide', () => {
		const { toastAfterFetch, timeOuts } = useToast()

		const operationStatus: OperationStatus<any> = {
			success: true,
			message: 'operation successful'
		}

		toastAfterFetch(operationStatus)
		expect(timeOuts.value.length).toBe(1)

		toastAfterFetch(operationStatus)
		expect(timeOuts.value.length).toBe(2)
	})

	it('does not set timeout for error message to hide', () => {
		const { toastAfterFetch, timeOuts } = useToast()

		const operationStatus: OperationStatus<any> = {
			success: false,
			message: 'operation failed'
		}

		toastAfterFetch(operationStatus)
		expect(timeOuts.value.length).toBe(0)
	})
})
