<template>
	<main>
		<div class="flex justify-between">
			<div class="text-3xl font-bold text-[rgb(34,40,74)]">RHAC Organization members</div>

			<div class="bg-[#D7E5FF] p-3 rounded-xl text-center">
				<div class="text-2xl font-bold">{{ time }}</div>
				<div class="text-[#7A97C4]">{{ date }}</div>
			</div>
		</div>

		<div class="flex justify-between my-5">
			<div class="flex">
				<div class="relative w-60">
					<select v-model="selectedType" class="w-full select focus:outline-none focus:ring-1">
						<option disabled selected value="All">Pick organization type</option>
						<option value="National_Council">National Council</option>
						<option value="Staff">Staff</option>
					</select>
				</div>
			</div>

			<NuxtLink
				class="btn gap-2 text-white bg-[#009987] border-none hover:bg-[#009987]"
				to="/admin/organization/new"
			>
				<Icon icon="fluent:add-12-filled" />
				NEW MEMBER
			</NuxtLink>
		</div>

		<div class="list-container">
			<div v-for="(team, index) in organizationData" :key="index">
				<div v-if="team.length != 0">
					<div class="text-[#009987] text-xl font-bold mt-5">
						{{ team[0].type + ': ' + team.length }} members
					</div>

					<div class="grid grid-cols-1 gap-4 mt-5 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2">
						<div v-for="item in team" :key="item.id">
							<AdminOrganizationCard
								:id="item.id"
								:img="item.img"
								:name-en="item.name_en"
								:name-kh="item.name_kh"
								:role-en="item.role_en"
								:role-kh="item.role_kh"
								:order="item.order"
							>
								<label
									for="delete_member"
									class="absolute inset-0 cursor-pointer"
									@click="setPendingDeleteId(item.id)"
								></label>
							</AdminOrganizationCard>
						</div>
					</div>
				</div>
			</div>
		</div>

		<ConfirmCard
			id="delete_member"
			title="DELETE MEMBER"
			cancel-text="Cancel"
			confirm-text="Delete"
			msg="Are you sure to delete this member?"
			:on-confirm="confirmDelele"
		/>

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
	</main>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useOrganizationStore } from '~~/store'

definePageMeta({
	middleware: ['auth'],
	layout: 'dashboard'
})

const { organizationState, getTeams, deleteTeams } = useOrganizationStore()
const selectedType = ref('All')
const pendingDeleteId = ref()
const organizationData = ref(organizationState)
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

// Fetch data and put it into organization
const fetchTeamsData = () => {
	const position: string[] = ['National Council', 'Staff']
	position.forEach(async position => {
		const res = await getTeams(position)
		if (!res.success) toast('error', res.message)
	})
}

fetchTeamsData()

// Filter teams based on type
const typeFilter = () => {
	if (selectedType.value === 'All') {
		organizationData.value = organizationState
	} else {
		organizationData.value = Object.fromEntries(
			Object.entries(organizationState).filter(x => x[0] === selectedType.value)
		)
	}
}

watch(selectedType, () => {
	typeFilter()
})

// Pending delete
const setPendingDeleteId = (id: number) => {
	pendingDeleteId.value = id
}

// Confirm delete
const confirmDelele = async () => {
	if (pendingDeleteId.value) {
		toast('pending', 'Deleting Teams')

		const res = await deleteTeams(pendingDeleteId.value)

		toastAfterFetch(res)
		toastShouldHide('pending')

		if (res.success) fetchTeamsData()
	}
}

const time = ref(dayjs().format('hh : mm A'))
const date = ref(dayjs().format('dddd DD , MMMM YYYY'))

const intervalID = setInterval(() => {
	time.value = dayjs().format('hh : mm A')
}, 60_000)

onUnmounted(() => {
	clearInterval(intervalID)
})
</script>
