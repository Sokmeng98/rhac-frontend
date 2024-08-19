import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import type { PaginationMeta } from '.'

export type SubCategory = {
	id: number

	name: string
	name_en: string
	slug_en: string
	slug_kh: string

	post__categories_id: number

	post_count: number

	created_at: string
	updated_at: string
	deleted_at?: string
}

export type Category = {
	id: number

	name: string
	name_en: string
	slug_en: string
	slug_kh: string

	post__subcategories: SubCategory[]

	post_count: number

	created_at: string
	updated_at: string
	deleted_at?: string
}

export type CreateCategoryBody = {
	name?: string
	name_en?: string
}

export type CreateSubCategoryBody = {
	name?: string
	name_en?: string
	post__categories_id: number
}

export type OperationStatus<T = Category | SubCategory> = {
	status?: number
	success: boolean
	message: string
	data?: T
}

export const getCategoryAPI = async () => {
	let operationStatus: OperationStatus<Category[]> = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: Category[]; meta: PaginationMeta }>(`/post_category`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					success: true,
					message: 'Get data successfully',
					status,
					data: res.data
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}

export const getSubCategoryAPI = async () => {
	let operationStatus: OperationStatus<SubCategory[]> = {
		message: '',
		success: false
	}

	await instance()
		.get<{ data: SubCategory[]; meta: PaginationMeta }>(`/post_subcategory`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					success: true,
					message: 'Get data successfully',
					status,
					data: res.data
				}
			}
		})
		.catch(() => {
			operationStatus = {
				message: 'Cannot fetch category',
				success: false
			}
		})

	return operationStatus
}

export const createCategoryAPI = async (payload: CreateCategoryBody) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/post_category`, payload, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Created successfully',
					status
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}

export const updateCategoryAPI = async (id: number, payload: CreateCategoryBody) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.put(`/post_category/${id}`, payload, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Updated successfully',
					status: 200
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}

export const createSubCategoryAPI = async (payload: CreateSubCategoryBody) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post(`/post_subcategory`, payload, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Created successfully',
					status: 200
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}

export const updateSubCategoryAPI = async (id: string | number, payload: CreateSubCategoryBody) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.put(`/post_subcategory/${id}`, payload, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Updated successfully',
					status
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}

export const deleteCategoryAPI = async (id: string | number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/post_category/${id}`)
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Deleted successfully',
					status
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}

export const deleteSubCategoryAPI = async (id: string | number) => {
	let operationStatus: OperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/post_subcategory/${id}`)
		.then(({ status }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Deleted successfully',
					status
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}
