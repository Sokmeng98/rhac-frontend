<template>
	<div>
		<div class="mb-10">
			<h1 class="text-4xl font-normal">{{ headingTitle }}</h1>
		</div>

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
				:category="mbCategoryName[0]"
				:image="thumbnailObjectURL"
				:pdfs="newPdfName"
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
							<div v-for="items in categories" :key="items.id">
								<div class="flex">
									<input
										v-model="isCheckMbLearnerParent"
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
											items.m_b__subcategories?.length ? 'text-neutral-400' : 'text-black'
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
											v-model="isCheckMbLearnerChild"
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

				<!-- Thumbnail Image Upload -->
				<ArticleThumbnailUploader
					:on-thumbnail-change="onThumbnailChange"
					:image-object-url="thumbnailObjectURL"
				/>

				<div class="mb-8 bg-white rounded-md">
					<h4 class="p-3 text-xl font-bold border-b">Upload pdf resources</h4>

					<div class="p-3">
						<div
							class="p-4 mx-2 mt-2 mb-3 border-2 border-dashed rounded-lg cursor-pointer border-[#D7E5FF]"
							@click="onNewPDFButtonClicked"
						>
							<Icon
								icon="material-symbols:folder-open-rounded"
								width="42"
								color="#D7E5FF"
								class="mx-auto"
							/>
							<p class="text-sm text-center">Browse files</p>
						</div>
						<div v-if="newPdfName.length">
							<div v-for="name in newPdfName" :key="name">
								<div class="flex flex-row items-center p-2 my-1 rounded hover:bg-neutral-100">
									<div>
										<Icon icon="uiw:file-pdf" width="40" color="#E01E24" />
									</div>
									<div class="flex flex-row justify-between flex-1 truncate">
										<p class="flex-1 ml-2 mr-1 text-sm truncate">
											{{ name }}
										</p>
										<div
											class="-mr-4 justify-items-end"
											@click="removePdf(newPdfName.indexOf(name))"
										>
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

				<!-- Add Tag Card -->
				<AddTagCard :tags="tags" :add-tag="addTag" :remove-tag="removeTag" />
			</div>
		</main>

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
			msg="Are you sure to discard this post?"
			title="DISCARD POST"
			:on-confirm="confirmCancel"
		/>
	</div>
</template>

<script setup lang="ts">
import { useArticleThumbnail, useCurrentEditingLanguage } from '~/composables'
import type { MBCategory } from '~~/api/type'
import { usePfdUpload } from '~~/util/upload-pdf'
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

const mbCategory = ref<{ m_b__categories_id: number; m_b__subcategories_id?: number }[]>([])
const isCheckMbLearnerParent = ref<number[]>([])
const isCheckMbLearnerChild = ref<number[]>([])
const mbCategoryName = ref<{ id: number; en: string; kh: string }[]>([])

const date = ref(new Date())
const headingTitle = ref('Add Post')
const isPreview = ref(false)
const filepdf = ref<HTMLInputElement>()
const currentEditingLanguage = ref<string>('kh')

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

const { createMbLearnerPost } = useMbLearnerStore()
const { onThumbnailChange, thumbnailFile, thumbnailObjectURL } = useArticleThumbnail()
const { addTag, getSerializedTag, removeTag, tags } = useTag()
const { newPdfFile, newPdfName, handlePdfSelected, removePdf } = usePfdUpload()

const { isKhmer } = useCurrentEditingLanguage(currentEditingLanguage)

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

const onNewPDFButtonClicked = () => {
	filepdf.value?.click()
}

// Fetch data categories
const { data: categoryResponse } = await useFetch<{ data: MBCategory[] }>('/method_bank_category', {
	baseURL: useBaseUrl()
})

if (categoryResponse.value) {
	categories.value = categoryResponse.value.data
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
				isCheckMbLearnerParent.value.push(id)
				mbCategoryName.value.push({ id, en: nameEn, kh: name })
			} else {
				const index = mbCategory.value.findIndex(item => item.m_b__categories_id === id)
				mbCategory.value.splice(index, 1)
				isCheckMbLearnerParent.value.splice(isCheckMbLearnerParent.value.indexOf(id), 1)
				mbCategoryName.value.splice(
					mbCategoryName.value.findIndex(item => item.id === id),
					1
				)
			}
		} else if (subId && subCategoryLen) {
			if (idNotInArray) {
				mbCategory.value.push({ m_b__categories_id: id, m_b__subcategories_id: subId })
				isCheckMbLearnerParent.value.push(id)
				isCheckMbLearnerChild.value.push(subId)
				mbCategoryName.value.push({ id, en: nameEn, kh: name })
			} else {
				const subIdNotInArray = mbCategory.value.every(item => item.m_b__subcategories_id !== subId)

				if (subIdNotInArray) {
					mbCategory.value.push({ m_b__categories_id: id, m_b__subcategories_id: subId })
					isCheckMbLearnerChild.value.push(subId)
				} else {
					const subIdIndex = mbCategory.value.findIndex(
						item => item.m_b__subcategories_id === subId
					)
					mbCategory.value.splice(subIdIndex, 1)
					isCheckMbLearnerChild.value.splice(isCheckMbLearnerChild.value.indexOf(subId), 1)

					const idNotExist = mbCategory.value.every(item => item.m_b__categories_id !== id)
					if (idNotExist) {
						isCheckMbLearnerParent.value.splice(isCheckMbLearnerParent.value.indexOf(id), 1)
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

const submitArticleForm = async () => {
	requiredFieldCheck()

	const formData = {} as any

	if (thumbnailFile.value) formData.image = thumbnailFile.value

	if (titleEn.value) formData.title_en = titleEn.value
	if (titleKh.value) formData.title_kh = titleKh.value

	if (contentEn.value) formData.content_en = contentEn.value
	if (contentKh.value) formData.content_kh = contentKh.value

	if (author.value) formData.author = author.value
	else formData.author = 'RHAC'

	if (tags.value.length) formData.tags = getSerializedTag()

	formData.m_b__categories = mbCategory.value
	formData.pdf = newPdfFile.value
	formData.post_date = formatForBackend(date.value)

	if (!error.value.isError) {
		toast('pending', 'Creating article')

		const res = await createMbLearnerPost(formData)

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
