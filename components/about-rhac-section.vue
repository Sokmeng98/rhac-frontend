<template>
	<div class="container">
		<div class="pt-10 pb-8">
			<SectionHeader>{{ $t('about_rhac') }}</SectionHeader>
		</div>

		<div class="relative grid gap-5 overflow-hidden sm:gap-8 lg:gap-10 xl:gap-20 lg:grid-cols-2">
			<div
				class="flex flex-col justify-between flex-1 order-2 gap-4 p-2 sm:gap-6 lg:gap-0 content lg:order-1"
			>
				<p
					class="text-xl md:text-2xl text-justify lg:text-left lg:text-xl line-clamp-6 2xl:line-clamp-[7]"
					:class="$i18n.locale == 'km' ? 'lg:leading-normal' : ''"
				>
					{{ $t('about_rhac_content') }}
				</p>

				<ReadMoreButton link="/about-rhac" class="w-fit">{{ $t('read_more') }}</ReadMoreButton>
			</div>

			<div class="order-1 w-full z-[1] lg:order-2">
				<iframe
					class="w-full overflow-hidden rounded-md aspect-video"
					src="https://www.youtube.com/embed/QjwnYiETH0o"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</div>

			<div class="absolute -bottom-20 right-0 scale-[2] overflow-hidden">
				<NuxtImg
					loading="lazy"
					src="/rhac_logo.png"
					format="webp"
					class="opacity-5"
					alt="RHAC logo"
				/>
			</div>
		</div>
	</div>
</template>
