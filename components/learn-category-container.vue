<template>
	<div class="relative overflow-hidden bg-[#C9D8CE] py-[68px] xl:py-[50px] xl:min-h-[700px]">
		<svg
			class="absolute top-0 left-0 w-[152px] h-[152px] xl:w-[362px] xl:h-[362px]"
			width="362"
			height="364"
			viewBox="0 0 362 364"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M195.5 163.5C73.2947 194.591 4.83333 308.167 -1 363.5V0H362C351.5 75.1667 337 127.5 195.5 163.5Z"
				fill="#3DBE71"
			/>
		</svg>

		<svg
			class="absolute bottom-0 right-0 w-[106px] h-[106px] xl:w-[273px] xl:h-[273px]"
			width="273"
			height="273"
			viewBox="0 0 273 273"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M125.219 150.206C217.126 126.856 268.613 41.5571 273 3.05176e-05L273 273L-3.05176e-05 273C7.89667 216.547 18.8016 177.243 125.219 150.206Z"
				fill="#3DBE71"
			/>
		</svg>

		<NuxtImg
			class="w-[108px] -left-[10px] md:w-[500px] xl:w-[500px] absolute bottom-0 xl:-left-[40px] opacity-50"
			src="/rhac_logo.png"
			alt="rhac background logo"
			format="webp"
		/>

		<div class="container learn-category-wrapper">
			<div class="container">
				<SectionHeader class="mb-10 sm:mb-14">{{ $t('learning_categories') }}</SectionHeader>
				<slot></slot>
			</div>
		</div>
	</div>
</template>
