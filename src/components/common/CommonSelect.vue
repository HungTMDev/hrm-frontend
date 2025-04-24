<script setup lang="ts">
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { ComboboxType } from '@/types';
import { type HTMLAttributes } from 'vue';

interface Prop {
	defaultValue?: string | number;
	modelValue?: string | number;
	class?: HTMLAttributes['class'];
	multiple?: boolean;
	list: ComboboxType[];
	list_size?: 'small' | 'medium' | 'large';
}

const props = defineProps<Prop>();

const emit = defineEmits<{
	(e: 'update:modelValue', payload: string | number | string[] | number[]): void;
}>();

const handleSelect = (value: any) => {
	emit('update:modelValue', value);
};
</script>

<template>
	<Select
		:default-value="defaultValue"
		:model-value="modelValue"
		@update:model-value="handleSelect"
		:multiple="multiple">
		<SelectTrigger :class="cn('w-[180px] focus:ring-0 focus:ring-offset-0 ', props.class)">
			<SelectValue :placeholder="'Select...'" />
		</SelectTrigger>
		<SelectContent class="max-h-60">
			<SelectGroup>
				<SelectItem v-for="(item, index) in list" :key="index" :value="item.value">
					{{ item.label }}
				</SelectItem>
			</SelectGroup>
		</SelectContent>
	</Select>
</template>
