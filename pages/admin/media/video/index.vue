<template>
	<section class="relative flex flex-col h-full overflow-hidden border-black">
		<section class="flex items-center justify-between">
			<h1 class="title text-3xl font-bold text-[rgb(34,40,74)]">Video</h1>

			<button
				class="btn gap-2 text-white bg-[#009987] border-none hover:bg-[#009987]"
				@click="onNewVideoButtonClicked()"
			>
				<Icon icon="fluent:add-12-filled" />
				NEW VIDEO
			</button>
		</section>

		<main class="overflow-y-auto mt-7">
			<ul class="grid grid-cols-2 gap-2 overflow-hidden list-none lg:grid-cols-3 lg:gap-4">
				<li
					v-for="item of videoState.data"
					:key="item.id"
					class="group relative rounded-b-xl bg-[#F8F8F8]"
				>
					<div class="flex flex-col h-full">
						<iframe
							:src="item.video_url"
							frameborder="0"
							class="w-full aspect-video"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
						></iframe>

						<div class="flex flex-col justify-between flex-1 mx-3 group">
							<h2 class="mt-3 mb-1 text-base font-bold line-clamp-2">
								{{ item.title_en || item.title_kh }}
							</h2>

							<div class="relative flex flex-row justify-between">
								<div class="flex flex-row gap-6 mb-4">
									<div class="flex flex-row gap-2 items-center text-[#949494]">
										<icon icon="uiw:date" size="16" />
										<span class="text-sm">
											{{ dayjs(item.created_at).format('DD/MM/YYYY') }}
										</span>
									</div>

									<div class="flex flex-row gap-2 items-center text-[#949494]">
										<icon icon="octicon:stack-24" size="18" />
										<span class="text-[14px] line-clamp-1">
											{{
												item.m_b__categories?.length
													? item.m_b__categories[0]?.name_en || item.m_b__categories[0]?.name
													: item.mb_professional?.length
													  ? item.mb_professional[0]
													  : item.post__categories?.length
													    ? item.post__categories[0]?.name_en
													    : 'Other'
											}}
										</span>
									</div>
								</div>

								<div ref="menu" class="dropdown dropdown-left dropdown-end">
									<label
										ref="menuButton"
										tabindex="0"
										class="absolute mt-1 transition-transform scale-0 cursor-pointer drop-shadow-md group-hover:scale-100 -right-1"
										@blur="menuVisibility = false"
										@click="menuVisibility = !menuVisibility"
									>
										<div class="relative w-full h-full">
											<Icon
												icon="ph:dots-three-outline-vertical-fill"
												class="cursor-pointer"
												color="#989898"
												height="20"
											/>
										</div>
									</label>
									<ul
										tabindex="0"
										class="gap-2 p-3 list-none border rounded-md shadow menu dropdown-content bg-base-100 w-52"
										@focus="menuVisibility = true"
									>
										<li @click="onEdit()">
											<NuxtLink :to="`/admin/media/video/edit/${item.id}`">
												<Icon icon="fa6-solid:pen" color="#00A651" height="19" />
												Edit
											</NuxtLink>
										</li>
										<li>
											<label for="video-action-confirm-modal" @click="setPendingDeleteId(item.id)">
												<Icon icon="heroicons:trash-20-solid" color="#E01E24" height="20" />
												Delete
											</label>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</main>

		<!-- Modal for delete-->
		<ConfirmCard
			id="video-action-confirm-modal"
			title="Delete Video"
			cancel-text="Cancel"
			confirm-text="Delete"
			msg="Are you sure to delete this video?"
			:on-confirm="confirmDelete"
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

		<!-- Pagination -->
		<div
			v-if="videoState.meta.last_page !== 1"
			class="flex items-center justify-center w-full py-4 mt-auto"
		>
			<PaginationButton
				:current="videoState.meta.current_page"
				:last="videoState.meta.last_page"
				:to-previous="previousPage"
				:to-next="nextPage"
				:on-change="jumpToPage"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useToast } from '~/composables'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

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

const { videoState, getVideo, deleteVideo, previousPage, nextPage, jumpToPage } = useVideoStore()

const pendingDeleteId = ref<number>()

const onNewVideoButtonClicked = () => {
	navigateTo('/admin/media/video/new')
}

const setPendingDeleteId = (id: number) => {
	pendingDeleteId.value = id
}

const confirmDelete = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deleting Video')
		const res = await deleteVideo(pendingDeleteId.value)
		toastAfterFetch(res)
		toastShouldHide('pending')
		if (res.success) await getVideo()
		menuVisibility.value = false
	}
}

// Fetch videos data
await getVideo()

const menuButton = ref<HTMLElement>()
const menu = ref<HTMLElement>()
const menuVisibility = ref(false)

watch(menuVisibility, () => {
	if (!menuVisibility.value) {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur()
		}
	} else if (menuVisibility.value && !menu.value?.contains(document.activeElement)) {
		menuVisibility.value = false
	}
})

const onEdit = () => {
	menuVisibility.value = false
}
</script>
