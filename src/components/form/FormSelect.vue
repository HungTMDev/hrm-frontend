<script lang="ts" setup>
import { cn } from '@/lib/utils';

import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import type { ComboboxType, FormFieldCommon } from '@/types';
import { onMounted, onUpdated, ref } from 'vue';
import CommonSelect from '../common/CommonSelect.vue';
import FormErrorCustom from './FormErrorCustom.vue';

interface Prop extends Omit<FormFieldCommon, 'modelValue'> {
	list: ComboboxType[];
	multiple?: boolean;
	isSearch?: boolean;
	modelValue?: string | string[];
	list_size?: 'sm' | 'md' | 'lg';
}

const props = defineProps<Prop>();

const value = ref<ComboboxType | ComboboxType[]>();

onMounted(() => {
	value.value = props.list.find((item) => item.value === props.modelValue);
});

onUpdated(() => {
	value.value = props.list.find((item) => item.value === props.modelValue);
});
</script>
<template>
	<FormField v-slot="{ componentField, errors }" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel class="text-slate-600"
				>{{ label }} <span v-if="!required">(optional)</span></FormLabel
			>
			<CommonSelect
				:icon="icon"
				:list="list"
				:multiple="multiple"
				:model-value="componentField.modelValue"
				:class="cn(props.class, errors.length > 0 && 'border-destructive')"
				@update:model-value="componentField.onChange" />
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
