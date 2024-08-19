<template>
	<div
		v-for="(faq, index) in faqs.slice(0, 5)"
		:key="index"
		:tabindex="index"
		class="bg-white border-b-2 border-gray-100 rounded-none collapse collapse-plus"
	>
		<input type="checkbox" class="peer" />

		<div
			class="text-sm collapse-title md:text-base lg:text-lg"
			v-html="faq.question_en ? faq.question_en : faq.question_kh"
		></div>

		<div
			class="text-sm collapse-content md:text-base lg:text-lg"
			v-html="faq.answer_en ? faq.answer_en : faq.answer_kh"
		></div>
	</div>
</template>
<script setup lang="ts">
import type { Faq } from '~~/api'

const faqs = ref<Faq[]>([])

const { faqState, getFaqs } = useFaqStore()

await getFaqs({ page: 1, limit: 5 })

// Regular expression pattern to match the list format with various prefixes
const listPattern = /(^|<p>)(\d+\..*?|\d+_.+?|\d+\).+?|-.+?|\+.+?)(<\/p>|$)/

// Format string data to HTML string format
const formatAnswer = (answer: string): string => {
	const lines = answer.split('\n')

	const formattedLines = lines.map((line, index) => {
		// Check of answer is in the list format
		if (listPattern.test(line)) {
			if (index === 0) return line
			else return line ? `<p class="ml-8 text-sm md:text-base lg:text-lg">${line}</p>` : ''
		} else {
			return line ? `<p class="text-sm md:text-base lg:text-lg">${line}</p>` : ''
		}
	})

	const formattedAnswer = formattedLines.join('')

	return formattedAnswer
}

faqs.value = faqState.data

faqs.value.forEach(obj => {
	const formattedAnswerEn = obj.answer_en ? formatAnswer(obj.answer_en) : ''
	const formattedAnswerKh = obj.answer_kh ? formatAnswer(obj.answer_kh) : ''

	if (obj.answer_en) obj.answer_en = formattedAnswerEn
	if (obj.answer_kh) obj.answer_kh = formattedAnswerKh
})
</script>
