<template>
	<div class="btn-group">
		<div v-if="last <= 6" class="flex gap-1 [&>button]:w-8 [&>button]:h-8 [&>button]:rounded-md">
			<!-- Previous -->
			<button
				:disabled="current === 1"
				class="flex items-center justify-center disabled:pointer-events-none"
				@click="toPrevious"
			>
				<Icon icon="ic:baseline-chevron-left" size="20" />
			</button>

			<button
				v-for="page in last"
				:key="page"
				:disabled="current === page"
				class="hover:bg-teal-300 disabled:bg-teal-700 disabled:text-white"
				@click="onChange?.(page)"
			>
				{{ page }}
			</button>

			<!-- Next -->
			<button
				:disabled="current === last"
				class="flex items-center justify-center hover:bg-teal-300"
				@click="toNext"
			>
				<icon icon="ic:baseline-chevron-right" size="20" />
			</button>
		</div>

		<div
			v-else
			class="flex gap-2 [&>button]:w-8 [&>button]:h-8 [&>button]:rounded-md text-teal-800"
		>
			<!-- Previous -->
			<button
				:disabled="current === 1"
				class="flex items-center justify-center hover:bg-teal-300"
				@click="toPrevious"
			>
				<Icon icon="ic:baseline-chevron-left" size="20" />
			</button>

			<button
				:disabled="current === 1"
				class="hover:bg-teal-300 disabled:pointer-events-none disabled:bg-teal-700 disabled:text-white"
				@click="onChange?.(1)"
			>
				1
			</button>

			<div v-if="current > 3" class="w-8 h-8 -mx-3 text-center select-none">...</div>

			<button v-if="current > 2" class="hover:bg-teal-300" @click="onChange?.(current - 1)">
				{{ current - 1 }}
			</button>

			<button v-if="current > 1 && current < last" disabled class="text-white bg-teal-700">
				{{ current }}
			</button>

			<button v-if="current < last - 1" class="hover:bg-teal-300" @click="onChange?.(current + 1)">
				{{ current + 1 }}
			</button>

			<div v-if="current < last - 2" class="w-8 h-8 -mx-3 text-center select-none">...</div>

			<button
				:disabled="current === last"
				class="hover:bg-teal-300 disabled:bg-teal-700 disabled:text-white"
				@click="onChange?.(last)"
			>
				{{ last }}
			</button>

			<!-- Next -->
			<button
				:disabled="current === last"
				class="flex items-center justify-center hover:bg-teal-300"
				@click="toNext"
			>
				<icon icon="ic:baseline-chevron-right" size="20" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
type Props = {
	current: number
	last: number
	toPrevious: () => void
	toNext: () => void
	onChange?: (page: number) => void
}

const { onChange } = defineProps<Props>()
</script>
