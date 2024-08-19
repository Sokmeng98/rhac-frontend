<template>
	<Head>
		<Title>RHAC - Dashboard</Title>
		<Meta name="csrf_token" content="{{ csrf_token() }}"></Meta>
	</Head>

	<a
		href="#main-section-wrapper"
		tabindex="0"
		class="absolute z-50 p-2 text-white bg-yellow-500 rounded-md opacity-0 pointer-events-none ring-offset-2 ring-2 ring-yellow-400 top-2 left-2 focus:opacity-100 focus:outline-none"
		>Skip Navigation Menu</a
	>

	<div id="dashboard-main" class="container flex w-screen h-screen min-w-full p-0 overflow-hidden">
		<NuxtLoadingIndicator />

		<!-- #region Menu toggle -->
		<input
			id="toggle-menu"
			type="checkbox"
			name="toggle-menu"
			class="absolute left-0 z-50 w-12 h-12 transition-transform rounded-md appearance-none cursor-pointer md:invisible peer/toggle top-1 focus-visible:ring-2 ring-yellow-400 checked:translate-x-56 focus:outline-none"
		/>
		<label
			for="toggle-menu"
			aria-label="Toggle menu"
			class="absolute left-0 z-40 w-12 h-12 transition-[transform_opacity] bg-white rounded-r-lg shadow-xl flex-col gap-2 top-1 md:hidden peer-checked/toggle:translate-x-56 peer-checked/toggle:rounded-md peer-checked/toggle:[&>#top-bar]:w-0 peer-checked/toggle:[&>#down-bar]:w-10 peer-checked/toggle:[&>#up-bar]:w-10 peer-checked/toggle:[&>#bottom-bar]:w-0 peer-checked/toggle:[&>#middle-bar]:w-0"
		>
			<div
				id="top-bar"
				class="absolute h-[3px] bg-black rounded-full w-7 left-2 top-[0.59rem] transition-all duration-500"
			></div>

			<div
				id="down-bar"
				class="absolute h-[3px] rotate-45 bg-black rounded-full origin-left w-0 left-2 top-2 transition-[width] duration-500"
			></div>

			<div
				id="middle-bar"
				class="absolute h-[3px] bg-black rounded-full w-7 inset-y-1/2 left-2 -translate-y-1/2"
			></div>

			<div
				id="up-bar"
				class="absolute h-[3px] -rotate-45 bg-black rounded-full origin-left w-0 left-2 bottom-2 transition-all duration-500"
			></div>

			<div
				id="bottom-bar"
				class="absolute transition-[width] h-[3px] bg-black rounded-full bottom-[0.59rem] w-7 left-2 origin-left"
			></div>
		</label>

		<label
			for="toggle-menu"
			class="absolute z-10 w-full h-full md:hidden cursor-pointer transition-opacity bg-black opacity-0 peer-checked/toggle:pointer-events-auto pointer-events-none peer-checked/toggle:opacity-25 supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur"
		></label>
		<!-- #endregion End Menu toggle -->

		<div
			class="absolute z-10 flex-shrink-0 invisible h-full overflow-y-auto transition-transform -translate-x-full bg-white md:relative peer-checked/toggle:-translate-x-0 md:w-72 md:-translate-x-0 peer-checked/toggle:visible md:visible"
		>
			<div class="text-[#009987] pl-4 py-5 text-2xl font-bold">RHAC Admin</div>

			<div ref="menu" class="dropdown dropdown-end">
				<label
					ref="menuButton"
					tabindex="0"
					class="cursor-pointer group focus:outline-none"
					@blur="menuVisibility = false"
					@click="menuVisibility = !menuVisibility"
				>
					<div
						class="relative p-1 mx-4 mb-5 transition-all rounded-md ring-1 ring-gray-800 group-focus-visible:ring-2 group-focus-visible:border-0 group-focus-visible:ring-yellow-400 motion-reduce:transition-none"
					>
						<div class="flex items-center rounded-md">
							<div class="m-1 avatar">
								<div v-if="user?.img" class="w-10 h-10 rounded-full">
									<img :src="user.img" />
								</div>
								<Icon v-else icon="iconoir:profile-circled" size="40" />
							</div>

							<div class="w-44">
								<div class="text-lg font-bold">{{ user?.name }}</div>
								<div class="text-xs text-gray-500">{{ user?.email }}</div>
							</div>

							<div>
								<Icon icon="ep:d-arrow-right" />
							</div>
						</div>
					</div>
				</label>

				<ul
					class="list-none menu dropdown-content shadow bg-base-100 border rounded-md w-[150px] mt-[-10px] mr-[20px]"
					@focus="menuVisibility = true"
				>
					<button
						class="flex justify-center gap-2 py-3 rounded-md focus-visible:ring-2 ring-0 ring-yellow-400 focus:outline-none"
						@click.prevent.stop="logout()"
					>
						<svg
							v-if="isLogingOut"
							aria-hidden="true"
							class="w-6 h-6 mr-2 text-gray-200 animate-spin fill-blue-600"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>

						<Icon
							v-if="!isLogingOut"
							icon="grommet-icons:logout"
							width="24"
							height="24"
							rotate="180deg"
							flip="horizontal"
						/>
						Logout
					</button>
				</ul>
			</div>

			<div class="flex-1">
				<AdminSideMenu />
			</div>
		</div>

		<div
			id="main-section-wrapper"
			class="w-full pt-16 md:pt-8 h-screen bg-[#ECF5FF] p-8 overflow-auto"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import cookie from 'js-cookie'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { LogoutAPI } from '../api'
import { useAuthStore } from '../store/index'
import { updateHeaderToken } from '~~/api/updateHeader'

updateHeaderToken()
const { user } = storeToRefs(useAuthStore())
const { getProfile } = useAuthStore()
const isLogingOut = ref<boolean>(false)

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

const logout = async () => {
	cookie.set('t', '')
	isLogingOut.value = true

	const res = await LogoutAPI()

	isLogingOut.value = false
	menuVisibility.value = false

	if (res.success) navigateTo('/admin/login')
}

onMounted(() => {
	getProfile()
})
</script>
