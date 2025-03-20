<script lang="ts" setup>
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

interface Prop {
	class?: HTMLAttributes['class'];
}

const props = defineProps<Prop>();
</script>
<template>
	<h3 :class="cn('text-[22px] font-semibold', props.class)"><slot /></h3>
</template>
