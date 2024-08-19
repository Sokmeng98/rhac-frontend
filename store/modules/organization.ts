import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { GetTeamsAPI, CreateTeamsAPI, UpdateTeamsAPI, DeleteTeamsAPI } from '../../api'
import { IOrganizationForm, IOrganization } from '~~/api/type'

export const organizationStore = defineStore('organization-store', () => {
	const organizationState = reactive<IOrganization>({
		National_Council: [],
		Staff: []
	})

	const getTeams = async (params: string) => {
		const res = await GetTeamsAPI(params)
		if (res.data) {
			switch (params) {
				case 'National Council':
					organizationState.National_Council = res.data
					break
				case 'Staff':
					organizationState.Staff = res.data
					break
				default:
					break
			}
		}
		return res
	}

	const createTeams = async (payload: IOrganizationForm) => {
		return await CreateTeamsAPI(payload)
	}

	const updateTeams = async (payload: Partial<IOrganizationForm>, id: string) => {
		return await UpdateTeamsAPI(payload, id)
	}

	const deleteTeams = async (id: number) => {
		return await DeleteTeamsAPI(id)
	}

	return {
		organizationState,
		getTeams,
		createTeams,
		updateTeams,
		deleteTeams
	}
})
