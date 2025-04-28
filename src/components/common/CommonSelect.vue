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
		<SelectTrigger
			:class="cn('w-[180px] focus:ring-0 focus:ring-offset-0 rounded-2xl', props.class)">
			<SelectValue :placeholder="'Select...'" />
		</SelectTrigger>
		<SelectContent
			align="center"
			class="max-h-60 rounded-2xl"
			:class="
				cn(
					list_size === 'small' && 'w-[300px]',
					list_size === 'medium' && 'w-[500px]',
					list_size === 'large' && 'w-[700px]',
				)
			">
			<SelectGroup>
				<SelectItem
					v-for="(item, index) in list"
					:key="index"
					:value="item.value"
					class="rounded-xl">
					{{ item.label }}
				</SelectItem>
			</SelectGroup>
		</SelectContent>
	</Select>
</template>
