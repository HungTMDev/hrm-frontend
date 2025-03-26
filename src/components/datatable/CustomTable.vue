<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
	class?: HTMLAttributes['class'];
}>();
</script>

<template>
	<div :class="cn('relative w-full overflow-auto', props.class)">
		<table class="w-full caption-bottom text-sm border-separate border-spacing-y-1">
			<slot />
		</table>
	</div>
</template>
