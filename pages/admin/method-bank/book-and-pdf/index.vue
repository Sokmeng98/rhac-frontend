<template>
	<main class="relative flex flex-col h-full overflow-hidden border-black">
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold text-[rgb(34,40,74)]">Books & PDF</h1>

			<button
				class="btn gap-2 text-white bg-[#009987] border-none hover:bg-[#009987]"
				@click="onUploadButtonClicked()"
			>
				<Icon icon="fluent:add-12-filled" />
				UPLOAD PDF

				<input
					ref="file"
					type="file"
					accept="application/pdf"
					class="hidden"
					@change="onFileSelected"
				/>
			</button>
		</div>

		<div class="overflow-y-auto mt-7">
			<ul
				v-if="mbPDFState.data.length"
				class="grid grid-cols-1 gap-2 list-none lg:grid-cols-2 xl:grid-cols-3 xl:gap-4"
			>
				<li
					v-for="item of mbPDFState.data"
					:key="item.id"
					class="relative flex flex-row p-4 overflow-hidden bg-white border group rounded-xl h-36"
				>
					<div class="flex items-center h-full px-5 py-4 border-2 border-red-500 select-none">
						<Icon icon="uiw:file-pdf" class="w-[4.25rem] text-red-500 h-[4.625rem]"></Icon>
					</div>

					<div class="flex items-center flex-1 h-full max-w-xl px-3">
						<p class="max-w-full h-15 line-clamp-2">
							{{ item.pdf.slice(4) }}
						</p>
					</div>

					<a
						ref="noreferrer"
						:href="useFilePath(item.pdf)"
						target="_blank"
						class="absolute flex items-center justify-center w-10 h-10 transition-opacity duration-500 bg-teal-700 rounded-full opacity-0 group-hover:opacity-100 -bottom-1 -right-1"
					>
						<Icon icon="ic:outline-file-download" class="w-6 h-6 text-white"></Icon>
					</a>

					<label
						for="pdf-action-confirm-modal"
						class="absolute text-red-400 transition-opacity duration-500 border border-red-400 rounded-full opacity-0 cursor-pointer drop-shadow-md top-2 right-2 group-hover:opacity-100"
						@click="setPendingDeleteId(item.id)"
					>
						<Icon icon="gridicons:cross" class="w-6 h-6"></Icon>
					</label>
				</li>
			</ul>

			<p v-else>{{ $t('file_not_found') }}</p>
		</div>

		<!-- Pagination -->
		<div
			v-if="mbPDFState.meta.last_page !== 1"
			class="absolute bottom-0 flex items-center justify-center w-full"
		>
			<PaginationButton
				:current="mbPDFState.meta.current_page"
				:last="mbPDFState.meta.last_page"
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

const { mbPDFState, getPDF, addPDF, deletePDF, nextPage, previousPage } = useMbPDFStore()
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
const file = ref<HTMLInputElement>()

const onUploadButtonClicked = () => {
	file.value?.click()
}

const setPendingDeleteId = (id: number) => {
	pendingDeleteId.value = id
}

const confirmDelete = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deteting pdf')
		const res = await deletePDF(pendingDeleteId.value)
		toastAfterFetch(res)
		toastShouldHide('pending')

		// Fetch ne wdata
		await getPDF()
	}
}

// @ts-ignore
const onFileSelected = async event => {
	const files = event.target.files as FileList

	if (files.length === 1) {
		const file = files[0]

		const fileType = file.type
		if (fileType === 'application/pdf') {
			const formData = new FormData()

			formData.append('pdf', file)

			toast('pending', 'Uploading file')
			const res = await addPDF(formData)
			toastAfterFetch(res)
			toastShouldHide('pending')

			// Fetch ne wdata
			await getPDF()
		}
	}
}

const res = await getPDF()
if (!res.success) {
	toast('error', res.message)
}
</script>
