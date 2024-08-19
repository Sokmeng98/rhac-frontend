<template>
	<div id="map" class="relative overflow-hidden h-80 sm:h-96 -z-0">
		<ClientOnly fallback-tag="div" fallback="Loading map...">
			<LeafletMap />
		</ClientOnly>
	</div>
</template>
