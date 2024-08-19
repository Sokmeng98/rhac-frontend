<template>
	<div class="relative w-full">
		<div class="w-full bg-white border-b border-gray-100">
			<!-- Above md respovesive - On top of navbar section  -->
			<div class="hidden lg:block h-14 bg-primary">
				<div class="container h-full">
					<div class="container flex items-center justify-end h-full px-6 space-x-7 lg:px-0">
						<!-- Contact Us Card -->
						<div class="h-full min-w-max">
							<ContactDropdownCard :contacts="contacts" />
						</div>
						<div class="flex items-center justify-center gap-5 text-primary">
							<RhacSocial />
							<LanguageSwitcher />
						</div>
					</div>
				</div>
			</div>

			<!-- All respovesive - Navbar section  -->
			<div class="shadow-md">
				<div class="container px-6 py-1 lg:px-0">
					<div class="container flex items-center h-full">
						<NuxtLink
							class="h-full mr-auto rounded-md focus:outline-none ring-0 ring-yellow-400 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-2"
							to="/"
							:aria-label="$t('home')"
						>
							<LogoSmall />
						</NuxtLink>

						<div class="flex-shrink-0 hidden px-3 lg:flex">
							<menu class="space-x-4 menu menu-horizontal 2xl:space-x-7">
								<li
									v-for="(item, index) in nav"
									:key="index"
									@click="closeSubNav"
									@mouseover="openSubNav(item, index)"
									@mouseleave="leaveMainNav"
								>
									<NuxtLink
										style="position: unset"
										class="content-center text-base font-normal capitalize rounded-full nav-btn btn btn-primary btn-ghost btn-sm no-animation focus:outline-none ring-0 ring-yellow-400 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-2"
										:to="item.link"
										:class="{
											'bg-primary text-white': route.path.includes(item.link) && item.link !== '/'
										}"
									>
										{{ item.title }}
										<span v-if="item.isSub">
											<Icon icon="mdi:chevron-down" :height="20" />
										</span>
									</NuxtLink>
								</li>
							</menu>
						</div>

						<Search class="hidden lg:block max-w-[13.5rem]" />

						<div class="flex justify-end lg:hidden">
							<LanguageSwitcher />

							<button
								class="px-0 text-gray-700"
								:aria-label="$t('toggle_pages_menu')"
								@click="isMobileMenuOpen = !isMobileMenuOpen"
							>
								<Icon v-if="!isMobileMenuOpen" icon="mdi-menu" size="28" />
								<Icon v-else icon="mdi:close" size="28" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Above md respovesive - Navbar dropdown  -->
			<div
				v-if="subItem"
				class="sub-nav-container container absolute left-1/2 -translate-x-1/2 z-10 shadow-inner top-[8.3125rem]"
				@click="closeSubNav"
				@mouseenter="onSubNov"
				@mouseleave="leaveSubNav"
			>
				<div
					class="container relative min-h-[285px] shadow-xl rounded-xl px-6 mt-3 flex flex-row bg-white"
				>
					<NuxtImg
						class="w-[250px] object-contain pb-2 mx-auto opacity-10 absolute bottom-0 left-0"
						src="/rhac_logo.png"
						format="webp"
					/>

					<div class="sub-nav-header w-1/2 self-center ml-[140px]">
						<h2 class="text-5xl font-extrabold text-primary">
							{{ subItem.header.title }}
						</h2>
					</div>

					<div class="flex items-center">
						<div class="flex flex-col gap-3">
							<template v-for="subNav in subItem.items" :key="subNav.link">
								<div>
									<NuxtLink
										:to="subNav.link"
										class="flex items-center gap-3 text-xl font-medium text-left no-underline capitalize sub-nav-hover group"
									>
										{{ subNav.title }}
										<Icon
											class="duration-300 ease-in-out icon group-hover:translate-x-1 text-primary"
											icon="charm:chevron-right"
											size="14"
										/>
									</NuxtLink>
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Below md - Dropdown Menu -->
		<div
			class="fixed top-[calc(5rem-10px)] z-[11] w-full lg:hidden"
			:class="{
				hidden: !isMobileMenuOpen,
				block: isMobileMenuOpen
			}"
		>
			<MobileMenu :nav="nav" :hide-menu="hideMobileMenu" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { contacts } from '~/util/contact'

const { t } = useI18n()
const route = useRoute()

const isMobileMenuOpen = ref(false)
const hideMobileMenu = () => {
	isMobileMenuOpen.value = false
}
const openingNavId = ref()
const subItem = ref<{
	header: {
		title: string
	}
	items: {
		title: string
		link: string
	}[]
} | null>(null)
const isLeaveMainNav = ref(true)
const isOnSubNav = ref(false)

const nav = computed(() => {
	return [
		{
			title: t('home'),
			link: '/'
		},
		{
			title: t('about_rhac'),
			link: '/about-rhac',
			isSub: true,
			sub: {
				header: {
					title: t('about_rhac')
				},
				items: [
					{
						title: t('about_rhac'),
						link: '/about-rhac'
					},
					{
						title: t('career_and_opportunity'),
						link: '/about-rhac/career-and-opportunity'
					},
					{
						title: t('contact_us'),
						link: '/about-rhac/contact'
					},

					{
						title: t('events'),
						link: '/about-rhac/events'
					},
					{
						title: t('news'),
						link: '/about-rhac/news'
					}
				]
			}
		},
		{
			title: t('clinic'),
			link: '/clinic',
			isSub: true,
			isClinic: true,
			sub: {
				header: {
					title: t('clinic')
				},
				items: [
					{
						title: t('clinic_service'),
						link: '/clinic#services'
					},
					{
						title: t('location'),
						link: '/clinic#rhac-branch'
					},
					{
						title: t('faq'),
						link: '/clinic#faq'
					}
				]
			}
		},
		{
			title: t('method_bank'),
			link: `/method-bank`,
			isSub: true,
			sub: {
				header: {
					title: t('method_bank')
				},
				items: [
					{
						title: t('method_bank'),
						link: '/method-bank/'
					},
					{
						title: t('for_learner'),
						link: `/method-bank/student`
					},
					{
						title: t('for_educator'),
						link: `/method-bank/educator`
					},
					{
						title: t('publication'),
						link: `/method-bank/publication`
					},
					{
						title: t('truth_story'),
						link: '/method-bank/truth-story'
					}
				]
			}
		},
		{
			title: t('health_article'),
			link: '/health-article/'
		}
	]
})

let timer: NodeJS.Timeout
const openSubNav = (item: any, id: string | number) => {
	clearTimeout(timer)
	isLeaveMainNav.value = false
	openingNavId.value = id
	subItem.value = item.sub
}

const leaveMainNav = () => {
	isLeaveMainNav.value = true
	timer = setTimeout(function () {
		if (isOnSubNav.value) return
		closeSubNav()
	}, 500)
}

const leaveSubNav = () => {
	isOnSubNav.value = false
	timer = setTimeout(function () {
		if (!isLeaveMainNav.value) return
		closeSubNav()
	}, 500)
}

const onSubNov = () => {
	isOnSubNav.value = true
}

const closeSubNav = () => {
	// if (isOnSubNav.value) return;
	openingNavId.value = null
	subItem.value = null
}
</script>

<style scoped>
.nav-btn.router-link-active {
	@apply bg-primary text-white;
}

@keyframes bottomup {
	0% {
		opacity: 0;
		top: 200px;
	}
	100% {
		opacity: 1;
	}
}
.sub-nav-container {
	animation-name: bottomup;
	animation-duration: 0.5s;
}

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
