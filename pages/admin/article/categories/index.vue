<template>
	<h1 class="mb-10 text-3xl font-bold text-[rgb(34,40,74)]">Categories</h1>

	<main>
		<div class="flex mt-10 space-x-10">
			<div class="w-[300px]">
				<div class="mb-7 font-bold text-[#303030]">Add New Category</div>

				<!-- Name Input -->
				<div>
					<div class="flex">
						<Icon icon="twemoji:flag-united-states" :height="24" />
						<p class="ml-[10px] mb-[6px] text-lg text-black">Name in English*</p>
					</div>
					<input
						v-model="nameEn"
						type="text"
						class="w-full px-4 py-3 text-sm text-black rounded-lg focus:outline-none focus:ring-1"
						placeholder="Type here"
					/>
				</div>

				<div class="mt-5">
					<div class="flex">
						<Icon icon="twemoji:flag-cambodia" :height="24" />
						<p class="ml-[10px] mb-[6px] text-lg text-black">Name In Khmer</p>
					</div>
					<input
						v-model="name"
						type="text"
						class="w-full px-4 py-3 text-sm text-black rounded-lg focus:outline-none focus:ring-1"
						placeholder="Type here"
					/>
				</div>

				<!-- Choose parent category -->
				<div class="mt-5">
					<p class="ml-[10px] mb-[6px] text-lg text-black">Parent Category</p>
					<AdminCategorySelect
						ref="categorySelect"
						:categories="mainCategories"
						:on-category-change="onCategoryChange"
						default-text="None"
						:disabled="isEditing"
					/>
				</div>

				<!-- Keyword -->
				<div class="mt-5">
					<p class="ml-[10px] mb-[6px] text-lg text-black">Keyword</p>
					<input
						v-model="keyword"
						type="text"
						class="w-full px-4 py-3 text-sm text-black rounded-xl focus:outline-none focus:ring-1"
						placeholder="Type keyword"
					/>
					<p class="mt-[6px] text-xs text-black">Add Keyword to improve SEO</p>
				</div>

				<!-- Description -->
				<div class="mt-5">
					<p class="ml-[10px] mb-[6px] text-lg text-black">Description</p>
					<textarea
						v-model="description"
						type="text"
						class="w-full px-4 py-3 text-sm text-black rounded-xl focus:outline-none focus:ring-1"
						placeholder="Type here"
					/>
				</div>

				<!-- Save & Add New Category Button -->
				<div class="mt-5">
					<button
						v-if="isEditing"
						class="btn gap-2 border-none bg-[#009987] text-white hover:bg-[#009987]"
						@click="updateCategory()"
					>
						Save
					</button>

					<button
						v-else
						class="btn gap-2 border-none bg-[#009987] text-white hover:bg-[#009987]"
						@click="publish()"
					>
						Add New category
					</button>
				</div>
			</div>

			<!-- All Categories -->
			<div class="flex-auto p-5 text-base bg-white rounded-lg">
				<div class="mb-4 ml-4 text-xl font-bold text-[#303030]">All Categories</div>

				<AdminTableSkeleton v-if="pending" />

				<!-- Category Table -->
				<AdminArticleCategoryTable
					v-else-if="!error"
					:is-pending="isPending"
					:data="allCategories"
					:confirm-modal-id="confirmModalId"
					:on-edit-button-click="onEditButtonClick"
					:on-pending-delete="onPendingDelete"
					:get-parent-category="getParentCategory"
				/>
			</div>
		</div>
	</main>

	<!-- Confirm delete -->
	<ConfirmCard
		:id="confirmModalId"
		msg="Are you sure you want to delete this category?"
		title="DELETE CATEGORY"
		:on-confirm="deleteCategory"
	/>

	<!-- Toast For Delete -->
	<div class="toast-end toast">
		<ToastStatus
			:succeed="isSucceed"
			:pending="isPending"
			:error="isError"
			:pending-message="toastPendingMessage"
			:success-message="toastSuccessMessage"
			:error-message="toastErrorMessage"
			:should-hide="toastShouldHide"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminCategorySelect from '~/components/admin/category-select.vue'
import type { Category, SubCategory } from '~~/api/category'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const pendingDeleteId = ref<number>()
const confirmModalId = 'article-category-confirm-modal'

const {
	name,
	nameEn,
	description,
	keyword,

	categorySelect,
	selectedCategoryId,
	isEditing,
	toastErrorMessage,
	toastPendingMessage,
	toastSuccessMessage,
	isError,
	isPending,
	isSucceed,
	toastShouldHide,
	toast,

	mainCategories,
	allCategories,

	editingCategory,
	pendingDeleteCategory,

	getParentCategory,
	updateCategory,
	deleteCategory,
	publish
} = useAdminArticleCategory()

const onCategoryChange = (id: string) => {
	selectedCategoryId.value = id
}

const onEditButtonClick = (editingCategoryItem: SubCategory | Category) => {
	editingCategory.value = editingCategoryItem

	name.value = editingCategoryItem.name
	nameEn.value = editingCategoryItem.name_en

	// If the category is type of SubCategory
	if ((editingCategoryItem as SubCategory).post__categories_id) {
		categorySelect.value?.forceChangeSelectedValueFromParent(
			(editingCategoryItem as SubCategory).post__categories_id.toString()
		)
	} else {
		// If the category is type of Category
		categorySelect.value?.forceChangeSelectedValueFromParent()
	}

	isEditing.value = true
}

const onPendingDelete = (pendingDeleteItem: Category | SubCategory) => {
	pendingDeleteId.value = pendingDeleteItem.id
	pendingDeleteCategory.value = pendingDeleteItem
}

const {
	data: res,
	pending,
	error
} = useLazyFetch<{ data: Category[] }>('/post_category', {
	baseURL: useBaseUrl(),
	server: false
})

watch(res, newRes => {
	if (newRes?.data) {
		mainCategories.value = newRes.data
	} else {
		toast('error', 'Error while fetching categories')
	}
})
</script>
