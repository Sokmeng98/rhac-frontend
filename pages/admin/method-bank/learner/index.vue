<template>
	<h1 class="text-3xl font-bold text-[rgb(34,40,74)]">MethodBank: Learner</h1>

	<section class="flex justify-between my-5">
		<div class="flex">
			<SearchInput
				:on-submit="onSearchSubmit"
				:on-input-change="onSearchInputChange"
				:disabled="isPending"
			/>

			<div class="relative mr-3 w-60">
				<AdminCategorySelect
					v-if="categories"
					:categories="categories"
					:on-category-change="onCategoryChange"
				/>
			</div>
		</div>

		<NuxtLink
			to="/admin/method-bank/learner/new"
			class="gap-2 text-white border-none btn bg-[#009987] hover:bg-[#009987]"
		>
			<Icon icon="fluent:add-12-filled" />
			ADD NEW
		</NuxtLink>
	</section>

	<main class="flex-auto p-4 text-base bg-white rounded-xl">
		<div class="mb-4 ml-4 text-xl font-bold text-[#303030]">All Articles</div>

		<AdminArticleTable
			post-type="method-bank/learner"
			:is-pending="isPending"
			:data="mbLearnerState.data"
			:confirm-modal-id="confirmModalId"
			:on-pending-delete="onPendingDelete"
			:deleting-article-id="pendingDeleteId"
			:is-modal-open="isConfirmModalOpen"
		/>

		<div v-if="mbLearnerState.meta.last_page !== 1" class="flex justify-center">
			<PaginationButton
				:current="mbLearnerState.meta.current_page"
				:last="mbLearnerState.meta.last_page"
				:to-previous="previousPage"
				:to-next="nextPage"
			/>
		</div>
	</main>

	<!-- Confirm delete -->
	<ConfirmCard
		:id="confirmModalId"
		msg="Are you sure you want to delete this article?"
		title="DELETE ARTICLE"
		:on-confirm="confirmDeleteArticle"
		:on-toggle="onToggle"
	/>

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
import type { PostCategory } from '~~/api/type'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const categories = ref<PostCategory[]>()
const selectedCategory = ref<PostCategory>()
const selectedCareerCategoryId = ref('')

const pendingDeleteId = ref<number>(0)
const confirmModalId = 'mb-learner-delete-action-confirm-modal'
const isConfirmModalOpen = ref(false)

const { mbLearnerState, getMbLearner, previousPage, nextPage, deleteMbLearnerPost } =
	useMbLearnerStore()

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

const onToggle = (value: boolean) => {
	isConfirmModalOpen.value = value
}

const { debounce } = useDebounceSearch()
const performDeboounceSearch = debounce(async () => {
	isPending.value = true

	const res = await getMbLearner({
		type: mbLearnerState.type,
		search: mbLearnerState.search,
		page: 1
	})

	if (!res.success) toast('error', res.message)

	isPending.value = false
}, 1000)

const { data: categoryResponse } = await useFetch<{ data: PostCategory[] }>(
	'/method_bank_category',
	{
		baseURL: useBaseUrl()
	}
)
if (categoryResponse.value) {
	categories.value = categoryResponse.value.data
}

const onCategoryChange = async (categoryId: string) => {
	selectedCareerCategoryId.value = categoryId

	selectedCategory.value = categories.value?.find(
		item => item.id === Number(selectedCareerCategoryId.value)
	)

	mbLearnerState.type = selectedCategory.value
		? selectedCategory.value.slug_en || selectedCategory.value.slug_kh
		: ''

	isPending.value = true

	const res = await getMbLearner({
		type: mbLearnerState.type,
		search: mbLearnerState.search,
		page: 1
	})

	if (!res.success) toast('error', res.message)
	isPending.value = false
}

const onSearchInputChange = (searchQuery: string) => {
	mbLearnerState.search = searchQuery

	performDeboounceSearch(searchQuery)
}

onMounted(() => {
	mbLearnerState.search = ''
})

const onSearchSubmit = async () => {
	isPending.value = true
	const res = await getMbLearner({
		type: selectedCategory?.value?.slug_en || selectedCategory?.value?.slug_kh || '',
		search: mbLearnerState.search,
		page: 1
	})
	if (!res.success) {
		toast('error', res.message)
	}
	isPending.value = false
}

const onPendingDelete = (id: number) => {
	pendingDeleteId.value = id
}

const confirmDeleteArticle = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deleting article')

		const res = await deleteMbLearnerPost(pendingDeleteId.value)

		toastAfterFetch(res)
		toastShouldHide('pending')

		await getMbLearner({
			search: mbLearnerState.search,
			type: mbLearnerState.type,
			page: mbLearnerState.meta.current_page
		})
	}
}

const { success, message } = await getMbLearner()
if (!success) {
	toast('error', message)
}
</script>
