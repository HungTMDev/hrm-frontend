<script setup lang="ts">
import Close from '@/assets/icons/Outline/Close.svg';
import Sort from '@/assets/icons/Outline/Sort.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import { Button } from '@/components/ui/button';
import {
	Combobox,
	ComboboxAnchor,
	ComboboxItem,
	ComboboxList,
	ComboboxTrigger,
} from '@/components/ui/combobox';
import type { Column } from '@tanstack/vue-table';
import type { AcceptableValue } from 'reka-ui';
import { ref } from 'vue';
import Checkbox from '../ui/checkbox/Checkbox.vue';
import ScrollArea from '../ui/scroll-area/ScrollArea.vue';
import Separator from '../ui/separator/Separator.vue';

const props = defineProps<{
	list: Column<any>[];
}>();

const isOpen = ref(false);
const disableColumns = ref<Column<any>[]>([]);

const handleClose = () => {
	isOpen.value = false;
};

const handleOpen = (open: boolean) => {
	isOpen.value = open;
};

const handleSelect = (payload: AcceptableValue) => {
	disableColumns.value = payload as Column<any>[];
};

const handleApply = () => {
	props.list.forEach((item) => {
		if (disableColumns.value.some((i) => i.id === item.id)) {
			item.toggleVisibility(false);
		} else {
			item.toggleVisibility(true);
		}
	});
};

const handleReset = () => {
	disableColumns.value = [];
	handleApply();
};
</script>

<template>
	<Combobox
		:model-value="disableColumns"
		:open="isOpen"
		:multiple="true"
		@update:model-value="handleSelect"
		@update:open="handleOpen">
		<ComboboxAnchor as-child>
			<ComboboxTrigger as-child>
				<Button variant="outline" class="justify-between w-fit rounded-full text-sm">
					<IconFromSvg :icon="Sort" /> Display
				</Button>
			</ComboboxTrigger>
		</ComboboxAnchor>

		<ComboboxList align="end" :side-offset="-42" class="rounded-2xl border-none w-80 p-4">
			<div class="flex justify-between items-center">
				<div class="flex items-center gap-2"><IconFromSvg :icon="Sort" /> Display</div>
				<Button class="h-auto p-0" variant="ghost" @click="handleClose"
					><IconFromSvg :icon="Close"
				/></Button>
			</div>
			<Separator class="my-3" />
			<ScrollArea class="h-[450] w-full rounded-md">
				<ComboboxItem
					v-for="(column, index) in list"
					:key="index"
					:value="column"
					class="flex gap-2 justify-start items-center p-2">
					<Checkbox
						class="w-5 h-5 rounded-md data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 border-gray-300"
						:model-value="!disableColumns.some((item) => item.id === column.id)" />
					{{ column.columnDef.header }}
				</ComboboxItem>
			</ScrollArea>
			<div class="flex justify-center gap-2 items-center mt-4">
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
