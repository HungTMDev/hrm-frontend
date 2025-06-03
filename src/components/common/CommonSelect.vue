<script setup lang="ts">
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { ComboboxType } from '@/types';
import { onMounted, ref, type HTMLAttributes } from 'vue';
import SelectTriggerCustom from '../custom/SelectTriggerCustom.vue';
import IconFromSvg from './IconFromSvg.vue';

interface Prop {
	defaultValue?: string | number | string[] | number[];
	modelValue?: string | number | string[] | number[];
	class?: HTMLAttributes['class'];
	multiple?: boolean;
	list: ComboboxType[];
	icon?: any;
	list_size?: 'sm' | 'md' | 'lg';
	placeholder?: string;
}

const props = defineProps<Prop>();

const emit = defineEmits<{
	(e: 'update:modelValue', payload: string | number | string[] | number[]): void;
}>();

const selectedValue = ref<any>();

const handleSelect = (value: any) => {
	selectedValue.value = value;
	emit('update:modelValue', value);
};

onMounted(() => {
	selectedValue.value = props.modelValue;
});
</script>

<template>
	<Select
		:default-value="defaultValue"
		:model-value="modelValue"
		@update:model-value="handleSelect"
		:multiple="multiple">
		<SelectTriggerCustom
			:class="
				cn(
					'w-full h-auto p-3 focus:ring-0 focus:ring-offset-0 rounded-2xl relative',
					icon && 'pl-10',
					props.class,
				)
			">
			<span class="absolute left-3 text-gray-200">
				<IconFromSvg :icon="icon" />
			</span>
			<SelectValue
				:placeholder="placeholder ?? 'Select...'"
				:class="cn('text-gray-200', selectedValue && 'text-black')" />
		</SelectTriggerCustom>
		<SelectContent
			align="center"
			class="max-h-60 rounded-2xl p-0"
			:class="
				cn(
					list_size === 'sm' && 'w-[200px]',
					list_size === 'md' && 'w-[300px]',
					list_size === 'lg' && 'w-[400px]',
				)
			">
			<SelectGroup v-if="list.length === 0" class="text-sm text-center py-6"
				>No data</SelectGroup
			>
			<SelectGroup v-else>
				<SelectItem
					v-for="(item, index) in list"
					:key="index"
					:value="item.value"
					class="rounded-xl py-2">
					{{ item.label }}
				</SelectItem>
			</SelectGroup>
		</SelectContent>
	</Select>
</template>
