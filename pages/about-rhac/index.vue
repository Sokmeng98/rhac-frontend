<template>
	<Head>
		<Title>Rhac Organization </Title>
		<Meta name="description" :content="$t('about_rhac_content').slice(0, 150)"></Meta>
	</Head>

	<section class="w-full bg-primary/20">
		<div class="container">
			<div class="px-6 bg-black">
				<div class="flex justify-center">
					<iframe
						class="w-full rounded-md sm:w-4/5 md:w-2/3 lg:w-3/5 aspect-video"
						src="https://www.youtube.com/embed/QjwnYiETH0o"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			</div>
		</div>
	</section>

	<!-- About RHAC -->
	<section id="about-rhac" class="px-6 pb-10">
		<div class="container mt-10">
			<SectionHeader>{{ $t('about_rhac') }}</SectionHeader>

			<p class="mt-5 text-lg text-justify sm:leading-normal text-black/60 sm:text-xl">
				{{ $t('about_rhac_content') }}
			</p>

			<ul class="mt-4 ml-10 text-lg leading-normal sm:leading-loose text-black/60 sm:text-xl">
				<li class="flex items-center gap-2">
					<IconsPhone /> {{ $t('phone') + `${locale === 'en' ? ':' : '៖'}` }}
					<NuxtLink
						aria-label="call to +85510812812"
						to="tel:+85510812812"
						class="hover:text-primary hover:underline"
						>010 812 812</NuxtLink
					>
					|
					<NuxtLink
						aria-label="call to +85589333990"
						to="tel:+85589333990"
						class="hover:text-primary hover:underline"
						>089 333 990</NuxtLink
					>
					|
					<NuxtLink
						aria-label="call to +855887107107"
						to="tel:+855887107107"
						class="hover:text-primary hover:underline"
						>088 7 107 107</NuxtLink
					>
				</li>
				<li class="flex items-center gap-2">
					<IconsMail /> {{ $t('email') + `${locale === 'en' ? ':' : '៖'}` }}
					<NuxtLink
						to="mailto:info@rhac.org.kh"
						class="rounded-md hover:text-primary hover:underline focus:underline lg:gap-3 focus:outline-none focus-visible:ring-2 ring-0 ring-yellow-400 focus-visible:ring-offset-2 ring-offset-0 ring-offset-black"
					>
						info@rhac.org.kh
					</NuxtLink>
				</li>
				<li class="flex items-center gap-2">
					<IconsWebsite /> {{ $t('website') + `${locale === 'en' ? ':' : '៖'}` }}
					<NuxtLink to="https://rhac.org.kh/" class="hover:text-primary hover:underline">
						www.rhac.org.kh
					</NuxtLink>
				</li>
				<li class="flex items-center gap-2">
					<IconsFacebook /> {{ $t('facebook') + `${locale === 'en' ? ':' : '៖'}` }}
					<NuxtLink
						to="https://www.facebook.com/rhacpage/"
						class="hover:text-primary hover:underline"
						target="_blank"
					>
						RHAC Social Page
					</NuxtLink>
				</li>
				<li class="flex items-center gap-2">
					<IconsYoutube /> {{ $t('youtube') + `${locale === 'en' ? ':' : '៖'}` }}
					<NuxtLink
						to="https://www.youtube.com/channel/UCYJ1kEFvU2fFNUhiCGog_Ag"
						class="hover:text-primary hover:underline"
						target="_blank"
					>
						RHAC រ៉ាក់
					</NuxtLink>
				</li>
			</ul>
		</div>
	</section>

	<OurWorkSection />

	<OurTeamSection />

	<!-- Partner -->
	<section id="partner" class="py-[30px] lg:py-[68px] pt-[20px] px-5 lg:pt-[50px]">
		<SectionHeader>{{ $t('partner') }}</SectionHeader>

		<div class="container mt-9 lg:px-0">
			<PartnerCarousel />
		</div>
	</section>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'customer'
})

const { locale } = useI18n()
</script>
