<script lang="ts" setup>
import { cn } from '@/lib/utils';
import type { ComboboxType, FormFieldCommon } from '@/types';
import CommonCombobox from '../common/CommonCombobox.vue';
import { FormField, FormItem, FormLabel } from '../ui/form';
import FormErrorCustom from './FormErrorCustom.vue';

interface Prop extends Omit<FormFieldCommon, 'modelValue'> {
	modelValue?: string | string[];
	list: ComboboxType[];
	multiple?: boolean;
	listSize?: 'sm' | 'md' | 'lg';
	isSearch?: boolean;
}

const props = defineProps<Prop>();
</script>
<template>
	<FormField :model-value="modelValue" v-slot="{ componentField, errors }" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel
				>{{ label }}
				<span v-if="!required" class="text-slate-400 font-light"
					>(optional)</span
				></FormLabel
			>
			<CommonCombobox
				:is-form="true"
				:is-search="isSearch"
				:list="list"
				:multiple="multiple"
				:icon="icon"
				:label="label"
				:list-size="listSize"
				:class="cn(errors.length > 0 && 'border-destructive', props.class)"
				:model-value="componentField.modelValue"
				@update:modelValue="componentField.onChange" />
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
