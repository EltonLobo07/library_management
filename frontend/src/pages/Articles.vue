<template>
	<h2 class="sr-only">Articles</h2>
	<p v-if="articles.list.error">{{ articles.error }}</p>
	<p v-else-if="articles.data?.length === 0">No articles found</p>
	<section v-else :class="classJoin('h-full', 'flex flex-col gap-y-4')">
		<ul v-if="articles.data || articles.list.loading" class="flex flex-col gap-y-4">
			<template v-if="articles.data">
				<li
					v-for="article in articles.data"
					:key="article.name"
					:class="
						classJoin(
							'flex flex-col gap-y-2',
							'p-4 rounded-md',
							'border border-black/25 dark:border-white/25'
						)
					"
				>
					<h3>{{ article.name }}</h3>
					<p>{{ `By ${article.author}` }}</p>
					<p v-html="article.description"></p>
					<RouterLink
						:to="{
							name: 'Article',
							params: { articleId: article.name.toLowerCase().split(' ').join('-') },
						}"
						>Read more</RouterLink
					>
				</li>
			</template>
			<!-- article item skeleton -->
			<li v-if="articles.list.loading" :key="randomId"></li>
		</ul>
		<Button
			v-if="!articles.list.loading && articles.hasNextPage"
			variant="solid"
			size="lg"
			type="button"
			@click="fetchNextPage"
			:class="classJoin('mx-auto', 'my-2', 'w-fit')"
		>
			Load more articles
		</Button>
	</section>
</template>

<script setup lang="ts">
import { createListResource, Button } from 'frappe-ui'
import { classJoin } from '../utils'
import { RouterLink } from 'vue-router'

const randomId = window.crypto.randomUUID()

const articles = createListResource({
	doctype: 'Article',
	fields: ['name', 'author', 'description'], // ['name', 'author', 'isbn', 'status', 'publisher', 'description'],
	start: 0,
	pageLength: 10,
	auto: true,
})

const fetchNextPage = () => {
	articles.next()
}
</script>

<style scoped></style>
