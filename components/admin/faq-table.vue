<template>
	<table class="w-full mb-5 bg-[#F5F7FB] rounded-t-lg">
		<thead class="border-[#F5F7FB]">
			<tr class="text-left">
				<th class="py-3 pl-4 text-base">Question</th>
				<th class="px-2 py-3 text-base">Answer</th>
				<th class="px-2 py-3 text-base">Language</th>
				<th class="px-2 py-3 text-base">Publish Date</th>
				<th class="px-2 py-3 text-base">Action</th>
			</tr>
		</thead>

		<tbody class="py-4 bg-white">
			<template v-if="!isPending">
				<tr
					v-for="item in data"
					:key="item.id"
					class="align-top border border-gray-300 border-solid"
				>
					<td class="max-w-[250px] py-3 pl-4 pr-2">
						<div class="text-base line-clamp-2">
							{{ !item.question_en ? item.question_kh : item.question_en }}
						</div>
					</td>

					<td class="max-w-[250px] px-2 py-3">
						<div class="text-base line-clamp-2">
							{{ !item.answer_en ? item.answer_kh : item.answer_en }}
						</div>
					</td>

					<td class="px-2 py-3">
						<div class="flex justify-between w-20">
							<div class="flex items-center">
								<div v-if="!item.question_kh">
									<AdminPlusButton :route-url="`/admin/faqs/edit/${item.id}`" />
								</div>
								<div v-else>
									<AdminKhmerFlagButton :route-url="`/admin/faqs/edit/${item.id}`" />
								</div>
							</div>

							<div class="flex items-center">
								<div v-if="!item.question_en">
									<AdminPlusButton :route-url="`/admin/faqs/edit/${item.id}`" />
								</div>
								<div v-else>
									<AdminUsFlagButton :route-url="`/admin/faqs/edit/${item.id}`" />
								</div>
							</div>
						</div>
					</td>

					<td class="px-2 py-3">
						{{ dayjs(item.created_at).format('MMM D, YYYY h:mm A') }}
					</td>

					<td class="py-3 pl-2 pr-4">
						<div class="flex space-x-4 text-base">
							<AdminEditButton :route-url="`/admin/faqs/edit/${item.id}`" />

							<AdminDeleteButton
								:confirm-modal-id="confirmModalId"
								@click="onPendingDelete(item.id)"
							/>
						</div>
					</td>
				</tr>
			</template>

			<template v-else>
				<div v-if="isPending">
					<SkeletonArticleTableRow v-for="n in 10" :key="n" />
				</div>
			</template>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { Faq } from '~~/api'

interface Props {
	isPending: boolean
	data: Faq[]
	confirmModalId: string
	onPendingDelete: (id: number) => void
}

defineProps<Props>()
</script>
