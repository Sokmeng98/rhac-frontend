export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'km',

	langDir: 'locales',
	defaultLocale: 'km',
	locales: [
		{
			code: 'en',
			iso: 'en-US',
			name: 'English',
			file: 'en.json'
		},
		{
			// Make sure that default locale is the last one!
			code: 'km',
			iso: 'km-KH',
			name: 'ខ្មែរ',
			file: 'km.json'
		}
	],

	strategy: 'no_prefix',
	// dynamicRouteParams: true,
	detectBrowserLanguage: {
		useCookie: true
	}
}))
