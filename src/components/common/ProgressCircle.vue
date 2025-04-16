<script lang="ts" setup>
import { computed } from 'vue';

defineProps({
	progress: { type: Number, required: true, default: 0 },
});

const circumference = computed(() => 2 * Math.PI * 40);
</script>
<template>
	<div class="relative w-10 h-10">
		<svg class="w-full h-full" viewBox="0 0 100 100">
			<circle
				class="text-gray-100"
				stroke-width="8"
				stroke="currentColor"
				fill="transparent"
				r="40"
				cx="50"
				cy="50" />
			<circle
				class="text-blue-500 transition-all"
				stroke-width="8"
				:stroke-dasharray="circumference"
				:stroke-dashoffset="circumference - (progress / 100) * circumference"
				stroke-linecap="round"
				stroke="currentColor"
				fill="transparent"
				r="40"
				cx="50"
				cy="50"
				transform="rotate(-90 50 50)" />
		</svg>
	</div>
</template>
