/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
		'./app.vue'
	],

	theme: {
		container: {
			center: true,
			padding: {
				default: '1rem',
				xs: '1rem',
				sm: '1rem',
				md: '1rem',
				lg: '1rem',
				xl: '8rem'
			},
			maxWidth: {
				'2xl': '1300px',
				xl: '1300px'
			}
		},
		extend: {
			colors: {
				footerGray: '#C0C0C0',
				'light-gray': '#949494'
			}
		}
	},
	plugins: [
		require('daisyui'),
		require('@tailwindcss/typography'),
		require('@headlessui/tailwindcss')
	],

	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#00A651',
					secondary: '#1cc98f',
					accent: '#fcc4d9',
					neutral: '#231E34',
					'base-100': '#FFFFFF',
					info: '#55AAD8',
					success: '#28C89D',
					warning: '#F5AE0A',
					error: '#F62342'
				}
			}
		]
	}
}
