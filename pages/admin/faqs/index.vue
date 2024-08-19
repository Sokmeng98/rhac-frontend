<template>
	<h1 class="text-3xl font-bold text-[rgb(34,40,74)]">All FAQs</h1>

	<section class="flex justify-between my-5">
		<div class="flex">
			<SearchInput :on-submit="onSearchSubmit" :on-input-change="onSearchInputChange" />

			<div class="relative mr-3 w-60">
				<select class="w-full select focus:outline-none focus:ring-1" @change="onCategoryChange">
					<option value="" selected>All Cetegory</option>
					<option value="Clinic Service">Clinic Service</option>
					<option value="Health Information">Health Information</option>
					<option value="Methodbank">Methodbank</option>
				</select>
			</div>
		</div>

		<NuxtLink
			to="/admin/faqs/add"
			class="btn gap-2 text-white border-none bg-[#009987] hover:bg-[#009987]"
		>
			<Icon icon="fluent:add-12-filled" />
			ADD NEW
		</NuxtLink>
	</section>

	<main class="flex-auto p-5 bg-white rounded-xl">
		<div class="text-xl font-bold ml-4 mb-4 text-[#303030]">FAQs</div>

		<AdminFaqTable
			:is-pending="isPending"
			:data="faqState.data"
			:confirm-modal-id="confirmModalId"
			:on-pending-delete="onPendingDelete"
		/>

		<!-- Pagination -->
		<div v-if="faqState.meta.last_page !== 1" class="bottom-0 flex items-center justify-center">
			<PaginationButton
				:current="faqState.meta.current_page"
				:last="faqState.meta.last_page"
				:to-previous="previousPage"
				:to-next="nextPage"
			/>
		</div>
	</main>

	<!-- Modal for delete-->
	<ConfirmCard
		:id="confirmModalId"
		title="DELETE FAQ"
		cancel-text="Cancel"
		confirm-text="Delete"
		msg="Are you sure you want to delete this FAQ?"
		:on-confirm="confirmDeleteFAQ"
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
import { ref } from 'vue'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const pendingDeleteId = ref<number>()

const confirmModalId = 'faq-action-confirm-modal'

const { faqState, getFaqs, deleteFaq, previousPage, nextPage } = useFaqStore()

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

onMounted(() => {
	faqState.type = ''
	faqState.search = ''
})

const { debounce } = useDebounceSearch()

const performDebounceSearch = debounce(async () => {
	isPending.value = true

	const res = await getFaqs({
		page: 1
	})

	if (!res.success) toast('error', res.message)

	isPending.value = false
}, 1000)

const onSearchInputChange = (searchQuery: string) => {
	faqState.search = searchQuery

	performDebounceSearch(searchQuery)
}

const onSearchSubmit = async () => {
	isPending.value = true

	const res = await getFaqs({
		page: 1
	})

	if (!res.success) toast('error', res.message)

	isPending.value = false
}

const onCategoryChange = async (event: Event) => {
	// @ts-ignore
	faqState.type = event.target?.value

	isPending.value = true

	const res = await getFaqs({
		search: faqState.search,
		type: faqState.type,
		page: 1
	})

	if (!res.success) toast('error', res.message)

	isPending.value = false
}

const onPendingDelete = (id: number) => {
	pendingDeleteId.value = id
}

const confirmDeleteFAQ = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deleting FAQ')

		const res = await deleteFaq(pendingDeleteId.value)

		toastAfterFetch(res)
		toastShouldHide('pending')

		await getFaqs({ page: faqState.meta.current_page })
	}
}

const { success, message } = await getFaqs({ page: 1, type: '', search: '' })
if (!success) toast('error', message)
</script>
