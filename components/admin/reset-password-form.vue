<template>
	<div>
		<div class="m-3">
			<div class="mb-12 text-3xl font-bold text-center text-[rgb(34,40,74)]">Set New Password</div>
			<form>
				<!-- Email input -->
				<div class="mb-6 relative w-[380px]">
					<input
						v-model="state.email"
						type="text"
						class="block w-full h-12 py-2 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-red-700 pr-9"
						:class="[
							v$.email.$error
								? 'border-red-700 focus:outline-red-700'
								: 'border-[rgb(240,239,239)] focus:outline-[#9AD19A]'
						]"
						placeholder="Enter your email address"
						@blur="v$.email.$touch()"
					/>
					<Icon
						class="absolute top-[17px] right-4"
						icon="ic:baseline-alternate-email"
						color="#CCEBE7"
					/>
					<span v-if="v$.email.$error" class="mt-1 text-xs text-red-700 error">{{
						v$.email.$errors[0].$message
					}}</span>
				</div>
				<!-- Password input -->
				<div class="relative mb-6">
					<input
						v-model="state.password"
						:type="showPassword1 ? 'text' : 'password'"
						class="block w-full h-12 py-2 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-red-700 pr-9"
						:class="[
							v$.password.$error
								? 'border-red-700 focus:outline-red-700'
								: 'border-[rgb(240,239,239)] focus:outline-[#9AD19A]'
						]"
						placeholder="Enter new password"
						@blur="v$.password.$touch()"
					/>
					<Icon
						v-if="showPassword1"
						class="absolute top-[18px] right-4"
						icon="akar-icons:eye-open"
						color="#CCEBE7"
						@click="showPassword1 = !showPassword1"
					/>
					<Icon
						v-if="!showPassword1"
						class="absolute top-[18px] right-4"
						icon="akar-icons:eye-slashed"
						color="#CCEBE7"
						@click="showPassword1 = !showPassword1"
					/>
					<span v-if="v$.password.$error" class="mt-1 text-xs text-red-700 error">{{
						v$.password.$errors[0].$message
					}}</span>
				</div>
				<!-- Password input -->
				<div class="relative mb-6">
					<input
						v-model="state.password_confirmation"
						:type="showPassword2 ? 'text' : 'password'"
						class="block w-full h-12 py-2 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-red-700 pr-9"
						:class="[
							v$.password_confirmation.$error
								? 'border-red-700 focus:outline-red-700'
								: 'border-[rgb(240,239,239)] focus:outline-[#9AD19A]'
						]"
						placeholder="Enter confirm password"
						@blur="v$.password_confirmation.$touch()"
					/>
					<Icon
						v-if="showPassword2"
						class="absolute top-[18px] right-4"
						icon="akar-icons:eye-open"
						color="#CCEBE7"
						@click="showPassword2 = !showPassword2"
					/>
					<Icon
						v-if="!showPassword2"
						class="absolute top-[18px] right-4"
						icon="akar-icons:eye-slashed"
						color="#CCEBE7"
						@click="showPassword2 = !showPassword2"
					/>
					<span v-if="v$.password_confirmation.$error" class="mt-1 text-xs text-red-700 error">{{
						v$.password_confirmation.$errors[0].$message
					}}</span>
					<span v-else class="mt-1 text-xs text-red-700 error">{{ error }}</span>
				</div>

				<!-- Submit button -->
				<button
					type="button"
					class="button inline-block px-7 py-3 bg-[#009987] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full"
					@click="submitForm"
				>
					{{ loading }}
				</button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import { ResetPasswordAPI } from '../../api'
import type { IResetPasswordForm } from '~~/api/type'

export default {
	setup() {
		const route = useRoute()
		const loading = ref('Reset')
		const state = reactive<IResetPasswordForm>({
			email: '',
			password: '',
			password_confirmation: '',
			token: route.query.token as string
		})
		const showPassword1 = ref(false)
		const showPassword2 = ref(false)
		const rules = computed(() => {
			return {
				email: { required, email },
				password: { required, minLength: minLength(8) },
				password_confirmation: { required, sameAs: sameAs(state.password) }
			}
		})
		const error = ref('')
		const v$ = useValidate(rules as any, state)
		function submitForm() {
			// @ts-ignore
			this.v$.$validate()
			// @ts-ignore
			if (!this.v$.$error) {
				loading.value = 'Loading...'
				ResetPasswordAPI(state)
					.then(() => {
						navigateTo('/admin/login')
						loading.value = 'Reset'
					})
					.catch(function (err) {
						error.value = err.response.data.message
						loading.value = 'Reset'
					})
			}
		}
		watch(state, () => {
			error.value = ''
		})

		return {
			state,
			v$,
			error,
			submitForm,
			showPassword1,
			showPassword2,
			loading
		}
	}
}
</script>
