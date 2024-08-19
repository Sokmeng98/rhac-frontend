export type Contact = {
	id: number
	name: string
	localeName: string
	number: string
	link: string
}

export const contacts: Contact[] = [
	{
		id: 1,
		localeName: 'administrator',
		name: 'Administrator',
		number: '010 812 812',
		link: 'tel:+88510812812'
	},
	{
		id: 2,
		localeName: 'operation',
		name: 'Operation',
		number: '089 333 990',
		link: 'tel:+88589333990'
	},
	{
		id: 3,
		localeName: 'head_office',
		name: 'Head Office',
		number: '088 7 107 107',
		link: 'tel:+885887107107'
	}
]
