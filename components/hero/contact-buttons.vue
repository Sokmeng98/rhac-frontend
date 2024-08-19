<template>
	<div class="grid grid-cols-2 gap-4 lg:mb-4 xl:flex">
		<NuxtLink
			id="link-to-messenger"
			:href="config.public.FACEBOOK_MESSAGE"
			target="_blank"
			class="ring-yellow-400 focus-visible:ring-2 ring-0 focus:outline-none focus-visible:ring-offset-2 px-4 h-12 rounded-lg text-lg bg-[#1877F2] hover:bg-[#1362c8]/90 focus-visible:bg-yellow-600 text-white border-none gap-4 min-w-[150px] capitalize xl:w-56 flex items-center justify-center font-medium btn ring-offset-0 transition-all motion-reduce:transition-none"
		>
			<div class="flex items-center h-full gap-2">
				<svg class="w-6 h-6 scale-110" fill="none">
					<path
						fill="currentColor"
						d="M6.401 21v-3.189a8.1 8.1 0 0 1-3.311-6.479C3.09 6.738 7.09 3 12 3s8.91 3.738 8.911 8.332c.001 4.594-4 8.33-8.91 8.33a9.463 9.463 0 0 1-2.559-.349L6.403 21h-.002ZM11.06 9.069l-4.865 5.163 4.438-2.454 2.3 2.394 4.866-5.162-4.434 2.454-2.305-2.395Z"
					/>
				</svg>
				{{ $t('messenger') }}
			</div>
		</NuxtLink>

		<div class="flex flex-col gap-2 xl:w-56">
			<label
				id="hotline-lable-home"
				:for="hotlineModalId"
				class="btn btn-primary flex-shrink-0 gap-2 min-w-[150px] text-white capitalize tracking-wide focus:outline-none focus-visible:ring-offset-2 px-4 h-12 rounded-lg text-lg focus-visible:bg-yellow-600 border-none xl:w-56 flex items-center justify-center font-medium ring-offset-0 transition-all motion-reduce:transition-none ring-yellow-400 focus-visible:ring-2 ring-0"
				tabindex="0"
				aria-describedby="hotline-description"
				@keydown="event => event.key === 'Enter' && showModal()"
			>
				<svg class="w-6 h-6 scale-110" fill="none">
					<path
						fill="currentColor"
						d="M18.997 20C10.466 20.012 3.991 13.46 4 5.003 4 4.45 4.448 4 5 4h2.64c.495 0 .916.364.989.854a12.417 12.417 0 0 0 1.015 3.397l.103.222a.707.707 0 0 1-.23.872c-.818.584-1.13 1.759-.493 2.675.799 1.15 1.806 2.158 2.956 2.957.917.636 2.092.324 2.675-.493a.707.707 0 0 1 .873-.231l.221.102c1.078.5 2.222.842 3.397 1.016.49.073.854.494.854.99V19a1 1 0 0 1-1.001 1h-.002Z"
					/>
				</svg>
				{{ $t('phone') }}
			</label>
		</div>
	</div>

	<MobileContactBottomSheet :modal-id="hotlineModalId" />
</template>

<script setup lang="ts">
import { clickHTMLElement } from '~/util/click-element'

const hotlineModalId = 'hotline-model'
const config = useRuntimeConfig()

// Accessibility improvement. When user press enter on the hotline button (when it is focused), it will open the modal.
const showModal = () => {
	clickHTMLElement(hotlineModalId)
}
</script>
