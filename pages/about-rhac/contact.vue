<template>
	<Head>
		<Title>RHAC Organization | Contact</Title>
		<Meta
			name="description"
			content="ផ្ទះលេខ 5 ផ្លូវ 600 សង្កាត់បឹងកក់២ ខណ្ឌទួលគោក រាជធានីភ្នំពេញ. លេខទូរស័ព្ទ: 023 88 50 30 / 023 88 20 46. អ៊ីមែល:info@rhac.org.kh"
		></Meta>
	</Head>

	<section id="rhac-clinic-location">
		<HeroImg src="/img/contact_hero.jpg" alt="rhac clinic services cover">
			<div class="container absolute inset-0 top-0 flex items-center">
				<figcaption
					class="flex items-center w-full h-full sm:h-fit sm:rounded-lg bg-white/80 sm:bg-transparent"
				>
					<div class="w-full">
						<div
							class="w-full px-6 py-4 bg-transparent lg:w-1/2 lg:border lg:bg-white md:py-5 sm:rounded-none md:rounded-3xl"
						>
							<div class="flex flex-col gap-4 px-6 py-10 rounded-3xl sm:bg-white">
								<h2 class="lg:text-5xl">{{ $t('head_office') }}</h2>

								<!-- Home address -->
								<div class="flex">
									<div class="flex justify-center flex-shrink-0 w-12 sm:w-16 text-primary">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
											<path
												fill="currentColor"
												fill-rule="evenodd"
												d="M12 3a7 7 0 0 0-7 7c0 5.25 7 11 7 11s7-5.75 7-11a7 7 0 0 0-7-7Zm0 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
												clip-rule="evenodd"
											/>
										</svg>
									</div>

									<div>
										<p class="hidden lg:block text-primary">{{ $t('address') }}</p>
										<p>{{ $t('address_text') }}</p>
									</div>
								</div>

								<div class="flex">
									<div class="flex justify-center flex-shrink-0 w-12 sm:w-16 text-primary">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
											<path
												fill="currentColor"
												d="M2 3a1 1 0 0 1 1-1h2.15a1 1 0 0 1 .99.84l.74 4.43a1 1 0 0 1-.54 1.06l-1.55.77a11.04 11.04 0 0 0 6.1 6.1l.78-1.54a1 1 0 0 1 1.06-.54l4.43.74a1 1 0 0 1 .84.99V17a1 1 0 0 1-1 1h-2A13 13 0 0 1 2 5V3Z"
											/>
										</svg>
									</div>

									<div>
										<p class="hidden lg:block text-primary">{{ $t('phone_number') }}</p>
										<p>(+855 23) 88 50 30 / 88 20 46</p>
									</div>
								</div>

								<div class="flex">
									<div class="flex justify-center w-12 sm:w-16 text-primary">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
											<path
												fill="currentColor"
												d="M21.71 8.34v9.95A1.71 1.71 0 0 1 20 20H4a1.71 1.71 0 0 1-1.71-1.71V8.34l7.12 6.04a4 4 0 0 0 5.18 0l7.12-6.04ZM20 4a1.74 1.74 0 0 1 1.33.63 1.73 1.73 0 0 1 .38.98V6.3l-8.6 7.33a1.71 1.71 0 0 1-2.14.07l-.08-.07-8.6-7.33V5.7A1.7 1.7 0 0 1 4 4h16Z"
											/>
										</svg>
									</div>

									<div>
										<p class="hidden lg:block text-primary">{{ $t('email') }}</p>
										<p>info@rhac.org.kh</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</figcaption>
			</div>
		</HeroImg>

		<div class="mt-8">
			<SectionHeader>{{ $t('rhac_clinic_locations') }}</SectionHeader>

			<div class="mt-8">
				<BranchMap />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'customer'
})
</script>
