<script lang="ts" setup>
import Down from '@/assets/icons/Bold/AltArrowDown.svg';
import Up from '@/assets/icons/Bold/AltArrowUp.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';

defineProps<{
	title: string;
	color: string;
	growthPercentage: number;
	totalPercentage: number;
	total: number;
}>();
</script>
<template>
	<div class="p-6 rounded-3xl border">
		<div class="flex justify-between">
			<div class="flex items-center gap-2">
				<div class="w-6 h-6 rounded-full" :style="{ backgroundColor: color }"></div>
				<p>{{ title }}</p>
			</div>
			<div
				v-if="growthPercentage < 0"
				class="flex justify-center items-center gap-1 text-xs bg-red-50 text-red-500 p-1.5 rounded-2xl">
				<IconFromSvg :icon="Down" class="!w-4 !h-4" />
				<span>{{ -growthPercentage }}%</span>
			</div>
			<div
				v-else
				class="flex justify-center items-center gap-1 text-xs bg-green-50 text-green-500 p-1.5 rounded-2xl">
				<IconFromSvg :icon="Up" class="!w-4 !h-4" />
				<span>{{ growthPercentage }}%</span>
			</div>
		</div>
		<div class="text-sm mt-4">
			<span class="text-2xl font-semibold">{{ totalPercentage }}%</span> {{ total }} Employees
		</div>
	</div>
</template>
