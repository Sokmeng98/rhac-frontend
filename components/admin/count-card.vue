<template>
	<div class="px-8 py-6 space-y-4 bg-white border border-gray-200 shadow-md rounded-xl">
		<div class="text-base font-semibold text-[#16005C]">{{ title }}</div>

		<div class="flex justify-start gap-4">
			<div class="flex items-center">
				<Icon :icon="icon" color="#323d47" width="25" height="22" class="flex-shrink-0" />
			</div>

			<div v-if="isPending" class="h-10 text-transparent rounded-md bg-black/30 animate-pulse">
				0000 {{ title.split(' ')[1] }}
			</div>

			<div
				v-else-if="!isErrored"
				class="rounded-md bg-[#009987]/20 p-2 text-base font-medium text-[#009987]"
			>
				{{ count }} {{ title.split(' ')[1] }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '~~/api'
import type { Post } from '~~/api/type'

const { links, value } = defineProps<{
	links?: string[]
	value?: number
	title: string
	icon: string
}>()

const count = ref(0)
const isPending = ref(true)
const isErrored = ref(false)

if (links?.length) {
	links.forEach(link => {
		const {
			data: res,
			pending,
			error
		} = useLazyFetch<{ data: Post[]; meta: PaginationMeta; total?: number }>(link, {
			baseURL: useBaseUrl(),
			server: false
		})

		watch(res, newRes => {
			if (newRes?.meta) {
				count.value += newRes.meta.total
			} else if (newRes?.total) {
				count.value += newRes.total
			}
		})

		watch(pending, newPending => {
			isPending.value = isPending.value && newPending
		})

		watch(error, newError => {
			isErrored.value = isErrored.value || Boolean(newError)
		})
	})
} else {
	count.value = value ?? 0

	isPending.value = false
	isErrored.value = false
}
</script>
