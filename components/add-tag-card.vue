<template>
	<div class="p-3 mb-8 bg-white rounded-md">
		<h4 id="tag-header" class="pb-3 text-xl font-bold border-b">Tags</h4>

		<ul class="flex flex-wrap gap-2 py-2 list-none" aria-labelledby="tag-header">
			<li
				v-for="(tag, index) in tags"
				:key="tag + index"
				class="flex items-center px-3 space-x-1 bg-gray-100 rounded-2xl"
			>
				<span>{{ tag }}</span>

				<span @click="attemptRemoveTag(index)">
					<Icon icon="radix-icons:cross-circled" class="cursor-pointer" color="grey" />
				</span>
			</li>
		</ul>

		<form @submit.prevent="attemptAddTag">
			<input
				v-model="input"
				:disabled="tags.length === 5"
				type="text"
				placeholder="Add Tags..."
				class="w-full h-10 px-2 text-sm text-black border-none rounded-md peer ring-1 ring-primary focus:outline-none focus:ring-2 disabled:ring-0 disabled:cursor-not-allowed"
			/>

			<span
				class="px-1 text-sm text-yellow-700 peer-disabled:after:content-['Cannot_add_more_tag']"
				aria-label="infomation"
				role="alert"
			></span>
		</form>

		<div class="pt-2 text-sm">Add or change tags (up to 5) so readers know what news is about</div>
	</div>
</template>

<script setup lang="ts">
type Props = {
	tags: string[]
	addTag: (value: string) => void
	removeTag: (index: number) => void
}

const { addTag, removeTag } = defineProps<Props>()

const input = ref('')

const attemptAddTag = () => {
	if (input.value.length > 25) return (input.value = '')

	addTag(input.value)
	input.value = ''
}

const attemptRemoveTag = (index: number) => {
	removeTag(index)
}
</script>
