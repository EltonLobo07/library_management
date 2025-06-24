<template>
	<h2>{{ `Article ${route.params.articleId} page` }}</h2>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped></style>
