<template>
	<menu
		class="flex flex-col w-full min-h-0 gap-2 text-base list-none bg-white"
		aria-label="Sub menu"
	>
		<li v-for="item in items" :key="item.id" class="flex-shrink-0 w-full h-12 px-4 rounded-md">
			<!-- 
        $route.path === item.link, check if item.link is current path (axact active)
			  Note: we do not use router-link-active class because it will not work with nuxt-link
      -->
			<NuxtLink
				:to="item.link"
				class="w-full h-full flex items-center rounded-md hover:bg-[#ECFAF9] ring-0 focus-visible:ring-2 focus:outline-none ring-yellow-400 ring-offset-0 focus-visible:ring-offset-2 transition-shadow motion-reduce:transition-none select-none"
				:class="[$route.path === item.link ? 'bg-[#ECFAF9]' : '']"
			>
				<span
					:class="[$route.path === item.link ? 'text-teal-600 cursor-default' : '']"
					class="flex items-center w-full h-full px-6 text-lg"
				>
					{{ item.name }}
				</span>
			</NuxtLink>
		</li>
	</menu>
</template>

<script setup lang="ts">
type Item = {
	id: number
	name: string
	link: string
}

defineProps<{ items: Item[] }>()
</script>
