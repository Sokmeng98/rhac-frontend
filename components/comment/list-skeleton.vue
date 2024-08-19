<template>
	<ul class="list-none divide-y divide-black/30">
		<li v-for="n in 2" :key="n" class="w-full h-auto py-1 my-1">
			<div class="flex items-center justify-start w-full h-12 rounded-full">
				<div class="flex items-center justify-center w-12 h-12">
					<div class="w-6 h-6 bg-gray-500 rounded-full"></div>
				</div>

				<p class="h-4 text-gray-400 bg-gray-500 rounded-md w-28"></p>
			</div>

			<div class="pl-12">
				<p class="h-4 bg-gray-500 rounded-md"></p>
			</div>
		</li>
	</ul>
</template>
