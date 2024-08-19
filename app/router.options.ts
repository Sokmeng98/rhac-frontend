import type { RouterConfig } from '@nuxt/schema'
export default <RouterConfig>{
	// reference: https://dev.to/dimer191996/nuxt-js-smooth-scrolling-with-hash-links-94a
	scrollBehavior: async (to, _, savedPosition) => {
		if (savedPosition) {
			return savedPosition
		}

		const findEl = (hash: string, x: number) => {
			return (
				document.querySelector(hash) ||
				new Promise(resolve => {
					if (x > 50) {
						resolve('')
					}
					setTimeout(() => {
						resolve(findEl(hash, ++x || 1))
					}, 100)
				})
			)
		}

		if (to.hash) {
			// @ts-ignore
			const el = await findEl(to.hash)
			if ('scrollBehavior' in document.documentElement.style) {
				// @ts-ignore
				return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
			} else {
				// @ts-ignore
				return window.scrollTo(0, el.offsetTop)
			}
		}

		return { top: 0 }
	}
}
