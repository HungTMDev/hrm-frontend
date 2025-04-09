<script lang="ts" setup>
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

interface Prop {
	icon: any;
	class?: HTMLAttributes['class'];
	viewBox?: string;
}
const props = defineProps<Prop>();
</script>
<template>
	<component
		:is="icon"
		:class="cn('fill-current !w-5 !h-5', props.class)"
		:viewBox="viewBox || '0 0 24 24'">
	</component>
</template>
