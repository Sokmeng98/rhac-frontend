<template>
	<div class="flex items-center w-auto gap-1 lg:w-5/12 xl:w-auto">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			class="hidden sm:block"
		>
			<path
				fill="currentColor"
				fill-rule="evenodd"
				d="M12 3a7 7 0 0 0-7 7c0 5.25 7 11 7 11s7-5.75 7-11a7 7 0 0 0-7-7Zm0 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
				clip-rule="evenodd"
			/>
		</svg>

		<NuxtLink
			to="https://goo.gl/maps/XW42pSsQ2uTy7C266"
			class="text-sm rounded-md lg:text-base hover:text-primary hover:underline focus:underline lg:gap-3 focus:outline-none focus-visible:ring-2 ring-0 ring-yellow-400 focus-visible:ring-offset-2 ring-offset-0 ring-offset-black"
			>{{ $t('address_text') }}</NuxtLink
		>
	</div>

	<div class="flex items-center flex-shrink-0 gap-2 text-sm lg:text-base 2xl:text-lg">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="none"
			class="hidden scale-110 sm:block"
		>
			<path
				fill="currentColor"
				d="M2 3a1 1 0 0 1 1-1h2.15a1 1 0 0 1 .99.84l.74 4.43a1 1 0 0 1-.54 1.06l-1.55.77a11.04 11.04 0 0 0 6.1 6.1l.78-1.54a1 1 0 0 1 1.06-.54l4.43.74a1 1 0 0 1 .84.99V17a1 1 0 0 1-1 1h-2A13 13 0 0 1 2 5V3Z"
			/>
		</svg>

		<span>(+855 23)</span>
		<NuxtLink
			aria-label="call to +85523885030"
			to="tel:+85523885030"
			class="rounded-md hover:text-primary hover:underline focus:underline lg:gap-3 focus:outline-none focus-visible:ring-2 ring-0 ring-yellow-400 focus-visible:ring-offset-2 ring-offset-0 ring-offset-black"
		>
			88 50 30
		</NuxtLink>

		<span>/</span>

		<NuxtLink
			aria-label="call to +85523882046"
			to="tel:+85523882046"
			class="rounded-md hover:text-primary hover:underline focus:underline lg:gap-3 focus:outline-none focus-visible:ring-2 ring-0 ring-yellow-400 focus-visible:ring-offset-2 ring-offset-0 ring-offset-black"
		>
			88 20 46
		</NuxtLink>
	</div>

	<div class="flex items-center gap-1 text-sm lg:text-base 2xl:text-lg">
		<div class="flex-shrink-0 hidden sm:flex w-[1.625rem] h-[1.625rem] items-center justify-center">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
				<path
					fill="currentColor"
					d="M21.71 8.34v9.95A1.71 1.71 0 0 1 20 20H4a1.71 1.71 0 0 1-1.71-1.71V8.34l7.12 6.04a4 4 0 0 0 5.18 0l7.12-6.04ZM20 4a1.74 1.74 0 0 1 1.33.63 1.73 1.73 0 0 1 .38.98V6.3l-8.6 7.33a1.71 1.71 0 0 1-2.14.07l-.08-.07-8.6-7.33V5.7A1.7 1.7 0 0 1 4 4h16Z"
				/>
			</svg>
		</div>

		<NuxtLink
			to="mailto:info@rhac.org.kh"
			class="rounded-md hover:text-primary hover:underline focus:underline lg:gap-3 focus:outline-none focus-visible:ring-2 ring-0 ring-yellow-400 focus-visible:ring-offset-2 ring-offset-0 ring-offset-black"
		>
			info@rhac.org.kh
		</NuxtLink>
	</div>
</template>
