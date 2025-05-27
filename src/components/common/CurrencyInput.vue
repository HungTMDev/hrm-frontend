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

const formattedAmount = ref<string>();

function onInput(e: any) {
	const rawValue = e.target.value.replace(/[^\d]/g, '');
	formattedAmount.value = new Intl.NumberFormat('vi-VN').format(rawValue);

	emits('update:modelValue', Number(rawValue) === 0 ? undefined : Number(rawValue));
}

onMounted(() => {
	formattedAmount.value = props.modelValue
		? new Intl.NumberFormat('vi-VN').format(props.modelValue)
		: undefined;
});
</script>
<template>
	<div :class="cn('border p-3 rounded-2xl relative', icon && 'pl-10')">
		<span class="absolute left-3 top-3 text-gray-200">
			<IconFromSvg :icon="icon" />
		</span>
		<input
			type="text"
			v-model="formattedAmount"
			@input="onInput"
			:placeholder="placeholder"
			:class="
				cn(
					'w-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200',
					props.class,
				)
			" />
	</div>
</template>
