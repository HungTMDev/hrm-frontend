<script lang="ts" setup>
import {
	Combobox,
	ComboboxAnchor,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxItem,
	ComboboxItemIndicator,
	ComboboxList,
	ComboboxTrigger,
} from '@/components/ui/combobox';
import { cn } from '@/lib/utils';

import Down from '@/assets/icons/Outline/Alt Arrow Down.svg';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import type { ComboboxType, FormFieldCommon } from '@/types';
import { Check } from 'lucide-vue-next';
import { ref } from 'vue';
import IconFromSvg from '../common/IconFromSvg.vue';
import Button from '../ui/button/Button.vue';
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

const open = ref(false);
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

const handleOpen = (value: boolean) => {
	open.value = value;
};
</script>
<template>
	<FormField v-slot="{ errors }" :name="name" :model-value="modelValue">
		<FormItem class="flex flex-col">
			<FormLabel>{{ label }} <span v-if="!required">(optional)</span></FormLabel>

			<Combobox
				:multiple="multiple"
				@update:model-value="handleSelect"
				@update:open="handleOpen">
				<FormControl>
					<ComboboxAnchor class="w-full">
						<ComboboxTrigger class="relative w-full items-center">
							<span
								class="absolute start-0 inset-y-0 flex items-center justify-center ml-3 text-gray-200">
								<IconFromSvg v-if="icon" :icon="icon" />
							</span>
							<Button
								type="button"
								variant="outline"
								:class="[
									cn(
										'rounded-2xl font-normal border justify-start h-auto focus:border-blue-100 text-gray-200 hover:text-gray-200',
										props.class,
									),
									icon ? 'pl-10' : '',
									comboboxInput !== '' && comboboxInput !== placeholder
										? 'text-slate-600 hover:text-slate-600'
										: '',
									errors.length > 0 && 'border-destructive',
								]">
								{{ comboboxInput }}
							</Button>
							<span
								class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
								<IconFromSvg
									:icon="Down"
									class="transition-all duration-200"
									:class="open ? 'rotate-180' : 'rotate-0'" />
							</span>
						</ComboboxTrigger>
					</ComboboxAnchor>
				</FormControl>

				<ComboboxList class="w-[350px] rounded-2xl">
					<ComboboxEmpty> Nothing found. </ComboboxEmpty>

					<ComboboxGroup>
						<ComboboxItem
							v-for="item in list"
							:key="item.value"
							:value="item"
							class="hover:bg-muted rounded-2xl">
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
