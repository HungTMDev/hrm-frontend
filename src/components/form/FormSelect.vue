<script lang="ts" setup>
import { cn } from '@/lib/utils';
import {
	Combobox,
	ComboboxAnchor,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxItemIndicator,
	ComboboxList,
	ComboboxTrigger,
} from '@/components/ui/combobox';

import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Check, ChevronsUpDown } from 'lucide-vue-next';
import type { ComboboxType, FormFieldCommon } from '@/types';
import { ref } from 'vue';
import FormErrorCustom from './FormErrorCustom.vue';

interface Prop extends FormFieldCommon {
	list: ComboboxType[];
	modelValue?: string | string[];
	multiple?: boolean;
}

const props = defineProps<Prop>();

const emit = defineEmits<{
	(e: 'update:modelValue', payload: string | string[] | undefined): void;
}>();

const comboboxInput = ref(props.placeholder ? props.placeholder : '');

const handleSelect = (value: any) => {
	if (props.multiple) {
		const data = (value as ComboboxType[]).map((item) => item.value);
		emit('update:modelValue', data ? data : undefined);
		comboboxInput.value = data.length > 0 ? `${data.length} Selected` : props.placeholder || '';
		return;
	}
	const data = value as ComboboxType;
	comboboxInput.value = data.label;
	emit('update:modelValue', data.value);
};
</script>
<template>
	<FormField :name="name" :model-value="modelValue">
		<FormItem class="flex flex-col">
			<FormLabel>{{ label }}</FormLabel>

			<Combobox :multiple="multiple" @update:model-value="handleSelect">
				<FormControl>
					<ComboboxAnchor>
						<div class="relative w-full max-w-sm items-center">
							<ComboboxInput :placeholder="comboboxInput" />
							<ComboboxTrigger
								class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
								<ChevronsUpDown class="size-4 text-muted-foreground" />
							</ComboboxTrigger>
						</div>
					</ComboboxAnchor>
				</FormControl>

				<ComboboxList>
					<ComboboxEmpty> Nothing found. </ComboboxEmpty>

					<ComboboxGroup>
						<ComboboxItem v-for="item in list" :key="item.value" :value="item">
							{{ item.label }}

							<ComboboxItemIndicator>
								<Check :class="cn('ml-auto h-4 w-4')" />
							</ComboboxItemIndicator>
						</ComboboxItem>
					</ComboboxGroup>
				</ComboboxList>
			</Combobox>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
