<script setup lang="ts">
import Down from '@/assets/icons/Outline/AltArrowDown.svg';
import { Button } from '@/components/ui/button';
import {
	Combobox,
	ComboboxAnchor,
	ComboboxGroup,
	ComboboxItem,
	ComboboxItemIndicator,
	ComboboxList,
	ComboboxTrigger,
} from '@/components/ui/combobox';
import { cn } from '@/lib/utils';
import type { ComboboxType } from '@/types';
import { Check } from 'lucide-vue-next';
import { computed, onMounted, ref, watch, type HTMLAttributes } from 'vue';
import ComboboxInput from '../ui/combobox/ComboboxInput.vue';
import { FormControl } from '../ui/form';
import IconFromSvg from './IconFromSvg.vue';

const props = defineProps<{
	modelValue?: string | string[];
	defaultValue?: any;
	multiple?: boolean;
	label?: string;
	list: ComboboxType[];
	icon?: any;
	listSize?: 'sm' | 'md' | 'lg';
	class?: HTMLAttributes['class'];
	isSearch?: boolean;
	isForm?: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string | string[] | undefined): void;
}>();

const value = ref<ComboboxType | ComboboxType[]>();
const isOpen = ref(false);

const placeholder = computed(() =>
	props.multiple
		? (value.value as ComboboxType[])?.map((item) => item.label).join(', ') ||
			`Select ${props.label?.toLocaleLowerCase() ?? ''}`
		: '',
);

const handleOpen = (open: boolean) => {
	isOpen.value = open;
};

const handleSelect = (payload: any) => {
	value.value = payload;

	if (props.multiple) {
		const data = (payload as ComboboxType[]).map((item) => item.value);
		if (data.length === 0) {
			emits('update:modelValue', undefined);
		} else {
			emits('update:modelValue', data as string[]);
		}
		return;
	}

	emits('update:modelValue', (payload as ComboboxType).value as string);
};

const setValue = (newVal: string | string[] | undefined, newList: ComboboxType[]) => {
	if (props.multiple) {
		if (Array.isArray(newVal)) {
			const selectedItems: ComboboxType[] = [];
			newVal.forEach((item) => {
				const data = newList.find((i) => i.value === item);
				if (data) {
					selectedItems.push(data);
				}
			});
			value.value = selectedItems.length > 0 ? selectedItems : undefined;
		} else if (newVal !== undefined) {
			const data = newList.find((i) => i.value === newVal);
			if (data) {
				value.value = [data];
			}
		}
		return;
	}
	value.value = props.list.find((item) => item.value === newVal);
};

onMounted(() => {
	setValue(props.modelValue, props.list);
});

watch(
	() => [props.modelValue, props.list],
	(newVal) => {
		setValue(newVal[0] as string | string[] | undefined, newVal[1] as ComboboxType[]);
	},
);
</script>

<template>
	<Combobox
		:model-value="value"
		:open="isOpen"
		:multiple="multiple"
		@update:open="handleOpen"
		@update:model-value="handleSelect">
		<FormControl v-if="isForm && isSearch && !multiple">
			<ComboboxAnchor class="w-full">
				<div class="relative w-full items-center">
					<span class="absolute left-3 top-3 text-gray-200">
						<IconFromSvg :icon="icon" />
					</span>
					<ComboboxInput
						:class="
							cn(
								'shadow-none h-auto p-3 rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 truncate',
								icon && 'pl-10',
								props.class,
							)
						"
						:display-value="(val) => val?.label ?? ''"
						:placeholder="`Select ${label?.toLocaleLowerCase() ?? ''}`" />
					<ComboboxTrigger
						class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
						<IconFromSvg
							:icon="Down"
							:class="
								cn(
									'transition-all duration-200',
									isOpen ? 'rotate-180' : 'rotate-0',
								)
							" />
					</ComboboxTrigger>
				</div>
			</ComboboxAnchor>
		</FormControl>
		<ComboboxAnchor v-else-if="isSearch && !multiple" :class="cn(props.class)" class="w-full">
			<div class="relative w-full items-center">
				<span class="absolute left-3 top-3 text-gray-200">
					<IconFromSvg :icon="icon" />
				</span>
				<ComboboxInput
					:class="
						cn(
							'shadow-none h-auto p-3 rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 truncate',
							icon && 'pl-10',
						)
					"
					:display-value="(val) => val?.label ?? ''"
					:placeholder="`Select ${label?.toLocaleLowerCase() ?? ''}`" />
				<ComboboxTrigger
					class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
					<IconFromSvg
						:icon="Down"
						:class="
							cn('transition-all duration-200', isOpen ? 'rotate-180' : 'rotate-0')
						" />
				</ComboboxTrigger>
			</div>
		</ComboboxAnchor>
		<ComboboxAnchor v-else as-child>
			<ComboboxTrigger as-child>
				<Button
					variant="outline"
					:class="
						cn(
							'justify-between h-auto p-3 rounded-2xl w-full relative focus:border-blue-200',
							icon && 'pl-10',
							value
								? 'text-slate-600 hover:text-slate-600'
								: 'text-gray-200 hover:text-gray-200',
							props.class,
						)
					">
					<span v-if="icon" class="absolute left-3 text-gray-200">
						<IconFromSvg :icon="icon" />
					</span>
					<span v-if="multiple" class="truncate">{{ placeholder }}</span>
					<span v-else>{{
						(value as ComboboxType)?.label ??
						`Select ${label?.toLocaleLowerCase() ?? ''}`
					}}</span>

					<IconFromSvg
						:icon="Down"
						:class="
							cn('transition-all duration-200', isOpen ? 'rotate-180' : 'rotate-0')
						" />
				</Button>
			</ComboboxTrigger>
		</ComboboxAnchor>

		<ComboboxList
			:class="
				cn(
					'rounded-2xl',
					listSize === 'sm' && 'w-[200px]',
					listSize === 'md' && 'w-[300px]',
					listSize === 'lg' && 'w-[400px]',
				)
			">
			<ComboboxGroup v-if="list.length === 0" class="text-sm text-center py-8">
				No data
			</ComboboxGroup>

			<ComboboxGroup class="max-h-60 overflow-auto">
				<ComboboxItem
					v-for="item in list"
					:key="item.value"
					:value="item"
					class="hover:bg-muted rounded-xl p-2">
					<p class="truncate">{{ item.label }}</p>

					<ComboboxItemIndicator>
						<Check :class="cn('ml-auto h-4 w-4')" />
					</ComboboxItemIndicator>
				</ComboboxItem>
			</ComboboxGroup>
		</ComboboxList>
	</Combobox>
</template>
