<template>
	<HeroImg src="/img/methodbank/for_educator_hero.jpg" alt="rhac clinic services cover">
		<div class="container absolute inset-0 top-0 flex items-center">
			<figcaption
				class="flex items-center w-full h-full sm:w-fit sm:h-fit sm:rounded-2xl bg-white/80 lg:bg-transparent"
			>
				<div
					class="px-6 py-4 bg-transparent w-fit lg:border lg:bg-white md:py-5 sm:rounded-none md:rounded-3xl lg:w-1/2"
				>
					<h1
						class="mb-2 text-xl font-semibold text-gray-800 uppercase lg:mb-3 lg:text-3xl 2xl:text-4xl"
					>
						{{ $t('for_educator') }}
					</h1>

					<h4
						class="max-w-full text-sm text-gray-800 sm:text-base md:font-normal md:leading-[22px] xl:text-xl"
					>
						{{ $t('for_educator_desc') }}
					</h4>
				</div>
			</figcaption>
		</div>
	</HeroImg>

	<!-- Teaching materials section -->
	<div class="container px-6 pb-14 lg:px-0">
		<div class="container">
			<div class="mt-12 mb-9">
				<SectionHeader>{{ $t('our_teaching_material') }}</SectionHeader>
			</div>

			<menu class="flex flex-col gap-2 md:flex-row">
				<li v-for="card in cards" :key="card.link">
					<GradeCard
						:grade-locale-text="card.grade"
						:link="card.link"
						:title-locale-text="card.title"
					/>
				</li>
			</menu>
		</div>
	</div>

	<LearnCategoryContainer>
		<div class="w-full px-6 lg:px-0">
			<a
				v-for="(item, index) in items"
				:key="index"
				:href="item.url"
				class="cursor-pointer w-full mb-3 lg:mb-5 last:mb-0 p-[16px] lg:py-[24px] bg-white relative rounded-xl max-w-[1040px] flex flex-row items-center justify-between hover:bg-[#CAE3D6]"
			>
				<p class="text-[16px] lg:text-[24px] xl:text-[30px] max-w-[90%] leading-normal">
					{{ item.title }}
				</p>

				<icon icon="bytesize:arrow-right" class="w-[24px] h-[24px] lg:w-[45px] lg:h-[45px]" />
			</a>
		</div>
	</LearnCategoryContainer>

	<section class="bg-white">
		<div class="container">
			<MbRecentArticles article-type="mb_professional" />
		</div>

		<section id="video-education" class="py-8">
			<SectionHeader class="my-8">{{ $t('video_education') }}</SectionHeader>

			<div class="container">
				<HeroVideoEducation />
			</div>

			<div class="my-5 text-center">
				<NuxtLink to="/educational-video" class="btn-primary btn min-w-[200px]">
					{{ $t('view_all') }}
				</NuxtLink>
			</div>
		</section>
	</section>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'customer'
})
const items = [
	{
		title: 'Glossary of CSE terms and definitions',
		url: '/method-bank/educator/learning-categories/Glossary-of-CSE'
	},
	{
		title: 'List of IEC materials on CSE (national and international)',
		url: '/method-bank/educator/learning-categories/List-of-IEC-Materials-on-CSE'
	},
	{
		title: 'List of additional resources for teachers and educators',
		url: '/method-bank/educator/learning-categories/List-of-Additional-Resources-for-Teachers'
	},
	{
		title:
			'International agreements, instruments and standards related to comprehensive sexuality education (CSE)',
		url: '/method-bank/educator/learning-categories/Comprehensive-Sexuality-Education-(CSE)'
	}
]

const cards = [
	{
		title: 'primary_school',
		grade: 'primary_school_grade',
		color: '#EA7D82',
		link: `/method-bank/educator/primary-school`,
		img: '/img/methodbank/grade_cover.png'
	},
	{
		title: 'secondary_school',
		grade: 'secondary_school_grade',
		color: '#FFC99A',
		link: `/method-bank/educator/secondary-school`,
		img: '/img/methodbank/grade_cover.png'
	},
	{
		title: 'high_school',
		grade: 'high_school_grade',
		color: '#FFAF69',
		link: `/method-bank/educator/high-school`,
		img: '/img/methodbank/grade_cover.png'
	}
]
</script>
