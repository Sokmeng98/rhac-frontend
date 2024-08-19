<template>
	<h1 class="mb-8 text-4xl font-normal">Edit Video</h1>

	<section class="flex justify-end mb-6 space-x-3">
		<AdminCancelButton />
		<AdminActionButton text="save" @click="onUpdateVideo" />
	</section>

	<section class="float-left -mt-9 p-1 w-[68%] overflow-hidden">
		<!-- YouTube URL or Embed Input -->
		<div class="mb-5">
			<h2 class="mb-1 text-xl font-bold">YouTube Link/Embed video</h2>
			<input
				v-model="inputUrl"
				class="w-full px-[14px] py-[9px] text-xl text-black rounded-lg focus:outline-none"
				:class="
					error.urlEmpty || !error.urlValid
						? 'ring-red-600 ring-[0.5px] focus:ring-1'
						: 'focus:ring-1 focus:ring-blue-300	'
				"
				type="text"
			/>

			<AdminErrorMessage
				v-if="error.urlEmpty || !error.urlValid"
				:message="error.urlEmpty ? 'The input URL is required' : 'The input url is invalid'"
			/>
		</div>

		<!-- Title Input -->
		<div class="mb-5">
			<div class="flex gap-4">
				<div class="w-full">
					<h2 class="mb-1 text-xl font-bold">Title in English</h2>
					<input
						v-model="titleEn"
						class="w-full px-[14px] py-[9px] text-xl text-black rounded-lg focus:outline-none focus:ring-1"
						type="text"
					/>
				</div>

				<div class="w-full">
					<h2 class="mb-1 text-xl font-bold">Title in Khmer</h2>
					<input
						v-model="titleKh"
						class="w-full px-[14px] py-[9px] text-xl text-black rounded-lg focus:outline-none focus:ring-1"
						type="text"
					/>
				</div>
			</div>
			<AdminErrorMessage v-if="error.title" message="Please fill in at least one Title field" />
		</div>

		<!-- Preview -->
		<div class="w-2/3">
			<div class="flex items-center gap-1">
				<h2 class="mb-1 text-xl font-bold">Preview</h2>
				<div v-if="!error.urlEmpty && error.urlValid">
					<Icon icon="material-symbols:check-circle-outline-rounded" color="#48BB78" size="26" />
				</div>
			</div>

			<div
				v-if="!embedUrl"
				class="flex items-center justify-center bg-neutral-50 aspect-video rounded-2xl"
			>
				<Icon v-if="!error.urlValid && error.urlEmpty" icon="bi:youtube" color="grey" size="62" />
				<Icon v-else icon="fluent:error-circle-12-filled" color="grey" size="62" />
			</div>
			<div v-else>
				<iframe
					:src="embedUrl"
					frameborder="0"
					class="w-full aspect-video rounded-2xl"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</section>

	<!-- Categories Input -->
	<section class="mb-14 bg-white rounded-md float-right w-[30%]">
		<h4 class="p-3 text-xl font-bold border-b">Category</h4>

		<div class="p-3">
			<!-- Article Categories -->
			<div
				class="flex items-center ml-[14px] cursor-pointer"
				@click="toggleDropdownCategory('article')"
			>
				<p
					class="-ml-3 font-bold transition-transform duration-500 transform"
					:class="[dropdownArticle ? 'rotate-90' : 'rotate-0']"
				>
					>
				</p>
				<span class="ml-3 text-sm font-medium">For Article</span>
			</div>

			<div :class="{ hidden: !dropdownArticle }">
				<div v-for="(items, index) in postCategories.data" :key="index">
					<div class="flex ml-6">
						<input
							v-model="isCheckPostParent"
							type="checkbox"
							:disabled="items.post__subcategories?.length !== 0"
							:value="items.id"
							class="w-4 h-4 mt-1 shrink-0"
							@click="selectPostCategory(items.id, items.post__subcategories.length)"
						/>
						<label
							:class="`ml-2 text-sm font-medium leading-6 ${
								items.post__subcategories?.length !== 0 ? 'text-neutral-400' : 'text-black'
							}`"
							@click="selectPostCategory(items.id, items.post__subcategories.length)"
						>
							{{ items.name_en }}
						</label>
					</div>
					<div v-for="item in items.post__subcategories" :key="item.id" class="flex ml-14">
						<input
							v-model="isCheckPostChild"
							type="checkbox"
							:value="item.id"
							class="w-4 h-4 mt-1 shrink-0"
							@click="selectPostCategory(items.id, items.post__subcategories.length, item.id)"
						/>
						<label
							class="ml-2 text-sm font-medium leading-6"
							@click="selectPostCategory(items.id, items.post__subcategories.length, item.id)"
						>
							{{ item.name_en.charAt(0) + item.name_en.toLowerCase().substring(1) }}
						</label>
					</div>
				</div>
			</div>

			<!-- For Learner Categories -->
			<div>
				<div
					class="flex items-center ml-[14px] cursor-pointer"
					@click="toggleDropdownCategory('learner')"
				>
					<p
						class="-ml-3 font-bold transition-transform duration-500 transform"
						:class="[dropdownLearner ? 'rotate-90' : 'rotate-0']"
					>
						>
					</p>
					<span class="ml-3 text-sm font-medium">For Learner</span>
				</div>

				<div :class="{ hidden: !dropdownLearner }">
					<div v-for="items in mbLearnerCategories.data" :key="items.id" class="ml-6">
						<input
							v-model="isCheckMbLearnerParent"
							type="checkbox"
							:disabled="items.m_b__subcategories?.length !== 0"
							:value="items.id"
							class="w-4 h-4 mt-1 shrink-0"
							@click="selectMbLearnerCategory(items.id, items.m_b__subcategories.length)"
						/>
						<label
							class="ml-2 text-sm font-medium leading-6"
							:class="` ${
								items.m_b__subcategories?.length !== 0 ? 'text-neutral-400' : 'text-black'
							}`"
							@click="selectMbLearnerCategory(items.id, items.m_b__subcategories.length)"
						>
							{{ items.name_en }}
						</label>

						<div v-for="(item, index) in items.m_b__subcategories" :key="index" class="flex ml-8">
							<div class="flex">
								<input
									v-model="isCheckMbLearnerChild"
									type="checkbox"
									:value="item.id"
									class="w-4 h-4 mt-1 shrink-0"
									@click="
										selectMbLearnerCategory(items.id, items.m_b__subcategories.length, item.id)
									"
								/>
								<label
									class="ml-2 text-sm font-medium leading-6"
									@click="
										selectMbLearnerCategory(items.id, items.m_b__subcategories.length, item.id)
									"
								>
									{{ item.name_en }}
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- For Professor Categories -->
			<div>
				<div
					class="flex items-center ml-[14px] cursor-pointer"
					@click="toggleDropdownCategory('professor')"
				>
					<p
						class="-ml-3 font-bold transition-transform duration-500 transform"
						:class="[dropdownProfessor ? 'rotate-90' : 'rotate-0']"
					>
						>
					</p>
					<span class="ml-3 text-sm font-medium"> For Professor </span>
				</div>

				<div :class="{ hidden: !dropdownProfessor }">
					<div v-for="item in mbProfessorGrade" :key="item" class="flex ml-8">
						<input
							v-model="mbProfessional"
							type="checkbox"
							:value="item"
							class="w-4 h-4 mt-1 shrink-0"
							@click="selectMbProfessorCategory(item)"
						/>
						<label
							class="ml-2 text-sm font-medium leading-6"
							@click="selectMbProfessorCategory(item)"
						>
							{{ item }}
						</label>
					</div>
				</div>
			</div>
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
		msg="Are you sure to discard changes?"
		title="DISCARD EDIT"
		:on-confirm="confirmCancel"
	/>
</template>

<script setup lang="ts">
import { useToast, useBaseUrl } from '~~/composables'
import type { VideoForm, MBCategory, MBSubcategory } from '~~/api/type'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const inputUrl = ref<string>('')
const embedUrl = ref<string>('')
const titleEn = ref<string>('')
const titleKh = ref<string>('')
const error = ref({ urlEmpty: false, urlValid: true, title: false })
const dropdownArticle = ref(false)
const dropdownLearner = ref(false)
const dropdownProfessor = ref(false)
const mbProfessorGrade = ['Grade 5&6', 'Grade 7-9', 'Grade 10-12']

// Video categories
const post = ref<{ category: number; subcategory?: number }[]>([])
const isCheckPostParent = ref<number[]>([])
const isCheckPostChild = ref<number[]>([])
const mbLearnerCategory = ref<{ m_b__categories_id: number; m_b__subcategories_id?: number }[]>([])
const isCheckMbLearnerParent = ref<number[]>([])
const isCheckMbLearnerChild = ref<number[]>([])
const mbProfessional = ref<string[]>([])
const originalPostParent: number[] = []
const originalPostChild: number[] = []
const originalMbLearnerParent: number[] = []
const originalMbLearnerChild: number[] = []
const originalMbProfessional: string[] = []

const baseURL = useBaseUrl()
const { updateVideo } = useVideoStore()
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
const {
	params: { id }
} = useRoute()

// Fetch video data by id
const { data: videoData } = (await useFetch(`/video/${id}`, { baseURL })) as any
const data = videoData.value

// Assign given data value to each fields
if (data) {
	inputUrl.value = `https://www.youtube.com/watch?v=${data.video_url.split('embed/')[1]}`
	embedUrl.value = data.video_url
	if (data.title_en) titleEn.value = data.title_en
	if (data.title_kh) titleKh.value = data.title_kh

	// Check and assign value in Article category
	if (data.post__subcategories.length) {
		data.post__subcategories.forEach((item: any) => {
			originalPostChild.push(item.id)
			isCheckPostChild.value.push(item.id)
			post.value.push({ category: item.post__categories_id, subcategory: item.id })
			if (!isCheckPostParent.value.includes(item.post__categories_id)) {
				originalPostParent.push(item.post__categories_id)
				isCheckPostParent.value.push(item.post__categories_id)
			}
		})
	}
	if (data.post__categories.length) {
		data.post__categories.forEach((item: any) => {
			if (!isCheckPostParent.value.includes(item.id)) {
				originalPostParent.push(item.id)
				post.value.push({ category: item.id })
				isCheckPostParent.value.push(item.id)
			}
		})
	}

	// Check and assign value in MB Learner category
	if (data.m_b__subcategories?.length) {
		data.m_b__subcategories.forEach((item: MBSubcategory) => {
			originalMbLearnerChild.push(item.id)
			isCheckMbLearnerChild.value.push(item.id)
			mbLearnerCategory.value.push({
				m_b__categories_id: item.m_b__categories_id,
				m_b__subcategories_id: item.id
			})
			if (!isCheckMbLearnerParent.value.includes(item.id)) {
				originalMbLearnerParent.push(item.m_b__categories_id)
				isCheckMbLearnerParent.value.push(item.m_b__categories_id)
			}
		})
	}
	if (data.m_b__categories.length) {
		data.m_b__categories.forEach((item: MBCategory) => {
			if (!isCheckMbLearnerParent.value.includes(item.id)) {
				originalMbLearnerParent.push(item.id)
				isCheckMbLearnerParent.value.push(item.id)
				mbLearnerCategory.value.push({ m_b__categories_id: item.id })
			}
		})
	}

	// Check and assign value in MB profesor category
	if (data.mb_professional.length) {
		data.mb_professional.forEach((item: string) => {
			originalMbProfessional.push(item)
			mbProfessional.value.push(item)
		})
	}

	// If any of category exist the dropdown will open
	if (isCheckPostParent.value.length) dropdownArticle.value = true
	if (isCheckMbLearnerChild.value.length) dropdownLearner.value = true
	if (mbProfessional.value.length) dropdownProfessor.value = true
}

