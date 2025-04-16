<script lang="ts" setup>
import InformationItem from '@/components/common/InformationItem.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ChartSquare from '@/assets/icons/Outline/Chart Square.svg';
import ClockCircle from '@/assets/icons/Outline/Clock Circle.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';
import FileText from '@/assets/icons/Outline/File Text.svg';
import Weigher from '@/assets/icons/Outline/Weigher.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import { PAYROLL_FILE_STATUS_STYLE } from '@/constants';
import Button from '@/components/ui/button/Button.vue';
import type { PayrollFileManagement } from '@/types';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import Download from '@/assets/icons/Outline/Download Minimalistic.svg';
import Title from '@/components/common/Title.vue';

defineProps<{
	data?: PayrollFileManagement;
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
	<ScrollArea class="flex-1 pr-3 mt-4">
		<SheetHeader>
			<Title class="text-black">Song Quynh - Payroll for April 2025</Title>
			<SheetTitle></SheetTitle>
			<SheetDescription></SheetDescription>
		</SheetHeader>
		<ScrollArea class="h-[300px] rounded-2xl pr-3"></ScrollArea>
		<div class="grid gap-4">
			<div class="grid grid-cols-2 items-center">
				<div class="flex gap-2 items-center">
					<IconFromSvg :icon="ChartSquare" />
					Status
				</div>
				<StatusTag status="Confirmed" :class="PAYROLL_FILE_STATUS_STYLE['Confirmed']" />
			</div>
			<InformationItem :icon="ClockCircle" label="Payroll period" value="April 2025" />
			<InformationItem :icon="Calendar" label="Upload date" value="May 04, 2025" />
			<InformationItem :icon="UserCircle" label="Created by" value="Lê Thị Linh Ly" />
			<InformationItem
				:icon="FileText"
				label="File name"
				value="payroll_transongquynh_351613_202504.pdf" />
			<InformationItem :icon="Weigher" label="File size" value="1.25MB" />
		</div>
	</ScrollArea>
	<SheetFooter>
		<Button class="text-green-500 bg-green-50 hover:bg-green-100 h-auto py-3 px-6 rounded-2xl">
			<IconFromSvg :icon="Download" /> Download
		</Button>
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
