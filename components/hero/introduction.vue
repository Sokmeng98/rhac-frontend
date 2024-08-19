<template>
	<div class="px-8">
		<div class="container flex flex-col pt-20 pb-2 sm:pb-10 gap-14 lg:flex-row">
			<div class="relative w-full lg:w-1/2 aspect-video">
				<div
					class="w-60 h-40 bg-[#7BF7AD] rounded-md absolute -bottom-4 -right-4 lg:bottom-4 xl:bottom-[14px]"
				></div>
				<HeroSquareDot class="absolute top-0 left-0" />

				<div class="absolute inset-0">
					<div class="relative flex w-full h-full lg:h-[89%] xl:h-[91.5%]">
						<HeroSwiper />
					</div>
				</div>
			</div>

			<section class="w-full lg:w-1/2">
				<div class="flex flex-col justify-between h-full gap-5 xl:gap-7">
					<div class="flex items-center gap-4">
						<h1
							class="flex items-center justify-center w-32 text-3xl text-white uppercase rounded-full sm:w-32 2xl:text-5xl 2xl:w-44 bg-primary aspect-square"
							:class="
								locale === 'km' ? `font-['Moul',cursive]` : `font-['Poppins',cursive] font-semibold`
							"
						>
							{{ $t('rhac') }}
						</h1>

						<p
							class="flex items-center justify-center h-full text-3xl 2xl:text-5xl text-primary"
							:class="
								locale === 'km' ? `font-['Moul',cursive]` : `font-['Poppins',cursive] font-semibold`
							"
						>
							{{ $t('welcome_you') }}
						</p>
					</div>

					<HeroContactButtons />
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
</script>
