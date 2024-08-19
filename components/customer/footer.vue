<template>
	<footer id="footer" class="w-full text-sm bg-black">
		<div class="container flex flex-col gap-6 px-6 py-8 text-white lg:px-0 xl:flex-row xl:gap-10">
			<div class="container flex flex-col xl:flex-row">
				<div class="flex flex-col xl:min-w-[350px] flex-1 xl:pr-3 pb-4 xl:pb-0">
					<LogoSmallWithText />

					<p
						class="leading-normal text-[#c0c0c0] text-lg line-clamp-6 w-full pt-2 xl:line-clamp-[9]"
					>
						{{ $t('about_rhac_content') }}
					</p>

					<NuxtLink
						to="/about-rhac"
						aria-label="Read more about RHAC by go to about RHAC page."
						class="text-lg text-gray-100 underline rounded-md cursor-pointer lg:gap-3 hover:underline focus:underline focus:outline-none focus-visible:ring-2 ring-0 ring-yellow-400 focus-visible:ring-offset-2 ring-offset-0 ring-offset-black"
						rel="noopener noreferrer nofollow"
					>
						{{ $t('read_more') }}
					</NuxtLink>
				</div>

				<div class="grid gap-5 lg:grid-cols-2">
					<div class="xl:max-w-[424px]">
						<h3 class="mb-3 text-2xl lg:mb-7">
							{{ $t('popular_news') }}
						</h3>

						<FooterPopularEventsContainer />
					</div>

					<div class="grid gap-5 sm:grid-cols-2 lg:gap-14 xl:gap-5">
						<div class="">
							<h3 class="mb-3 text-2xl lg:mb-7">
								{{ $t('our_work') }}
							</h3>

							<FooterOurWork />
						</div>

						<div class="">
							<h3 class="mb-3 text-2xl lg:mb-7">
								{{ $t('quick_links') }}
							</h3>

							<FooterImportantPages />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="container px-6 pb-8 lg:px-0">
			<div class="container">
				<p class="my-1 text-xl leading-normal text-white xl:text-2xl">{{ $t('follow_us') }}</p>

				<div class="flex flex-col justify-between lg:gap-2 2xl:gap-6 lg:flex-row">
					<RhacSocial />

					<div class="flex flex-col justify-end gap-4 text-xs lg:flex-row text-footerGray">
						<FooterAddress />
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>
