import axios from 'axios'

export const instanceBasic = () => {
	const config = useRuntimeConfig()
	const BASE_URL = config.public.BASE_URL
	return axios.create({
		baseURL: BASE_URL,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		responseType: 'json'
	})
}

export const instance = () => {
	const config = useRuntimeConfig()

	const BASE_URL = config.public.BASE_URL
	const token = useCookie('t')
	const instance = axios.create({
		baseURL: BASE_URL,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	})

	instance.interceptors.request.use(
		config => {
			if (token.value) {
				config.headers.Authorization = `Bearer ${token.value}`
			}
			return config
		},
		err => {
			return Promise.reject(err)
		}
	)

	instance.interceptors.response.use(
		response => {
			return response
		},
		err => {
			return Promise.reject(err)
		}
	)

	return instance
}
