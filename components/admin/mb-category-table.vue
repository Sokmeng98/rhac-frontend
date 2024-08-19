<template>
	<div>
		<table class="w-full bg-[#F5F7FB] rounded-t-lg">
			<thead class="border-[#F5F7FB]">
				<tr class="text-left">
					<th class="py-3 pl-4 text-base max-w-[250px]">Name</th>
					<th class="px-2 py-3 text-base">In khmer</th>
					<th class="px-2 py-3 text-base">Icon</th>
					<th class="px-2 py-3 text-base">Action</th>
				</tr>
			</thead>

			<tbody class="bg-white">
				<tr v-for="item in data" :key="item.id" class="border border-gray-300 border-solid">
					<td class="pl-4 text-base max-w-[250px]">{{ item.name_en }}</td>

					<td class="px-2 text-base max-w-[250px]">{{ item.name }}</td>

					<td class="px-2 py-2">
						<nuxt-img
							loading="lazy"
							class="w-12"
							:src="useFilePath((item as MBCategory).img)"
							:alt="item.name_en"
						/>
					</td>

					<td>
						<div class="flex space-x-4 text-base">
							<button
								class="flex items-center justify-center px-4 py-1 text-sm text-white bg-blue-500 rounded-3xl hover:bg-blue-700"
								@click="onEditButtonClick(item)"
							>
								Edit
							</button>

							<AdminDeleteButton
								:confirm-modal-id="confirmModalId"
								@click="onPendingDelete(item.id)"
							/>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import type { MBCategory } from '~/api/type'

interface Props {
	isPending: boolean
	data: MBCategory[]
	confirmModalId: string
	onEditButtonClick: (item: MBCategory) => void
	onPendingDelete: (id: number) => void
}

defineProps<Props>()
</script>
