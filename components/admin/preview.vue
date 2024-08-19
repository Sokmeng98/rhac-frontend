<template>
	<div v-if="isError">
		<span class="text-xl text-[#B91C1c]">Title, content and category are required</span>
	</div>

	<div v-else class="w-full bg-white lg:w-10/12">
		<div>
			<nuxt-img
				v-if="image"
				class="w-full sm:h-[300px] lg:h-[400px] object-contain bg-slate-100"
				:src="image"
				alt="career image"
				loading="lazy"
			/>
			<nuxt-img
				v-else
				class="w-full sm:h-[300px] lg:h-[400px] object-contain bg-slate-100"
				:src="useFilePath()"
				loading="lazy"
			/>
		</div>

		<div class="pt-5 mx-8 xl:mx-12 pb-14">
			<div v-if="isKhmer">
				<div v-if="titleKh">
					<h1
						class="mt-2 mb-3 text-2xl font-medium text-primary sm:text-3xl lg:text-4xl lg:font-bold"
					>
						{{ titleKh }}
					</h1>
				</div>
				<div v-else><h1 class="text-gray-300">No title in Khmer input</h1></div>
			</div>
			<div v-else>
				<div v-if="titleEn">
					<h1
						class="mt-2 mb-3 text-xl font-medium text-primary md:text-2xl xl:text-3xl lg:font-bold"
					>
						{{ titleEn }}
					</h1>
				</div>
				<div v-else><h1 class="text-gray-300">No Title in English input</h1></div>
			</div>

			<div>
				<div class="flex flex-row gap-6 mb-5">
					<div class="flex flex-row gap-2 items-center text-[#949494]">
						<icon icon="uiw:date" size="16" />
						<span class="text-xs sm:text-sm lg:text-base">
							{{ dayjs(date).format('DD/MM/YYYY') }}
						</span>
					</div>

					<div class="flex flex-row gap-2 items-center text-[#949494]">
						<icon icon="octicon:stack-24" size="18" />
						<span v-if="isKhmer" class="text-xs sm:text-sm lg:text-base">
							{{ category.kh ? category.kh : category.en }}
						</span>
						<span v-else class="text-xs sm:text-sm lg:text-base">
							{{ category.en ? category.en : category.kh }}
						</span>
					</div>

					<div class="flex flex-row gap-2 items-center text-[#949494]">
						<icon icon="akar-icons:eye" size="18" />
						<span class="text-xs sm:text-sm lg:text-base"> 0 </span>
					</div>
				</div>
			</div>

			<div class="prose" v-html="isKhmer ? contentKh : contentEn"></div>

			<div v-if="pdfs?.length">
				<div class="mt-3 bg-[#E5F6EC] p-10 rounded-xl">
					<h3 class="text-[#16005C] text-2xl font-bold text-start cursor-pointer mb-8">
						{{ isKhmer ? 'ឯកសារ PDF' : 'PDF Materials' }}
					</h3>
					<div v-for="(item, index) in pdfs" :key="`${index}`" class="mt-3">
						<div
							class="flex items-center font-medium break-all cursor-pointer hover:font-semibold w-fit"
						>
							<Icon
								icon="ant-design:file-pdf-twotone"
								size="30"
								color="#E01E24"
								class-name="mr-3"
							/>
							{{ item }}
						</div>
					</div>
				</div>
			</div>

			<div class="mt-4 italic">
				Article By: <span class="font-bold">{{ author }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

interface Props {
	language: string
	titleEn?: string
	titleKh?: string
	contentEn?: string
	contentKh?: string
	category: { en: string; kh?: string }
	image?: any
	pdfs?: string[]
	author: string
	isError: boolean
}

const { language, pdfs } = withDefaults(defineProps<Props>(), {
	author: 'RHAC',
	titleEn: '',
	titleKh: '',
	contentEn: '',
	contentKh: '',
	image: '',
	pdfs: () => []
})
const date = new Date()
const isKhmer = computed(() => language === ('kh' || 'km'))
</script>
