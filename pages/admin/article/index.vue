<template>
	<h1 class="text-3xl font-bold text-[rgb(34,40,74)]">All Posts</h1>

	<div class="flex justify-between my-5">
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
			to="/admin/article/new"
			class="gap-2 text-white border-none btn bg-[#009987] hover:bg-[#009987]"
		>
			<Icon icon="fluent:add-12-filled" />
			ADD NEW
		</NuxtLink>
	</div>

	<div class="flex-auto p-4 text-base bg-white rounded-xl">
		<div class="mb-4 ml-4 text-xl font-bold text-[#303030]">All Articles</div>

		<AdminArticleTable
			post-type="article"
			:data="articleState.data"
			:is-pending="isPending"
			:confirm-modal-id="confirmModalId"
			:on-pending-delete="onPendingDelete"
			:deleting-article-id="pendingDeleteId"
			:is-modal-open="isConfirmModalOpen"
		/>

		<div v-if="articleState.meta.last_page !== 1" class="flex justify-center">
			<PaginationButton
				:current="articleState.meta.current_page"
				:last="articleState.meta.last_page"
				:to-previous="previousPage"
				:to-next="nextPage"
				:on-change="jumpToPage"
			/>
		</div>

		<!-- Confirm delete -->
		<ConfirmCard
			:id="confirmModalId"
			msg="Are you sure you want to delete this post?"
			title="DELETE ARTICLEEE"
			:on-confirm="confirmDeleteArticle"
			:on-toggle="onToggle"
		/>

		<!-- Toast -->
		<div class="toast toast-end">
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
	</div>
</template>

<script setup lang="ts">
import type { PostCategory } from '~~/api/type'
import { useBaseUrl, useToast } from '~/composables'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const isConfirmModalOpen = ref(false)
const categories = ref<PostCategory[]>()
const selectedCategory = ref<PostCategory>()
const selectedCareerCategoryId = ref('')

const pendingDeleteId = ref<number>(0)
const confirmModalId = 'article-delete-action-confirm-modal'

const { articleState, getArticle, deleteArticle, previousPage, nextPage, jumpToPage } =
	useArticleStore()

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

const baseURL = useBaseUrl()

const onToggle = (value: boolean) => {
	isConfirmModalOpen.value = value
}

const onCategoryChange = async (categoryId: string) => {
	selectedCareerCategoryId.value = categoryId

	selectedCategory.value = categories.value?.find(
		item => item.id === Number(selectedCareerCategoryId.value)
	)

	articleState.type = selectedCategory.value
		? selectedCategory.value.slug_en || selectedCategory.value.slug_kh
		: ''

	isPending.value = true

	const res = await getArticle({
		type: articleState.type,
		search: articleState.search,
		page: 1
	})

	if (!res.success) toast('error', res.message)
	isPending.value = false
}

const { debounce } = useDebounceSearch()
const performDebounceSearch = debounce(async () => {
	isPending.value = true

	const res = await getArticle({
		type: selectedCategory?.value?.slug_en || selectedCategory?.value?.slug_kh || '',
		search: articleState.search,
		page: 1
	})

	if (!res.success) toast('error', res.message)

	isPending.value = false
}, 1000)

const onSearchInputChange = (searchQuery: string) => {
	articleState.search = searchQuery

	performDebounceSearch(searchQuery)
}

const onSearchSubmit = async () => {
	isPending.value = true

	const res = await getArticle({
		type: selectedCategory?.value?.slug_en || selectedCategory?.value?.slug_kh || '',
		search: articleState.search,
		page: 1
	})

	if (!res.success) toast('error', res.message)

	isPending.value = false
}

const { data: categoryResponse } = await useFetch<{ data: PostCategory[] }>('/post_category', {
	baseURL
})
if (categoryResponse.value) {
	categories.value = categoryResponse.value.data.filter(item => item.slug_en !== 'job-and-career')
}

const onPendingDelete = (id: number) => {
	pendingDeleteId.value = id
}

const confirmDeleteArticle = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deleting article')
		const res = await deleteArticle(pendingDeleteId.value)
		toastAfterFetch(res)
		toastShouldHide('pending')

		// Fetch new data
		await getArticle({
			search: articleState.search,
			type: articleState.type,
			page: articleState.meta.current_page
		})
	}
}

const { success, message } = await getArticle()

if (!success) {
	toast('error', message)
}
</script>
