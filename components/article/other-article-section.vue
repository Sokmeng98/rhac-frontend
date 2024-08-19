<template>
	<figure v-if="posts.length" class="flex flex-col w-full gap-3">
		<figcaption>
			<ArticleSidebarHeader>{{ $t('other_articles') }}</ArticleSidebarHeader>
		</figcaption>

		<ul class="flex flex-col w-full gap-3 list-none">
			<li v-for="post in posts" :key="post.id">
				<ArticleSmallCard :article="post" :article-path-without-slug="articlePath" />
			</li>
		</ul>
	</figure>
</template>

<script setup lang="ts">
import type { Post } from '~~/api/type'
import { useOtherArticleStore } from '~~/store/customer/other-article'

const articlePath = ref('/')

const posts = ref<Post[]>([])
const { path } = useRoute()

const {
	getHealthArticles,
	getTruthStories,
	getMethodBankStudentPosts,
	getMethodBankEducatorPosts,
	getPublications
} = useOtherArticleStore()

const setPost = (data: Post[]) => {
	const filtered = data.filter(post => !path.endsWith(post.slug_en) || !path.endsWith(post.slug_kh))

	posts.value = filtered
}

if (path.includes('health-article')) {
	articlePath.value = '/health-article/'

	const data = await getHealthArticles()
	setPost(data)
} else if (path.includes('truth-story')) {
	articlePath.value = '/method-bank/truth-story/'

	const data = await getTruthStories()
	setPost(data)
} else if (path.includes('method-bank/student')) {
	articlePath.value = '/method-bank/student/'

	const data = await getMethodBankStudentPosts()
	setPost(data)
} else if (path.includes('method-bank/educator')) {
	articlePath.value = '/method-bank/educator/'

	const data = await getMethodBankEducatorPosts()
	setPost(data)
} else if (path.includes('method-bank/publication')) {
	articlePath.value = '/method-bank/publication/'

	const data = await getPublications()
	setPost(data)
}
</script>
