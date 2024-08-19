<template>
	<Head>
		<Title>RHAC Organization | Publication</Title>
		<Meta name="description" content="Publication article"></Meta>
	</Head>

	<main class="container px-6 py-10 lg:px-0">
		<div class="container">
			<div class="pb-6">
				<SectionHeader>{{ $t('publication') }}</SectionHeader>
			</div>

			<section class="mb-8">
				<ArticleList
					:is-loading-more-post="isLoadingMorePublication"
					:is-more-page-available="isMorePageAvailable"
					:load-more="loadMore"
					:pending="pending"
					:error="Boolean(error) || (publications.length === 0 && !pending)"
				>
					<li
						v-for="publication in publications"
						:key="publication.id"
						class="lg:[&:nth-child(1)]:col-span-3 lg:[&:nth-child(2)]:col-span-3 lg:col-span-2 shadow-lg rounded-lg overflow-hidden"
					>
						<PublicationCard :publication="publication" />
					</li>
				</ArticleList>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
import type { Publication } from '~/api/type'
import type { PaginationMeta } from '~/api'

definePageMeta({
	layout: 'customer'
})

const publications = ref<Publication[]>([])

const { getPublication, isLoadingMorePublication, isMorePageAvailable } = useMorePublication()

const requestParams = {
	limit: 11,
	page: 1
}

const {
	data: res,
	pending,
	error
} = useLazyFetch<{ data: Publication[]; meta: PaginationMeta }>('/publication', {
	baseURL: useBaseUrl(),
	params: requestParams,
	server: false
})

watch(res, newRes => {
	if (newRes?.data) publications.value = newRes?.data || []

	if (newRes?.meta) {
		isMorePageAvailable.value = newRes.meta.current_page < newRes.meta.last_page
		// @ts-ignore
	} else if (newRes.current_page && newRes.last_page) {
		// @ts-ignore
		isMorePageAvailable.value = newRes.current_page < newRes.last_page
	}
})

const loadMore = async () => {
	requestParams.page += 1

	const morePublications = await getPublication(requestParams)

	morePublications.length && (publications.value = publications.value.concat(morePublications))
}
</script>
