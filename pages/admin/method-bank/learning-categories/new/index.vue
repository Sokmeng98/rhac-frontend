<template>
	<h1 class="mb-8 text-4xl font-normal">Add PDF</h1>

	<section class="flex justify-end mb-6 space-x-3">
		<AdminCancelButton />
		<AdminActionButton text="publish" @click="submitPdfForm" />
	</section>

	<main>
		<div class="float-left -mt-9 p-1 w-[68%] overflow-hidden">
			<div>
				<h2 class="mb-1 text-xl font-bold">Upload resources</h2>

				<div class="bg-white rounded-md">
					<div class="p-2">
						<div
							class="mx-2 mt-2 mb-3 border-2 border-dashed rounded-lg py-10 cursor-pointer border-[#D7E5FF]"
							@click="onNewPDFButtonClicked"
						>
							<Icon
								icon="material-symbols:folder-open-rounded"
								width="42"
								color="#D7E5FF"
								class="mx-auto"
							/>
							<p class="mt-2 text-sm text-center">Browse files</p>
						</div>

						<div v-if="pdfName.length">
							<div class="flex flex-row items-center p-2 my-1 rounded hover:bg-neutral-100">
								<div>
									<Icon icon="uiw:file-pdf" width="40" color="#E01E24" />
								</div>
								<div class="flex flex-row justify-between flex-1 truncate">
									<p class="flex-1 ml-2 mr-1 text-sm truncate">
										{{ pdfName }}
									</p>
									<div class="-mr-4 justify-items-end" @click="handleRemovePdf(pdfName.indexOf(x))">
										<AdminCrossIcon />
									</div>
								</div>
							</div>
						</div>
						<input ref="file" type="file" accept=".pdf" class="hidden" @change="selectPdfFile" />
					</div>
				</div>

				<AdminErrorMessage v-if="error.pdfFile" message="PDF file is required" />
			</div>

			<div class="mt-4">
				<p class="mb-1 font-bold">Please select PFD category*</p>
				<select
					v-model="type"
					class="w-full border-1 border-slate-300 select focus:outline-none focus:ring-1 focus:border-0"
				>
					<option v-for="item in items" :key="item.title" :value="item.value">
						{{ item.title }}
					</option>
				</select>
				<AdminErrorMessage v-if="error.type" message="Type is required" />
			</div>

			<div class="mt-4">
				<div class="flex gap-4">
					<div class="w-full">
						<h2 class="mb-1 text-xl font-bold">Title in English</h2>
						<input
							v-model="titleEn"
							class="w-full px-4 py-[10px] text-lg text-black rounded-lg focus:outline-none focus:ring-1"
							type="text"
						/>
					</div>

					<div class="w-full">
						<h2 class="mb-1 text-xl font-bold">Title in Khmer</h2>
						<input
							v-model="titleKh"
							class="w-full px-4 py-[10px] text-lg text-black rounded-lg focus:outline-none focus:ring-1"
							type="text"
						/>
					</div>
				</div>
				<AdminErrorMessage v-if="error.title" message="Please fill in at least one Title field" />
			</div>
		</div>

		<div class="float-right w-[30%]">
			<!-- Thumbnail Image Upload -->
			<ArticleThumbnailUploader
				:on-thumbnail-change="onThumbnailChange"
				:image-object-url="thumbnailObjectURL"
			/>
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
import { useArticleThumbnail } from '~/composables'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const file = ref<HTMLInputElement>()
const removeIndex = ref<number>(-1)
const pdfFile = ref<File>()
const pdfName = ref<string>('')
const type = ref<string>('')
const titleEn = ref<string>('')
const titleKh = ref<string>('')
const error = ref({ pdfFile: false, title: false, type: false })
const items = [
	{
		title: 'Glossary of CSE Terms and Conditions',
		value: 'Glossary of CSE'
	},
	{
		title: 'List of IEC materials on CSE (national and international)',
		value: 'List of IEC materials on CSE'
	},
	{
		title: 'List of additional resources for teachers and educators',
		value: 'List of additional resources for teachers'
	},
	{
		title:
			'International Agreements, Instruments and Standards related to Comprehensive Sexuality Education (CSE)',
		value: 'Comprehensive Sexuality Education (CSE)'
	}
]

const { addPDF } = useLearningCategoriesStore()
const { onThumbnailChange, thumbnailFile, thumbnailObjectURL } = useArticleThumbnail()

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

const onNewPDFButtonClicked = () => {
	file.value?.click()
}

const confirmCancel = () => {
	navigateTo('/admin/method-bank/learning-categories')
}

const handleRemovePdf = (index: number) => {
	removeIndex.value = index
	removePdf()
}

const selectPdfFile = (e: Event) => {
	const files = (e?.target as HTMLInputElement).files
	if (!files?.length) return

	const fileType = files[0].type
	if (fileType !== 'application/pdf') {
		return
	}
	pdfFile.value = files[0]
	pdfName.value = files[0].name
	titleEn.value = pdfName.value.replace('.pdf', '')
}

const removePdf = () => {
	pdfName.value = ''
	pdfFile.value = undefined
}

const requiredFieldCheck = () => {
	if (!pdfFile.value) error.value.pdfFile = true
	else error.value.pdfFile = false

	if (!titleEn.value.trim() && !titleKh.value.trim()) error.value.title = true
	else error.value.title = false

	if (!type.value) error.value.type = true
	else error.value.type = false
}

watchEffect(() => {
	if (pdfFile.value) error.value.pdfFile = false
	if (titleEn.value.trim() || titleKh.value.trim()) error.value.title = false
	if (type.value) error.value.type = false
})

const submitPdfForm = async () => {
	requiredFieldCheck()
	if (error.value.pdfFile || error.value.title || error.value.type) return

	const formData = {} as any

	formData.pdf = pdfFile.value
	formData.type = type.value
	if (titleKh.value) formData.title_kh = titleKh.value
	if (titleEn.value) formData.title_en = titleEn.value
	if (thumbnailFile.value) formData.image = thumbnailFile.value

	toast('pending', 'Creating PDF')

	const res = await addPDF(formData)

	toastAfterFetch(res)
	toastShouldHide('pending')
	if (res.success) navigateTo('/admin/method-bank/learning-categories')
}
</script>
