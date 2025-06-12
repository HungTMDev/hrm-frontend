<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { onMounted, ref, type HTMLAttributes } from 'vue';
import IconFromSvg from './IconFromSvg.vue';

const props = defineProps<{
	modelValue?: number;
	class?: HTMLAttributes['class'];
	placeholder?: string;
	icon?: any;
}>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: number | undefined): void;
}>();

const modelValue = ref<number>();
const formattedAmount = ref<string>();

function onInput(e: any) {
	const rawValue = e.target.value.replace(/[^\d]/g, '');
	formattedAmount.value = new Intl.NumberFormat('vi-VN').format(rawValue);
	modelValue.value = Number(rawValue) === 0 ? undefined : Number(rawValue);
	emits('update:modelValue', modelValue.value);
}

onMounted(() => {
	formattedAmount.value = props.modelValue
		? new Intl.NumberFormat('vi-VN').format(props.modelValue)
		: undefined;
});
</script>
<template>
	<div :class="cn('border border-input p-2.5 rounded-2xl relative', icon && 'pl-10', props.class)">
		<span class="absolute left-3 top-3 text-gray-200">
			<IconFromSvg :icon="icon" />
		</span>
		<input
			type="text"
			:value="formattedAmount"
			@input="onInput"
			:placeholder="placeholder"
			:class="
				cn(
					'w-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 text-sm',
					props.class,
				)
			" />
	</div>
</template>
