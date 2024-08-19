<template>
	<h1 class="mb-10 text-4xl font-normal">{{ headingTitle }}</h1>

	<main v-if="isPreview">
		<div class="w-full">
			<div class="flex justify-end mb-5 -mt-2 space-x-3">
				<AdminPreviewButton :is-preview="isPreview" @toggle-preview="togglePreview" />
				<AdminCancelButton />
				<AdminActionButton v-if="!error.isError" text="save" @click="onUpdateArticle" />
			</div>
		</div>

		<AdminPreview
			:language="currentEditingLanguage"
			:title-en="titleEn"
			:title-kh="titleKh"
			:content-en="contentEn"
			:content-kh="contentKh"
			:category="categoryName"
			:image="thumbnailObjectURL"
			:is-error="error.isError"
			:author="author ? author : undefined"
		/>
	</main>

	<main v-else>
		<div class="float-left w-[68%] p-1 mt-5 overflow-hidden">
			<div class="mb-5">
				<h2 class="text-xl font-bold">Title</h2>
				<AdminErrorMessage
					v-if="error.titleEn && currentEditingLanguage == 'en'"
					message="Title in English is required"
				/>
				<AdminErrorMessage
					v-if="error.titleKh && currentEditingLanguage == 'kh'"
					message="Title in Khmer is required"
				/>

				<input
					v-if="isKhmer"
					v-model="titleKh"
					class="w-full px-4 py-[10px] text-xl text-black rounded-lg focus:outline-none focus:ring-1"
					type="text"
				/>
				<input
					v-else
					v-model="titleEn"
					class="w-full px-4 py-[10px] text-xl text-black rounded-lg focus:outline-none focus:ring-1"
					type="text"
				/>

				<AdminErrorMessage
					v-if="error.titleEnLength && !error.titleEn && currentEditingLanguage == 'en'"
					message="English title should contain at least 10 characters"
				/>
				<AdminErrorMessage
					v-if="error.titleKhLength && !error.titleKh && currentEditingLanguage == 'kh'"
					message="Khmer title should contain at least 10 characters"
				/>
			</div>

			<div v-if="isKhmer">
				<AdminErrorMessage v-if="error.contentKh" message="Content in Khmer is required" />

				<div class="bg-white">
					<TiptapEditor
						:content="contentKh"
						@update="
							(content: string) => {
								contentKh = content
							}
						"
					/>
				</div>

				<AdminErrorMessage
					v-if="error.contentKhLength && !error.contentKh"
					message="Khmer content should contain at least 10 characters"
				/>
			</div>

			<div v-else>
				<AdminErrorMessage v-if="error.contentEn" message="Content in English is required" />

				<div class="bg-white">
					<TiptapEditor
						:content="contentEn"
						@update="
							(content: string) => {
								contentEn = content
							}
						"
					/>
				</div>

				<AdminErrorMessage
					v-if="error.contentEnLength && !error.contentEn"
					message="English content should contain at least 10 characters"
				/>
			</div>

			<div class="mt-3">
				<h2 class="text-xl font-bold">Article By</h2>
				<input
					v-model="author"
					class="w-full px-4 py-[10px] text-xl text-black rounded-lg focus:outline-none focus:ring-1"
					type="text"
					placeholder="RHAC"
				/>
			</div>

			<div class="mt-3 w-72 h-[420px]">
				<h2 class="text-xl font-bold">Custom Post Date</h2>
				<AdminDatePicker v-model="date" />
			</div>
		</div>

		<div class="float-right w-[30%]">
			<div class="mb-5">
				<div class="flex justify-end -mt-2 space-x-3">
					<AdminPreviewButton :is-preview="isPreview" @toggle-preview="togglePreview" />
					<AdminCancelButton />
					<AdminActionButton text="save" @click="onUpdateArticle" />
				</div>
				<div class="flex justify-end pt-1">
					<AdminErrorMessage v-if="error.errorMessage" :message="error.errorMessage" />
				</div>
			</div>

			<EditorLanguageCard
				:language="currentEditingLanguage"
				:change-language="setEditingLanguage"
			/>

			<div>
				<AdminErrorMessage
					v-if="error.category && !error.errorMessage"
					message="Please select the category"
				/>
				<div class="mb-8 bg-white rounded-md">
					<h4 class="p-3 text-xl font-bold border-b">Category</h4>
					<div class="p-3">
						<div>
							<div
								v-for="item in careerSubCategories?.[0].post__subcategories"
								:key="item.id"
								class="flex ml-5"
							>
								<input
									:id="item.name_en"
									v-model="isCategoryCheck"
									type="checkbox"
									:value="item.id"
									class="w-4 h-4 mt-1"
									@click="selectSubCategoryId(item.id)"
								/>
								<label class="ml-2 text-sm font-medium leading-6" :for="item.name_en">
									{{ item.name_en }}
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ArticleThumbnailUploader
				:image-object-url="thumbnailObjectURL"
				:on-thumbnail-change="onThumbnailChange"
			/>

			<!-- Add Tag Card -->
			<AddTagCard :tags="tags" :add-tag="addTag" :remove-tag="removeTag" />
		</div>
	</main>

	<!-- Toast -->
	<div class="toast toast-end">
		<ToastStatus
			:pending="isPending"
			:error="isError"
			:succeed="isSucceed"
			:should-hide="toastShouldHide"
			:pending-message="toastPendingMessage"
			:error-message="toastErrorMessage"
			:success-message="toastSuccessMessage"
		/>
	</div>

	<!-- Confirm discard post -->
	<ConfirmCard
		id="confirm_cancel"
		msg="Are you sure to discard change?"
		title="DISCARD CHANGE"
		:on-confirm="confirmCancel"
	/>
