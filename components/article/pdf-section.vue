<template>
	<section class="w-full p-4 rounded-md bg-primary/10">
		<ul class="space-y-3">
			<li v-for="pdfLink in pdfs" :key="pdfLink">
				<NuxtLink
					:to="useFilePath(pdfLink)"
					target="_blank"
					class="flex items-center gap-2 underline text-primary sm:text-current sm:hover:text-primary line-clamp-2"
				>
					<svg width="24" height="24" fill="none">
						<path
							fill="currentColor"
							d="M18 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7a.105.105 0 0 1 .027 0h.006a.15.15 0 0 0 .029.006c.088.006.175.023.259.051H13.363a.421.421 0 0 1 .052.043.988.988 0 0 1 .293.2l6 6a.987.987 0 0 1 .2.293.735.735 0 0 1 .023.066l.01.028c.028.083.044.17.049.258a.1.1 0 0 0 .007.029v.006A.112.112 0 0 1 20 9v11a2 2 0 0 1-2 2Zm-3.576-8v5h.94v-2.04h1.46v-.838h-1.46v-1.281H17V14h-2.576Zm-3.7 0v5h1.206c.506.025.996-.181 1.332-.56a2.3 2.3 0 0 0 .486-1.549v-.81a2.288 2.288 0 0 0-.5-1.526c-.325-.37-.8-.574-1.293-.555h-1.231ZM7 14v5h.94v-1.759h.626c.418.023.826-.132 1.124-.426.284-.318.431-.734.41-1.16a1.725 1.725 0 0 0-.412-1.194A1.4 1.4 0 0 0 8.585 14H7Zm6-10v5h5l-5-5Zm-1.054 14.162h-.282v-3.321h.342a.716.716 0 0 1 .62.292c.147.303.21.64.182.976v.869c.022.32-.047.64-.2.921a.765.765 0 0 1-.662.263ZM8.585 16.4h-.646v-1.559h.655a.475.475 0 0 1 .4.227c.108.179.16.386.15.594a.89.89 0 0 1-.147.55.5.5 0 0 1-.412.188Z"
						/>
					</svg>
					{{ pdfLink.split('/').pop() }}
				</NuxtLink>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
const { pdf } = defineProps<{
	pdf: string | string[]
}>()

const pdfs = computed(() => {
	if (typeof pdf === 'string') {
		return [pdf]
	}

	return pdf
})
</script>
