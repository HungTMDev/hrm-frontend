<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-vue-next';

const props = defineProps<{
	defaultValue?: string | number;
	modelValue?: string | number;
	class?: HTMLAttributes['class'];
	placeholder?: string;
}>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
	passive: true,
	defaultValue: props.defaultValue,
});
</script>

<template>
	<div :class="cn('flex gap-2 border p-3 rounded-full w-[450px] items-center', props.class)">
		<span><Search :size="18" /></span>
		<input
			type="text"
			v-model="modelValue"
			:placeholder="placeholder ? `${placeholder}...` : 'Search...'"
			class="focus:outline-none placeholder:text-sm w-full" />
	</div>
</template>
