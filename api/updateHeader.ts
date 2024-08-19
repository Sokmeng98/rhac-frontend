import axios from 'axios'
import cookie from 'js-cookie'

export function updateHeaderToken() {
	const token = cookie.get('t')
	if (token) {
		axios.defaults.headers.common.Authorization = 'Bearer ' + token
	}
}
