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
			:category="{ en: mbCategory[0] }"
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
					<div v-if="newPdfName.length != 0">
						<div v-for="name in newPdfName" :key="name">
							<div class="flex flex-row items-center p-2 my-1 rounded hover:bg-neutral-100">
								<div>
									<Icon icon="uiw:file-pdf" width="40" color="#E01E24" />
								</div>
								<div class="flex flex-row justify-between flex-1 truncate">
									<p class="flex-1 ml-2 mr-1 text-sm truncate">
										{{ name }}
									</p>
									<div class="-mr-4 justify-items-end" @click="removePdf(newPdfName.indexOf(name))">
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
</template>

<script setup lang="ts">
import { useArticleThumbnail } from '~/composables/use-article-thumbnail'
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
const mbCategory = ref<string[]>([])
const date = ref(new Date())
const headingTitle = ref('Add Post')
const currentEditingLanguage = ref<string>('kh')
const isPreview = ref(false)
const isCheckProfessor = ref(false)
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
const { addTag, getSerializedTag, removeTag, tags } = useTag()
const { createMbProfessionalPost } = useMbProfessionalStore()
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
	navigateTo('/admin/method-bank/professor')
}

const onNewPDFButtonClicked = () => {
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

const submitArticleForm = async () => {
	requiredFieldCheck()
	const formData = new FormData()

	if (thumbnailFile.value) formData.append('image', thumbnailFile.value)

	if (titleEn.value) formData.append('title_en', titleEn.value)
	if (titleKh.value) formData.append('title_kh', titleKh.value)

	if (contentEn.value) formData.append('content_en', contentEn.value)
	if (contentKh.value) formData.append('content_kh', contentKh.value)

	if (author.value) formData.append('author', author.value)
	else formData.append('author', 'RHAC')

	mbCategory.value.forEach(item => formData.append('grade[]', item))

	formData.append('post_date', formatForBackend(date.value))

	if (tags.value.length) formData.append('tags', getSerializedTag())

	if (newPdfFile.value.length) {
		newPdfFile.value.forEach(element => formData.append('pdf[]', element))
	}

	if (!error.value.isError) {
		toast('pending', 'Creating article')

		const res = await createMbProfessionalPost(formData)

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
