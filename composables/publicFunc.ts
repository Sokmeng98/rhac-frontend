export const getImageUrl = (path: string) => {
	if (!path) return `/img/default/no-image.svg`
	const config = useRuntimeConfig()
	const filePath = config.public.FILE_PATH
	return `${filePath}${path}`
}

export const getPdfUrl = (path: string) => {
	const config = useRuntimeConfig()
	const filePath = config.public.FILE_PATH
	return `${filePath}${path}`
}

export const formatePostRes = (res: any) => {
	return res.map((item: any) => ({
		...item,
		thumbnail: getImageUrl(item.image),
		image: getImageUrl(item.img),
		category_kh: item.post__categories?.name,
		category_en: item.post__categories?.name_en,
		categorySlug_kh: item.post__categories?.slug_kh,
		categorySlug_en: item.post__categories?.slug_en,
		tags: item.tags || [],
		published_at: item.updated_at
	}))
}

export const formatePostMbRes = (res: any) => {
	return res.map((item: any) => ({
		...item,
		thumbnail: getImageUrl(item.image),
		image: getImageUrl(item.img),
		pdf: getPdfUrl(item.pdf),
		tags: item.tags || [],
		published_at: item.updated_at
	}))
}
