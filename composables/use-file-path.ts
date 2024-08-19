export const useFilePath = (path?: string) => {
	const runtimeConfig = useRuntimeConfig()
	const filePath = runtimeConfig.public.FILE_PATH

	return path ? filePath + path : '/img/default/no-image.svg'
}
