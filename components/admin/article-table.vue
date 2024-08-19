<template>
	<table class="w-full mb-5 bg-[#F5F7FB] rounded-t-lg">
		<thead class="border-[#F5F7FB]">
			<tr class="text-left">
				<th class="py-3 pl-4 text-base">Title</th>
				<th class="px-2 py-3 text-base">Category</th>
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
					:class="
						deletingArticleId == item.id && isModalOpen ? 'bg-red-600 animate-pulse text-white' : ''
					"
				>
					<td class="max-w-[250px] py-3 pl-4 pr-2">
						<div class="text-base">
							{{ !item.title_en ? item.title_kh : item.title_en }}
						</div>
					</td>

					<td class="px-2 py-3">
						<div v-if="postType.includes('learner') && item.m_b__categories" class="text-base">
							{{
								!item.m_b__categories[0].name_en
									? item.m_b__categories[0].name
									: item.m_b__categories[0].name_en
							}}
						</div>

						<div v-else-if="postType.includes('professor') && item.grade" class="text-base">
							{{ item.grade[0] }}
						</div>

						<div
							v-else-if="postType.includes('career') && item.post__subcategories?.length"
							class="text-base"
						>
							{{ item.post__subcategories[0].name_en || item.post__subcategories[0].name }}
						</div>

						<div v-else class="text-base">
							{{
								!item.post__categories?.[0].name_en
									? item.post__categories?.[0].name
									: item.post__categories?.[0].name_en
							}}
						</div>
					</td>

					<td class="px-2 py-3">
						<div class="flex justify-between w-20">
							<div class="flex items-center">
								<div v-if="item.title_kh">
									<AdminKhmerFlagButton
										:route-url="`/admin/${postType}/edit/${item.slug_kh}?lang=kh`"
									/>
								</div>

								<div v-else>
									<AdminPlusButton :route-url="`/admin/${postType}/edit/${item.slug_en}?lang=en`" />
								</div>
							</div>

							<div class="flex items-center">
								<div v-if="item.title_en">
									<AdminUsFlagButton
										:route-url="`/admin/${postType}/edit/${item.slug_kh}?lang=en`"
									/>
								</div>

								<div v-else>
									<AdminPlusButton :route-url="`/admin/${postType}/edit/${item.slug_kh}?lang=kh`" />
								</div>
							</div>
						</div>
					</td>

					<td class="flex items-center gap-2 px-2 py-3">
						<span>{{ dayjs(item.date).format('MMM D, YYYY h:mm A') }}</span>

						<svg
							v-if="item.status === 'Scheduled'"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<g fill="none">
								<path
									d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
								/>
								<path
									fill="#009987"
									d="M12 4a9 9 0 1 1 0 18a9 9 0 0 1 0-18Zm0 2a7 7 0 1 0 0 14a7 7 0 0 0 0-14Zm0 2a1 1 0 0 1 .993.883L13 9v3.586l1.813 1.812a1 1 0 0 1-1.32 1.498l-.095-.084l-2.105-2.105a.996.996 0 0 1-.286-.59l-.007-.13V9a1 1 0 0 1 1-1Zm4.634-5.03a1 1 0 0 1 1.367-.364a12.054 12.054 0 0 1 3.271 2.776a1 1 0 0 1-1.544 1.27a10.053 10.053 0 0 0-2.729-2.315a1 1 0 0 1-.365-1.366ZM6 2.607a1 1 0 1 1 1.002 1.731a10.053 10.053 0 0 0-2.729 2.316a1 1 0 1 1-1.544-1.27A12.053 12.053 0 0 1 6 2.607Z"
								/>
							</g>
						</svg>
					</td>

					<td class="py-3 pl-2 pr-4">
						<div class="flex space-x-4 text-base">
							<AdminEditButton
								:route-url="`/admin/${postType}/edit/${
									item.slug_en?.length ? item.slug_en + '?lang=en' : item.slug_kh + '?lang=kh'
								}`"
							/>

							<AdminDeleteButton
								:confirm-modal-id="confirmModalId"
								@click="onPendingDelete(item.id)"
							/>
						</div>
					</td>
				</tr>
			</template>

			<template v-else>
				<ArticleTableRowSkeleton v-for="item in 10" :key="item" />
			</template>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { Post } from '~~/api/type'

interface Props {
	isPending: boolean
	data: Post[]
	postType: string
	confirmModalId: string
	onPendingDelete: (id: number) => void
	deletingArticleId: number
	isModalOpen: boolean
}

defineProps<Props>()
</script>
