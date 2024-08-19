<template>
	<main>
		<div class="mb-10">
			<h1 class="text-4xl font-normal">{{ headingTitle }}</h1>
		</div>

		<div v-if="isPreview">
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
				:category="categoryName[0]"
				:image="thumbnailObjectURL"
				:is-error="error.isError"
				:author="author ? author : undefined"
			/>
		</div>

		<div v-else>
			<div class="float-left w-[68%] mt-5 overflow-hidden p-1">
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
						<ClientOnly>
							<TiptapEditor
								:content="contentKh"
								@update="
									(content: string) => {
										contentKh = content
									}
								"
							/>
						</ClientOnly>
					</div>

					<AdminErrorMessage
						v-if="error.content_kh_len && !error.content_kh"
						message="Khmer content should contain at least 10 characters"
					/>
				</div>
				<div v-else>
					<AdminErrorMessage v-if="error.content_en" message="Content in English is required" />
					<div class="bg-white">
						<ClientOnly>
							<TiptapEditor
								:content="contentEn"
								@update="
									(content: string) => {
										contentEn = content
									}
								"
							/>
						</ClientOnly>
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
							<div v-for="items in categories" :key="items.id">
								<div class="flex">
									<input
										v-model="isCheckPostParent"
										type="checkbox"
										:disabled="items.post__subcategories?.length !== 0"
										:value="items.id"
										class="w-4 h-4 mt-1 shrink-0"
										@click="
											selectPostCategory(
												items.id,
												items.name_en,
												items.name,
												items.post__subcategories.length
											)
										"
									/>
									<label
										:class="`ml-2 text-sm font-medium leading-6 ${
											items.post__subcategories?.length !== 0
												? 'text-neutral-400'
												: 'text-[#000000]'
										}`"
										@click="
											selectPostCategory(
												items.id,
												items.name_en,
												items.name,
												items.post__subcategories.length
											)
										"
									>
										{{ items.name_en }}
									</label>
								</div>

								<div v-if="items.post__subcategories?.length">
									<div
										v-for="(item, index) in items.post__subcategories"
										:key="index"
										class="flex ml-5"
									>
										<input
											v-model="isCheckPostChild"
											type="checkbox"
											:value="item.id"
											class="w-4 h-4 mt-1 shrink-0"
											@click="
												selectPostCategory(
													items.id,
													items.name_en,
													items.name,
													items.post__subcategories.length,
													item.id
												)
											"
										/>
										<label
											class="ml-2 text-sm font-medium leading-6"
											@click="
												selectPostCategory(
													items.id,
													items.name_en,
													items.name,
													items.post__subcategories.length,
													item.id
												)
											"
										>
											{{ item.name_en }}
										</label>
									</div>
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
		</div>

		<!-- Toast -->
		<div class="toast toast-end">
			<ToastStatus
				:error="isError"
				:pending="isPending"
				:succeed="isSucceed"
				:error-message="toastErrorMessage"
				:pending-message="toastPendingMessage"
				:success-message="toastSuccessMessage"
				:should-hide="toastShouldHide"
			/>
		</div>

		<!-- Confirm discard post -->
		<ConfirmCard
			id="confirm_cancel"
			msg="Are you sure to discard this post?"
			title="DISCARD POST"
			:on-confirm="confirmCancel"
		/>
	</main>
</template>

<script setup lang="ts">
import { useArticleThumbnail, useBaseUrl, useTag } from '~/composables'
import type { PostCategory } from '~/api/type'
import { formatForBackend } from '~/util/format-timestamp'

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
const isCheckPostParent = ref<number[]>([])
const isCheckPostChild = ref<number[]>([])
const categoryName = ref<{ id: number; en: string; kh: string }[]>([])
const date = ref(new Date())
const headingTitle = ref('Add Post')
const isPreview = ref(false)
const currentEditingLanguage = ref<string>('kh')
const categories = ref<PostCategory[]>([])
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

const { createArticle } = useArticleStore()

const { addTag, removeTag, getSerializedTag, tags } = useTag()
const { onThumbnailChange, thumbnailFile, thumbnailObjectURL } = useArticleThumbnail()

const {
	isError,
	isPending,
	isSucceed,
	toast,
	toastErrorMessage,
	toastSuccessMessage,
	toastPendingMessage,
	toastShouldHide,
	toastAfterFetch
} = useToast()

const confirmCancel = () => {
	navigateTo('/admin/article')
}

const { isKhmer } = useCurrentEditingLanguage(currentEditingLanguage)

const setEditingLanguage = (language: string) => {
	if (language === 'kh') {
		currentEditingLanguage.value = 'kh'
	}

	if (language === 'en') {
		currentEditingLanguage.value = 'en'
	}
}

// Fetch categories
const { data: postCategories } = await useFetch<{ data: PostCategory[] }>('/post_category', {
	baseURL: useBaseUrl()
})

if (postCategories.value) {
	categories.value = postCategories.value.data.filter(
		item => item.name_en !== 'Career and Opportunity'
	)
}

const togglePreview = () => {
	requiredFieldCheck()
	if (isPreview.value) {
		isPreview.value = false
		headingTitle.value = 'Add Post'
	} else {
		isPreview.value = true
		headingTitle.value = 'Preview'
	}
}

// Select categories
const selectPostCategory = (
	id: number,
	nameEn: string,
	name: string,
	subCategoryLen: number,
	subId?: number
) => {
	const idNotInArray: boolean = postCategory.value.every(item => item.category !== id)

	if (!subCategoryLen && !subId) {
		if (idNotInArray) {
			postCategory.value.push({ category: id })
			isCheckPostParent.value.push(id)
			categoryName.value.push({ id, en: nameEn, kh: name })
		} else {
			const index = postCategory.value.findIndex(item => item.category === id)
			postCategory.value.splice(index, 1)
			isCheckPostParent.value.splice(isCheckPostParent.value.indexOf(id), 1)
			categoryName.value.splice(
				categoryName.value.findIndex(item => item.id === id),
				1
			)
		}
	} else if (subCategoryLen && subId) {
		if (idNotInArray) {
			postCategory.value.push({ category: id, subcategory: subId })
			isCheckPostParent.value.push(id)
			isCheckPostChild.value.push(subId)
			categoryName.value.push({ id, en: nameEn, kh: name })
		} else {
			const subIdNotInArray = postCategory.value.every(item => item.subcategory !== subId)

			if (subIdNotInArray) {
				postCategory.value.push({ category: id, subcategory: subId })
				isCheckPostChild.value.push(subId)
			} else {
				const subIdIndex = postCategory.value.findIndex(item => item.subcategory === subId)
				postCategory.value.splice(subIdIndex, 1)
				isCheckPostChild.value.splice(isCheckPostChild.value.indexOf(subId), 1)

				const idNotExist = postCategory.value.every(item => item.category !== id)
				if (idNotExist) {
					isCheckPostParent.value.splice(isCheckPostParent.value.indexOf(id), 1)
					categoryName.value.splice(
						categoryName.value.findIndex(item => item.id === id),
						1
					)
				}
			}
		}
	}
}

const submitArticleForm = async () => {
	requiredFieldCheck()

	const temp = {} as any

	if (thumbnailFile.value) temp.image = thumbnailFile.value

	if (titleEn.value) temp.title_en = titleEn.value
	if (titleKh.value) temp.title_kh = titleKh.value

	if (contentEn.value) temp.content_en = contentEn.value
	if (contentKh.value) temp.content_kh = contentKh.value

	if (tags.value.length) temp.tags = getSerializedTag()

	if (author.value) temp.author = author.value
	else temp.author = 'RHAC'

	temp.post = postCategory.value
	temp.post_date = formatForBackend(date.value)

	if (!error.value.isError) {
		toast('pending', 'Publishing article')
		const res = await createArticle(temp)
		toastAfterFetch(res)
		toastShouldHide('pending')
		if (res.success) navigateTo('/admin/article')
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
