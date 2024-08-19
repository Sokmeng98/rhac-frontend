<template>
	<h1 class="mb-10 text-4xl font-normal">{{ headingTitle }}</h1>

	<section v-if="isPreview">
		<div class="w-full">
			<div class="flex justify-end mb-5 -mt-2 space-x-3">
				<AdminPreviewButton :is-preview="isPreview" @toggle-preview="togglePreview" />
				<AdminCancelButton />
				<AdminActionButton v-if="!error.isError" text="publish" @click="submitArticleForm" />
			</div>
		</div>

		<AdminPreview
			:language="currentEditingLanguage"
			:title-en="titleEn"
			:title-kh="titleKh"
			:content-en="contentEn"
			:content-kh="contentKh"
			:category="subCategoryName"
			:image="thumbnailObjectURL"
			:is-error="error.isError"
			:author="author ? author : undefined"
		/>
	</section>

	<main v-else>
		<div class="float-left w-[68%] p-1 mt-5 overflow-hidden">
			<div class="mb-5">
				<h2 class="text-xl font-bold">Title</h2>
				<AdminErrorMessage
					v-if="error.title_en && currentEditingLanguage == 'en'"
					message="Title in English is required"
				/>
				<AdminErrorMessage
					v-if="error.title_kh && currentEditingLanguage == 'kh'"
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
					v-if="error.title_en_len && !error.title_en && currentEditingLanguage == 'en'"
					message="English title should contain at least 10 characters"
				/>
				<AdminErrorMessage
					v-if="error.title_kh_len && !error.title_kh && currentEditingLanguage == 'kh'"
					message="Khmer title should contain at least 10 characters"
				/>
			</div>

			<div v-if="isKhmer">
				<AdminErrorMessage v-if="error.content_kh" message="Content in Khmer is required" />

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
					v-if="error.content_kh_len && !error.content_kh"
					message="Khmer content should contain at least 10 characters"
				/>
			</div>

			<div v-else>
				<AdminErrorMessage v-if="error.content_en" message="Content in English is required" />

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
					v-if="error.content_en_len && !error.content_en"
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

			<div class="mt-3 w-72 h-[30rem]">
				<h2 class="text-xl font-bold">Custom Post Date</h2>
				<AdminDatePicker v-model="date" />
			</div>
		</div>

		<div class="float-right w-[30%]">
			<div class="mb-5">
				<div class="flex justify-end -mt-2 space-x-3">
					<AdminPreviewButton :is-preview="isPreview" @toggle-preview="togglePreview" />
					<AdminCancelButton />
					<AdminActionButton text="publish" @click="submitArticleForm" />
				</div>
				<div class="flex justify-end pt-1">
					<AdminErrorMessage v-if="error.error_msg" :message="error.error_msg" />
				</div>
			</div>

			<!-- Language Card -->
			<EditorLanguageCard
				:language="currentEditingLanguage"
				:change-language="setEditingLanguage"
			/>

			<div>
				<AdminErrorMessage
					v-if="error.category && !error.error_msg"
					message="Please select the category"
				/>
				<div class="mb-8 bg-white rounded-md">
					<h4 class="p-3 text-xl font-bold border-b">Category</h4>
					<div class="p-3">
						<div>
							<div
								v-for="(item, index) in careerCategories[0].post__subcategories"
								:key="index"
								class="flex ml-5"
							>
								<input
									:id="item.name_en"
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

			<!-- Thumbnail Image Upload -->
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
		msg="Are you sure to discard post?"
		title="DISCARD POST"
		:on-confirm="confirmCancel"
	/>
</template>

<script setup lang="ts">
import { useArticleThumbnail, useBaseUrl } from '~/composables'
import type { PostCategory } from '~~/api/type'
import { formatForBackend } from '~~/util/format-timestamp'

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
const subCategoryName = ref({ en: 'Career and Opportunity', kh: 'អាជីព និងឱកាស' })
const categories = ref<PostCategory[]>([])
const date = ref(new Date())
const headingTitle = ref('Add Career Post')
const isPreview = ref(false)
const currentEditingLanguage = ref('kh')
const error = ref({
	title_en: false,
	title_kh: false,
	content_en: false,
	content_kh: false,
	title_en_len: false,
	title_kh_len: false,
	content_en_len: false,
	content_kh_len: false,
	error_msg: '',
	category: false,
	isError: true
})

