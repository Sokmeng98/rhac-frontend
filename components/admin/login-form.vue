<template>
	<form class="m-3 translate-y-10 md:translate-y-0" @submit.prevent="submitForm">
		<input type="hidden" name="_csrf" value="<%= csrfToken %>" />

		<legend class="title mb-6 text-center md:mb-12 text-3xl font-bold text-[rgb(34,40,74)] md:flex">
			Login
		</legend>

		<!-- Email input -->
		<div class="mb-6 relative w-[380px]">
			<input
				v-model="state.email"
				type="text"
				class="block w-full h-12 py-2 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg input-style bg-gray-50 focus:border-red-700 pr-9"
				:class="[
					validator.email.$error
						? 'border-red-700 focus:outline-red-700'
						: 'border-[rgb(240,239,239)] focus:outline-[#9AD19A]'
				]"
				placeholder="Email address"
				@blur="validator.email.$touch()"
			/>
			<Icon
				class="absolute top-[17px] right-4"
				icon="ic:baseline-alternate-email"
				color="#CCEBE7"
			/>
			<span v-if="validator.email.$error" class="mt-1 text-xs text-red-700 error">
				{{ validator.email.$errors[0].$message }}
			</span>
		</div>

		<!-- Password input -->
		<div class="relative mb-6">
			<input
				v-model="state.password"
				:type="showPassword ? 'text' : 'password'"
				class="block w-full h-12 py-2 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg input-style bg-gray-50 focus:border-red-700 pr-9"
				:class="[
					validator.password.$error
						? 'border-red-700 focus:outline-red-700'
						: 'border-[rgb(240,239,239)] focus:outline-[#9AD19A]'
				]"
				placeholder="Password"
				@blur="validator.password.$touch()"
			/>
			<Icon
				v-if="showPassword"
				class="absolute top-[18px] right-4"
				icon="akar-icons:eye-open"
				color="#CCEBE7"
				@click="showPassword = !showPassword"
			/>
			<Icon
				v-if="!showPassword"
				class="absolute top-[18px] right-4"
				icon="akar-icons:eye-slashed"
				color="#CCEBE7"
				@click="showPassword = !showPassword"
			/>
			<span v-if="validator.password.$error" class="mt-1 text-xs text-red-700 error">
				{{ validator.password.$errors[0].$message }}
			</span>
			<span v-else class="mt-1 text-xs text-red-700 error">{{ error }}</span>
		</div>

		<div class="mb-6">
			<NuxtLink to="/admin/forget-password" class="text-primary hover:underline"
				>Forgot password?
			</NuxtLink>
		</div>

		<button
			class="inline-block px-7 py-3 bg-[#009987] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 transition duration-150 ease-in-out w-full ring-black"
		>
			{{ submitButtonInnerText }}
		</button>
	</form>
</template>

<script lang="ts" setup>
import useValidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import cookie from 'js-cookie'
import { LoginAPI } from '../../api'
import { updateHeaderToken } from '../../api/updateHeader'
import type { ExtendedAxiosError } from '~/api/article'
import { getErrorMessage } from '~/api/article'

const submitButtonInnerText = ref('Login')

const state = reactive({
	email: '',
	password: ''
})
const showPassword = ref(false)

const rules = computed(() => {
	return {
		email: {
			required: helpers.withMessage('Email is required', required),
			email: helpers.withMessage('Invalid email address', email)
		},
		password: {
			required: helpers.withMessage('Password is required', required),
			minLength: minLength(8)
		}
	}
})

const error = ref('')
const validator = useValidate(rules as any, state)

const submitForm = () => {
	validator.value.$validate()

	if (validator.value.$error) return

	submitButtonInnerText.value = 'Loading...'

	LoginAPI(state)
		.then((response: { access_token: string }) => {
			if (response.access_token) {
				cookie.set('t', response.access_token)
				navigateTo('/admin')
				updateHeaderToken()
			}
		})
		.catch((err: ExtendedAxiosError) => {
			if (err.response?.status === 401) {
				error.value = 'Wrong email or password'
			} else {
				error.value = getErrorMessage(err)
			}
			submitButtonInnerText.value = 'Login'
		})
}

watch(state, () => {
	error.value = ''
})
</script>
