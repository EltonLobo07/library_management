<template>
	<header
		:class="
			classJoin(
				'sticky top-0',
				'py-6',
				'border-b border-black/25 dark:border-white/25',
				'bg-white dark:bg-black'
			)
		"
	>
		<div
			:class="
				classJoin(
					'max-w-[min(100%,75rem)] mx-auto px-4',
					'flex justify-between items-center gap-x-4'
				)
			"
		>
			<h1 :class="classJoin('font-bold text-2xl')">Library Management</h1>
			<button type="button" @click="props.toggleIsDarkTheme" class="relative">
				<span class="sr-only">{{
					`switch to ${props.isDarkTheme ? 'light' : 'dark'} theme`
				}}</span>
				<component :is="props.isDarkTheme ? MoonIcon : SunIcon" />
			</button>
		</div>
	</header>
</template>

<script setup lang="ts">
import { classJoin } from '../utils'
import { MoonIcon, SunIcon } from '../icons'

const props = defineProps<{
	isDarkTheme: boolean
	toggleIsDarkTheme: () => void
}>()
</script>

<style scoped></style>
