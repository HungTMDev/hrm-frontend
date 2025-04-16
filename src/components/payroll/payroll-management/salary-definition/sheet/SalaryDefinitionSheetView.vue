<script lang="ts" setup>
import InformationItem from '@/components/common/InformationItem.vue';
import Title from '@/components/common/Title.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { SheetFooter, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import Dollar from '@/assets/icons/Outline/Dollar Minimalistic.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import ClockCircle from '@/assets/icons/Outline/Clock Circle.svg';
import User from '@/assets/icons/Outline/User Circle.svg';
import { Button } from '@/components/ui/button';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import type { SalaryDefinition } from '@/types';
import IconFromSvg from '@/components/common/IconFromSvg.vue';

defineProps<{
	data?: SalaryDefinition;
}>();

const emit = defineEmits<{
	(e: 'edit'): void;
	(e: 'delete'): void;
}>();

const handleEdit = () => {
	emit('edit');
};

const handleDelete = () => {
	emit('delete');
};
</script>
<template>
	<ScrollArea class="flex-1">
		<SheetHeader>
			<SheetTitle></SheetTitle>
			<SheetDescription></SheetDescription>
			<Title class="text-black text-[28px]">UI/UX Designer Salary</Title>
		</SheetHeader>
		<div class="grid gap-6 mt-8">
			<InformationItem :icon="Chart2" label="Level" value="Mid-Level" />
			<InformationItem :icon="Dollar" label="Average salary" value="đ18,000,000" />
			<InformationItem :icon="Buildings" label="Department" value="Design" />
			<InformationItem :icon="Building3" label="Branch" value="Đà Nẵng" />
			<InformationItem :icon="Calendar" label="Quarter" value="Q2 2025" />
			<InformationItem :icon="ClockCircle" label="Last update" value="May 02,2025" />
			<InformationItem :icon="User" label="Created by" value="Lê Thị Linh Ly" />
		</div>
	</ScrollArea>
	<SheetFooter>
		<Button
			class="text-blue-500 bg-blue-50 hover:bg-blue-100 h-auto py-3 px-6 rounded-2xl"
			@click="handleEdit">
			<IconFromSvg :icon="Pen2" /> Edit
		</Button>
		<Button
			class="text-red-500 bg-red-50 hover:bg-red-100 h-auto py-3 px-6 rounded-2xl"
			@click="handleDelete">
			<IconFromSvg :icon="Trash" />
			Delete
		</Button>
	</SheetFooter>
</template>
