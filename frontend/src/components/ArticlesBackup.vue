<template>
	<p v-if="articles.list.error">{{ articles.error }}</p>
	<p v-else-if="articles.data?.length === 0">No articles found</p>
	<section v-else :class="classJoin('h-full', 'flex flex-col gap-y-4')">
		<ul v-if="articles.data || articles.list.loading" class="flex flex-col gap-y-4">
			<template v-if="articles.data">
				<li
					v-for="article in articles.data"
					:key="article.name"
					:class="classJoin('flex gap-x-4 items-center')"
				>
					<img
						:src="article.image"
						:alt="`${article.name} cover image`"
						:class="
							classJoin(
								'rounded-sm',
								'w-52 h-80 bg-black/5 object-cover object-center',
								'shrink-0'
							)
						"
					/>
					<div>
						<h2 :class="classJoin('text-2xl font-bold', 'text-blue-500')">
							{{ article.name }}
						</h2>
						<p :class="classJoin('mt-2', 'text-lg font-semibold')">
							{{ `By ${article.author}` }}
						</p>
						<p
							v-html="article.description"
							:class="
								classJoin('mt-4', 'text-md', 'text-black/70 dark:text-white/70')
							"
						></p>
					</div>
				</li>
			</template>
			<li v-if="articles.list.loading" :key="randomId">Hello</li>
		</ul>
		<Button
			v-if="!articles.list.loading && articles.hasNextPage"
			variant="solid"
			size="lg"
			type="button"
			@click="fetchNextPage"
			:class="classJoin('mx-auto', 'mt-auto mb-2', 'w-fit')"
		>
			Load more articles
		</Button>
	</section>
</template>

<script setup lang="ts">
import { createListResource, Button } from 'frappe-ui'
import { classJoin } from '../utils'
// import { watchEffect } from 'vue'

const randomId = window.crypto.randomUUID()

const articles = createListResource({
	doctype: 'Article',
	fields: ['name', 'author', 'description', 'image'], // ['name', 'author', 'isbn', 'status', 'publisher', 'description'],
	start: 0,
	pageLength: 1,
	auto: true,
})

// watchEffect(() => {
// 	console.log(articles)
// })

const fetchNextPage = () => {
	articles.next()
}
</script>

<style scoped></style>
