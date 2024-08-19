<template>
	<div class="container">
		<div
			v-for="(faq, index) in faqs"
			:key="index"
			tabindex="0"
			class="bg-white border-b-2 border-gray-100 rounded-none collapse collapse-plus"
		>
			<input type="checkbox" class="peer" />

			<div
				class="font-medium collapse-title md:text-lg"
				v-html="
					$i18n.locale === 'km'
						? faq.question_kh
							? faq.question_kh
							: faq.question_en
						: faq.question_en
						  ? faq.question_en
						  : faq.question_kh
				"
			></div>
			<div class="collapse-content text-[#949494] font-normal">
				<div
					v-html="
						$i18n.locale === 'km'
							? faq.answer_kh
								? faq.answer_kh
								: faq.answer_en
							: faq.answer_en
							  ? faq.answer_en
							  : faq.answer_kh
					"
				></div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import type { Faq } from '~~/api'

const faqs = ref<Faq[]>([])

const { faqState, getFaqs } = useFaqStore()

await getFaqs({ page: 1 })

// Regular expression pattern to match the list format with various prefixes
const listPattern = /(^|<p>)(\d+\..*?|\d+_.+?|\d+\).+?|-.+?|\+.+?)(<\/p>|$)/

// Format string data to HTML string format
const formatAnswer = (answer: string): string => {
	const lines = answer.split('\n')

	const formattedLines = lines.map((line, index) => {
		// Check of answer is in the list format
		if (listPattern.test(line)) {
			if (index === 0) return line
			else return line ? `<p class="ml-8">${line}</p>` : ''
		} else {
			return line ? `<p>${line}</p>` : ''
		}
	})

	const formattedAnswer = formattedLines.join('')

	return formattedAnswer
}

faqs.value = faqState.data.map(faq => {
	const formattedAnswerEn = faq.answer_en ? formatAnswer(faq.answer_en) : ''
	const formattedAnswerKh = faq.answer_kh ? formatAnswer(faq.answer_kh) : ''

	return {
		...faq,
		answer_en: formattedAnswerEn,
		answer_kh: formattedAnswerKh
	}
})

useSchemaOrg([
	defineWebPage({
		'@type': 'FAQPage'
	}),
	...[
		faqState.data.map(faq =>
			defineQuestion({
				name: faq.question_kh || faq.question_en,
				acceptedAnswer: faq.answer_kh || faq.answer_en
			})
		)
	]
])
</script>
