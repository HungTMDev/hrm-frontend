<script setup lang="ts">
import Down from '@/assets/icons/Outline/Alt Arrow Down.svg';
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import type { ComboboxType } from '@/types';
import { Check, Search } from 'lucide-vue-next';
import { ref, type HTMLAttributes } from 'vue';
import IconFromSvg from './IconFromSvg.vue';

interface Prop {
	defaultValue?: string | number;
	modelValue?: string | number;
	class?: HTMLAttributes['class'];
	multiple?: boolean;
	list: ComboboxType[];
	isSearch?: boolean;
	label: string;
}

const props = defineProps<Prop>();

const emit = defineEmits<{
	(e: 'update:modelValue', payload: string | number | string[] | number[]): void;
}>();

const selectedValue = ref<ComboboxType | ComboboxType[]>();
const open = ref(false);

const handleSelect = (value: any) => {
	console.log(value);
	selectedValue.value = value;
	emit('update:modelValue', value);
};

const handleOpen = (isOpen: boolean) => {
	open.value = isOpen;
};
</script>

<template>
	<Combobox
		v-model="selectedValue"
		:open="open"
		by="label"
		@update:model-value="handleSelect"
		@update:open="handleOpen"
		:multiple="multiple">
		<ComboboxAnchor as-child>
			<ComboboxTrigger as-child>
				<Button
					v-if="multiple"
					variant="outline"
					class="justify-start text-sm text-slate-600">
					{{
						selectedValue && (selectedValue as ComboboxType[]).length > 0
							? `${(selectedValue as ComboboxType[]).length} selected`
							: `Select ${label}`
					}}
				</Button>
				<Button
					v-else
					variant="outline"
					:class="cn('justify-between text-sm text-slate-600', props.class)">
					{{ (selectedValue as ComboboxType)?.label ?? `Select ${label}` }}

					<IconFromSvg
						:icon="Down"
						class="duration-200"
						:class="open ? 'rotate-180' : 'rotate-0'" />
				</Button>
			</ComboboxTrigger>
		</ComboboxAnchor>

		<ComboboxList>
			<div v-if="isSearch" class="relative w-full max-w-sm items-center">
				<ComboboxInput
					class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
					:placeholder="`Search ${label}...`" />
				<span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
					<Search class="size-4 text-muted-foreground" />
				</span>
			</div>

			<ComboboxEmpty v-if="isSearch"> No framework found. </ComboboxEmpty>

			<ComboboxGroup>
				<ComboboxItem v-for="item in list" :key="item.value" :value="item">
					{{ item.label }}

					<ComboboxItemIndicator>
						<Check :class="cn('ml-auto h-4 w-4 text-blue-500')" />
					</ComboboxItemIndicator>
				</ComboboxItem>
			</ComboboxGroup>
		</ComboboxList>
	</Combobox>
</template>
