import dayjs, { extend } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import 'dayjs/locale/km'

export default defineNuxtPlugin(nuxtApp => {
	extend(relativeTime)
	nuxtApp.provide('dayjs', dayjs)
})
declare module '#app' {
	interface NuxtApp {
		$dayjs: dayjs.Dayjs
	}
}
