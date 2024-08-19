<template>
	<Head>
		<Meta name="csrf_token" content="{{ csrf_token() }}"></Meta>
	</Head>

	<NuxtLoadingIndicator />

	<div class="relative h-screen">
		<div
			class="bg-[#ECF5FF] absolute md:relative top-0 flex items-center justify-center h-full float-left -z-50 w-full md:w-1/2"
		>
			<div class="m-3">
				<img class="mx-auto" src="@/assets/rhacLogo1.png" alt="rhac" />
				<div class="mt-7 text-3xl font-bold text-center text-[rgb(34,40,74)]">
					Welcome to RHAC Admin
				</div>
				<div class="mt-4 text-center text-[rgb(148,148,148)]">
					Please login to manage the data and information
				</div>

				<img class="mx-auto mt-4 opacity-10 md:opacity-100" src="@/assets/group1.png" alt="group" />
			</div>
		</div>

		<div class="flex items-center justify-center float-left w-full h-full md:w-1/2">
			<slot></slot>
		</div>
	</div>
</template>
