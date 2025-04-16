<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { X } from 'lucide-vue-next';

import FilterIcon from '@/assets/icons/Outline/Tuning.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import Badge from '@/components/ui/badge/Badge.vue';
import type { ComboboxType, FilterAccordion, FilterData } from '@/types';
import { onMounted, ref } from 'vue';
import SliderCustom from '../custom/SliderCustom.vue';
import QuarterRange from './QuarterRange.vue';

interface Prop {
	list: FilterAccordion[];
}

const props = defineProps<Prop>();

const emit = defineEmits<{
	(e: 'update:value', payload: FilterData[]): void;
}>();

const isOpen = ref(false);
const selectedFilter = ref<Record<string, ComboboxType[]>>({});
const sliderList = ref<Record<string, number[]>>({});

const handleRemoveFilter = (field: string, value: ComboboxType) => {
	if (!selectedFilter.value[field]) return;

	const index = selectedFilter.value[field].findIndex((item) => item.value === value.value);

	if (index !== -1) {
		selectedFilter.value[field].splice(index, 1);
		if (selectedFilter.value[field].length === 0) {
			delete selectedFilter.value[field];
		}
		emit(
			'update:value',
			Object.entries(selectedFilter.value).map(([key, value]) => ({
				field: key,
				filters: value,
			})),
		);
	}
};

const handleAddFilter = (field: string, filter: ComboboxType) => {
	if (!selectedFilter.value[field]) {
		selectedFilter.value[field] = [];
	}

	const index = selectedFilter.value[field].findIndex((item) => item.value === filter.value);

	if (index > -1) {
		selectedFilter.value[field].splice(index, 1);
		if (selectedFilter.value[field].length === 0) {
			delete selectedFilter.value[field];
		}
	} else {
		selectedFilter.value[field].push(filter);
	}

	emit(
		'update:value',
		Object.entries(selectedFilter.value).map(([key, value]) => ({
			field: key,
			filters: value,
		})),
	);
};

const handleReset = () => {
	selectedFilter.value = {};
	emit(
		'update:value',
		Object.entries(selectedFilter.value).map(([key, value]) => ({
			field: key,
			filters: value,
		})),
	);
};

const handleOpen = (open: boolean) => {
	isOpen.value = open;
};

const handleClose = () => {
	isOpen.value = false;
};

const handleChangeNumberRange = (field: string, values: number[] | undefined) => {
	selectedFilter.value[field] = [
		{
			label: `${values?.[0] || 0} - ${values?.[1] || 0}`,
			value: `${values?.[0] || 0} - ${values?.[1] || 0}`,
		},
	];
};

const handleQuarterRange = (payload: { from: string; to: string }) => {
	selectedFilter.value['timeRange'] = [
		{
			label: `${payload.from} - ${payload.to}`,
			value: `${payload.from} - ${payload.to}`,
		},
	];
};

onMounted(() => {
	props.list.forEach((item) => {
		if (item.type === 'numberSlider') {
			sliderList.value[item.value] = [item?.min || 0, item?.max || 0];
			selectedFilter.value[item.value] = [
				{
					label: `${item?.min || 0} - ${item?.max || 0}`,
					value: `${item?.min || 0} - ${item?.max || 0}`,
				},
			];
		}
	});
});
</script>

<template>
	<Popover :open="isOpen" @update:open="handleOpen">
		<PopoverTrigger as-child>
			<Button variant="outline" class="rounded-full gap-1">
				<IconFromSvg :icon="FilterIcon" />
				Filter
			</Button>
		</PopoverTrigger>
		<PopoverContent
			class="w-80 p-4 pr-0 text-sm rounded-3xl border-none"
			align="end"
			:side-offset="-42">
			<div class="pr-4">
				<div class="flex justify-between">
					<div class="flex gap-2 items-center">
						<IconFromSvg :icon="FilterIcon" />
						Filter
					</div>
					<Button variant="ghost" class="p-0 h-fit" @click="handleClose"><X /> </Button>
				</div>
				<Separator class="mt-4" />
			</div>
			<ScrollArea class="h-96 w-full relative pr-4">
				<div
					v-if="JSON.stringify(selectedFilter) !== '{}'"
					class="sticky top-0 w-full bg-white z-20">
					<p class="text-slate-600">Selected filters</p>
					<div class="flex gap-1 flex-wrap mt-2">
						<template
							v-for="([key, item], index) in Object.entries(selectedFilter)"
							:key="index">
							<Badge
								v-for="(item1, index1) in item"
								:key="index1"
								variant="outline"
								class="text-xs font-normal py-1 flex gap-2"
								:class="['bg-blue-500 hover:bg-blue-500 text-white']"
								>{{ item1.label }}
								<button @click="() => handleRemoveFilter(key, item1)">
									<X :size="14" />
								</button>
							</Badge>
						</template>
					</div>
					<Separator class="mt-4" />
				</div>
				<Accordion type="multiple" class="w-full" collapsible>
					<AccordionItem
						v-for="(item, index) in list"
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
							<div
								v-if="item.type === 'list' && item.items"
								class="flex flex-wrap gap-2">
								<Badge
									v-for="(i, index) in item.items"
									:key="index"
									variant="outline"
									class="text-xs font-normal hover:cursor-pointer py-1"
									:class="[
										selectedFilter[item.value]?.some(
											(filter) => filter.value === i.value,
										)
											? 'bg-blue-500 hover:bg-blue-500 text-white'
											: '',
									]"
									@click="() => handleAddFilter(item.value, i)"
									>{{ i.label }}</Badge
								>
							</div>
							<div v-if="item.type === 'numberSlider'" class="pt-2">
								<SliderCustom
									v-model="sliderList[item.value]"
									:min="item.min"
									:max="item.max"
									:step="item.step"
									class=""
									@update:model-value="
										(values) => handleChangeNumberRange(item.value, values)
									" />
								<div class="flex gap-1 items-center justify-center mt-2">
									<span>{{ sliderList[item.value][0] }}</span> -
									<span>{{ sliderList[item.value][1] }}</span>
								</div>
							</div>
							<div v-if="item.type === 'timeRange'">
								<QuarterRange @update:value="handleQuarterRange" />
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
