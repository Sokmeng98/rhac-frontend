<template>
	<div
		style="height: calc(100vh - 5rem + 10px)"
		class="flex flex-col justify-between w-full overflow-auto rounded-none shadow-inner sub-md-nav-container bg-base-100"
	>
		<menu class="container menu">
			<div v-for="(item, index) in nav" :key="index" class="container">
				<div
					v-if="!item.isSub"
					class="py-1 text-lg border-b-2 border-gray-100 hover:font-medium hover:text-primary"
				>
					<ul class="text-base list-none">
						<li @click="hideMenu()">
							<NuxtLink :key="index" :to="item.link">
								{{ item.title }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<div v-else class="bg-white border-b-2 border-gray-100 rounded-none collapse collapse-plus">
					<input type="checkbox" class="peer" />
					<div class="text-lg collapse-title peer-checked:font-medium peer-checked:text-primary">
						{{ item.title }}
					</div>

					<div v-if="item.isSub" class="collapse-content">
						<ul class="text-base list-none">
							<li v-for="subNavItem in item.sub?.items" :key="subNavItem.link" @click="hideMenu()">
								<NuxtLink :to="subNavItem.link">
									{{ subNavItem.title }}
								</NuxtLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</menu>

		<div class="mt-[auto] p-6 bg-primary">
			<div class="container">
				<Search />

				<!-- Call Us Button -->
				<label
					:for="modalId"
					class="flex flex-row items-center py-1 my-3 space-x-2 text-white underline cursor-pointer sm:hover:underline sm:no-underline group"
					tabindex="0"
					:name="$t('call_us')"
					@keydown="event => event.key === 'Enter' && toggleModal()"
				>
					<Icon
						icon="fluent:phone-48-regular"
						size="24"
						class="transition-transform group-hover:rotate-12"
					/>
					<span class="text-lg select-none text-inherit">{{ $t('call_us') }}</span>
				</label>

				<!-- Social Media -->
				<div class="flex justify-center py-3 text-primary">
					<RhacSocial />
				</div>
			</div>

			<MobileContactBottomSheet :modal-id="modalId" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { clickHTMLElement } from '~/util/click-element'

type Props = {
	nav: {
		title: string
		link: string
		isSub?: boolean
		sub?: {
			header: {
				title: string
			}

			items: {
				title: string
				link: string
			}[]
		}
	}[]
	hideMenu: () => void
}
const { hideMenu } = defineProps<Props>()
const modalId = 'mobile-menu-modal'

// Accessibility improvement. When user press enter on the hotline button (when it is focused), it will open the modal.
const toggleModal = () => {
	clickHTMLElement(modalId)
}
</script>

<style>
@keyframes dropdown {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.sub-md-nav-container {
	animation-name: dropdown;
	animation-duration: 0.5s;
}
</style>
