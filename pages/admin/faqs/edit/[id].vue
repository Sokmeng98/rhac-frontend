<template>
	<h1 class="text-3xl font-bold mt-4 text-[rgb(34,40,74)]">RHAC Organization members</h1>

	<section class="space-x-3 text-right mt-7">
		<NuxtLink
			class="w-32 text-white border-none btn bg-[#F27564] hover:bg-[#DB513E]"
			to="/admin/faqs"
		>
			Cancel
		</NuxtLink>
		<AdminActionButton text="save" @click="submitForm" />

		<div>
			<AdminErrorMessage v-if="errorMessageUnderButton" :message="errorMessageUnderButton" />
		</div>
	</section>

	<main class="mt-5">
		<div class="flex space-x-10">
			<div class="flex items-center flex-1">
				<p class="text-2xl font-semibold leading-normal">Question & Answer in English</p>
				<Icon class="ml-2" icon="twemoji:flag-united-states" :height="24" />
			</div>
			<div class="flex-1 mt-1">
				<div class="flex items-center flex-1">
					<p class="text-2xl font-semibold leading-normal">សំនួរចម្លើយជាភាសាខ្មែរ</p>
					<Icon class="ml-2" icon="twemoji:flag-cambodia" :height="24" />
				</div>
			</div>
		</div>
		<div class="flex space-x-10">
			<div class="flex-1">
				<p class="mb-1 text-lg font-normal leading-normal">Question*</p>

				<textarea
					v-model="qAndA.question_en"
					type="text"
					class="w-full px-3 py-1 -mb-3 text-base bg-white rounded-lg h-28 focus:outline-none focus:ring-1"
					placeholder="Type here"
				/>
				<AdminErrorMessage v-if="error.question_en" message="Question in English is required" />
				<!-- <span v-if="error.question_en" class="error">Question in  is required</span> -->
			</div>
			<div class="flex-1">
				<p class="mb-1 text-lg font-normal leading-normal">សំនួរ</p>

				<textarea
					v-model="qAndA.question_kh"
					type="text"
					class="w-full px-3 py-1 -mb-3 text-base bg-white rounded-lg h-28 focus:outline-none focus:ring-1"
					placeholder="Type here"
				/>
				<AdminErrorMessage v-if="error.question_kh" message="question in Khmer is required" />
			</div>
		</div>
		<div class="flex mt-2 space-x-10">
			<div class="flex-1">
				<p class="mb-1 text-lg font-normal leading-normal">Answer*</p>
				<textarea
					v-model="qAndA.answer_en"
					type="text"
					class="w-full h-48 px-3 py-1 -mb-3 text-base bg-white rounded-lg focus:outline-none focus:ring-1"
					placeholder="Type here"
				/>
				<AdminErrorMessage v-if="error.answer_en" message="Answer in English is required" />
			</div>
			<div class="flex-1">
				<p class="mb-1 text-lg font-normal leading-normal">ចម្លើយ</p>
				<textarea
					v-model="qAndA.answer_kh"
					type="text"
					class="w-full h-48 px-3 py-1 -mb-3 text-base bg-white rounded-lg focus:outline-none focus:ring-1"
					placeholder="Type here"
				/>
				<AdminErrorMessage v-if="error.answer_kh" message="Answer in Khmer is required" />
			</div>
		</div>
		<div class="flex mt-5 space-x-10">
			<div class="flex-col w-1/4">
				<p class="mb-1 text-lg font-normal leading-normal">Type*</p>

				<select v-model="qAndA.type" class="w-full select focus:outline-none focus:ring-1">
					<option class="text-gray-400" value="" disabled selected>Select Question Type</option>

					<option v-for="type in faqTypes" :key="type" :value="type">{{ type }}</option>
				</select>
				<AdminErrorMessage v-if="error.type" message="Please select type of FAQs" />
			</div>
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
</template>

<script setup lang="ts">
import type { Faq } from '~~/api/faq'
import type { QAndAForm, QAndAErrorFlags } from '~~/api/type'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const { params } = useRoute()
const baseURL = useBaseUrl()
const { updateFaq } = useFaqStore()
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

const faqTypes = ['Clinic Service', 'Health Information', 'Methodbank']

const qAndA: QAndAForm = reactive<QAndAForm>({
	question_en: '',
	question_kh: '',
	answer_en: '',
	answer_kh: '',
	type: ''
})

const error: QAndAErrorFlags = reactive<QAndAErrorFlags>({
	question_en: false,
	question_kh: false,
	answer_en: false,
	answer_kh: false,
	type: false
})

const errorMessageUnderButton = ref('')

// Fetch FAQs by id
const { data } = await useFetch<any>(`/faq/${params.id}`, { baseURL })
const faqData: Faq = data.value.data[0]
if (faqData) {
	qAndA.question_en = faqData.question_en
	qAndA.answer_en = faqData.answer_en
	qAndA.type = faqData.type
	faqData.question_kh == null ? (qAndA.question_kh = '') : (qAndA.question_kh = faqData.question_kh)
	faqData.answer_kh == null ? (qAndA.answer_kh = '') : (qAndA.answer_kh = faqData.answer_kh)
}

const requiredFieldCheck = () => {
	// Define an array of required fields
	const requiredFields: (keyof QAndAForm)[] = ['question_en', 'answer_en', 'type']

	// Reset error flags for all fields
	Object.entries(error).forEach(([field, _]) => {
		error[field as keyof QAndAErrorFlags] = false
	})

	// Check required fields
	requiredFields.forEach((field: keyof QAndAForm) => {
		if (!qAndA[field].trim().length) {
			error[field] = true
		}
	})

	// Check optional fields (question_kh, answer_kh)
	if (qAndA.answer_kh.trim().length) {
		if (!qAndA.question_kh.trim().length) {
			error.question_kh = true
		}
	} else if (qAndA.question_kh.trim().length) {
		error.answer_kh = true
	}

	errorMessageUnderButton.value = getErrorMessage(error)
}

const getErrorMessage = (errors: QAndAErrorFlags): string => {
	const errorMessages: string[] = []

	const errorMapping: Record<string, string> = {
		question_en: 'Question in English',
		answer_en: 'Answer in English',
		question_kh: 'Question in Khmer',
		answer_kh: 'Answer in Khmer',
		type: 'Type'
	}

	for (const errorKey in errors) {
		if (errors[errorKey]) {
			errorMessages.push(errorMapping[errorKey])
		}
	}

	if (errorMessages.length === 0) return ''

	const errorMessage = errorMessages.join(', ')
	return `${errorMessage} ${errorMessages.length > 1 ? 'are' : 'is'} required.`
}

const submitForm = async () => {
	requiredFieldCheck()

	const updateData = {} as any
	if (qAndA.question_en !== faqData.question_en) updateData.question_en = qAndA.question_en
	if (qAndA.question_kh !== faqData.question_kh) updateData.question_kh = qAndA.question_kh
	if (qAndA.answer_en !== faqData.answer_en) updateData.answer_en = qAndA.answer_en
	if (qAndA.answer_kh !== faqData.answer_kh) updateData.answer_kh = qAndA.answer_kh
	if (qAndA.type !== faqData.type) updateData.type = qAndA.type

	if (!errorMessageUnderButton.value) {
		toast('pending', 'Updating FAQ')

		const res = await updateFaq(faqData.id, updateData)

		toastAfterFetch(res)
		toastShouldHide('pending')
		if (res.success) navigateTo('/admin/faqs')
	}
}
</script>
