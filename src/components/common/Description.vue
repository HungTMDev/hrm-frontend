<script lang="ts" setup>
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

interface Prop {
	class?: HTMLAttributes['class'];
}

const props = defineProps<Prop>();
</script>
<template>
	<p :class="cn('text-xs text-gray-400', props.class)"><slot /></p>
</template>
