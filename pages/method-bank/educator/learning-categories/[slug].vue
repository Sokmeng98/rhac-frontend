<template>
	<Head>
		<Title>RHAC Organization | Publication</Title>
		<Meta name="description" content="Publication article"></Meta>
	</Head>

	<main class="container px-6 py-10 lg:px-0">
		<div class="container">
			<div class="pb-6">
				<SectionHeader>{{ $t('learning_categories') }}</SectionHeader>
				<h3 class="mt-3 text-center text-black/60">{{ subHeading }}</h3>
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

const {
	params: { slug }
} = useRoute()

let type = ''
const items = [
	{
		title: 'Glossary of CSE Terms and Conditions',
		url: 'Glossary of CSE'
	},
	{
		title: 'List of IEC materials on CSE (national and international)',
		url: 'List of IEC Materials on CSE'
	},
	{
		title: 'List of additional resources for teachers and educators',
		url: 'List of Additional Resources for Teachers'
	},
	{
		title:
			'International Agreements, Instruments and Standards related to Comprehensive Sexuality Education (CSE)',
		url: 'Comprehensive Sexuality Education (CSE)'
	}
]

if (typeof slug === 'string') type = slug.replace(/-/g, ' ')

const foundObj = items.find(item => item.url === type)

const subHeading = foundObj ? foundObj.title : ''

const { getLearningCategory, isLoadingMorePublication, isMorePageAvailable } =
	useMoreLearningCategory()

const requestParams = {
	type,
	limit: 11,
	page: 1
}

const {
	data: res,
	pending,
	error
} = useLazyFetch<{ data: Publication[]; meta: PaginationMeta }>(
	`/mb_professional_learning?type=${type}`,
	{
		baseURL: useBaseUrl(),
		params: requestParams,
		server: false
	}
)

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

	const morePublications = await getLearningCategory(requestParams)

	morePublications.length && (publications.value = publications.value.concat(morePublications))
}
</script>
