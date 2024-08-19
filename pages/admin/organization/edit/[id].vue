<template>
	<h1 class="ml-4 text-3xl font-bold text-[rgb(34,40,74)]">RHAC Organization members</h1>

	<div class="mr-4 text-right mt-7">
		<button
			class="w-24 gap-2 ml-2 text-white border-none btn bg-[#F27564] hover:bg-[#F27564]"
			@click="onCancelButtonClicked()"
		>
			Cancel
		</button>
		<button
			class="w-24 gap-2 m-2 text-white border-none btn bg-[#009987] hover:bg-[#009987]"
			@click="submitForm"
		>
			Save
		</button>
	</div>

	<div class="flex justify-between px-6 mt-10">
		<div class="w-4/6">
			<div class="flex gap-8 pr-6">
				<div class="w-1/2">
					<p class="mb-1 text-lg font-bold">Name*</p>
					<input
						v-model="nameEn"
						type="text"
						class="w-full px-4 py-[10px] text-xl text-black rounded-xl focus:outline-none focus:ring-1"
					/>
					<p class="mt-1 text-xs text-gray-500">This name how it appears on your site</p>
				</div>
				<div class="w-1/2">
					<p class="mb-1 text-lg font-bold">ឈ្មោះ</p>
					<input
						v-model="nameKh"
						type="text"
						class="w-full px-4 py-[10px] text-xl text-black rounded-xl focus:outline-none focus:ring-1"
					/>
					<p class="mt-1 text-xs text-gray-500">ឈ្មោះត្រូវបង្ហាញក្នុងគេហទំព័រ</p>
				</div>
			</div>
			<span v-if="error.name_en" class="error">Name in English is required</span>
			<div class="flex gap-8 pr-6 mt-5">
				<div class="w-1/2">
					<p class="mb-1 text-lg font-bold">Position*</p>
					<input
						v-model="roleEn"
						type="text"
						class="w-full px-4 py-[10px] text-xl text-black rounded-xl focus:outline-none focus:ring-1"
					/>
				</div>
				<div class="w-1/2">
					<p class="mb-1 text-lg font-bold">មុខតំណែង</p>
					<input
						v-model="roleKh"
						type="text"
						class="w-full px-4 py-[10px] text-xl text-black rounded-xl focus:outline-none focus:ring-1"
					/>
				</div>
			</div>
			<span v-if="error.role_en" class="error">Position in English is required</span>
			<div class="flex gap-8 pr-6 mt-5">
				<div class="w-1/2">
					<p class="mb-1 text-lg font-bold">Team Name*</p>
					<select v-model="type" class="w-full select focus:outline-none focus:ring-1">
						<option value="National_Council">National Council</option>
						<option value="Staff">Staff</option>
					</select>
				</div>
				<div class="w-1/2">
					<p class="mb-1 text-lg font-bold">ឈ្មោះក្រុម</p>
					<input
						disabled
						type="text"
						class="w-full px-4 py-[10px] text-lg border border-gray-300 cursor-not-allowed bg-gray-50 text-gray-500 rounded-xl"
						:value="type == 'National_Council' ? 'National Council' : type"
					/>
				</div>
			</div>
			<div class="flex gap-8 pr-6 mt-5">
				<div class="w-1/2">
					<p class="mb-1 text-lg font-bold">Order after*</p>
					<select v-model="order" class="w-full select focus:outline-none focus:ring-1">
						<option value="First Order">First order</option>
						<option v-for="(item, index) in teamMembers" :key="index" :value="item.order">
							{{ item.name_en }}
						</option>
					</select>
				</div>
				<div class="w-1/2"></div>
			</div>
			<div class="mt-5">
				<p class="mb-1 text-lg font-bold">Upload Profile Picture</p>
				<label
					for="file-ip-1"
					class="gap-2 text-white border-none btn bg-[#009987] hover:bg-[#009987]"
				>
					<Icon icon="fa6-solid:upload" />
					Upload Image
				</label>
				<input
					id="file-ip-1"
					type="file"
					accept="image/*"
					class="hidden"
					@change="e => showImagePreview(e)"
				/>
				<p class="mt-1 text-xs text-gray-500">*Image format: png, jpg</p>
			</div>
		</div>

		<div class="w-2/6 pl-2">
			<div class="flex justify-end w-full">
				<p class="mb-1 text-lg font-bold w-80">Preview</p>
			</div>

			<div class="flex justify-end w-full">
				<div class="relative px-5 py-12 text-center bg-white shadow xl:px-10 w-80 rounded-2xl">
					<div class="flex justify-center">
						<img
							v-if="imageUrl"
							class="border-2 border-[#00A651] rounded-full w-36 h-36 object-cover object-top"
							:src="imageUrl"
						/>
						<img v-else class="rounded-full w-36 h-36" src="@/assets/person.png" />
					</div>
					<div>
						<p
							v-if="!nameEn && !nameKh"
							class="text-2xl font-normal leading-tight text-gray-600 break-words opacity-50 mt-7"
						>
							Members Name
						</p>
						<p v-else class="text-2xl font-normal leading-tight text-gray-800 break-words mt-7">
							{{ nameEn ? nameEn : nameKh }}
						</p>
						<p v-if="!roleEn && !roleKh" class="mt-1 text-xl font-normal text-gray-700 opacity-20">
							(Position)
						</p>
						<p v-else class="mt-1 text-xl font-normal text-gray-700 opacity-60">
							{{ roleEn ? roleEn : roleKh }}
						</p>
					</div>
					<div class="flex justify-center">
						<hr class="absolute bottom-0 w-1/3 border-2 border-[#00A651]" />
					</div>
				</div>
			</div>
		</div>
	</div>

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
import type { IOrganization, IOrganizationInfo, TeamMember } from '~~/api/type'
import { useOrganizationStore } from '~~/store'
import { useBaseUrl, useFilePath } from '~/composables'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