// fetch post categories
const { data: postCategories } = (await useFetch('/post_category', {
	baseURL
})) as any

// Fetch methodbank learner categories
const { data: mbLearnerCategories } = (await useFetch('/method_bank_category', {
	baseURL
})) as any

const confirmCancel = () => {
	navigateTo('/admin/media/video')
}

const toggleDropdownCategory = (dropdownOf: string) => {
	if (dropdownOf === 'article') {
		dropdownArticle.value = !dropdownArticle.value
	} else if (dropdownOf === 'learner') {
		dropdownLearner.value = !dropdownLearner.value
	} else if (dropdownOf === 'professor') {
		dropdownProfessor.value = !dropdownProfessor.value
	}
}

const selectPostCategory = (id: number, subCategoryLen: number, subId?: number) => {
	const idNotInArray: boolean = post.value.every(item => item.category !== id)

	if (!subCategoryLen && !subId) {
		if (idNotInArray) {
			post.value.push({ category: id })
		} else {
			const index = post.value.findIndex(item => item.category === id)
			post.value.splice(index, 1)
		}

		if (isCheckPostParent.value.includes(id)) {
			isCheckPostParent.value.splice(isCheckPostParent.value.indexOf(id), 1)
		} else isCheckPostParent.value.push(id)
	} else if (subCategoryLen && subId) {
		if (idNotInArray) {
			post.value.push({ category: id, subcategory: subId })
			isCheckPostParent.value.push(id)
			isCheckPostChild.value.push(subId)
		} else {
			const subIdNotInArray = post.value.every(item => item.subcategory !== subId)

			if (subIdNotInArray) {
				post.value.push({ category: id, subcategory: subId })
				isCheckPostChild.value.push(subId)
			} else {
				const subIdIndex = post.value.findIndex(item => item.subcategory === subId)
				post.value.splice(subIdIndex, 1)
				isCheckPostChild.value.splice(isCheckPostChild.value.indexOf(subId), 1)

				const idNotExist = post.value.every(item => item.category !== id)
				if (idNotExist) isCheckPostParent.value.splice(isCheckPostParent.value.indexOf(id), 1)
			}
		}
	}
}

