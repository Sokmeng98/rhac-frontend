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
			:category="{ en: mbCategory[0] }"
			:image="thumbnailObjectURL"
			:pdfs="allPdfName"
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
		</div>

		<div class="float-right w-[30%]">
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
							<input v-model="isCheckProfessor" disabled type="checkbox" class="w-4 h-4 mt-1" />
							<label class="ml-2 text-sm font-medium leading-6 text-neutral-400">
								For Professor
							</label>

							<div v-for="item in mbProfessorGrade" :key="item" class="flex ml-5">
								<input
									v-model="mbCategory"
									type="checkbox"
									:value="item"
									class="w-4 h-4 mt-1"
									@click="selectCategory(item)"
								/>
								<label class="ml-2 text-sm font-medium leading-6" @click="selectCategory(item)">
									{{ item }}
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

			<div class="mb-8 bg-white rounded-md">
				<h4 class="p-3 text-xl font-bold border-b">Upload pdf resources</h4>

				<div class="p-3">
					<div
						class="mt-2 mb-3 mx-2 p-4 rounded-lg border-2 border-dashed border-[#D7E5FF] cursor-pointer"
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
		msg="Are you sure to discard this change?"
		title="DISCARD CHANGE"
		:on-confirm="confirmCancel"
	/>
</template>

<script setup lang="ts">
import { useArticleThumbnail, useFilePath } from '~/composables'
import { usePfdUpload } from '~~/util/upload-pdf'
import { getMbProfessoinalBySlugAPI } from '~~/api/mb-professional'
import type { Post } from '~~/api/type'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const titleKh = ref('')
const titleEn = ref('')
const contentKh = ref('')
const contentEn = ref('')
const author = ref('')
const mbCategory = ref<string[]>([])
const headingTitle = ref('Edit Post')
const isPreview = ref(false)
const isCheckProfessor = ref(true)
const allPdfName = ref<string[]>([])
const existingPdfName = ref<string[]>([])
const existingPdfNameLen = ref(0)
const removeIndexOfNewPdf = ref(0)
const filepdf = ref<HTMLInputElement>()
const mbProfessorGrade = ['Grade 5&6', 'Grade 7-9', 'Grade 10-12']

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
const { addTag, getSerializedTag, initTag, removeTag, tags } = useTag()
const { newPdfFile, newPdfName, handlePdfSelected, removePdf } = usePfdUpload()
const { updateMbProfessionalPost } = useMbProfessionalStore()
const {
	params: { slug },
	query: { lang }
} = useRoute()

const currentEditingLanguage = ref<string>(lang === 'kh' ? 'kh' : lang === 'en' ? 'en' : '')
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

// Fetch methodbank professtional data by slug
let data: Post | undefined
if (typeof slug === 'string') {
	const res = await getMbProfessoinalBySlugAPI(slug)
	data = res.data?.[0]
}

// Assign given value from fetching data to each fields
if (data) {
	data.grade?.forEach((item: string) => mbCategory.value.push(item))
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
	navigateTo('/admin/method-bank/professor')
}

const addPdfClick = () => {
	filepdf.value?.click()
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
const selectCategory = (category: string) => {
	if (mbCategory.value.includes(category)) {
		mbCategory.value.splice(mbCategory.value.indexOf(category), 1)
	} else mbCategory.value.push(category)

	if (mbCategory.value.length) isCheckProfessor.value = true
	else isCheckProfessor.value = false
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

	const formData = new FormData()
	formData.append('_method', 'PUT')

	mbCategory.value.forEach(item => formData.append('grade[]', item))

	if (titleEn.value && titleEn.value !== data?.title_en) formData.append('title_en', titleEn.value)

	if (titleKh.value && titleKh.value !== data?.title_kh) formData.append('title_kh', titleKh.value)

	if (contentEn.value) formData.append('content_en', contentEn.value)

	if (contentKh.value) formData.append('content_kh', contentKh.value)

	if (author.value && author.value !== 'RHAC') formData.append('author', author.value)

	if (tags.value.length) formData.append('tags', getSerializedTag())

	if (thumbnailFile.value) formData.append('image', thumbnailFile.value)

	if (existingPdfName.value.length && existingPdfName.value.length !== existingPdfNameLen.value) {
		existingPdfName.value.forEach(element => formData.append('old_pdf[]', element))
	} else if (existingPdfNameLen.value > 0 && existingPdfName.value.length === 0) {
		formData.append('old_pdf[]', '')
	}

	if (newPdfFile.value.length) {
		newPdfFile.value.forEach(element => formData.append('new_pdf[]', element))
	}

	if (!error.value.isError && data) {
		toast('pending', 'Updating article')

		const res = await updateMbProfessionalPost(formData, data.id)

		toastAfterFetch(res)
		toastShouldHide('pending')
		if (res.success) navigateTo('/admin/method-bank/professor')
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
