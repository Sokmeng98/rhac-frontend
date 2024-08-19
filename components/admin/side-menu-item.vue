<template>
	<!-- 
      $route.path.includes(item.selfLink), check if current path is in item path of its tabs
			Note: we do not use router-link-active class because it will not work with nuxt-link
    -->
	<NuxtLink :to="item.link" class="select-none group focus:outline-none">
		<div
			:class="[
				(item.selfLink && $route.path.includes(item.selfLink)) || $route.path === item.link
					? ' text-teal-600 cursor-default '
					: ''
			]"
			class="flex items-center px-2 w-full h-12 hover:bg-[#ECFAF9] rounded-md group-focus-visible:ring-2 ring-0 ring-offset-0 group-focus-visible:ring-offset-2 ring-yellow-400 transition-shadow motion-reduce:transition-none"
		>
			<Icon :icon="item.icon" size="20" />

			<span class="px-3 text-lg">
				{{ item.name }}
			</span>
		</div>
	</NuxtLink>

	<input
		v-if="item.tabs"
		:id="`main-menu-${item.id}`"
		v-model="isSubMenuExpanded"
		type="checkbox"
		class="hidden peer"
	/>

	<label
		v-if="item.tabs"
		tabindex="0"
		:for="`main-menu-${item.id}`"
		class="absolute cursor-pointer top-0 right-0 flex items-center hover:text-white justify-center h-12 rounded-md transition-colors duration-200 hover:bg-teal-600/70 aspect-square [&>svg]:rotate-90 peer-checked:[&>svg]:rotate-180 focus-visible:ring-2 ring-yellow-400 ring-0 focus:outline-none focus-visible:ring-offset-2 ring-offset-0 focus-visible:bg-yellow-400"
		aria-label="Toggle sub menu"
		title="Toggle sub menu"
		@keypress="e => e.key === 'Enter' && (isSubMenuExpanded = !isSubMenuExpanded)"
	>
		<svg class="w-6 h-6 transition-transform scale-90">
			<path
				fill="currentColor"
				d="m19.07 16.95 1.42-1.41L12 7.05l-8.49 8.49 1.42 1.41L12 9.88l7.07 7.07Z"
			/>
		</svg>
	</label>

	<div
		class="grid-rows-[0fr] overflow-hidden invisible peer-checked:visible peer-checked:grid-rows-[1fr] grid transition-all peer-checked:py-4"
	>
		<AdminSubSideMenu v-if="item.tabs" :items="item.tabs" />
	</div>
</template>

<script setup lang="ts">
export type MenuItem = {
	id: number
	icon: string
	name: string
	link: string
	selfLink?: string
	tabs?: {
		id: number
		name: string
		link: string
	}[]
}

const { item } = defineProps<{
	item: MenuItem
}>()

const route = useRoute()

const isSubMenuExpanded = ref(!!(item.selfLink && route.path.includes(item.selfLink)))
watchEffect(() => {
	if (item.selfLink && route.path.includes(item.selfLink)) {
		isSubMenuExpanded.value = true
	} else {
		isSubMenuExpanded.value = false
	}
})
</script>
