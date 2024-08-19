import type { Post } from '~~/api/type'

export const useBlogPostSchemaOrg = (post?: Post) => {
	useSchemaOrg([
		defineArticle({
			'@type': 'NewsArticle',
			headline: post?.title_kh || post?.title_en,
			author: [
				{
					name: post?.author || 'RHAC',
					url: 'https://www.rhac.org.kh/'
				}
			],
			image: post?.image,
			datePublished: post?.created_at,
			dateModified: post?.updated_at
		})
	])
}
