import type { IOrganizationForm, IOrganizationInfo, IOrganizationResponse } from './type'
import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import { multipartFormDataHeader } from '.'
import type { PaginationMeta } from '.'
import { instance } from '@/composables/axios'

export type TeamsOperationStatus = {
	status?: number
	success: boolean
	message: string
	data?: IOrganizationInfo[]
	meta?: PaginationMeta
}

export const GetTeamsAPI = async (params: string) => {
	let operationStatus: TeamsOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.get<IOrganizationResponse>(`/teams_by_type/?type=${params}`)
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Get Teams successfully',
					success: true,
					data: res.data
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}

export const CreateTeamsAPI = async (payload: IOrganizationForm) => {
	let operationStatus: TeamsOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post<{ data: IOrganizationInfo[] }>(`/teams`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status === 201) {
				operationStatus = {
					message: 'Team created successfully',
					success: true,
					data: res.data
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}
export const UpdateTeamsAPI = async (payload: Partial<IOrganizationForm>, id: string) => {
	let operationStatus: TeamsOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.post<{ data: IOrganizationInfo[] }>(`/teams/${id}`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Team updated successfully',
					success: true,
					data: res.data
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}

export const DeleteTeamsAPI = async (id: number) => {
	let operationStatus: TeamsOperationStatus = {
		message: '',
		success: false
	}

	await instance()
		.delete(`/teams/${id}`)
		.then(({ status }) => {
			if (status === 200) {
				operationStatus = {
					message: 'Team deleted successfully',
					success: true
				}
			}
		})
		.catch((error: ExtendedAxiosError) => {
			operationStatus = {
				message: getErrorMessage(error),
				success: false
			}
		})

	return operationStatus
}
