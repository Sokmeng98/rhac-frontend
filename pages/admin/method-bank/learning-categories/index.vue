<template>
	<main class="relative flex flex-col h-full overflow-hidden border-black">
		<section>
			<div class="text-3xl font-bold text-[rgb(34,40,74)]">PDF</div>

			<div class="flex justify-between px-1 mt-3">
				<div class="relative mr-3 w-60">
					<select
						v-model="PDFState.type"
						class="w-full select focus:outline-none focus:ring-1"
						@change="onCategoryChange"
					>
						<option value="" selected>All Cetegory</option>
						<option v-for="item in items" :key="item.title" :value="item.value">
							{{ item.title }}
						</option>
					</select>
				</div>

				<NuxtLink
					class="btn gap-2 text-white bg-[#009987] border-none hover:bg-[#009987]"
					to="/admin/method-bank/learning-categories/new"
				>
					<Icon icon="fluent:add-12-filled" />
					UPLOAD PDF
				</NuxtLink>
			</div>
		</section>

		<section class="mt-7">
			<ul
				v-if="PDFState.data.length"
				class="grid grid-cols-1 gap-2 list-none lg:grid-cols-2 xl:grid-cols-4 xl:gap-3"
			>
				<li
					v-for="item of PDFState.data"
					:key="item.id"
					class="relative bg-white border group rounded-xl"
				>
					<NuxtLink :to="useFilePath(item.pdf)" class="cursor-pointer" target="_blank">
						<div class="flex items-center w-full bg-neutral-100 rounded-t-xl">
							<NuxtImg
								class="w-full select-none aspect-[16/9] rounded-t-xl object-cover object-center"
								fit="cover"
								:src="useFilePath(item.image)"
								alt="Gallery image"
							/>
						</div>

						<div class="w-full px-3 py-3">
							<p class="w-full text-sm line-clamp-2">
								{{ item.title_en ? item.title_en : item.title_kh }}
							</p>
						</div>

						<NuxtLink
							:to="`/admin/method-bank/learning-categories/edit/${item.id}`"
							class="absolute flex items-center justify-center transition-opacity duration-500 bg-teal-700 rounded-full opacity-0 w-7 h-7 group-hover:opacity-100 bottom-2 right-2"
						>
							<Icon icon="fa6-solid:pen" color="white" height="13" />
						</NuxtLink>

						<label
							for="pdf-action-confirm-modal"
							class="absolute transition-opacity duration-500 border rounded-full opacity-0 cursor-pointer drop-shadow-md top-2 right-2 group-hover:opacity-100"
							@click="setPendingDeleteId(item.id)"
						>
							<AdminCrossFilledIcon />
						</label>
					</NuxtLink>
				</li>
			</ul>

			<p v-else>{{ $t('file_not_found') }}</p>
		</section>

		<!-- Pagination -->
		<div
			v-if="PDFState.meta.last_page !== 1"
			class="absolute bottom-0 flex items-center justify-center w-full"
		>
			<PaginationButton
				:current="PDFState.meta.current_page"
				:last="PDFState.meta.last_page"
				:to-next="nextPage"
				:to-previous="previousPage"
			/>
		</div>
	</main>

	<!-- Modal for delete-->
	<ConfirmCard
		id="pdf-action-confirm-modal"
		title="DELETE PDF"
		cancel-text="Cancel"
		confirm-text="Delete"
		msg="Are you sure you want to delete this PDF?"
		:on-confirm="confirmDelete"
	/>

	<!-- Toast -->
	<div class="toast toast-end">
		<ToastStatus
			:pending="isPending"
			:succeed="isSucceed"
			:error="isError"
			:success-message="toastSuccessMessage"
			:error-message="toastErrorMessage"
			:pending-message="toastPendingMessage"
			:should-hide="toastShouldHide"
		/>
	</div>
</template>

<script setup lang="ts">
import { useFilePath } from '~/composables'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const { PDFState, getPDF, deletePDF, nextPage, previousPage } = useLearningCategoriesStore()
const {
	isError,
	isPending,
	isSucceed,
	toastErrorMessage,
	toastPendingMessage,
	toastSuccessMessage,
	toastShouldHide,
	toastAfterFetch,
	toast
} = useToast()

const pendingDeleteId = ref<number>()
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
		title: `International Agreements, Instruments and Standards related to Comprehensive Sexuality Education (CSE)`,
		value: 'Comprehensive Sexuality Education (CSE)'
	}
]

const setPendingDeleteId = (id: number) => {
	pendingDeleteId.value = id
}

const confirmDelete = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deteting pdf')
		const res = await deletePDF(pendingDeleteId.value)
		toastAfterFetch(res)
		toastShouldHide('pending')

		// Fetch pdf
		await getPDF({ page: PDFState.meta.current_page })
	}
}

const onCategoryChange = async (event: Event) => {
	// @ts-ignore
	PDFState.type = event.target?.value

	isPending.value = true

	const res = await getPDF({
		type: PDFState.type,
		page: 1
	})

	if (!res.success) toast('error', res.message)

	isPending.value = false
}

const res = await getPDF({ page: 1, type: '' })
if (!res.success) {
	toast('error', res.message)
}
</script>
