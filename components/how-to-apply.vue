<template>
	<section class="my-5">
		<div class="text-center bg-[#E5F6EC] p-5 lg:p-10 rounded-md lg:rounded-xl">
			<h3 class="text-[#00A241] text-[24px] font-bold text-center mb-[5px] lg:mb-5">
				{{ $t('how_to_apply') }}
			</h3>

			<p class="text-[15px] text-center mt-2 leading-5 font-medium lg:leading-7">
				{{ $t('apply_text_01') }}
				<a class="text-[#08A141]" href="mailto:admin@rhac.org.kh"> admin@rhac.org.kh </a>
				{{ $t('apply_text_02') }}
			</p>

			<p class="text-[15px] text-center mt-2 leading-5 font-medium lg:leading-7">
				{{ $t('apply_text_03') }}
				<a class="text-[#08A141]" href="tel:012235712">012 235 712</a>
			</p>

			<div class="flex justify-center mt-5 lg:mt-[30px]">
				<nuxt-link
					to="mailto:admin@rhac.org.kh"
					class="flex items-center justify-center no-underline capitalize read-more btn btn-primary"
				>
					<div class="flex mr-[5px] text-[16px]">
						{{ $t('apply_now') }}
					</div>
				</nuxt-link>
			</div>
		</div>
	</section>
</template>
