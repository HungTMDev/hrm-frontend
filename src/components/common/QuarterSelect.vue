<script setup lang="ts">
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn, compareQuarters } from '@/lib/utils';
import type { ComboboxType } from '@/types';
import { type HTMLAttributes } from 'vue';

interface Prop {
	defaultValue?: string | number;
	modelValue?: string | number;
	class?: HTMLAttributes['class'];
	list: ComboboxType[];
	min?: string;
	max?: string;
}

const props = defineProps<Prop>();

const emit = defineEmits<{
	(e: 'update:modelValue', payload: string): void;
}>();

const handleSelect = (value: any) => {
	emit('update:modelValue', value);
};
</script>

<template>
	<Select
		:default-value="defaultValue"
		:model-value="modelValue"
		@update:model-value="handleSelect">
		<SelectTrigger :class="cn('w-[180px] focus:ring-0 focus:ring-offset-0 ', props.class)">
			<SelectValue :placeholder="'Select...'" />
		</SelectTrigger>
		<SelectContent class="max-h-60">
			<SelectGroup>
				<SelectItem
					v-for="(item, index) in list"
					:key="index"
					:value="item.value"
					:disabled="
						(!!max && compareQuarters(item.value, max) >= 0) ||
						(!!min && compareQuarters(item.value, min) <= 0)
					">
					{{ item.label }}
				</SelectItem>
			</SelectGroup>
		</SelectContent>
	</Select>
</template>
