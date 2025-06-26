<template>
	<FrappeUIProvider>
		<div
			:class="
				classJoin(
					'h-full overflow-auto',
					'flex flex-col',
					isDarkTheme ? 'dark text-white bg-black' : 'text-black bg-white'
				)
			"
		>
			<AppHeader :isDarkTheme="isDarkTheme" :toggleIsDarkTheme="toggleIsDarkTheme" />
			<main
				:class="
					classJoin('w-full', 'max-w-[min(100%,75rem)] mx-auto', 'grow', 'pt-4', 'px-4')
				"
			>
				<router-view />
			</main>
		</div>
	</FrappeUIProvider>
</template>

<script setup lang="ts">
import { FrappeUIProvider } from 'frappe-ui'
import { IS_DARK_THEME, IS_DARK_THEME_LS_KEY, TOGGLE_IS_DARK_THEME } from './keys'
import { onMounted, provide, ref } from 'vue'
import { classJoin } from './utils'

const isDarkTheme = ref(window.localStorage.getItem(IS_DARK_THEME_LS_KEY) === 'true')
const toggleIsDarkTheme = () => {
	isDarkTheme.value = !isDarkTheme.value
	updateLocalStorage()
}
const updateLocalStorage = () => {
	window.localStorage.setItem(IS_DARK_THEME_LS_KEY, String(isDarkTheme.value))
}
onMounted(() => {
	updateLocalStorage()
})
provide(IS_DARK_THEME, () => isDarkTheme.value)
provide(TOGGLE_IS_DARK_THEME, toggleIsDarkTheme)
</script>
