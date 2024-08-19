export const clickHTMLElement = (id: string) => {
	const element = document.getElementById(id)

	element?.click()
}
