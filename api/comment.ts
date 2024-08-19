import type { ExtendedAxiosError } from './article'
import { getErrorMessage } from './article'
import { multipartFormDataHeader } from '.'
import type { PaginationMeta } from '.'

export type Comment = {
	id: number
	authorId: number
	authorName: string

	checked: boolean

	content: string

	replies?: Comment[]
}

export type CommentType = 'mb_learner' | 'mb_professional' | 'post'

export type CommentOperationStatus<T extends Comment[] | Comment> = {
	status?: number
	success: boolean
	message: string
	data?: T
	meta?: PaginationMeta
}

export const createCommentAPI = async (payload: FormData) => {
	let operationStatus: CommentOperationStatus<Comment> = {
		message: '',
		success: false
	}

	await instance()
		.post<{ data: Comment }>(`/comment`, payload, {
			headers: multipartFormDataHeader
		})
		.then(({ status, data: res }) => {
			if (status >= 200 && status < 300) {
				operationStatus = {
					success: true,
					message: 'Comment created successfully',
					status,
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
