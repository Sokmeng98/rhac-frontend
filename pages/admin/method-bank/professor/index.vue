<template>
	<h1 class="text-4xl font-bold text-[rgb(34,40,74)]">MethodBank: Professor</h1>

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
			to="/admin/method-bank/professor/new"
			class="gap-2 text-white border-none btn bg-[#009987] hover:bg-[#009987]"
		>
			<Icon icon="fluent:add-12-filled" />
			ADD NEW
		</NuxtLink>
	</section>

	<main class="flex-auto p-4 text-base bg-white rounded-xl">
		<div class="mb-4 ml-4 text-xl font-bold text-[#303030]">All Articles</div>

		<AdminArticleTable
			post-type="method-bank/professor"
			:is-pending="isPending"
			:data="mbProfessionalState.data"
			:confirm-modal-id="confirmModalId"
			:on-pending-delete="onPendingDelete"
			:deleting-article-id="pendingDeleteId"
			:is-modal-open="isConfirmModalOpen"
		/>

		<div v-if="mbProfessionalState.meta.last_page !== 1" class="flex justify-center">
			<PaginationButton
				:current="mbProfessionalState.meta.current_page"
				:last="mbProfessionalState.meta.last_page"
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

const categories = ref<PostCategory[]>([
	{
		id: 1,
		name: 'Grade 5&6',
		name_en: 'Grade 5&6',
		slug_en: 'Grade 5&6',
		slug_kh: 'Grade 5&6',
		post__subcategories: []
	},
	{
		id: 2,
		name: 'Grade 7-9',
		name_en: 'Grade 7-9',
		slug_en: 'Grade 7-9',
		slug_kh: 'Grade 7-9',
		post__subcategories: []
	},
	{
		id: 3,
		name: 'Grade 10-12',
		name_en: 'Grade 10-12',
		slug_en: 'Grade 10-12',
		slug_kh: 'Grade 10-12',
		post__subcategories: []
	}
])

const selectedCategory = ref<PostCategory>()
const selectedCareerCategoryId = ref('')

const pendingDeleteId = ref<number>(0)
const confirmModalId = 'mb-professional-confirm-modal'
const isConfirmModalOpen = ref(false)

const { mbProfessionalState, getMbProfessional, previousPage, nextPage, deleteMbProfessionalPost } =
	useMbProfessionalStore()

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
const performDebounceSearch = debounce(async () => {
	isPending.value = true

	const res = await getMbProfessional({
		type: mbProfessionalState.type,
		search: mbProfessionalState.search,
		page: 1
	})

	if (!res.success) toast('error', res.message)

	isPending.value = false
}, 1000)

const onCategoryChange = async (categoryId: string) => {
	selectedCareerCategoryId.value = categoryId

	selectedCategory.value = categories.value?.find(
		item => item.id === Number(selectedCareerCategoryId.value)
	)

	mbProfessionalState.type = selectedCategory.value
		? selectedCategory.value.slug_en || selectedCategory.value.slug_kh
		: ''

	isPending.value = true
	const res = await getMbProfessional({
		type: mbProfessionalState.type,
		search: mbProfessionalState.search,
		page: 1
	})

	if (!res.success) toast('error', res.message)
	isPending.value = false
}

const onSearchInputChange = (searchQuery: string) => {
	mbProfessionalState.search = searchQuery

	performDebounceSearch(searchQuery)
}
onMounted(() => {
	mbProfessionalState.search = ''
})

const onSearchSubmit = () => {
	getMbProfessional({
		type: selectedCategory?.value?.slug_en || selectedCategory?.value?.slug_kh || '',
		search: mbProfessionalState.search,
		page: 1
	})
}

const onPendingDelete = (id: number) => {
	pendingDeleteId.value = id
}

const confirmDeleteArticle = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deleting article')

		const res = await deleteMbProfessionalPost(pendingDeleteId.value)

		toastAfterFetch(res)
		toastShouldHide('pending')

		await getMbProfessional({
			search: mbProfessionalState.search,
			type: mbProfessionalState.type,
			page: mbProfessionalState.meta.current_page
		})
	}
}

const { success, message } = await getMbProfessional()
if (!success) {
	toast('error', message)
}
</script>