const selectMbLearnerCategory = (id: number, subCategoryLen: number, subId?: number) => {
	const idNotInArray: boolean = mbLearnerCategory.value.every(
		item => item.m_b__categories_id !== id
	)

	if (!subCategoryLen && !subId) {
		if (idNotInArray) {
			mbLearnerCategory.value.push({ m_b__categories_id: id })
			isCheckMbLearnerParent.value.push(id)
		} else {
			const index = mbLearnerCategory.value.findIndex(item => item.m_b__categories_id === id)
			mbLearnerCategory.value.splice(index, 1)
			isCheckMbLearnerParent.value.splice(isCheckMbLearnerParent.value.indexOf(id), 1)
		}
	} else if (subCategoryLen && subId) {
		if (idNotInArray) {
			mbLearnerCategory.value.push({ m_b__categories_id: id, m_b__subcategories_id: subId })
			isCheckMbLearnerParent.value.push(id)
			isCheckMbLearnerChild.value.push(subId)
		} else {
			const subIdNotInArray = mbLearnerCategory.value.every(
				item => item.m_b__subcategories_id !== subId
			)

			if (subIdNotInArray) {
				mbLearnerCategory.value.push({ m_b__categories_id: id, m_b__subcategories_id: subId })
				isCheckMbLearnerChild.value.push(subId)
			} else {
				const subIdIndex = mbLearnerCategory.value.findIndex(
					item => item.m_b__subcategories_id === subId
				)
				mbLearnerCategory.value.splice(subIdIndex, 1)
				isCheckMbLearnerChild.value.splice(isCheckMbLearnerChild.value.indexOf(subId), 1)

				const idNotExist = mbLearnerCategory.value.every(item => item.m_b__categories_id !== id)
				if (idNotExist)
					isCheckMbLearnerParent.value.splice(isCheckMbLearnerParent.value.indexOf(id), 1)
			}
		}
	}
}

