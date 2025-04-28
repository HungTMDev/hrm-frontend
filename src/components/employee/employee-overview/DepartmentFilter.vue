<script setup lang="ts">
import Down from '@/assets/icons/Outline/Alt Arrow Down.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Close from '@/assets/icons/Outline/Close.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import { Button } from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import {
	Combobox,
	ComboboxAnchor,
	ComboboxItem,
	ComboboxList,
	ComboboxTrigger,
} from '@/components/ui/combobox';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import type { ComboboxType } from '@/types';
import type { AcceptableValue } from 'reka-ui';
import { ref } from 'vue';

defineProps<{
	list: ComboboxType[];
}>();

const isOpen = ref(false);
const selectedDepartment = ref<ComboboxType[]>([]);

const handleClose = () => {
	isOpen.value = false;
};

const handleOpen = (open: boolean) => {
	isOpen.value = open;
};

const handleSelect = (payload: AcceptableValue) => {
	selectedDepartment.value = payload as ComboboxType[];
};

const handleApply = () => {
	handleClose();
};

const handleReset = () => {
	selectedDepartment.value = [];
	handleApply();
};
</script>

<template>
	<Combobox
		:model-value="selectedDepartment"
		:open="isOpen"
		:multiple="true"
		@update:model-value="handleSelect"
		@update:open="handleOpen">
		<ComboboxAnchor as-child>
			<ComboboxTrigger as-child>
				<Button variant="outline" class="justify-between w-fit rounded-full text-sm">
					<IconFromSvg :icon="Buildings" /> Department <IconFromSvg :icon="Down" />
				</Button>
			</ComboboxTrigger>
		</ComboboxAnchor>

		<ComboboxList align="end" :side-offset="-42" class="rounded-2xl border-none w-80 p-4">
			<div class="flex justify-between items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="Buildings" /> Department
				</div>
				<Button class="h-auto p-0" variant="ghost" @click="handleClose"
					><IconFromSvg :icon="Close"
				/></Button>
			</div>
			<Separator class="my-3" />
			<ScrollArea class="h-[250px] w-full rounded-md">
				<ComboboxItem
					v-for="(item, index) in list"
					:key="index"
					:value="item"
					class="flex gap-2 justify-start items-center p-2">
					<Checkbox
						class="w-5 h-5 rounded-md data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
						:model-value="!selectedDepartment.some((i) => i.value === item.value)" />
					{{ item.label }}
				</ComboboxItem>
			</ScrollArea>
			<Separator class="my-4" />
			<div class="flex justify-center gap-2 items-center">
				<Button
					class="rounded-2xl h-auto py-3.5 px-6"
					variant="outline"
					@click="handleReset"
					>Reset</Button
				>
				<Button
					class="rounded-2xl h-auto py-3.5 px-6 bg-blue-500 hover:bg-blue-600"
					@click="handleApply">
					Apply
				</Button>
			</div>
		</ComboboxList>
	</Combobox>
</template>
