<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Close from '@/assets/icons/Outline/Close.svg';
import Down from '@/assets/icons/Outline/AltArrowDown.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import { computed, ref } from 'vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { ComboboxType } from '@/types';
import CommonCombobox from '@/components/common/CommonCombobox.vue';

const radioList: ComboboxType[] = [
	{
		label: 'Yearly',
		value: 'yearly',
	},
	{
		label: 'Quarterly',
		value: 'quarterly',
	},
	{
		label: 'Monthly',
		value: 'monthly',
	},
];

const yearList: ComboboxType[] = [
	{
		label: '2022',
		value: '2022',
	},
	{
		label: '2023',
		value: '2023',
	},
	{
		label: '2024',
		value: '2024',
	},
	{
		label: '2025',
		value: '2025',
	},
];

const monthList: ComboboxType[] = [
	{
		label: '1',
		value: '1',
	},
	{
		label: '2',
		value: '2',
	},
	{
		label: '3',
		value: '3',
	},
	{
		label: '4',
		value: '4',
	},
	{
		label: '5',
		value: '5',
	},
	{
		label: '6',
		value: '6',
	},
	{
		label: '7',
		value: '7',
	},
	{
		label: '8',
		value: '8',
	},
	{
		label: '9',
		value: '9',
	},
	{
		label: '10',
		value: '10',
	},
	{
		label: '11',
		value: '11',
	},
	{
		label: '12',
		value: '12',
	},
];

const quarterList: ComboboxType[] = [
	{
		label: '1',
		value: '1',
	},
	{
		label: '2',
		value: '2',
	},
	{
		label: '3',
		value: '3',
	},
	{
		label: '4',
		value: '4',
	},
];

const isOpen = ref(false);
const label = ref('Year');
const radioValue = ref<string>(radioList[0].value as string);

const comboboxList = computed(() => {
	if (radioValue.value === 'quarterly') {
		label.value = 'Quarter';
		return quarterList;
	}
	if (radioValue.value === 'monthly') {
		label.value = 'Month';
		return monthList;
	}
	label.value = 'Year';
	return yearList;
});

const handleClose = () => {
	isOpen.value = false;
};

const handleOpen = (open: boolean) => {
	isOpen.value = open;
};

const handleRadio = (payload: string) => {
	radioValue.value = payload;
};

const handleReset = () => {
	radioValue.value = 'yearly';
};
</script>

<template>
	<Popover :open="isOpen" @update:open="handleOpen">
		<PopoverTrigger as-child>
			<Button variant="outline" class="rounded-3xl">
				<IconFromSvg :icon="Calendar" /> 2025 <IconFromSvg :icon="Down" />
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-80 rounded-3xl border-none" :side-offset="-42" align="end">
			<div class="flex justify-between items-center">
				<div class="flex items-center gap-2"><IconFromSvg :icon="Calendar" /> Time</div>
				<Button class="h-auto p-0" variant="ghost" @click="handleClose"
					><IconFromSvg :icon="Close"
				/></Button>
			</div>
			<Separator class="my-4" />
			<RadioGroup :model-value="radioValue" @update:model-value="handleRadio" class="gap-4">
				<div v-for="item in radioList" :key="item.value" class="flex items-center space-x-2">
					<RadioGroupItem
						:id="item.value as string"
						:value="item.value"
						class="text-blue-500"
						:class="item.value === radioValue ? 'border-blue-500' : ''" />
					<Label :for="item.value as string" class="text-slate-600 font-normal">{{
						item.label
					}}</Label>
				</div>
			</RadioGroup>
			<Separator class="my-4" />
			<div>
				<Label>{{ label }}</Label>
				<CommonCombobox
					:list="comboboxList"
					:label="label"
					class="w-full rounded-2xl py-3 h-auto mt-2" />
			</div>
			<div class="mt-4 flex justify-end gap-2">
				<Button class="h-auto px-6 py-3.5 rounded-2xl" variant="outline" @click="handleReset"
					>Reset</Button
				>
				<Button class="h-auto px-6 py-3.5 rounded-2xl bg-blue-500 text-white hover:bg-blue-600"
					>Apply</Button
				>
			</div>
		</PopoverContent>
	</Popover>
</template>
