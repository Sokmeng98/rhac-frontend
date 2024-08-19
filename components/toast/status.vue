<template>
	<!-- Pending -->
	<div
		v-show="pending && pendingMessage != ''"
		class="transition-all duration-300 alert alert-info"
		:class="{ 'opacity-0 scale-0': !pending }"
	>
		<div>
			<span>{{ pendingMessage }}</span>
		</div>
	</div>

	<!-- Success -->
	<div
		v-show="succeed && successMessage != ''"
		class="transition-all duration-300 alert alert-success"
		:class="{ 'opacity-0 scale-0': !succeed }"
	>
		<div>
			<span>{{ successMessage }}</span>
		</div>
	</div>

	<!-- Error -->
	<div
		v-show="error && errorMessage != ''"
		class="transition-all duration-300 alert alert-error"
		:class="{ 'opacity-0 scale-0': !error }"
	>
		<div>
			<span>{{ errorMessage }}</span>
		</div>

		<button
			type="button"
			class="flex items-center justify-center w-6 h-6"
			@click="shouldHide('error')"
		>
			<p class="text-2xl">&#215;</p>
		</button>
	</div>
</template>

<script setup lang="ts">
import type { Toast } from '~/composables/use-toast'

type Props = {
	pending: boolean
	succeed: boolean
	error: boolean
	pendingMessage: string
	successMessage: string
	errorMessage: string
	shouldHide: (toast: Toast) => void
}

defineProps<Props>()
</script>
