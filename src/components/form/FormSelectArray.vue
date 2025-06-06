<script lang="ts" setup>
import AddCircle from '@/assets/icons/Outline/Add Circle.svg';
import { cn } from '@/lib/utils';
import type { ComboboxType, FormFieldCommon } from '@/types';
import { FieldArray } from 'vee-validate';
import CommonSelect from '../common/CommonSelect.vue';
import IconFromSvg from '../common/IconFromSvg.vue';
import { Button } from '../ui/button';
import { FormField } from '../ui/form';
import FormItem from '../ui/form/FormItem.vue';
import FormLabel from '../ui/form/FormLabel.vue';
import FormErrorCustom from './FormErrorCustom.vue';

interface Props extends Omit<FormFieldCommon, 'modelValue'> {
	list: ComboboxType[];
	button_label?: string;
	list_size?: 'small' | 'medium' | 'large';
	icon?: any;
	modelValue?: string[];
}

const emit = defineEmits<{
	(e: 'update:select', payload: { fieldName: string; data: string }): void;
}>();

defineProps<Props>();

const handleSelect = (fieldName: string, data: string) => {
	emit('update:select', { fieldName, data });
};
</script>
<template>
	<FieldArray v-slot="{ fields, push, remove }" :name="name">
		<div v-for="(field, index) in fields" :key="`${name}-${field.key}`">
			<FormField :name="`${name}[${index}]`">
				<FormItem class="flex flex-col flex-1">
					<div class="flex justify-between items-center h-[14px]">
						<FormLabel :class="cn(index !== 0 && 'sr-only ', 'text-slate-600')">{{
							label
						}}</FormLabel>
						<div class="flex-1 text-end">
							<Button
								v-if="required && index !== 0"
								@click="remove(index)"
								variant="link"
								class="p-0 h-auto text-red-500 text-xs"
								>Remove</Button
							>
						</div>
					</div>
					<CommonSelect
						:list="list"
						:model-value="modelValue?.[index]"
						@update:model-value="
							(payload) => handleSelect(`${name}[${index}]`, payload as string)
						" />
					<FormErrorCustom />
				</FormItem>
			</FormField>
		</div>

		<Button
			type="button"
			variant="outline"
			class="text-sm w-full rounded-2xl h-12 mt-2 !text-slate-600"
			@click="push({ value: '' })">
			<IconFromSvg :icon="AddCircle" />
			{{ button_label ?? 'Add' }}
		</Button>
	</FieldArray>
</template>