let currentTeamName = ''
let currentNameIndex = -1
let currentOrder: number | string = -1
let lastOrder: number | string = ''
const teamMembers = ref<IOrganizationInfo[]>([])
const imageUrl = ref<string>()
const imageFile = ref<File>()
const nameEn = ref('')
const nameKh = ref('')
const roleEn = ref('')
const roleKh = ref('')
const type = ref<keyof IOrganization | undefined>(undefined)
const order = ref<string | number>()
const error = ref({
	name_en: false,
	role_en: false
})

const { id } = useRoute().params
const { organizationState, getTeams, updateTeams } = useOrganizationStore()
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

// Call APIs to add data to organization store
const position: string[] = ['National Council', 'Staff']
position.forEach(position => getTeams(position))

// Fetch teams data
const { data } = await useFetch<{ data: TeamMember[] }>(`/teams/${id}`, { baseURL: useBaseUrl() })
const teamData = data.value?.data[0]

if (teamData) {
	if (teamData.img) imageUrl.value = useFilePath(teamData.img)
	currentTeamName = teamData.type
	currentOrder = teamData.order > 1 ? teamData.order - 1 : 'First Order'

	nameEn.value = teamData.name_en
	nameKh.value = teamData.name_kh
	roleEn.value = teamData.role_en
	roleKh.value = teamData.role_kh
	// @ts-ignore
	type.value = teamData.type === 'National Council' ? 'National_Council' : teamData.type
	order.value = teamData.order > 1 ? teamData.order - 1 : 'First Order'

	if (type.value) teamMembers.value = organizationState[type.value]
	currentNameIndex = teamMembers.value.findIndex((item: any) => item.name_en === nameEn.value)
	teamMembers.value.splice(currentNameIndex, 1)
}

watch(type, () => {
	if (type.value) {
		if (type.value === currentTeamName) {
			teamMembers.value = organizationState[type.value]
			teamMembers.value.splice(currentNameIndex, 1)
		} else teamMembers.value = organizationState[type.value]

		if (teamMembers.value.length) {
			lastOrder = teamMembers.value[teamMembers.value.length - 1].order
		} else lastOrder = 'First Order'

		order.value = lastOrder
	}
})

const onCancelButtonClicked = () => {
	navigateTo('/admin/organization')
}

const showImagePreview = (event: any) => {
	if ((event.target as any).files.length > 0) {
		const src = URL.createObjectURL((event.target as any).files[0])
		imageFile.value = (event.target as any).files[0]
		imageUrl.value = src
	}
}

// Check required field (name_en, role_en are required)
const requiredFieldCheck = () => {
	if (nameEn.value) error.value.name_en = false
	else error.value.name_en = true

	if (roleEn.value) error.value.role_en = false
	else error.value.role_en = true
}

const submitForm = async () => {
	requiredFieldCheck()

	let teamName = ''
	if (type.value === 'National_Council') teamName = 'National Council'
	else if (type.value) teamName = type.value

	const updateData = {} as any
	updateData._method = 'PUT'
	if (imageFile.value) updateData.img = imageFile.value
	if (nameEn.value !== teamData?.name_en) updateData.name_en = nameEn.value
	if (nameKh.value !== teamData?.name_kh) updateData.name_kh = nameKh.value
	if (roleEn.value !== teamData?.role_en) updateData.role_en = roleEn.value
	if (roleKh.value !== teamData?.role_kh) updateData.role_kh = roleKh.value
	if (teamName !== teamData?.type) updateData.type = teamName
	if (currentOrder !== order.value) updateData.order = order.value

	if (!error.value.name_en && !error.value.role_en && typeof id === 'string' && teamData) {
		toast('pending', 'Updating Teams')

		const res = await updateTeams(updateData, teamData.id.toString())

		toastAfterFetch(res)
		toastShouldHide('pending')

		if (res.success) navigateTo('/admin/organization')
	}
}
</script>
