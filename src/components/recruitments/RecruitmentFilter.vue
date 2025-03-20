<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { X } from 'lucide-vue-next';
import ScrollArea from '../ui/scroll-area/ScrollArea.vue';
import Separator from '../ui/separator/Separator.vue';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import Badge from '../ui/badge/Badge.vue';
import { ref } from 'vue';
import type { ComboboxType } from '@/types';
import FilterIcon from '@/assets/icons/Outline/Tuning.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import IconFromSvg from '../common/IconFromSvg.vue';

const accordionItems = [
	{
		value: 'status',
		title: 'Status',
		items: [
			{
				label: 'To-do',
				value: 'to-do',
			},
			{
				label: 'Rejected',
				value: 'rejected',
			},
			{
				label: 'Approved',
				value: 'approved',
			},
		],
		icon: ChartSqare,
	},
	{
		value: 'branch',
		title: 'Branch',
		items: [
			{
				label: 'Đà Nẵng',
				value: 'dn',
			},
			{
				label: 'Hà Nội',
				value: 'hn',
			},
		],
		icon: Building3,
	},
	{
		value: 'department',
		title: 'Department',
		items: [
			{
				label: 'Design',
				value: 'design',
			},
			{
				label: 'Marketing',
				value: 'marketing',
			},
			{
				label: 'Product',
				value: 'product',
			},
			{
				label: 'Development',
				value: 'development',
			},
			{
				label: 'Back Office',
				value: 'BO',
			},
			{
				label: 'E-commerce',
				value: 'ecommerce',
			},
		],
		icon: Building,
	},
	{
		value: 'employment_type',
		title: 'Employment type',
		items: [
			{
				label: 'Part-time',
				value: 'part_time',
			},
			{
				label: 'Full-time',
				value: 'full_time',
			},
		],
		icon: Case,
	},
	{
		value: 'level',
		title: 'Level',
		items: [
			{
				label: 'Intern',
				value: 'Intern',
			},
			{
				label: 'Fresher',
				value: 'Fresher',
			},
			{
				label: 'Junior',
				value: 'Junior',
			},
			{
				label: 'Mid-Level',
				value: 'Mid_Level',
			},
			{
				label: 'Senior',
				value: 'Senior',
			},
		],
		icon: Chart2,
	},
];

const selectedFilter = ref<ComboboxType[]>([
	{
		label: 'To-do',
		value: 'to-do',
	},
	{
		label: 'Đà Nẵng',
		value: 'dn',
	},
	{
		label: 'Design',
		value: 'design',
	},
	{
		label: 'Intern',
		value: 'Intern',
	},
	{
		label: 'Full-time',
		value: 'full_time',
	},
]);

const handleRemoveFilter = (value: string) => {
	const filter = selectedFilter.value.findIndex((item) => item.value === value);
	if (filter > -1) {
		selectedFilter.value.splice(filter, 1);
	}
};

const handleAddFilter = (filter: ComboboxType) => {
	const index = selectedFilter.value.findIndex((item) => item.value === filter.value);
	if (index > -1) {
		selectedFilter.value.splice(index, 1);
		return;
	}
	selectedFilter.value.push(filter);
};

const handleReset = () => {
	selectedFilter.value = [];
};
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<Button variant="outline" class="rounded-2xl gap-1">
				<IconFromSvg :icon="FilterIcon" />
				Filter <span v-if="selectedFilter.length > 0">({{ selectedFilter.length }})</span>
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-80 p-4 pr-0 text-sm" align="end">
			<ScrollArea class="h-96 w-full relative pr-4">
				<div v-if="selectedFilter.length > 0" class="sticky top-0 w-full bg-white z-20">
					<p>Selected filters</p>
					<div class="flex gap-1 flex-wrap mt-2">
						<Badge
							v-for="(item, index) in selectedFilter"
							:key="index"
							variant="outline"
							class="text-xs font-normal py-1 flex gap-2"
							:class="['bg-blue-500 hover:bg-blue-500 text-white']"
							>{{ item.label }}
							<button @click="() => handleRemoveFilter(item.value)">
								<X :size="14" /></button
						></Badge>
					</div>
					<Separator class="mt-4" />
				</div>
				<Accordion type="multiple" class="w-full" collapsible>
					<AccordionItem
						v-for="(item, index) in accordionItems"
						:key="index"
						:value="item.value"
						class="border-none">
						<AccordionTrigger class="hover:no-underline">
							<div class="flex gap-2 items-center font-normal text-slate-600">
								<IconFromSvg :icon="item.icon" />
								{{ item.title }}
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div class="flex flex-wrap gap-2">
								<Badge
									v-for="(i, index) in item.items"
									:key="index"
									variant="outline"
									class="text-xs font-normal hover:cursor-pointer py-1"
									:class="[
										selectedFilter.some((filter) => filter.value === i.value)
											? 'bg-blue-500 hover:bg-blue-500 text-white'
											: '',
									]"
									@click="() => handleAddFilter(i)"
									>{{ i.label }}</Badge
								>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</ScrollArea>
			<div class="flex justify-center gap-4 items-center pt-4 pr-4">
				<Button variant="outline" class="rounded-2xl h-auto py-3 px-8" @click="handleReset">
					Reset
				</Button>
				<Button
					class="bg-blue-500 hover:bg-blue-500 text-white rounded-2xl h-auto py-3 px-8">
					Apply
				</Button>
			</div>
		</PopoverContent>
	</Popover>
</template>
