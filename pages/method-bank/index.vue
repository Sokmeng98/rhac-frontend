<template>
	<Head>
		<Meta
			name="description"
			content="ឯកសារបង្រៀននិងសិក្សាពីអង្ការរ៉ាក់.Study and teaching materials and resources from RHAC"
		></Meta>
	</Head>

	<main class="w-full h-full">
		<HeroImg
			src="/img/methodbank/methodbank_hero.jpg"
			alt="method bank hero image"
			class-name="xl:object-top"
		>
			<div class="absolute inset-0 bg-emerald-950/40"></div>

			<figcaption class="container absolute inset-0 flex items-center justify-center px-8">
				<div class="flex flex-col w-full gap-8 lg:w-1/2">
					<h1
						class="text-3xl text-center font-['Moul',cursive] text-white drop-shadow-xl shadow-black"
					>
						{{ $t('search_for_resource') }}
					</h1>

					<SearchBar :pending="false" :on-search="handleSearch" class="relative w-full lg:py-4" />
				</div>
			</figcaption>
		</HeroImg>

		<section class="pt-10 bg-secondary/10">
			<article class="container flex flex-col gap-6 px-4 lg:px-0">
				<div class="container">
					<SectionHeader class="mb-8">
						{{ $t('mb_introduction') }}
					</SectionHeader>

					<div class="pb-10 font-normal">
						<p class="mb-[20px] leading-normal">
							{{ $t('mb_introduction_content_1') }}
						</p>

						<p class="mb-[20px] leading-normal">
							{{ $t('mb_introduction_content_2') }}
						</p>

						<NuxtImg
							class="float-left w-full mb-[20px] xl:mb-0 xl:w-[60%] xl:mr-[20px]"
							src="/img/methodbank/cse_team.jpg"
							alt="cse team photo"
							format="webp"
							loading="lazy"
							sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:760px xxl:940px"
						/>

						<p class="leading-normal">
							{{ $t('mb_introduction_content_3') }}
						</p>
					</div>
				</div>
			</article>
		</section>

		<!-- Study resource -->
		<section class="relative px-5">
			<HeroStudyResource />
		</section>

		<!-- Teaching materials section -->
		<div class="container px-6 pb-[100px] flex flex-col gap-10 lg:px-0">
			<div class="container">
				<SectionHeader class="mb-8">{{ $t('our_teaching_material') }}</SectionHeader>

				<menu class="grid grid-cols-1 gap-2 md:grid-cols-3">
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
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'customer'
})

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

const router = useRouter()

const handleSearch = (value: string) => {
	if (value) {
		router.push({
			path: '/method-bank/search',
			query: { q: value }
		})
	}
}
</script>