const selectMbProfessorCategory = (grade: string) => {
	if (mbProfessional.value.includes(grade)) {
		mbProfessional.value.splice(mbProfessional.value.indexOf(grade), 1)
	} else mbProfessional.value.push(grade)
}

const getVideoId = (input: string): string => {
	let id = ''

	// YouTube URL and Embed video pattern
	const youtubeUrlPattern =
		/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})(?:\S+)?$/
	const embedVideoPattern =
		/<iframe.+?src="https?:\/\/www\.youtube\.com\/embed\/([\w-]{11})".*?><\/iframe>/i

	// Check if the input is a valid YouTube URL and Embed video, then extract the id
	if (youtubeUrlPattern.test(input)) {
		id = youtubeUrlPattern.exec(input)![1]
		error.value.urlValid = true
	} else if (embedVideoPattern.test(input)) {
		id = embedVideoPattern.exec(input)![1]
		error.value.urlValid = true
	} else {
		error.value.urlValid = false
		embedUrl.value = ''
		titleKh.value = ''
	}

	return id
}

const getEmbedUrlAndTitle = async (inputUrl: string) => {
	const id = getVideoId(inputUrl)
	if (!id) return

	const { data } = (await useFetch(
		`https://www.youtube.com/oembed?format=json&url=http%3A//youtube.com/watch?v=${id}`
	)) as any

	titleKh.value = data.value.title
	embedUrl.value = `https://www.youtube.com/embed/${id}`
}

