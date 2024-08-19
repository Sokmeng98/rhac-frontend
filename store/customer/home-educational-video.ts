import { defineStore } from 'pinia'
import { VideoEducation } from '~/api/type'

export const useHomeEducationalVideo = defineStore('home-educational-video-store', () => {
	let videos: VideoEducation[] = []

	const getVideosFromStore = () => videos
	const saveVideosIntoStore = (items: VideoEducation[]) => (videos = items)

	return { getVideosFromStore, saveVideosIntoStore }
})
