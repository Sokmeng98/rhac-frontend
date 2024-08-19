<template>
	<main class="relative flex flex-col h-full overflow-hidden border-black">
		<section class="flex items-center justify-between">
			<div class="flex justify-between">
				<div class="text-3xl font-bold text-[rgb(34,40,74)]">PDF</div>
			</div>

			<NuxtLink
				class="btn gap-2 text-white bg-[#009987] border-none hover:bg-[#009987]"
				to="/admin/method-bank/publication/new"
			>
				<Icon icon="fluent:add-12-filled" />
				UPLOAD PDF
			</NuxtLink>
		</section>

		<main class="mt-7">
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
							:to="`/admin/method-bank/publication/edit/${item.id}`"
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
		</main>

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
	</main>
</template>

<script setup lang="ts">
import { useFilePath } from '~/composables'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

const { PDFState, getPDF, deletePDF, nextPage, previousPage } = usePublicationStore()
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
		await getPDF()
	}
}

const res = await getPDF()
if (!res.success) {
	toast('error', res.message)
}
</script>
