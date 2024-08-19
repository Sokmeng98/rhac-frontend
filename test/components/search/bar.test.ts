import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchBar from '~/components/search/bar.vue'

describe('search bar', () => {
	it.skip('is a Vue instance', () => {
		const searchBarInstance = mount(SearchBar, {
			props: {
				onSearch: () => {},
				pending: false
			}
		})

		expect(searchBarInstance.vm).toBeTruthy()
	})

	it.skip('search value equal to input', async () => {
		const searchBarInstance = mount(SearchBar, {
			props: {
				onSearch: () => {},
				pending: false
			}
		})

		const input = searchBarInstance.get('input')

		const sample = 'test'

		// @ts-ignore
		expect(searchBarInstance.vm.search).toBe('')

		await input.setValue(sample)

		// @ts-ignore
		expect(searchBarInstance.vm.search).toBe(sample)
	})

	it.skip('invokes onSearch with correct query', async () => {
		let searchQuery = ''

		const searchBarInstance = mount(SearchBar, {
			props: {
				onSearch: (query: string) => {
					searchQuery = query
				},
				pending: false
			}
		})

		const input = searchBarInstance.get('input')

		const sample = 'best article'

		await input.setValue('')

		// @ts-ignore
		expect(searchBarInstance.vm.search).toBe('')

		await input.setValue(sample)

		await searchBarInstance.get('form').trigger('submit')

		expect(searchQuery).toBe(sample)
	})

	it.skip('disables submit button when pending is true', () => {
		const searchBarInstance = mount(SearchBar, {
			props: {
				onSearch: () => {},
				pending: true
			}
		})

		const button = searchBarInstance.get('button')

		expect(button.attributes('disabled')).toBeDefined()
	})

	it.skip('enables submit button when pending is false', () => {
		const searchBarInstance = mount(SearchBar, {
			props: {
				onSearch: () => {},
				pending: false
			}
		})

		const button = searchBarInstance.get('button')

		expect(button.attributes('disabled')).toBeUndefined()
	})
})
