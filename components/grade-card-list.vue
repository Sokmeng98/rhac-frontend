<template>
	<div class="grid gap-5 sm:grid-cols-3 xl:gap-7">
		<NuxtLink
			v-for="card in cards"
			:key="card.link"
			:to="card.link"
			:class="`grade-card flex items-center rounded-xl p-[30px] cursor-pointer text-[#16005C] sm:items-start sm:flex-col sm:pb-0 bg-[#EA7D82] hover:drop-shadow-2xl ${
				route.path.includes('/method-bank/educator/cse/primary-school') &&
				'bg-primary/80 text-white shadow-[0px_0px_70px_rgba(0,166,81,0.5)]'
			}`"
		>
			<div>
				<p
					class="text-[12px] md:text-[16px] lg:text-[18px] xl:text-[30px] font-bold leading-normal"
				>
					{{ $t(card.title) }}
				</p>

				<h3
					class="text-[18px] md:text-[24px] lg:text-[32px] xl:text-[50px] font-bold leading-normal"
				>
					{{ $t(card.subtitle) }}
				</h3>
			</div>

			<NuxtImg
				class="ml-auto h-[50px] lg:h-[100px] w-auto"
				:src="card.img"
				format="webp"
				:alt="card.title"
			/>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
const route = useRoute()

const cards = [
	{
		title: 'primary_school',
		subtitle: 'primary_school_grade',
		color: '#EA7D82',
		link: `/method-bank/educator/primary-school`,
		img: '/img/methodbank/grade_cover.png'
	},
	{
		title: 'secondary_school',
		subtitle: 'secondary_school_grade',
		color: '#FFC99A',
		link: `/method-bank/educator/secondary-school`,
		img: '/img/methodbank/grade_cover.png'
	},
	{
		title: 'high_school',
		subtitle: 'high_school_grade',
		color: '#FFAF69',
		link: `/method-bank/educator/high-school`,
		img: '/img/methodbank/grade_cover.png'
	}
]
</script>
