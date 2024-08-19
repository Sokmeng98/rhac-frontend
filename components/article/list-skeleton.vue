<template>
	<section>
		<!-- Display all posts. Before large screen. -->
		<ul class="grid grid-cols-1 gap-4 list-none lg:hidden sm:grid-cols-2">
			<li v-for="n in 11" :key="n">
				<ArticleLargeCardSkeleton />
			</li>
		</ul>

		<!-- After large screen. -->
		<section class="hidden gap-4 lg:flex lg:flex-col">
			<!-- Frist two -->
			<ul class="grid grid-cols-2 gap-4 list-none">
				<li v-for="n in 2" :key="n">
					<ArticleLargeCardSkeleton />
				</li>
			</ul>

			<!-- Without first two -->
			<ul class="grid gap-4 list-none lg:grid-cols-3">
				<li v-for="n in 9" :key="n">
					<ArticleLargeCardSkeleton />
				</li>
			</ul>
		</section>
	</section>
</template>
