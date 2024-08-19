import { mount } from '@vue/test-utils'
import { setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'
import MethodBankTopicCard from '~/components/method-bank/topic-card.vue'

describe.skip('method bank topic card', async () => {
	await setup()

	it('is a Vue instance', () => {
		const cardInstance = mount(MethodBankTopicCard, {
			props: {
				category: {
					id: 3,
					count: 3,
					created_at: '2023-03-29T07:54:41.000000Z',
					deleted_at: '2023-03-29T07:54:41.000000Z',
					img: 'https://picsum.photos/200/300',
					m_b__subcategories: [],
					name: 'សុខភាព',
					name_en: 'Health',
					slug_en: 'health',
					slug_kh: 'slug kh',
					updated_at: '2023-05-29T02:01:14.000000Z'
				}
			}
		})

		expect(cardInstance.vm).toBeTruthy()
	})
})