</template>

<script setup lang="ts">
import { useArticleThumbnail, useBaseUrl } from '~/composables'
import type { Post, PostCategory, PostSubCategory } from '~~/api/type'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const titleKh = ref('')
const titleEn = ref('')
const contentKh = ref('')
const contentEn = ref('')
const author = ref('')
const postCategory = ref<{ category: number; subcategory?: number }[]>([])
const isCategoryCheck = ref<number[]>([])
const categoryName = ref({ en: 'Career and Opportunity', kh: 'អាជីព និងឱកាស' })
const date = ref<string | Date>(new Date())
const headingTitle = ref('Edit Career Post')
const isPreview = ref(false)
const error = ref({
	titleEn: false,
	titleKh: false,
	contentEn: false,
	contentKh: false,
	titleEnLength: false,
	titleKhLength: false,
	contentEnLength: false,
	contentKhLength: false,
	errorMessage: '',
	category: false,
	isError: true
})

const { updateCareerPost } = useCareerStore()
const { onThumbnailChange, thumbnailFile, thumbnailObjectURL } = useArticleThumbnail()
const { addTag, getSerializedTag, initTag, removeTag, tags } = useTag()

const baseURL = useBaseUrl()
const {
	params: { slug },
	query: { lang }
} = useRoute()

const {
	toast,
	isError,
	isPending,
	isSucceed,
	toastErrorMessage,
	toastPendingMessage,
	toastSuccessMessage,
	toastShouldHide,
	toastAfterFetch
} = useToast()

const currentEditingLanguage = ref<string>(lang === 'kh' ? 'kh' : lang === 'en' ? 'en' : '')
const { isKhmer } = useCurrentEditingLanguage(currentEditingLanguage)

const setEditingLanguage = (language: string) => {
	if (language === 'kh') {
		currentEditingLanguage.value = 'kh'
	}
	if (language === 'en') {
		currentEditingLanguage.value = 'en'
	}
}

const confirmCancel = () => {
	navigateTo('/admin/career')
}

// Fetch post data by slug
const { data: careerDataResponse } = await useFetch<{ data: Post[] }>(`/post/${slug}`, {
	baseURL
})

let career: Post | undefined
if (careerDataResponse.value?.data) {
	career = careerDataResponse.value.data[0]
}

// Fetch data categories
const { data: postCategories } = await useFetch<{ data: PostCategory[] }>('/post_category', {
	baseURL
})

let careerSubCategories: PostCategory[] | undefined
if (postCategories.value?.data) {
	careerSubCategories = postCategories.value?.data.filter(
		(item: PostSubCategory) => item.name_en === 'Career and Opportunity'
	)
}

// Assign given value from fetching data to each fields
if (career) {
	career.post__subcategories?.forEach((item: any) => {
		postCategory.value.push({ category: item.post__categories_id, subcategory: item.id })
		isCategoryCheck.value.push(item.id)
	})
	author.value = career.author
	date.value = career.date
	if (career.image) thumbnailObjectURL.value = useFilePath(career.image)

	career.title_en ? (titleEn.value = career.title_en) : (titleEn.value = '')
	career.title_kh ? (titleKh.value = career.title_kh) : (titleKh.value = '')
	career.content_en ? (contentEn.value = career.content_en) : (contentEn.value = '')
	career.content_kh ? (contentKh.value = career.content_kh) : (contentKh.value = '')

	if (career.tags) {
		initTag(career.tags)
	}
}

const togglePreview = () => {
	requiredFieldCheck()
	if (isPreview.value) {
		isPreview.value = false
		headingTitle.value = 'Edit Post'
	} else {
		isPreview.value = true
		headingTitle.value = 'Preview'
	}
}

