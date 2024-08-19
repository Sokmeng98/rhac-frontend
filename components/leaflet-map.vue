<script setup lang="ts">
import { map, tileLayer, marker, icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { branches } from '@/util/branches'
import type { Branch } from '@/util/branches'

const isDetailOpened = ref(false)
const detailsData = ref<Branch>()

const closeMarker = () => {
	isDetailOpened.value = false
}

onMounted(() => {
	if (process.client && window) {
		const LeafletMap = map('leaflet-map').setView([11.5597493, 104.8525141], 13)

		tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap',
			zIndex: -10
		}).addTo(LeafletMap)
		marker([51.5, -0.09]).addTo(LeafletMap)
		const greenIcon = icon({
			iconUrl: '/icon/pin.png',
			iconAnchor: [0, 0]
		})
		for (let index = 0; index < branches.length; index++) {
			const branch = branches[index]
			marker([branch.origin.lat, branch.origin.lng], {
				icon: greenIcon,
				interactive: true,
				alt: branch.name_kh
			})
				.addEventListener('click', () => {
					detailsData.value = branch
					isDetailOpened.value = true
				})
				.addTo(LeafletMap)
		}
	}
})
</script>

<template>
	<div id="leaflet-map" class="w-full h-full -z-0"></div>

	<div
		v-if="detailsData && isDetailOpened"
		class="absolute inset-y-0 top-0 left-0 z-10 w-full h-full"
	>
		<div class="w-full h-full bg-green-500 branch-details-wrapper">
			<BranchCard
				:google-map="detailsData.google_map"
				:name-kh="detailsData.name_kh"
				:name-en="detailsData.name_en"
				:location-kh="detailsData.location_kh"
				:location-en="detailsData.location_en"
				:origin="detailsData.origin"
				:tel="detailsData.tel"
				:image="detailsData.image"
				@close="closeMarker()"
			/>
		</div>
	</div>
</template>

<style scoped>
.branch-details-wrapper::-webkit-scrollbar {
	display: none;
}
</style>
