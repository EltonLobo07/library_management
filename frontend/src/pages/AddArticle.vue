<template>
	<form @submit.prevent="onSubmit" class="py-15">
		<h2 class="mb-10 text-xl font-semibold">New Article</h2>
		<FormControl
			type="text"
			size="md"
			variant="subtle"
			placeholder="The Hobbit"
			:disabled="false"
			label="Article Name"
			v-model="name"
			:required="true"
			class="mt-5"
		/>
		<div class="mt-5 flex flex-wrap gap-5 items-center">
			<FormControl
				type="text"
				size="md"
				variant="subtle"
				placeholder="J.R.R. Tolkien"
				:disabled="false"
				label="Author"
				v-model="author"
				:required="true"
				class="grow basis-0 min-w-52"
			/>
			<FormControl
				type="select"
				:options="statusInputOptions"
				size="md"
				variant="subtle"
				:disabled="false"
				label="Status"
				v-model="status"
				:required="true"
				class="grow basis-0 min-w-52"
			/>
		</div>
		<div class="mt-5 flex flex-wrap gap-5 items-center">
			<FormControl
				type="text"
				size="md"
				variant="subtle"
				placeholder="Houghton Mifflin Harcourt"
				:disabled="false"
				label="Publisher"
				v-model="publisher"
				:required="true"
				class="grow basis-0 min-w-52"
			/>
			<FormControl
				type="text"
				size="md"
				variant="subtle"
				:disabled="false"
				label="ISBN"
				v-model="isbn"
				:required="true"
				class="grow basis-0 min-w-52"
			/>
		</div>
		<Textarea
			variant="subtle"
			size="md"
			placeholder="Summarize the book in a few sentences"
			:disabled="false"
			v-model="description"
			label="Description"
			class="mt-5"
		/>
		<div class="mt-7 flex gap-4 items-center flex-wrap">
			<Button
				type="button"
				variant="solid"
				theme="red"
				size="md"
				label="Reset"
				:loading="false"
				:disabled="article.loading"
				@click="resetForm"
			/>
			<Button
				type="submit"
				variant="solid"
				theme="gray"
				size="md"
				label="Submit"
				:loading="article.loading"
				:disabled="false"
			/>
		</div>
		<Toast
			v-if="toastDetails !== null"
			:open="true"
			:message="toastDetails.message"
			:type="toastDetails.type"
		/>
	</form>
</template>

<script setup lang="ts">
import { FormControl, Button, Textarea, Toast, createResource } from 'frappe-ui'
import { ref, watchEffect } from 'vue'
import { useLocalStorageRef } from '../hooks'

const article = createResource({
	url: '/api/resource/Article',
	method: 'POST',
	makeParams: () => ({
		article_name: name.value,
		status: status.value,
		author: author.value,
		publisher: publisher.value,
		isbn: isbn.value,
		description: description.value,
	}),
})

const namespace = 'add-article'
const getNamespacedId = (name: string) => (name.trim() === '' ? name : [namespace, name].join('-'))
const name = useLocalStorageRef('', getNamespacedId('name'))
const author = useLocalStorageRef('', getNamespacedId('author'))
const publisher = useLocalStorageRef('', getNamespacedId('publisher'))
const description = useLocalStorageRef('', getNamespacedId('description'))
const isbn = useLocalStorageRef('', getNamespacedId('isbn'))
const STATUSES = ['Available', 'Issued'] as const
const statusInputOptions = STATUSES.map((status) => ({
	label: status,
	value: status,
}))
const status = useLocalStorageRef<(typeof STATUSES)[number]>(
	'Available',
	getNamespacedId('status')
)
const resetForm = () => {
	name.value = ''
	author.value = ''
	status.value = 'Available'
	publisher.value = ''
	description.value = ''
	isbn.value = ''
}
const onSubmit = async () => {
	try {
		await article.submit()
		toastDetails.value = { type: 'success', message: 'Article created successfully' }
		resetForm()
	} catch (error) {
		toastDetails.value = { type: 'error', message: 'Failed to create article' }
		console.error(error)
	}
}
const toastDetails = ref<{ type: 'success' | 'error'; message: string } | null>(null)
watchEffect((cleanup) => {
	if (toastDetails.value === null) {
		return
	}
	const timerId = window.setTimeout(() => {
		if (toastDetails.value !== null) {
			toastDetails.value = null
		}
	}, 3000)
	cleanup(() => {
		window.clearTimeout(timerId)
	})
})
</script>

<style scoped></style>
