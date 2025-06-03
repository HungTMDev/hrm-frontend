<script setup lang="ts">
import Copy from '@/assets/icons/Outline/Copy.svg';
import { Button } from '../ui/button';
import IconFromSvg from './IconFromSvg.vue';
import { useCustomToast } from '@/lib/customToast';

const props = defineProps<{
	value: string;
	type?: 'short' | 'long';
	showValue?: boolean;
}>();

const { showToast } = useCustomToast();

const handleCopy = async (e: any) => {
	e.stopPropagation();
	try {
		await navigator.clipboard.writeText(props.value);
		showToast({
			message: 'Copied!!',
			type: 'success',
		});
	} catch (error: any) {
		showToast({
			message: e.message,
			type: 'error',
		});
	}
};
</script>

<template>
	<Button @click="handleCopy" variant="ghost" class="h-auto p-2">
		<IconFromSvg :icon="Copy" class="!w-4 !h-4" />
		<span v-if="type === 'long'">Copy</span>
		<span v-if="showValue">{{ value }}</span>
	</Button>
</template>
