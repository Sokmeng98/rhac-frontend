<template>
	<h1 class="title ml-4 text-3xl font-bold text-[rgb(34,40,74)]">RHAC Organization members</h1>

	<div class="mr-4 text-right btn-container mt-7">
		<NuxtLink
			to="/admin/organization"
			class="w-24 gap-2 ml-2 text-white border-none btn-cancel btn bg-[#F27564] hover:bg-[#F27564]"
		>
			Cancel
		</NuxtLink>

		<button
			class="w-24 gap-2 m-2 text-white border-none btn-save btn bg-[#009987] hover:bg-[#009987]"
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
						<option hidden disabled selected value="-">-</option>
						<option value="National_Council">National Council</option>
						<option value="Staff">Staff</option>
					</select>
					<span v-if="error.type" class="error">Team name is required</span>
				</div>
				<div class="w-1/2">
					<p class="mb-1 text-lg font-bold">ឈ្មោះក្រុម</p>
					<input
						disabled
						type="text"
						class="w-full px-4 py-[10px] text-lg border border-neutral-300 cursor-not-allowed bg-gray-50 text-neutral-500 rounded-xl"
						:value="type == 'National_Council' ? 'National Council' : type"
					/>
				</div>
			</div>
			<div class="flex gap-8 pr-6 mt-5">
				<div class="w-1/2">
					<p class="mb-1 text-lg font-bold">Order after</p>
					<select v-model="order" class="w-full select focus:outline-none focus:ring-1">
						<option hidden disabled selected value="-">-</option>
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
					@change="imageHandler($event)"
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
import { IOrganization, IOrganizationInfo } from '~~/api/type'
import { useOrganizationStore } from '~~/store'

import { resizeImage } from '~/util/image-util'

definePageMeta({
	layout: 'dashboard',
	middleware: 'auth'
})

let lastOrder: number | string = ''
const teamMembers = ref<IOrganizationInfo[]>([])
const imageUrl = ref<string>()
const imageFile = ref<File>()
const nameEn = ref('')
const nameKh = ref('')
const roleEn = ref('')
const roleKh = ref('')
const type = ref<keyof IOrganization | '-'>('-')
const order = ref<string | number>('-')
const error = ref({
	name_en: false,
	role_en: false,
	type: false
})

const { organizationState, getTeams, createTeams } = useOrganizationStore()
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

watch(type, () => {
	if (type.value !== '-') {
		teamMembers.value = organizationState[type.value]
		if (teamMembers.value.length) {
			lastOrder = teamMembers.value[teamMembers.value.length - 1].order
		} else lastOrder = 'First Order'
	}

	order.value = lastOrder
})

const imageCallback = (image: Blob | null) => {
	if (image) {
		const file = new File([image], 'profile-image')

		imageFile.value = file
		imageUrl.value = URL.createObjectURL(file)
	}
}

// Handle upload image
const imageHandler = (event: any) => {
	const file = event.target.files[0]
	if (file) {
		resizeImage(file, 680, imageCallback)
	}
}

// Check required field (name_en, role_en and type)
const requiredFieldCheck = () => {
	if (nameEn.value) error.value.name_en = false
	else error.value.name_en = true

	if (roleEn.value) error.value.role_en = false
	else error.value.role_en = true

	if (type.value && type.value !== '-') error.value.type = false
	else error.value.type = true
}

// Create post
const submitForm = async () => {
	requiredFieldCheck()

	const data = {} as any
	data.name_en = nameEn.value
	data.role_en = roleEn.value
	data.type = type.value
	data.order = order.value
	if (type.value === 'National_Council') data.type = 'National Council'
	if (imageFile.value) data.img = imageFile.value
	if (nameKh.value) data.name_kh = nameKh.value
	if (roleKh.value) data.role_kh = roleKh.value

	if (!error.value.name_en && !error.value.role_en && !error.value.type) {
		toast('pending', 'Creating Teams')

		const res = await createTeams(data)

		toastAfterFetch(res)
		toastShouldHide('pending')

		if (res.success) navigateTo('/admin/organization')
	}
}
</script>
