<script lang="ts" setup>
import DocumentAdd from '@/assets/icons/Outline/Document Add.svg';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import { leaveRequestColumns } from '@/components/center-request/leave-request/columns';
import LeaveRequestSheet from '@/components/center-request/leave-request/LeaveRequestSheet.vue';
import RecallDialog from '@/components/center-request/RecallDialog.vue';
import AlertPopup from '@/components/common/AlertPopup.vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import RejectDialog from '@/components/common/RejectDialog.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import Button from '@/components/ui/button/Button.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useGetAccount } from '@/composables/auth/useAuth';
import type { LeaveRequest } from '@/types/center-request';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { ref } from 'vue';

const { data: account } = useGetAccount();

const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const isOpenDialog = ref(false);
const isOpenRejectDialog = ref(false);
const isView = ref(false);
const dataSent = ref<LeaveRequest>();

const handleOpenSheet = (payload?: any, view?: boolean) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = undefined;
	} else dataSent.value = payload;
	isView.value = view ?? false;
	isOpenSheet.value = true;
};

const handleOpenAlert = (payload?: LeaveRequest) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const handleOpenDialog = (payload?: LeaveRequest) => {
	dataSent.value = payload;
	isOpenDialog.value = true;
};

const handleOpenRejectDialog = (payload?: LeaveRequest) => {
	dataSent.value = payload;
	isOpenRejectDialog.value = true;
};

const table = useVueTable({
	data: [
		{
			id: 351613,
			name: 'Trần Song Quỳnh',
			leave_type: 'Full day',
			leave_shift: '-',
			start_day: '15/03/2025',
			end_day: '16/03/2025',
			total_days: 1.0,
			status: 'APPROVED',
		},
		{
			id: 351614,
			name: 'Nguyễn Đức Phát',
			leave_type: 'Half day',
			leave_shift: 'Morning',
			start_day: '16/03/2025',
			end_day: '16/03/2025',
			total_days: 0.5,
			status: 'TO_DO',
		},
		{
			id: 351616,
			name: 'Nguyễn Đức Phát',
			leave_type: 'Half day',
			leave_shift: 'Morning',
			start_day: '16/03/2025',
			end_day: '16/03/2025',
			total_days: 0.5,
			status: 'CANCELING',
		},
		{
			id: 351615,
			name: 'Trịnh Minh Hưng',
			leave_type: 'Full day',
			leave_shift: '-',
			start_day: '20/03/2025',
			end_day: '21/03/2025',
			total_days: 1.0,
			status: 'REJECTED',
		},
		{
			id: 351617,
			name: 'Huỳnh Minh Huy',
			leave_type: 'Half day',
			leave_shift: 'Afternoon',
			start_day: '28/03/2025',
			end_day: '28/03/2025',
			total_days: 0.5,
			status: 'APPROVED',
		},
		{
			id: 351618,
			name: 'Lê Tất Tuấn',
			leave_type: 'Hourly leave',
			leave_shift: '-',
			start_day: '02/04/2025 (15:00)',
			end_day: '03/04/2025 (17:00)',
			total_days: 1.0,
			status: 'TO_DO',
		},
		{
			id: 351619,
			name: 'Nguyễn Thanh Long',
			leave_type: 'Half day',
			leave_shift: 'Morning',
			start_day: '05/04/2025',
			end_day: '05/04/2025',
			total_days: 0.5,
			status: 'DRAFT',
		},
		{
			id: 351620,
			name: 'Lê Quang Phúc',
			leave_type: 'Full day',
			leave_shift: '-',
			start_day: '10/04/2025',
			end_day: '11/04/2025',
			total_days: 1.0,
			status: 'TO_DO',
		},
		{
			id: 351621,
			name: 'Bùi Thị Hương',
			leave_type: 'Hourly leave',
			leave_shift: '-',
			start_day: '15/04/2025 (15:00)',
			end_day: '17/04/2025 (17:00)',
			total_days: 0.5,
			status: 'REJECTED',
		},
		{
			id: 351622,
			name: 'Trương Văn Phúc',
			leave_type: 'Half day',
			leave_shift: 'Afternoon',
			start_day: '20/04/2025',
			end_day: '20/04/2025',
			total_days: 0.5,
			status: 'CANCELED',
		},
		{
			id: 351623,
			name: 'Nguyễn Thị Cẩm',
			leave_type: 'Half day',
			leave_shift: 'Morning',
			start_day: '23/05/2025',
			end_day: '23/05/2025',
			total_days: 0.5,
			status: 'TO_DO',
		},
	],
	columns: leaveRequestColumns(
		handleOpenSheet,
		handleOpenDialog,
		handleOpenAlert,
		handleOpenRejectDialog,
	),
	getCoreRowModel: getCoreRowModel(),
});

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isView.value = false;
	isOpenSheet.value = open;
};

const handleCloseAlert = (open: boolean) => {
	isOpenAlert.value = open;
};

const handleCloseDialog = (open: boolean) => {
	isOpenDialog.value = open;
};

const handleCloseRejectDialog = (open: boolean) => {
	isOpenRejectDialog.value = open;
};
</script>
<template>
	<ContentWrapper>
		<Title>Leave request</Title>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon :icon="Magnifer" class="py-2 flex-1 rounded-full" placeholder="Search" />
			<DisplayColumn :list="[]" />
			<FilterPopover :list="[]" />
			<Button
				v-if="!account?.roles.some((item) => item === 'ADMIN' || item === 'CEO')"
				class="bg-blue-500 hover:bg-blue-600 rounded-2xl font-medium"
				@click="handleOpenSheet">
				<IconFromSvg :icon="DocumentAdd" />Create request
			</Button>
		</div>
		<div>
			<DataTable :table="table" @row:click="(payload) => handleOpenSheet(payload, true)" />
			<Separator class="my-3" />
			<DataTablePagination :table="table" />
		</div>
	</ContentWrapper>
	<LeaveRequestSheet
		:open="isOpenSheet"
		:is-view="isView"
		:data="dataSent"
		@edit="isView = false"
		@back="isView = true"
		@reject="handleOpenRejectDialog"
		@recall="handleOpenDialog"
		@update:open="handleCloseSheet" />

	<RecallDialog :open="isOpenDialog" @update:open="handleCloseDialog" />

	<RejectDialog
		:open="isOpenRejectDialog"
		title="Are your sure you want to reject this recruitment request?"
		:description="dataSent?.name"
		@update:open="handleCloseRejectDialog" />

	<AlertPopup :open="isOpenAlert" :description="dataSent?.name" @update:open="handleCloseAlert" />
</template>
