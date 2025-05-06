<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DateRangePicker from '@/components/common/DateRangePicker.vue';
import Sheet from '@/components/training/Sheet.vue';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { applicantStages } from '@/constants';
import { useCustomToast } from '@/lib/customToast';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/app.store';
import { onBeforeMount, ref } from 'vue';

export interface KanbanItem {
	id: number;
	name: string;
	status: string;
}

export interface KanbanData {
	id: number;
	stage: string;
	list: KanbanItem[];
}

const appStore = useAppStore();
const { showToast } = useCustomToast();

const data = ref<KanbanData[]>([]);
const isOpenSheet = ref(false);

onBeforeMount(() => {
	data.value = applicantStages.map((item, index) => {
		const itemCount = Math.floor(Math.random() * 10);
		const list = [];

		for (let i = 0; i < itemCount; i++) {
			list.push({
				id: Math.floor(Math.random() * 1000000),
				name: item.label + i,
				status: item.value,
			});
		}

		return {
			id: index,
			stage: item.label,
			list,
		};
	});
});

const handleOpenSheet = () => {
	isOpenSheet.value = true;
};

const handleCloseSheet = (open: boolean) => {
	isOpenSheet.value = open;
};

const onAdd = (event: any, stage: string) => {
	const currentItem = event.item.__draggable_context.element as KanbanItem;
	currentItem.status = stage;
	showToast({
		message: 'Success!',
		type: 'success',
	});
};
</script>
<template>
	<ContentWrapper
		:class="
			cn(appStore.isSmallSidebar ? 'max-w-[calc(100vw-115px)]' : 'max-w-[calc(100vw-270px)]')
		">
		<div class="text-end">
			<DateRangePicker />
		</div>
		<ScrollArea class="w-full pb-3 mt-4">
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	</ContentWrapper>
	<Sheet :open="isOpenSheet" @update:open="handleCloseSheet" />
</template>
