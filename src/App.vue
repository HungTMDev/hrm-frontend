<script setup lang="ts">
import { Toaster } from 'vue-sonner';
</script>

<template>
	<Toaster
		position="bottom-right"
		:toast-options="{
			actionButtonStyle: {
				backgroundColor: 'inherit',
				color: '#0e6eed',
				fontWeight: 500,
			},
		}" />
	<router-view v-slot="{ Component }">
		<transition name="slide">
			<component :is="Component" />
		</transition>
	</router-view>
</template>
<style>
.slide-enter-active {
	@apply transition-transform duration-1000;
}

.slide-leave-active {
	@apply transition-transform duration-1000;
}

.slide-enter-from {
	@apply -translate-x-full opacity-100;
}

.slide-leave-to {
	@apply translate-x-full opacity-100;
}
</style>
