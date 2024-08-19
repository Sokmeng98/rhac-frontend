<template>
	<Html :lang="$i18n.locale"></Html>

	<div id="customer-main" class="relative w-full">
		<NuxtLoadingIndicator color="yellow" />

		<a
			href="#main-content"
			class="fixed z-50 underline outline-none opacity-0 pointer-events-none left-1 top-1 focus-visible:opacity-100 print:hidden ring-yellow-400 ring-2"
		>
			<p class="flex items-center h-12 px-2 text-lg text-center text-white bg-yellow-600 w-fit">
				{{ $t('skip_navigation_menu') }}
			</p>
		</a>

		<nav class="fixed top-0 z-10 w-full print:hidden">
			<CustomerHeader />
		</nav>

		<main id="main-content" class="relative min-h-[500px] pt-[calc(5rem-10px)] lg:pt-32 print:pt-0">
			<slot></slot>
		</main>

		<CustomerFooter />

		<ScrollToTopButton />

		<MessengerContainer />
	</div>
</template>

<script setup lang="ts">
useSchemaOrg([
	defineWebSite({
		name: 'RHAC Organization',
		potentialAction: [
			defineSearchAction({
				target: '/search?q={search_term_string}'
			}),

			defineSearchAction({
				target: '/method-bank/search?q={search_term_string}'
			})
		]
	}),
	defineOrganization({
		name: 'RHAC',
		logo: '/favicon.ico',
		sameAs: ['https://www.facebook.com/rhacpage']
	})
])
</script>
