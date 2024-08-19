import type { IloginForm, IForgetPasswordForm, IResetPasswordForm, IContactForm } from './type'

import { instanceBasic, instance } from '@/composables/axios'

export const multipartFormDataHeader = {
	'Content-Type': 'multipart/form-data'
}

export type PaginationMeta = {
	current_page: number

	from: number
	to: number

	per_page?: number
	last_page: number

	total: number
}

// Authentication
export const LoginAPI = (payload: IloginForm) =>
	instanceBasic()
		.post(`/login`, payload)
		.then(res => res.data)
export const ForgetPasswordAPI = (payload: IForgetPasswordForm) =>
	instanceBasic()
		.post(`/forgot-password`, payload)
		.then(res => res.data)
export const ResetPasswordAPI = (payload: IResetPasswordForm) =>
	instanceBasic()
		.post(`/reset-password`, payload)
		.then(res => res.data)
export const loadUserAPI = () =>
	instance()
		.get(`/auth/show_info`)
		.then(res => res.data)
export const LogoutAPI = () => {
	return instance()
		.post(`/auth/logout`)
		.then(res => ({ message: res.data.message, success: true }))
}

export const ContactAPI = (payload: IContactForm) =>
	instanceBasic()
		.post(`/contact_us`, payload)
		.then(res => res.data)

// Branch
// Get
export const GetBranchAPI = () =>
	instance()
		.get(`/branch`)
		.then(res => res.data)

// Posts
// Get all posts
export const GetPostAPI = () =>
	instance()
		.get(`/post`)
		.then(res => res.data)
// Get post by type
export const GetPostByTypeAPI = (type: string, page: number) =>
	instanceBasic()
		.get(`/post?search=&type=career-and-opportunity&subtype=${type}&page=${page}`)
		.then(res => res.data)
// Create
export const CreatePostAPI = (payload: FormData) => {
	return instance().post(`/post`, payload, {
		headers: multipartFormDataHeader
	})
}
// Delete
export const DeletePostAPI = (id: number) => {
	return instance().delete(`/post/${id}`, {
		headers: multipartFormDataHeader
	})
}
// Update
export const UpdatePostAPI = (payload: FormData, id: number) => {
	return instance().post(`/post/${id}`, payload, {
		headers: multipartFormDataHeader
	})
}

// Category
// Get
export const GetCategoryAPI = () =>
	instance()
		.get(`/post_category`)
		.then(res => res.data)

// Create
export const CreateCategoryAPI = (payload: FormData) => {
	return instance().post(`/post_category`, payload, {
		headers: multipartFormDataHeader
	})
}

// Delete
export const DeleteCategoryAPI = (id: number) => {
	return instance().delete(`/post_category/${id}`, {
		headers: multipartFormDataHeader
	})
}

// Update
export const UpdateCategoryAPI = (payload: FormData, id: number) => {
	return instance().post(`/post_category/${id}`, payload, {
		headers: multipartFormDataHeader
	})
}

// Post Category
// Get
export const GetPostCategoryAPI = () =>
	instance()
		.get(`/post_category`)
		.then(res => res.data)

// Create
export const CreatePostCategoryAPI = (payload: FormData) => {
	return instance().post(`/post_category`, payload, {
		headers: multipartFormDataHeader
	})
}

// Delete
export const DeletePostCategoryAPI = (id: number) => {
	return instance().delete(`/post_category/${id}`, {
		headers: multipartFormDataHeader
	})
}

// Update
export const UpdatePostCategoryAPI = (payload: FormData, id: number) => {
	return instance().post(`/post_category/${id}`, payload, {
		headers: multipartFormDataHeader
	})
}

// Post Subcategory
// Get
export const GetPostSubcategoryAPI = () =>
	instance()
		.get(`/post_subcategory`)
		.then(res => res.data)

// Create
export const CreatePostSubcategoryAPI = (payload: FormData) => {
	return instance().post(`/post_subcategory`, payload, {
		headers: multipartFormDataHeader
	})
}

// Delete
export const DeletePostSubcategoryAPI = (id: number) => {
	return instance().delete(`/post_subcategory/${id}`, {
		headers: multipartFormDataHeader
	})
}

// Update
export const UpdatePostSubcategoryAPI = (payload: FormData, id: number) => {
	return instance().post(`/post_subcategory/${id}`, payload, {
		headers: multipartFormDataHeader
	})
}

// Methodbank
// Get all methodbank categories
export * from './mb-category'

// Methodbank Learner
export * from './mb-learner'

// Methodbank Professional
export * from './mb-professional'

// Methodbank Books & PDF
export * from './mb-pdf'

// Gallery
// Get all images
export * from './gallery'

// Faq
export * from './faq'

// Organization
export * from './organization'

// Publication
export * from './publication'

// Learning categories
export * from './learning-categories'
