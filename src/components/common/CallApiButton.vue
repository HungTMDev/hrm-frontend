<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import type { ButtonVariants } from '../ui/button';
import Button from '../ui/button/Button.vue';
import { cn } from '@/lib/utils';
import SpinnerLoad from './SpinnerLoad.vue';

interface Prop {
	variant?: ButtonVariants['variant'];
	size?: ButtonVariants['size'];
	class?: HTMLAttributes['class'];
	isLoading?: boolean;
}

const props = defineProps<Prop>();
</script>
<template>
	<Button :variant="variant" :class="cn(props.class)" :size="size" :disabled="isLoading">
		<SpinnerLoad v-if="isLoading" />
		<slot />
	</Button>
</template>
