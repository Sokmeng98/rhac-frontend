<template>
	<Head>
		<Title>Rhac Organization | Clinic</Title>
		<Meta name="description" :content="$t('about_rhac_clinic_content_1')"></Meta>
	</Head>

	<HeroImg src="/img/clinic_service_hero.jpg" alt="rhac clinic services cover"> </HeroImg>

	<!-- About RHAC Clinic -->
	<section id="about-rhac" class="px-6 pb-10">
		<div class="container mt-10">
			<SectionHeader>{{ $t('about_rhac_clinic') }}</SectionHeader>

			<p class="mt-5 text-lg text-justify text-black/60 sm:text-xl">
				{{ $t('about_rhac_clinic_content_1') }} <br /><br />
				{{ $t('about_rhac_clinic_content_2') }} <br /><br />
				{{ $t('about_rhac_clinic_content_3') }}
			</p>
		</div>
	</section>

	<section id="services" class="bg-[#E5F6EC]/50 py-[30px] md:py-[68px]">
		<div class="container px-6 lg:px-0">
			<div class="container">
				<SectionHeader>{{ $t('clinic_services') }}</SectionHeader>

				<div class="grid gap-4 mt-6 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-7">
					<template v-for="(item, index) in services" :key="index">
						<div class="flex items-center gap-4 p-4 bg-white shadow-sm rounded-xl">
							<NuxtImg class="w-9" :src="item.icon_img" alt="icon" />

							<span class="text-[#022A5D] font-semibold">
								{{ $i18n.locale === 'km' ? item.title_kh : item.title_en }}
							</span>
						</div>
					</template>
				</div>
			</div>
		</div>
	</section>

	<RhacBranchSection />

	<section id="faq" class="container px-6 py-[30px] lg:py-[68px] lg:px-0">
		<SectionHeader class="py-2">{{ $t('faq') }}</SectionHeader>

		<ClinicServiceFaq />
	</section>
</template>

<script setup lang="ts">
import { services } from '@/util/clinic/service'
definePageMeta({
	layout: 'customer'
})
</script>
