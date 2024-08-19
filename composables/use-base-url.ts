export const useBaseUrl = () => {
	const runtimeConfig = useRuntimeConfig()
	return runtimeConfig.public.BASE_URL
}
