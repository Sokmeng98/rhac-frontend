<template>
	<div>
		<table class="w-full bg-[#F5F7FB] rounded-t-lg">
			<thead class="border-[#F5F7FB]">
				<tr class="text-left">
					<th class="py-3 pl-4 text-base max-w-[250px]">Name</th>
					<th class="px-2 py-3 text-base">In khmer</th>
					<th class="px-2 py-3 text-base">Parent Category</th>
					<th class="px-2 py-3 text-base">Action</th>
				</tr>
			</thead>

			<tbody class="bg-white">
				<tr v-for="item in data" :key="item.id" class="border border-gray-300 border-solid">
					<td class="py-3 pl-4 text-base max-w-[250px]">{{ item.name_en }}</td>

					<td class="py-3 px-2 text-base max-w-[250px]">{{ item.name }}</td>

					<td class="py-3 px-2 text-base max-w-[250px]">
						{{ getParentCategory(item as Category | SubCategory) }}
					</td>

					<td class="py-3 pl-2 pr-4">
						<div class="flex space-x-4 text-base">
							<button
								class="px-4 py-1 text-sm font-normal leading-6 text-white bg-blue-500 hover:bg-blue-700 rounded-2xl"
								@click="onEditButtonClick(item)"
							>
								Edit
							</button>

							<AdminDeleteButton
								:confirm-modal-id="confirmModalId"
								@click="onPendingDelete(item)"
							/>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import type { Category, SubCategory } from '~~/api/category'

interface Props {
	isPending: boolean
	data: (Category | SubCategory)[]
	confirmModalId: string
	onEditButtonClick: (item: Category | SubCategory) => void
	onPendingDelete: (item: Category | SubCategory) => void
	getParentCategory: (item: Category | SubCategory) => string
}

defineProps<Props>()
</script>
