<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import IconFromSvg from './IconFromSvg.vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
	label: string;
	value?: string | string[];
	icon: any;
	class?: HTMLAttributes['class'];
}>();
</script>
<template>
	<div :class="cn('grid grid-cols-2 items-start', props.class)">
		<div class="flex gap-2 items-center">
			<IconFromSvg :icon="icon" />
			{{ label }}
		</div>
		<span v-if="value && typeof value === 'string'" class="text-black truncate">
			{{ value }}
		</span>
		<div v-else-if="value && typeof value === 'object'" class="flex flex-col gap-1">
			<span v-for="(item, index) in value" :key="index">
				{{ item }}
			</span>
		</div>
		<span v-else class="text-gray-200 truncate">No data available</span>
	</div>
</template>
