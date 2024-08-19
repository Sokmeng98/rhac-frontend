<template>
	<div class="flex flex-col w-full gap-2 rounded-xl">
		<NuxtImg
			loading="lazy"
			class="object-cover object-top w-full rounded-xl aspect-square bg-slate-100"
			:src="useFilePath(person.img)"
			:alt="`profile image of ${name}`"
		/>

		<div class="">
			<h3 class="text-lg font-normal">{{ name }}</h3>
			<span class="text-base font-medium text-primary">{{ position }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { TeamMember } from '~/api/type'
const { locale } = useI18n()

type Props = {
	person: TeamMember
}

const { person } = defineProps<Props>()

const name = computed(() =>
	locale.value === 'km' ? person.name_kh || person.name_en : person.name_en || person.name_kh
)

const position = computed(() =>
	locale.value === 'km' ? person.role_kh || person.role_en : person.role_en || person.role_kh
)
</script>
