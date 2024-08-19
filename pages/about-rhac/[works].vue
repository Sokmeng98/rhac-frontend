<template>
	<section v-if="data?.img" class="w-full">
		<HeroImg :src="data.img" alt="rhac clinic services cover">
			<div class="container relative inset-0 top-0 flex items-center sm:absolute">
				<figcaption
					class="flex items-center w-full h-full sm:h-fit sm:rounded-lg bg-white/80 lg:bg-transparent"
				>
					<div class="w-full">
						<div
							class="w-full px-6 py-4 bg-transparent lg:w-1/2 lg:border lg:bg-white md:py-5 sm:rounded-none md:rounded-3xl"
						>
							<h1
								class="mb-2 text-lg font-semibold text-center sm:text-start sm:text-gray-700 md:text-xl lg:mb-3 lg:text-3xl"
							>
								{{
									$i18n.locale === 'km'
										? data.title_kh || data.title_en
										: data.title_en || data.title_kh
								}}
							</h1>

							<h4
								class="text-base text-gray-800 sm:text-base md:font-normal md:leading-[22px] xl:text-xl"
							>
								{{
									$i18n.locale === 'km'
										? data.content_kh || data.content_en
										: data.content_en || data.content_kh
								}}
							</h4>
						</div>
					</div>
				</figcaption>
			</div>
		</HeroImg>
	</section>

	<!-- activity -->
	<section v-if="data" id="activity" class="px-6 pb-10">
		<div class="container">
			<div class="mt-10 mb-4">
				<SectionHeader>{{ $t('activity') }}</SectionHeader>
			</div>

			<div class="text-justify text-black/60">
				<!-- First paragraph -->
				<p
					v-if="data.activity_kh_1 || data.activity_en_1"
					class="sm:text-base lg:text-xl lg:leading-relaxed"
				>
					{{
						$i18n.locale === 'km'
							? data.activity_kh_1 || data.activity_en_1
							: data.activity_en_1 || data.activity_kh_1
					}}
				</p>
				<ul v-if="data.work_type === 'right access info'">
					<li
						v-for="item in $i18n.locale === 'km' ? data.activity_kh_list : data.activity_en_list"
						:key="item"
						class="ml-14 sm:text-base lg:text-xl lg:leading-relaxed"
					>
						{{ item }}
					</li>
				</ul>
				<br v-if="data.activity_kh_1 || data.activity_en_1" />

				<!-- Second paragraph -->
				<p
					v-if="data.activity_kh_2 || data.activity_en_2"
					class="sm:text-base lg:text-xl lg:leading-relaxed"
				>
					{{
						$i18n.locale === 'km'
							? data.activity_kh_2 || data.activity_en_2
							: data.activity_en_2 || data.activity_kh_2
					}}
				</p>
				<br v-if="data.activity_kh_2 || data.activity_en_2" />

				<!-- Third paragraph -->
				<p
					v-if="data.activity_kh_3 || data.activity_en_3"
					class="sm:text-base lg:text-xl lg:leading-relaxed"
				>
					{{
						$i18n.locale === 'km'
							? data.activity_kh_3 || data.activity_en_3
							: data.activity_en_3 || data.activity_kh_3
					}}
				</p>
			</div>
		</div>

		<WorksImageCarousel :work-type="data.work_type" />
	</section>

	<OurWorkSection />

	<!-- Partner -->
	<section>
		<SectionHeader class="mt-10 mb-4">{{ $t('partner') }}</SectionHeader>

		<div class="mb-5 lg:px-0">
			<PartnerCarousel />
		</div>
	</section>
</template>

<script setup lang="ts">
import { ourWorks } from '@/util/about-rhac/our-work'
import WorksImageCarousel from '~~/components/works-image-carousel.vue'

definePageMeta({
	layout: 'customer'
})

const route = useRoute()
const slug = route.params.works as string

const links = ourWorks.map(item => item.link)
!links.includes('/about-rhac/' + slug) && navigateTo('/about-rhac')

const data = ourWorks.find(item => item.link === '/about-rhac/' + slug)
</script>
