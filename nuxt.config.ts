import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	nitro: {
		compressPublicAssets: true,
		minify: true
	},

	routeRules: {
		// '/admin/article/**': { ssr: false }
	},

	css: ['@/assets/css/tailwind.css'],

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	},

	vite: {
		optimizeDeps: {
			include: []
		}
	},

	imports: {
		dirs: ['store/*']
	},

	// env
	runtimeConfig: {
		API_KEY: process.env.API_KEY || '',
		public: {
			BASE_URL: process.env.BASE_URL || '',
			GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
			CONTACT_US_SUBJECT: process.env.CONTACT_US_SUBJECT || '',
			FILE_PATH: process.env.FILE_PATH || '',
			FACEBOOK_PAGE: process.env.FACEBOOK_PAGE || '',
			FACEBOOK_MESSAGE: process.env.FACEBOOK_MESSAGE || '',
			YOUTUBE_CHANNEL: process.env.YOUTUBE_CHANNEL || '',
			TELEGRAM_CONTACT: process.env.TELEGRAM_CONTACT || '',
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.rhac.org.kh/'
		}
	},

	modules: [
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@nuxtjs/google-fonts',
		'nuxt-schema-org',
		'nuxt-gtag',
		'nuxt-delay-hydration',
		'@nuxt/image'
	],

	delayHydration: {
		mode: 'mount'
	},

	gtag: {
		id: process.env.NUXT_PUBLIC_GTAG_ID || ''
	},

	image: {
		// The screen sizes predefined by `@nuxt/image`:
		screens: {
			xs: 320,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			xxl: 1536
		}
	},

	googleFonts: {
		// This option prevents files from being downloaded more than once.
		overwriting: true,
		families: {
			Poppins: {
				wght: [400, 500, 600]
			},
			Nunito: {
				wght: [300, 400, 500]
			},
			Moul: true
		}
	},

	i18n: {
		langDir: 'locales',
		locales: [
			{
				code: 'km',
				iso: 'km-KH',
				name: 'ខ្មែរ',
				file: 'km.json'
			},
			{
				code: 'en',
				iso: 'en-US',
				name: 'English',
				file: 'en.json'
			}
		],

		defaultLocale: 'km',

		strategy: 'no_prefix',
		detectBrowserLanguage: false
	},

	// App head meta
	app: {
		head: {
			title: 'Rhac Organization',
			meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
			script: [
				// { src: "..." }
			],
			link: [{ rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }],
			style: [
				{
					children: ':root { font-family: Poppins, sans-serif,"Noto Sans Khmer", cursive; }'
					// type: 'text/css'
				}
			]
		}
	}
})
