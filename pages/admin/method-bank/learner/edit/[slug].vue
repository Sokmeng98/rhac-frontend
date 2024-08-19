<template>
	<h1 class="mb-10 text-4xl font-normal">{{ headingTitle }}</h1>

	<section v-if="isPreview">
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
			:category="mbCategoryName[0]"
			:image="thumbnailObjectURL"
			:pdfs="allPdfName"
			:is-error="error.isError"
			:author="author ? author : undefined"
		/>
	</section>

	<section v-else>
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
		</div>

		<div class="page-sidebar w-[30%] float-right">
			<div class="mb-5">
				<div class="flex justify-end -mt-2 space-x-3">
					<AdminPreviewButton :is-preview="isPreview" @toggle-preview="togglePreview" />
					<AdminCancelButton />
					<AdminActionButton text="save" @click="onUpdateArticle" />
				</div>
				<div class="flex justify-end pt-1">
					<AdminErrorMessage v-if="error.error_msg" :message="error.error_msg" />
				</div>
			</div>

			<!-- Language Card on Sidebar -->
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
									:disabled="items.m_b__subcategories?.length !== 0"
									:value="items.id"
									class="w-4 h-4 mt-1 shrink-0"
									@click="
										selectPostCategory(
											items.id,
											items.name_en,
											items.name,
											items.m_b__subcategories.length
										)
									"
								/>
								<label
									:class="`ml-2 text-sm font-medium leading-6 ${
										items.m_b__subcategories?.length !== 0 ? 'text-neutral-400' : 'text-[#000000]'
									}`"
									@click="
										selectPostCategory(
											items.id,
											items.name_en,
											items.name,
											items.m_b__subcategories.length
										)
									"
								>
									{{ items.name_en }}
								</label>
							</div>

							<div v-if="items.m_b__subcategories?.length">
								<div
									v-for="(item, index) in items.m_b__subcategories"
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
												items.m_b__subcategories.length,
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
												items.m_b__subcategories.length,
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

			<!-- Thumbnail Image Uploade -->
			<ArticleThumbnailUploader
				:on-thumbnail-change="onThumbnailChange"
				:image-object-url="thumbnailObjectURL"
			/>

			<div class="mb-8 bg-white rounded-md">
				<h4 class="p-3 text-xl font-bold border-b">Upload pdf resources</h4>

				<div class="p-3">
					<div
						class="p-4 mx-2 mt-2 mb-3 border-2 border-dashed rounded-lg cursor-pointer border-[#D7E5FF]"
						@click="addPdfClick()"
					>
						<Icon
							icon="material-symbols:folder-open-rounded"
							width="42"
							color="#D7E5FF"
							class="mx-auto"
						/>
						<p class="text-sm text-center">Browse files</p>
					</div>

					<div v-if="allPdfName.length != 0">
						<div v-for="(name, index) in allPdfName" :key="name + index">
							<div class="flex flex-row items-center p-2 my-1 rounded hover:bg-neutral-100">
								<div>
									<Icon icon="uiw:file-pdf" width="40" color="#E01E24" />
								</div>
								<div class="flex flex-row justify-between flex-1 truncate">
									<p class="flex-1 ml-2 mr-1 text-sm truncate">
										{{ name }}
									</p>
									<div class="-mr-4 justify-items-end" @click="handleRemovePdf(index)">
										<AdminCrossIcon />
									</div>
								</div>
							</div>
						</div>
					</div>

					<input
						ref="filepdf"
						type="file"
						accept=".pdf"
						class="hidden"
						multiple
						@change="handlePdfSelected"
					/>
				</div>
			</div>

			<!-- Add Tags Card -->
			<AddTagCard :tags="tags" :add-tag="addTag" :remove-tag="removeTag" />
		</div>
	</section>

	<!-- Toast -->
	<div class="toast toast-end">
		<ToastStatus
			:pending="isPending"
			:succeed="isSucceed"
			:error="isError"
			:pending-message="toastPendingMessage"
			:success-message="toastSuccessMessage"
			:error-message="toastErrorMessage"
			:should-hide="toastShouldHide"
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
import { useArticleThumbnail, useBaseUrl, useFilePath } from '~/composables'
import type { MBCategory, MBSubcategory, Post } from '~~/api/type'
import { usePfdUpload } from '~~/util/upload-pdf'
import { getMbLearnerBySlugAPI } from '~~/api/mb-learner'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const titleKh = ref('')
const titleEn = ref('')
const contentKh = ref('')
const contentEn = ref('')
const author = ref('')

const mbCategory = ref<{ m_b__categories_id: number; m_b__subcategories_id?: number }[]>([])
const isCheckPostParent = ref<number[]>([])
const isCheckPostChild = ref<number[]>([])
const mbCategoryName = ref<{ id: number; en: string; kh: string }[]>([])

const headingTitle = ref('Edit Post')
const isPreview = ref(false)
const allPdfName = ref<string[]>([])
const existingPdfName = ref<string[]>([])
const existingPdfNameLen = ref(0)
const removeIndexOfNewPdf = ref(0)
const filepdf = ref<HTMLInputElement>()

const categories = ref<MBCategory[]>([])

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
const { addTag, getSerializedTag, removeTag, tags, initTag } = useTag()
const { newPdfFile, newPdfName, handlePdfSelected, removePdf } = usePfdUpload()

const baseURL = useBaseUrl()
const { updateMbLearnerPost } = useMbLearnerStore()
const {
	params: { slug },
	query: { lang }
} = useRoute()

const {
	isError,
	isPending,
	isSucceed,
	toast,
	toastAfterFetch,
	toastErrorMessage,
	toastPendingMessage,
	toastSuccessMessage,
	toastShouldHide
} = useToast()

const currentEditingLanguage = ref<string>(lang === 'kh' ? 'kh' : lang === 'en' ? 'en' : '')
const { isKhmer } = useCurrentEditingLanguage(currentEditingLanguage)

// Fetch methodbank learner data by slug
let data: Post | undefined
if (typeof slug === 'string') {
	const res = await getMbLearnerBySlugAPI(slug)
	data = res.data?.[0]
}

// Fetch categories
const { data: categoryResponse } = await useFetch<{ data: MBCategory[] }>('/method_bank_category', {
	baseURL
})

if (categoryResponse.value) {
	categories.value = categoryResponse.value.data
}

// Assign given value from fetching data to each fields
if (data) {
	if (data.m_b__subcategories?.length) {
		data.m_b__subcategories.forEach((item: MBSubcategory) => {
			isCheckPostChild.value.push(item.id)
			if (!isCheckPostParent.value.includes(item.id)) {
				isCheckPostParent.value.push(item.m_b__categories_id)
			}
			mbCategory.value.push({
				m_b__categories_id: item.m_b__categories_id,
				m_b__subcategories_id: item.id
			})
		})
	}

	if (data.m_b__categories?.length) {
		data.m_b__categories.forEach((item: MBCategory) => {
			mbCategoryName.value.push({ id: item.id, kh: item.name, en: item.name_en })

			if (!isCheckPostParent.value.includes(item.id)) {
				isCheckPostParent.value.push(item.id)
				mbCategory.value.push({ m_b__categories_id: item.id })
			}
		})
	}

	author.value = data.author
	data.title_kh ? (titleKh.value = data.title_kh) : (titleKh.value = '')
	data.title_en ? (titleEn.value = data.title_en) : (titleEn.value = '')
	data.content_kh ? (contentKh.value = data.content_kh) : (contentKh.value = '')
	data.content_en ? (contentEn.value = data.content_en) : (contentEn.value = '')
	if (data.image) {
		thumbnailObjectURL.value = useFilePath(data.image)
	}

	if (data.tags) {
		initTag(data.tags)
	}

	// PDF files
	if (data.pdf) {
		data.pdf.forEach((element: string) => {
			existingPdfName.value.push(element.slice(4))
			allPdfName.value.push(element.slice(4))
		})
	}
	existingPdfNameLen.value = existingPdfName.value.length
}

const setEditingLanguage = (language: string) => {
	if (language === 'kh') {
		currentEditingLanguage.value = 'kh'
	}
	if (language === 'en') {
		currentEditingLanguage.value = 'en'
	}
}

const confirmCancel = () => {
	navigateTo('/admin/method-bank/learner')
}

const addPdfClick = () => {
	filepdf.value?.click()
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

// Select category
const selectPostCategory = (
	id: number,
	nameEn: string,
	name: string,
	subCategoryLen: number,
	subId?: number
) => {
	if (id) {
		const idNotInArray: boolean = mbCategory.value.every(item => item.m_b__categories_id !== id)

		if (!subId && !subCategoryLen) {
			if (idNotInArray) {
				mbCategory.value.push({ m_b__categories_id: id })
				isCheckPostParent.value.push(id)
				mbCategoryName.value.push({ id, en: nameEn, kh: name })
			} else {
				const index = mbCategory.value.findIndex(item => item.m_b__categories_id === id)
				mbCategory.value.splice(index, 1)
				isCheckPostParent.value.splice(isCheckPostParent.value.indexOf(id), 1)
				mbCategoryName.value.splice(
					mbCategoryName.value.findIndex(item => item.id === id),
					1
				)
			}
		} else if (subId && subCategoryLen) {
			if (idNotInArray) {
				mbCategory.value.push({ m_b__categories_id: id, m_b__subcategories_id: subId })
				isCheckPostParent.value.push(id)
				isCheckPostChild.value.push(subId)
				mbCategoryName.value.push({ id, en: nameEn, kh: name })
			} else {
				const subIdNotInArray = mbCategory.value.every(item => item.m_b__subcategories_id !== subId)

				if (subIdNotInArray) {
					mbCategory.value.push({ m_b__categories_id: id, m_b__subcategories_id: subId })
					isCheckPostChild.value.push(subId)
				} else {
					const subIdIndex = mbCategory.value.findIndex(
						item => item.m_b__subcategories_id === subId
					)
					mbCategory.value.splice(subIdIndex, 1)
					isCheckPostChild.value.splice(isCheckPostChild.value.indexOf(subId), 1)

					const idNotExist = mbCategory.value.every(item => item.m_b__categories_id !== id)
					if (idNotExist) {
						isCheckPostParent.value.splice(isCheckPostParent.value.indexOf(id), 1)
						mbCategoryName.value.splice(
							mbCategoryName.value.findIndex(item => item.id === id),
							1
						)
					}
				}
			}
		}
	}
}

// Handle remove pdf
const handleRemovePdf = (index: number) => {
	if (existingPdfName.value.length && index < existingPdfName.value.length) {
		existingPdfName.value.splice(index, 1)
		return
	}

	if (
		newPdfName.value.length &&
		existingPdfName.value.length &&
		index >= existingPdfName.value.length
	) {
		removeIndexOfNewPdf.value = index - existingPdfName.value.length
		removePdf(removeIndexOfNewPdf.value)
	} else if (newPdfName.value.length && !existingPdfName.value.length) {
		removeIndexOfNewPdf.value = index
		removePdf(removeIndexOfNewPdf.value)
	}
}

watchEffect(() => {
	allPdfName.value = [...existingPdfName.value, ...newPdfName.value]
})

const onUpdateArticle = async () => {
	requiredFieldCheck()

	const formData = {} as any
	formData._method = 'PUT'

	formData.m_b__categories = mbCategory.value

	if (titleEn.value && titleEn.value !== data?.title_en) formData.title_en = titleEn.value

	if (titleKh.value && titleKh.value !== data?.title_kh) formData.title_kh = titleKh.value

	if (contentEn.value) formData.content_en = contentEn.value

	if (contentKh.value) formData.content_kh = contentKh.value

	if (author.value && author.value !== 'RHAC') formData.author = author.value

	if (thumbnailFile.value) formData.image = thumbnailFile.value

	if (tags.value.length) formData.tags = getSerializedTag()

	if (existingPdfName.value.length && existingPdfName.value.length !== existingPdfNameLen.value) {
		formData.old_pdf = existingPdfName.value
	} else if (existingPdfNameLen.value > 0 && existingPdfName.value.length === 0) {
		formData.old_pdf = ''
	}

	if (newPdfFile.value.length) formData.new_pdf = newPdfFile.value

	if (!error.value.isError && data) {
		toast('pending', 'Updating article')

		const res = await updateMbLearnerPost(formData, data.id)

		toastAfterFetch(res)
		toastShouldHide('pending')
		if (res.success) navigateTo('/admin/method-bank/learner')
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
		!mbCategory.value.length
	)
		error.value.error_msg = 'Title, content and category are required'
	else error.value.error_msg = ''

	if (mbCategory.value.length) error.value.category = false
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