const formValidation = () => {
	if (!inputUrl.value.trim()) error.value.urlEmpty = true
	else error.value.urlEmpty = false

	if (!titleEn.value.trim() && !titleKh.value.trim()) {
		error.value.title = true // Both fields are empty, validation fails
	} else {
		error.value.title = false // At least one field is filled, validation passes
	}
}

watch(inputUrl, () => {
	if (inputUrl.value) {
		getEmbedUrlAndTitle(inputUrl.value)
		error.value.urlEmpty = false
	} else {
		embedUrl.value = ''
		titleKh.value = ''
		error.value.urlEmpty = true
		error.value.urlValid = false
	}
})

watch([titleEn, titleKh], () => {
	if (titleEn.value.trim() || titleKh.value.trim()) error.value.title = false
})

const areNotEqual = (arr1: (number | string)[], arr2: (number | string)[]) => {
	return JSON.stringify(arr1.sort()) !== JSON.stringify(arr2.sort())
}

const getUpdatedData = () => {
	const updateData: Partial<VideoForm> = {}

	if (embedUrl.value !== data.video_url) updateData.video_url = embedUrl.value

	if (data.title_en) {
		if (titleEn.value !== data.title_en) updateData.title_en = titleEn.value
	} else if (titleEn.value) updateData.title_en = titleEn.value

	if (data.title_kh) {
		if (titleKh.value !== data.title_kh) updateData.title_kh = titleKh.value
	} else if (titleKh.value) updateData.title_kh = titleKh.value

	if (originalPostParent.length) {
		if (
			areNotEqual(isCheckPostParent.value, originalPostParent) &&
			areNotEqual(isCheckPostChild.value, originalPostChild)
		)
			updateData.post = post.value
	} else if (post.value.length) updateData.post = post.value

	if (originalMbLearnerParent.length) {
		if (
			areNotEqual(isCheckMbLearnerParent.value, originalMbLearnerParent) &&
			areNotEqual(isCheckMbLearnerChild.value, originalMbLearnerChild)
		) {
			updateData.m_b__categories = mbLearnerCategory.value
		}
	} else if (mbLearnerCategory.value.length) {
		updateData.m_b__categories = mbLearnerCategory.value
	}

	if (originalMbProfessional.length) {
		if (areNotEqual(mbProfessional.value, originalMbProfessional))
			updateData.mb_professional = mbProfessional.value
	} else if (mbProfessional.value.length) updateData.mb_professional = mbProfessional.value

	return updateData
}

const onUpdateVideo = async () => {
	formValidation()
	if (error.value.urlEmpty || !error.value.urlValid || error.value.title) return

	const updatedData = getUpdatedData()

	toast('pending', 'Updating video')
	const res = await updateVideo(videoData.value.id, updatedData)
	toastAfterFetch(res)
	toastShouldHide('pending')
	if (res.success) navigateTo('/admin/media/video')
}
</script>
