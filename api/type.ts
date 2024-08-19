export interface IloginForm {
	email: string
	password: string
}

export interface IForgetPasswordForm {
	email: string
}

export interface IResetPasswordForm {
	email: string
	token: string
	password: string
	password_confirmation: string
}

export interface IOrganizationInfo {
	id: number
	name_en: string
	name_kh: string
	img: string
	role_en: string
	role_kh: string
	order: number
	type: string
	created_at: string
	updated_at: string
	deleted_at: null | string
}

export type IOrganizationResponse = { data: IOrganizationInfo[] }

export type IOrganization = {
	National_Council: IOrganizationInfo[]
	Staff: IOrganizationInfo[]
}

export interface IOrganizationForm {
	name_en: string
	name_kh?: string
	img?: string
	role_en: string
	role_kh?: string
	type: keyof IOrganization
	order: number | string
}

export interface IContactForm {
	email: string
	phone: string
	name: string
	subject: string
	message: string
}

export interface QAndAForm {
	question_en: string
	question_kh: string
	answer_en: string
	answer_kh: string
	type: string
}

export interface QAndAErrorFlags {
	question_en: boolean
	question_kh: boolean
	answer_en: boolean
	answer_kh: boolean
	type: boolean
	[key: string]: boolean // Add index signature
}

export interface VideoForm {
	video_url: string
	title_en?: string
	title_kh?: string
	post?: { category: number; subcategory?: number }[] | null
	m_b__categories?: { m_b__categories_id: number; m_b__subcategories_id?: number }[] | null
	mb_professional?: string[] | null
}

export interface PostForm {
	data: []
	meta: {
		current_page: number
		from: number
		last_page: number
		total: number
	}
}
export interface PostState {
	posts: PostForm
	getPostsLoading: boolean
	createPostLoading: boolean
}

export interface BranchForm {
	data: []
	meta: {
		current_page: number
		from: number
		last_page: number
		total: number
	}
}
export interface BranchState {
	branch: BranchForm
	getBranchLoading: boolean
	createBranchLoading: boolean
}

export interface CategoryForm {
	data: any[]
	meta: {
		current_page: number
		from: number
		last_page: number
		total: number
	}
}
export interface CategoryState {
	category: CategoryForm
	totalJob: number
	getCategoryLoading: boolean
	createCategoryLoading: boolean
}

export interface IGalleryImageResponse {
	created_at: string
	id: number
	updated_at: string
	image: string
}

export type PostSubCategory = {
	id: number

	name: string
	name_en: string

	slug_en: string
	slug_kh: string

	post__categories_id?: number
	post__categories?: {
		id: number

		name: string
		name_en: string

		slug_en: string
		slug_kh: string

		img?: string

		post_count?: number
		count?: number

		created_at?: string
		updated_at?: string
		deleted_at?: string
	}
	post_count?: number

	created_at?: string
	updated_at?: string
	deleted_at?: string
}

export type PostCategory = {
	id: number

	name: string
	name_en: string

	slug_en: string
	slug_kh: string

	img?: string

	post__subcategories: PostSubCategory[] | []
	post__categories_id?: number

	post_count?: number
	count?: number

	created_at?: string
	updated_at?: string
	deleted_at?: string
}

export type MBSubcategory = {
	id: number
	name: string
	name_en: string
	slug_kh: string
	slug_en: string
	count: number
	img: null
	m_b__categories_id: number
	created_at?: string
	updated_at?: string
	deleted_at?: string | null
}

export type MBCategory = {
	id: number
	name: string
	name_en: string
	slug_en: string
	slug_kh: string
	img: string
	m_b__subcategories: MBSubcategory[]
	count?: number
	created_at?: string
	updated_at?: string
	deleted_at?: string
}

export type User = {
	id: number
	name: string

	email: string
	email_verified_at: any

	created_at: string
	updated_at: string
}

export type Post = {
	id: number

	title_en: string
	title_kh: string

	slug_en: string
	slug_kh: string

	content_en: string
	content_kh: string

	tags: string

	date: string
	created_at?: string
	updated_at?: string
	deleted_at?: string
	modified?: any

	author: string
	users_id?: number
	users?: User
	status?: string
	view?: string

	image: string
	pdf?: any

	post__categories?: PostCategory[]
	post__categories_id?: number
	post__subcategories?: PostCategory[]
	post__subcategories_id?: number
	m_b__categories?: MBCategory[]
	m_b__subcategories?: MBSubcategory[]
	mb_professional?: string[]
	m_b__categories_id?: number
	grade?: string[]
}

export type Publication = {
	id: number
	title_en: string
	title_kh: string
	image: string
	pdf: string
	created_at: string
	updated_at: string
}

export type VideoEducation = {
	id: number
	title_kh?: string
	title_en?: string
	video_url: string
	mb_professional: string[]
	created_at: string
	updated_at: string
	post__categories: Post['post__categories']
	post__subcategories: Post['post__subcategories']
	m_b__categories: Post['m_b__categories']
}

export type TeamMember = {
	id: number

	img: string

	name_en: string
	name_kh: string

	order: number

	role_en: string
	role_kh: string

	type: string

	updated_at: string
	created_at: string
	deleted_at: string
}

export type Video = {
	id: number
	title: string
	video_url: string
	post: Post
	mbLearner: {
		id: number
		title_kh: string
		title_en: string
	}
	mbProfessional: string
	created_at: string
}

export type PDFResponse = {
	pdf: string
	title_en: string
	title_kh: string
	image: string
	id: number
	created_at?: string
	updated_at?: string
}
