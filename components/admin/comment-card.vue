<script lang="ts" setup>
import axios from 'axios'
import type { Comment } from '~~/api/comment'

const { comment, confirmModalId, setPendingId } = defineProps<{
	comment: Comment
	setPendingId: (id: number) => void
	confirmModalId: string
}>()

const isUpdatingState = ref(false)
const isCheckboxChecked = ref(Boolean(comment.checked) || false)

const toggleVerify = () => {
	isUpdatingState.value = true

	axios
		.put(
			`/comment/${comment.id}`,
			{ checked: isCheckboxChecked.value },
			{
				baseURL: useBaseUrl(),
				method: 'PUT'
			}
		)
		.catch(() => {
			isCheckboxChecked.value = !isCheckboxChecked.value
		})
		.finally(() => {
			isUpdatingState.value = false
		})
}
</script>

<template>
	<div class="group">
		<p class="min-h-8">
			{{ comment.content }}
		</p>

		<div class="relative text-2xl text-white rounded-md">
			<input
				:id="'verify-switch' + '-' + comment.id"
				v-model="isCheckboxChecked"
				type="checkbox"
				name="verify-switch"
				class="absolute w-16 h-full rounded-full appearance-none peer ring-2 ring-red-500 checked:ring-green-500 focus:outline-none focus-visible:ring-yellow-500 focus-visible:ring-4"
				:disabled="isUpdatingState"
				@change="() => toggleVerify()"
			/>

			<label
				:for="'verify-switch' + '-' + comment.id"
				class="relative flex items-center w-16 p-[0.2rem] bg-white rounded-full shadow-md cursor-pointer"
				:class="{
					'[&>div]:translate-x-[2rem]': isCheckboxChecked
				}"
			>
				<div
					class="absolute cross transition-[transform,opacity] bg-black rounded-full"
					:class="{
						'opacity-0': isCheckboxChecked,
						'opacity-100': !isCheckboxChecked
					}"
				>
					<svg width="24" height="24" fill="none" class="">
						<path
							fill="currentColor"
							d="M17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41 17.59 5Z"
						/>
					</svg>
				</div>

				<div
					class="check aspect-square transition-[transform,opacity] bg-black rounded-full"
					:class="{
						'opacity-100': isCheckboxChecked,
						'opacity-0': !isCheckboxChecked
					}"
				>
					<svg width="24" height="24" fill="none">
						<path
							fill="currentColor"
							d="m9.525 17.657-4.95-4.95 1.414-1.414 3.537 3.534-.001.001 8.485-8.485 1.414 1.414-8.485 8.486-1.413 1.413-.001.001Z"
						/>
					</svg>
				</div>

				<p
					class="absolute text-sm translate-x-full pointer-events-none select-none -right-2"
					:class="isCheckboxChecked ? 'text-green-500' : 'text-red-500'"
				>
					{{ isCheckboxChecked ? 'Verified' : 'Unverified' }}
				</p>
			</label>
		</div>

		<label
			:for="confirmModalId"
			class="absolute invisible p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 pointer-events-auto top-1 group-hover:visible right-1 group-hover:opacity-100"
			@click="setPendingId(comment.id)"
		>
			<svg width="24" height="24" fill="none" class="">
				<path
					fill="currentColor"
					d="M17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41 17.59 5Z"
				/>
			</svg>
		</label>
	</div>
</template>
