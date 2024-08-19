export const formatForUser = (date: Date) => {
	const day = String(date.getDate()).padStart(2, '0')
	const monthAbbreviations = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	]
	const monthAbbreviation = monthAbbreviations[date.getMonth()]
	const year = date.getFullYear()

	return `${day} ${monthAbbreviation}, ${year}`
}

export const formatForBackend = (date: Date) => {
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
