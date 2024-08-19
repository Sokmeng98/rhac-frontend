import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [Vue()],
	resolve: {
		alias: [
			{ find: '@', replacement: './' },
			{ find: '~', replacement: './' }
		]
	},

	// @ts-ignore
	test: {
		globals: true,
		environment: 'jsdom'
	}
})
