<template>
	<div class="group relative h-full bg-[#FAFAFA] rounded-lg shadow text-center">
		<div class="absolute -top-[6px] right-6">
			<div ref="menu" class="dropdown dropdown-end">
				<label
					ref="menuButton"
					tabindex="0"
					class="absolute transition-transform scale-0 cursor-pointer drop-shadow-md group-hover:scale-100"
					@blur="menuVisibility = false"
					@click="menuVisibility = !menuVisibility"
				>
					<div class="relative w-full h-full">
						<Icon
							icon="ph:dots-three-outline-vertical-fill"
							class="cursor-pointer"
							color="#989898"
							height="20"
						/>
					</div>
				</label>
				<ul
					tabindex="0"
					class="gap-2 p-3 mt-4 list-none border rounded-md shadow menu dropdown-content bg-base-100 w-52"
					@focus="menuVisibility = true"
				>
					<li @click.prevent.stop="editTeamsHandler(id)">
						<a>
							<Icon icon="fa6-solid:pen" color="#00A651" height="19" />
							Edit
						</a>
					</li>
					<li>
						<a class="relative" @click="deleteTeamsHandler">
							<Icon icon="heroicons:trash-20-solid" color="#E01E24" height="20" />
							Delete
							<slot></slot>
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="flex justify-center">
			<img
				v-if="img"
				class="w-20 h-20 border-2 rounded-full mt-7 object-cover object-top border-[#00A651]"
				:src="useFilePath(img)"
			/>
			<img v-else class="w-20 h-20 rounded-full no-img mt-7" src="@/assets/person.png" />
		</div>
		<div class="mt-4 text-base font-medium">
			{{ nameEn ? nameEn : nameKh }}
		</div>
		<div class="mx-3 mb-8 opacity-50 text-sm text-[#323D47]">
			{{ roleEn ? roleEn : roleKh }}
		</div>
		<div class="flex justify-center">
			<hr class="absolute w-1/3 border-2 bottom-0 border-[#00A651]" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useFilePath } from '~~/composables'
interface Props {
	id: number
	img?: string
	nameEn: string
	nameKh?: string
	roleEn: string
	roleKh: string
	order: number
}
defineProps<Props>()

const menuButton = ref<HTMLElement>()
const menu = ref<HTMLElement>()
const menuVisibility = ref(false)

watch(menuVisibility, () => {
	if (!menuVisibility.value) {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur()
		}
	} else if (menuVisibility.value && !menu.value?.contains(document.activeElement)) {
		menuVisibility.value = false
	}
})

const editTeamsHandler = (id: number) => {
	menuVisibility.value = false
	navigateTo(`/admin/organization/edit/${id}`)
}
const deleteTeamsHandler = () => {
	menuVisibility.value = false
}
</script>
