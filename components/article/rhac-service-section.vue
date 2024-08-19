<template>
	<section class="flex flex-col w-full gap-3">
		<ArticleSidebarHeader>{{ $t('clinic_services') }}</ArticleSidebarHeader>

		<ul class="flex flex-col w-full list-none divide-y">
			<li v-for="item of services" :key="item.title_en">
				<ClinicSmallListItem
					:title-en="item.title_en"
					:title-kh="item.title_kh"
					:img="item.icon_img"
				/>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
import { services } from '@/util/clinic/service'
</script>
