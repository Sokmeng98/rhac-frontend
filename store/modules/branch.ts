import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { GetBranchAPI } from '../../api'
import { BranchState } from '~~/api/type'

export const branchStore = defineStore('branch-store', () => {
	const stateBranch: BranchState = reactive({
		branch: {
			data: [],
			meta: { current_page: 0, from: 0, last_page: 0, total: 0 }
		},
		getBranchLoading: false,
		createBranchLoading: false
	})

	const getBranch = async () => {
		await GetBranchAPI()
			.then(res => {
				stateBranch.branch = res
			})
			.catch(() => {})
	}

	return { getBranch, stateBranch }
})