const selectSubCategoryId = (id: number) => {
	if (postCategory.value.every(item => item.subcategory !== id)) {
		postCategory.value.push({ category: 6, subcategory: id })
	} else {
		postCategory.value.splice(
			postCategory.value.findIndex(item => item.subcategory === id),
			1
		)
	}
}

const onUpdateArticle = async () => {
	requiredFieldCheck()

	const formData = {} as any
	formData._method = 'PUT'

	if (titleEn.value !== career?.title_en) formData.title_en = titleEn.value
	if (titleKh.value !== career?.title_kh) formData.title_kh = titleKh.value
	if (contentEn.value) formData.content_en = contentEn.value
	if (contentKh.value) formData.content_kh = contentKh.value

	if (postCategory.value.length) formData.post = postCategory.value
	if (tags.value.length) formData.tags = getSerializedTag()

	if (thumbnailFile.value) formData.image = thumbnailFile.value

	if (author.value && author.value !== 'RHAC') formData.author = author.value

	if (date.value !== career?.date) formData.post_date = date.value

	if (!error.value.isError && career) {
		toast('pending', 'Updating career')

		const res = await updateCareerPost(formData, career.id)

		toastAfterFetch(res)
		toastShouldHide('pending')
		if (res.success) navigateTo('/admin/career')
	}
}

// Check required feild and length
const requiredFieldCheck = () => {
	// Length of string(title&content) excluding improper whitespace
	const stringLen = (str: string): number => {
		const temp: string = str.replace(/<p>|<\/p>|<br>|\s\s+/gi, '')
		return temp.trim().length
	}
	// Check if a string contains only spaces
	const containsOnlySpaces = (str: string): boolean => stringLen(str) === 0

	if (titleEn.value && !containsOnlySpaces(titleEn.value)) {
		error.value.titleEn = false
		if (stringLen(titleEn.value) < 10) error.value.titleEnLength = true
		else error.value.titleEnLength = false
		if (!contentEn.value || containsOnlySpaces(contentEn.value)) {
			error.value.contentEn = true
		} else {
			error.value.contentEn = false
			if (stringLen(contentEn.value) < 10) error.value.contentEnLength = true
			else error.value.contentEnLength = false
		}
	} else error.value.contentEn = false

	if (titleKh.value && !containsOnlySpaces(titleKh.value)) {
		error.value.titleKh = false
		if (stringLen(titleKh.value) < 10) error.value.titleKhLength = true
		else error.value.titleKhLength = false
		if (!contentKh.value || containsOnlySpaces(contentKh.value)) {
			error.value.contentKh = true
		} else {
			error.value.contentKh = false
			if (stringLen(contentKh.value) < 10) error.value.contentKhLength = true
			else error.value.contentKhLength = false
		}
	} else error.value.contentKh = false

	if (!contentEn.value || containsOnlySpaces(contentEn.value)) {
		error.value.titleEn = false
	} else {
		error.value.contentEn = false
		if (stringLen(contentEn.value) < 10) error.value.contentEnLength = true
		else error.value.contentEnLength = false
		if (titleEn.value && !containsOnlySpaces(titleEn.value)) {
			error.value.titleEn = false
			if (stringLen(titleEn.value) < 10) error.value.titleEnLength = true
			else error.value.titleEnLength = false
		} else {
			error.value.titleEn = true
		}
	}

	if (!contentKh.value || containsOnlySpaces(contentKh.value)) {
		error.value.titleKh = false
	} else {
		error.value.contentKh = false
		if (stringLen(contentKh.value) < 10) error.value.contentKhLength = true
		else error.value.contentKhLength = false
		if (titleKh.value && !containsOnlySpaces(titleKh.value)) {
			error.value.titleKh = false
			if (stringLen(titleKh.value) < 10) error.value.titleKhLength = true
			else error.value.titleKhLength = false
		} else {
			error.value.titleKh = true
		}
	}

	if (
		(!titleEn.value || containsOnlySpaces(titleEn.value)) &&
		(!titleKh.value || containsOnlySpaces(titleKh.value)) &&
		(!contentEn.value || containsOnlySpaces(contentEn.value)) &&
		(!contentKh.value || containsOnlySpaces(contentEn.value)) &&
		!postCategory.value.length
	)
		error.value.errorMessage = 'Title, content and category are required'
	else error.value.errorMessage = ''

	if (postCategory.value.length) error.value.category = false
	else error.value.category = true

	if (
		!error.value.titleEn &&
		!error.value.titleEnLength &&
		!error.value.titleKh &&
		!error.value.titleKhLength &&
		!error.value.contentEn &&
		!error.value.contentEnLength &&
		!error.value.contentKh &&
		!error.value.contentKhLength &&
		!error.value.errorMessage &&
		!error.value.category
	) {
		error.value.isError = false
	} else error.value.isError = true
}
</script>
