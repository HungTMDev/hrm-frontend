<script lang="ts" setup>
import { cn } from '@/lib/utils';
import type { ComboboxType, FormFieldCommon } from '@/types';
import { FieldArray } from 'vee-validate';
import { Button } from '../ui/button';
import { FormControl, FormField } from '../ui/form';
import FormItem from '../ui/form/FormItem.vue';
import FormLabel from '../ui/form/FormLabel.vue';
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
import { Check } from 'lucide-vue-next';
import IconFromSvg from '../common/IconFromSvg.vue';
import Down from '@/assets/icons/Outline/Alt Arrow Down.svg';
import AddCircle from '@/assets/icons/Outline/Add Circle.svg';
import Close from '@/assets/icons/Outline/Close.svg';
import FormErrorCustom from './FormErrorCustom.vue';

interface Props extends FormFieldCommon {
	list: ComboboxType[];
	button_label?: string;
	list_size?: 'small' | 'medium' | 'large';
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
					<FormLabel :class="cn(index !== 0 && 'sr-only')">{{ label }}</FormLabel>
					<Combobox by="label">
						<FormControl>
							<ComboboxAnchor class="w-full">
								<div class="relative w-full flex items-center gap-2">
									<ComboboxInput
										:display-value="(val) => val?.label ?? ''"
										class="h-12 rounded-2xl focus-visible:border-blue-100 focus-visible:ring-0 focus-visible:ring-offset-0"
										:placeholder="placeholder ?? 'Select...'" />
									<ComboboxTrigger
										class="absolute end-12 inset-y-0 flex items-center justify-center px-3">
										<IconFromSvg :icon="Down" />
									</ComboboxTrigger>
									<Button
										type="button"
										variant="ghost"
										class="p-2"
										@click="remove(index)">
										<IconFromSvg :icon="Close" />
									</Button>
								</div>
							</ComboboxAnchor>
						</FormControl>

						<ComboboxList
							:class="
								cn(
									'w-[300px] rounded-2xl max-h-[200px] overflow-auto',
									list_size === 'small' && 'w-[300px]',
									list_size === 'medium' && 'w-[500px]',
									list_size === 'large' && 'w-[700px]',
								)
							">
							<ComboboxGroup
								v-if="list.length === 0"
								class="text-sm min-h-20 grid place-items-center">
								No data
							</ComboboxGroup>
							<ComboboxEmpty v-else> Nothing found. </ComboboxEmpty>

							<ComboboxGroup v-if="list.length > 0">
								<ComboboxItem
									v-for="item in list"
									:key="item.value"
									:value="item"
									class="rounded-xl h-12"
									@select="() => handleSelect(`${name}[${index}]`, item.value)">
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
