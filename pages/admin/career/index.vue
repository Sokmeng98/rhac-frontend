<template>
	<h1 class="text-3xl font-bold text-[rgb(34,40,74)]">All Job Posts</h1>

	<section class="flex justify-between my-5">
		<div class="flex">
			<SearchInput
				:on-submit="onSearchSubmit"
				:on-input-change="onSearchInputChange"
				:disabled="isPending"
			/>

			<div class="relative mr-3 w-60">
				<AdminCategorySelect
					v-if="careerSubCategories"
					:categories="careerSubCategories"
					:on-category-change="onCategoryChange"
				/>
			</div>
		</div>

		<NuxtLink
			to="/admin/career/new"
			class="gap-2 text-white border-none btn bg-[#009987] hover:bg-[#009987]"
		>
			<Icon icon="fluent:add-12-filled" />
			ADD NEW
		</NuxtLink>
	</section>

	<main class="flex-auto p-4 text-base bg-white rounded-xl">
		<div class="mb-4 ml-4 text-xl font-bold text-[#303030]">All Jobs</div>

		<AdminArticleTable
			post-type="career"
			:is-pending="isPending"
			:data="careerState.data"
			:confirm-modal-id="confirmModalId"
			:on-pending-delete="onPendingDelete"
			:deleting-article-id="pendingDeleteId"
			:is-modal-open="isConfirmModalOpen"
		/>

		<div v-if="careerState.meta.last_page !== 1" class="flex justify-center">
			<PaginationButton
				:current="careerState.meta.current_page"
				:last="careerState.meta.last_page"
				:to-previous="previousPage"
				:to-next="nextPage"
				:on-change="jumpToPage"
			/>
		</div>
	</main>

	<!-- Confirm delete -->
	<ConfirmCard
		:id="confirmModalId"
		msg="Are you sure you want to delete this career?"
		title="DELETE CAREER"
		:on-confirm="confirmDeleteCareer"
		:on-toggle="onToggle"
	/>

	<!-- Toast -->
	<div class="toast-end toast">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBaseUrl } from '~/composables'
import type { Post } from '~~/api/type'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const { getCareerPost, deleteCareerPost, careerState, previousPage, nextPage, jumpToPage } =
	useCareerStore()

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

type SubCategory = {
	id: number
	name: string
	name_en: string
	slug_kh: string
	slug_en: string
	post_count: number
	post__categories_id: number
	created_at: string
	updated_at: string
	deleted_at: string
}

const isConfirmModalOpen = ref(false)

const onToggle = (value: boolean) => {
	isConfirmModalOpen.value = value
}

const onSearchInputChange = (searchQuery: string) => {
	careerState.search = searchQuery

	performDebounceSearch(searchQuery)
}

const onSearchSubmit = async () => {
	isPending.value = true

	const res = await getCareerPost({
		subType: selectedCategory?.value?.slug_en || selectedCategory?.value?.slug_kh || '',
		search: careerState.search,
		page: 1
	})

	if (!res.success) toast('error', res.message)

	isPending.value = false
}

const careerSubCategories = ref<SubCategory[]>()
const selectedCategory = ref<SubCategory>()

const pendingDeleteId = ref<number>(0)

const confirmModalId = 'career-delete-action-confirm-modal'

const { debounce } = useDebounceSearch()

const performDebounceSearch = debounce(async () => {
	isPending.value = true

	const res = await getCareerPost({
		subType: selectedCategory?.value?.slug_en || selectedCategory?.value?.slug_kh || '',
		search: careerState.search,
		page: 1
	})

	if (!res.success) toast('error', res.message)

	isPending.value = false
}, 1000)

const onCategoryChange = (id: string) => {
	selectedCategory.value = careerSubCategories.value?.find(item => item.id === Number(id))

	careerState.subType = selectedCategory.value
		? selectedCategory.value.slug_en || selectedCategory.value.slug_kh
		: ''

	getCareerPost({
		subType: careerState.subType,
		search: careerState.search,
		page: 1
	})
}

const confirmDeleteCareer = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deleting career')

		const res = await deleteCareerPost(pendingDeleteId.value)

		toastAfterFetch(res)
		toastShouldHide('pending')

		getCareerPost({
			subType: careerState.subType,
			search: careerState.search
		})
	}
}

const onPendingDelete = (id: number) => {
	pendingDeleteId.value = id
}

// Fetch category
const { data: careerCategoryResponseData } = await useFetch<{
	data: Post[]
}>('/post_category', { baseURL: useBaseUrl() })

if (careerCategoryResponseData.value?.data) {
	const careerCategory = careerCategoryResponseData.value.data.find(item => item.id === 6)
	if (careerCategory) {
		careerSubCategories.value = careerCategory.post__subcategories as unknown as SubCategory[]
	}
}

// Fetch initial data
const { success, message } = await getCareerPost()
if (!success) toast('error', message)
</script>
