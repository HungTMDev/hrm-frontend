<script lang="ts" setup>
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import ChartSquare from '@/assets/icons/Outline/ChartSquare.svg';
import ChatLine from '@/assets/icons/Outline/ChatLine.svg';
import ClockCircle from '@/assets/icons/Outline/ClockCircle.svg';
import FileRight from '@/assets/icons/Outline/FileRight.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { ref } from 'vue';
import { leaveHistoryColumn } from './columns';
import type { LeaveHistory } from './type';

const isView = ref(false);
const isEdit = ref(false);
const dataSent = ref<LeaveHistory>();

const handleOpenView = (payload: any, edit?: boolean) => {
	dataSent.value = payload;
	if (edit) {
		isEdit.value = true;
		return;
	}
	isView.value = true;
};

const table = useVueTable({
	data: [
		{
			leave_type: 'Sick Leave',
			leave_start_day: '2025-05-14',
			leave_end_day: '2025-05-17',
			duration: '3 Days',
			status: 'REJECTED',
		},
		{
			leave_type: 'Sick Leave',
			leave_start_day: '2025-03-14',
			leave_end_day: '2025-03-15',
			duration: '1 Day',
			status: 'APPROVED',
		},
		{
			leave_type: 'Annual Leave',
			leave_start_day: '2025-06-10',
			leave_end_day: '2025-06-12',
			duration: '2 Days',
			status: 'CANCELLED',
		},
		{
			leave_type: 'Maternity Leave',
			leave_start_day: '2025-07-01',
			leave_end_day: '2025-07-15',
			duration: '14 Days',
			status: 'TO_DO',
		},
	],
	columns: leaveHistoryColumn(handleOpenView),
	getCoreRowModel: getCoreRowModel(),
});

const handleEdit = () => {
	isEdit.value = true;
	isView.value = false;
};

const handleCancel = () => {
	isEdit.value = false;
	isView.value = true;
};

const handleBack = () => {
	isView.value = false;
};
</script>
<template>
	<div class="h-full flex flex-col gap-4">
		<ScrollArea class="flex-1">
			<Title class="text-xl">Leave history</Title>

			<div v-if="isEdit">
				<form>
					<div class="grid grid-cols-2 gap-6 mt-4">
						<FormSelect
							:required="true"
							name="leave_type"
							label="Leave type"
							:list="[]"
							:icon="FileRight"
							placeholder="Select leave type" />
						<FormCalendar
							:required="true"
							name="leave_start_date"
							label="Leave start date" />
						<FormCalendar
							:required="true"
							name="leave_end_date"
							label="Leave end date" />
					</div>
					<div class="mt-4">
						<FormTextarea
							:required="true"
							name="reason"
							label="Reason"
							placeholder="Enter reason" />
					</div>
				</form>
			</div>

			<div v-else-if="isView" class="text-slate-600">
				<div class="grid items-start grid-cols-2 gap-6 mt-4">
					<InformationItem :icon="FileRight" label="Leave type" value="Sick leave" />
					<InformationItem :icon="ChartSquare" label="Status" value="Rejected" />
					<InformationItem
						:icon="CalendarIcon"
						label="Leave start date"
						value="May 14, 2025" />
					<InformationItem
						:icon="CalendarIcon"
						label="Leave end date"
						value="May 17, 2025" />
					<InformationItem :icon="ClockCircle" label="Duration" value="3 Days" />
				</div>
				<div class="mt-6">
					<div class="flex gap-2 items-center">
						<IconFromSvg :icon="ChatLine" />
						Reason
					</div>
					<p class="mt-2 text-black">
						I am writing to formally request a leave of absence for a duration of two
						days, as I am currently experiencing some health issues that require my
						attention. I appreciate your understanding and support during this time, and
						I assure you that I will do my best to catch up on any missed work upon my
						return. Thank you for considering my request.
					</p>
				</div>
			</div>
			<div v-else class="border p-2 rounded-2xl mt-4">
				<DataTable :table="table" @row:click="handleOpenView" />
				<Separator class="my-3" />
				<DataTablePagination :table="table" />
			</div>
		</ScrollArea>
		<div class="flex justify-end gap-3">
			<Button
				v-if="isView"
				variant="outline"
				class="h-auto py-3 rounded-2xl px-6"
				@click="handleBack">
				Back
			</Button>
			<Button
				v-if="isView && dataSent?.status === 'TO_DO'"
				class="bg-blue-50 text-blue-500 hover:bg-blue-50 h-auto py-3 rounded-2xl px-6"
				@click="handleEdit">
				<IconFromSvg :icon="Pen2" />Edit
			</Button>
			<Button
				v-if="isEdit"
				variant="outline"
				class="h-auto py-3 px-6 rounded-2xl"
				@click="handleCancel">
				Cancel
			</Button>
			<Button
				form="form"
				v-if="isEdit"
				class="h-auto py-3 px-6 hover:bg-blue-600 rounded-2xl">
				Save
			</Button>
		</div>
	</div>
</template>
