<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import IconFromSvg from './IconFromSvg.vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
	label: string;
	value?: string;
	icon: any;
	class?: HTMLAttributes['class'];
}>();
</script>
<template>
	<div :class="cn('grid grid-cols-2 items-center', props.class)">
		<div class="flex gap-2 items-center">
			<IconFromSvg :icon="icon" />
			{{ label }}
		</div>
		<span v-if="value" class="text-black truncate">{{ value }}</span>
		<span v-else class="text-gray-200 truncate">No data available</span>
	</div>
</template>
