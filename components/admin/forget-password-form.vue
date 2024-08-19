<template>
	<form class="relative flex flex-col w-96" @submit.prevent="submitForm">
		<legend class="text-3xl font-bold text-center text-black">Forget Password</legend>

		<Icon class="absolute top-24 right-4" icon="ic:baseline-alternate-email" color="#CCEBE7" />
		<input
			v-model="state.email"
			type="email"
			name="email"
			:required="formValidator.email.$error"
			class="w-full h-12 py-2 pl-2 mt-12 text-sm text-gray-900 border rounded-lg peer bg-gray-50 focus:ring-2 pr-9 focus:outline-none ring-primary invalid:ring-1 invalid:ring-red-600 aria-[invalid='true']:ring-red-600"
			:aria-invalid="formValidator.email.$error || error.length > 0"
			aria-errormessage="input-error-message"
			placeholder="Email address"
			@blur="formValidator.email.$touch()"
		/>

		<span
			id="input-error-message"
			role="alert"
			class="py-1 text-xs text-red-700 invisible peer-invalid:visible peer-aria-[invalid='true']:visible"
			>{{ formValidator.email.$errors?.[0]?.$message || error }}</span
		>

		<button
			type="submit"
			class="bg-[#009987] mt-4 py-3 text-white font-medium leading-snug uppercase rounded shadow-md hover:shadow-lg ring-black focus:outline-none focus-visible:ring-2 w-full"
		>
			{{ submitButtonInnerText }}
		</button>

		<span v-show="isEmailSent" role="alert" class="mt-4 text-success">
			We have sent you the password reset link!</span
		>
	</form>
</template>

<script lang="ts" setup>
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import { ForgetPasswordAPI } from '../../api'

const submitButtonInnerText = ref('Send')

const state = reactive({
	email: ''
})
const rules = computed(() => {
	return {
		email: { required, email }
	}
})

const error = ref('')
const isEmailSent = ref(false)

const formValidator = useValidate(rules, state)

const submitForm = () => {
	formValidator.value.$validate()

	if (formValidator.value.$error) return

	submitButtonInnerText.value = 'Loading...'

	ForgetPasswordAPI(state)
		.then(() => {
			isEmailSent.value = true
		})
		.catch(err => {
			error.value = err.response.data.message
		})
		.finally(() => {
			submitButtonInnerText.value = 'Send'
		})
}

watch(state, () => {
	error.value = ''
})
</script>
