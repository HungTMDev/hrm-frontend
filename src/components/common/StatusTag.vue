<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import Badge from '../ui/badge/Badge.vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
	status: string;
	class?: HTMLAttributes['class'];
}>();
</script>
<template>
	<Badge :class="cn('text-sm font-normal w-[100px] h-7 grid place-items-center', props.class)">{{
		status
	}}</Badge>
</template>
