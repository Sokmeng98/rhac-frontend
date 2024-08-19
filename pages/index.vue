<template>
	<Head>
		<Title>{{ $t('rhac_organization') }}</Title>
		<Meta name="description" :content="$t('about_rhac_content').slice(0, 150)"></Meta>
	</Head>

	<section class="relative bg-[#F1FFF5]">
		<HeroIntroduction />

		<section class="relative px-8">
			<HeroStudyResource />
		</section>
	</section>

	<section class="bg-primary/20">
		<EducationalArticleSection />
	</section>

	<section id="video-education" class="py-8 min-h-[30rem]">
		<SectionHeader class="my-8">{{ $t('video_education') }}</SectionHeader>
		<div class="container">
			<HeroVideoEducationContainer />
		</div>

		<div class="my-5 text-center">
			<ReadMoreButton link="/educational-video">
				{{ $t('view_all') }}
			</ReadMoreButton>
		</div>
	</section>

	<section id="home-about-us" class="px-5 pb-[50px] bg-[#E5F6EC]">
		<AboutRhacSection />
	</section>

	<section id="home-partner" class="py-[50px]">
		<SectionHeader>{{ $t('partner') }}</SectionHeader>
		<div class="container mt-7 lg:px-0">
			<PartnerCarousel />
		</div>
	</section>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'customer'
})
</script>
