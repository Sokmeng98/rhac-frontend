<template>
	<table class="w-full space-y-1 overflow-hidden rounded-t-lg animate-pulse">
		<thead class="w-full h-12">
			<tr class="w-full h-full bg-black/40">
				<td class="w-full h-full bg-black/20"></td>
			</tr>
		</thead>

		<tbody class="border">
			<tr v-for="n in 10" :key="n" class="flex items-center w-full h-12 px-4 border">
				<td class="w-32 h-4"></td>
			</tr>
		</tbody>
	</table>
</template>
