<script lang="ts" setup>
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

interface Prop {
	class?: HTMLAttributes['class'];
}

const props = defineProps<Prop>();
</script>
<template>
	<section :class="cn('bg-white rounded-xl p-4', props.class)">
		<slot />
	</section>
</template>