const { onThumbnailChange, thumbnailFile, thumbnailObjectURL } = useArticleThumbnail()
const { addTag, getSerializedTag, removeTag, tags } = useTag()

const { createCareerPost } = useCareerStore()

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

// Fetch data categories
const { data: categoryResponse } = await useFetch<{ data: PostCategory[] }>('/post_category', {
	baseURL: useBaseUrl()
})

if (categoryResponse.value) {
	categories.value = categoryResponse.value.data
}

let careerCategories: PostCategory[]
if (categories.value) {
	careerCategories = categories.value.filter((item: any) => item.id === 6)
}

const togglePreview = () => {
	requiredFieldCheck()
	if (isPreview.value) {
		isPreview.value = false
		headingTitle.value = 'Add Career Post'
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

const submitArticleForm = async () => {
	requiredFieldCheck()

	const formData = {} as any

	if (thumbnailFile.value) formData.image = thumbnailFile.value

	if (titleEn.value) formData.title_en = titleEn.value
	if (titleKh.value) formData.title_kh = titleKh.value
	if (contentEn.value) formData.content_en = contentEn.value
	if (contentKh.value) formData.content_kh = contentKh.value

	if (tags.value.length > 0) formData.tags = getSerializedTag()

	if (author.value) formData.author = author.value
	else formData.author = 'RHAC'

	formData.post = postCategory.value
	formData.post_date = formatForBackend(date.value)

	if (!error.value.isError) {
		toast('pending', 'Creating career')

		const res = await createCareerPost(formData)

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
		error.value.title_en = false
		if (stringLen(titleEn.value) < 10) error.value.title_en_len = true
		else error.value.title_en_len = false
		if (!contentEn.value || containsOnlySpaces(contentEn.value)) {
			error.value.content_en = true
		} else {
			error.value.content_en = false
			if (stringLen(contentEn.value) < 10) error.value.content_en_len = true
			else error.value.content_en_len = false
		}
	} else error.value.content_en = false

	if (titleKh.value && !containsOnlySpaces(titleKh.value)) {
		error.value.title_kh = false
		if (stringLen(titleKh.value) < 10) error.value.title_kh_len = true
		else error.value.title_kh_len = false
		if (!contentKh.value || containsOnlySpaces(contentKh.value)) {
			error.value.content_kh = true
		} else {
			error.value.content_kh = false
			if (stringLen(contentKh.value) < 10) error.value.content_kh_len = true
			else error.value.content_kh_len = false
		}
	} else error.value.content_kh = false

	if (!contentEn.value || containsOnlySpaces(contentEn.value)) {
		error.value.title_en = false
	} else {
		error.value.content_en = false
		if (stringLen(contentEn.value) < 10) error.value.content_en_len = true
		else error.value.content_en_len = false
		if (titleEn.value && !containsOnlySpaces(titleEn.value)) {
			error.value.title_en = false
			if (stringLen(titleEn.value) < 10) error.value.title_en_len = true
			else error.value.title_en_len = false
		} else {
			error.value.title_en = true
		}
	}

	if (!contentKh.value || containsOnlySpaces(contentKh.value)) {
		error.value.title_kh = false
	} else {
		error.value.content_kh = false
		if (stringLen(contentKh.value) < 10) error.value.content_kh_len = true
		else error.value.content_kh_len = false
		if (titleKh.value && !containsOnlySpaces(titleKh.value)) {
			error.value.title_kh = false
			if (stringLen(titleKh.value) < 10) error.value.title_kh_len = true
			else error.value.title_kh_len = false
		} else {
			error.value.title_kh = true
		}
	}

	if (
		(!titleEn.value || containsOnlySpaces(titleEn.value)) &&
		(!titleKh.value || containsOnlySpaces(titleKh.value)) &&
		(!contentEn.value || containsOnlySpaces(contentEn.value)) &&
		(!contentKh.value || containsOnlySpaces(contentEn.value)) &&
		!postCategory.value.length
	)
		error.value.error_msg = 'Title, content and category are required'
	else error.value.error_msg = ''

	if (postCategory.value.length) error.value.category = false
	else error.value.category = true

	if (
		!error.value.title_en &&
		!error.value.title_en_len &&
		!error.value.title_kh &&
		!error.value.title_kh_len &&
		!error.value.content_en &&
		!error.value.content_en_len &&
		!error.value.content_kh &&
		!error.value.content_kh_len &&
		!error.value.error_msg &&
		!error.value.category
	) {
		error.value.isError = false
	} else error.value.isError = true
}
</script>
