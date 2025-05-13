<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import RejectDialog from '@/components/common/RejectDialog.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { recruitmentRequestColumn } from '@/components/recruitments/recruitment-request/recruitment-request.column';
import RecruitmentRequestSheet from '@/components/recruitments/recruitment-request/RecruitmentRequestSheet.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import {
	DEFAULT_PAGINATION,
	listEmploymentType,
	listJobLevel,
	listRecruitmentRequestStatus,
} from '@/constants';
import { useBranch } from '@/composables/branch/useBranch';
import { useDepartment } from '@/composables/department/useDepartment';
import { useRecruitmentRequest } from '@/composables/recruitment/recruitment-request/useRecruitmentRequest';
import {
	useApproveRecruitmentRequest,
	useRejectRecruitmentRequest,
	useSubmitRecruitmentRequest,
} from '@/composables/recruitment/recruitment-request/useUpdateRecruitmentRequest';
import type {
	FilterAccordion,
	FilterData,
	IBranch,
	IDepartment,
	IMeta,
	IRecruitmentRequest,
	IRecruitmentRequestFilter,
} from '@/types';
import { getCoreRowModel, useVueTable, type PaginationState } from '@tanstack/vue-table';
import { computed, ref } from 'vue';
import Button from '@/components/ui/button/Button.vue';

const { data: branches } = useBranch();
const { data: departments } = useDepartment();

const isOpenSheet = ref(false);
const isOpenDialog = ref(false);
const isView = ref(false);
const dataSent = ref<IRecruitmentRequest>();
const pageIndex = ref(DEFAULT_PAGINATION.DEFAULT_PAGE - 1);
const pageSize = ref(DEFAULT_PAGINATION.DEFAULT_LIMIT);
const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));
const filterPayload = ref<Partial<IRecruitmentRequestFilter>>({});

const pageCount = computed(() => meta.value?.total_pages);
const accordionItems = computed<FilterAccordion[]>(() => [
	{
		value: 'status',
		title: 'Status',
		items: listRecruitmentRequestStatus,
		icon: ChartSqare,
		type: 'list',
	},
	{
		value: 'branch_id',
		title: 'Branch',
		items:
			(branches.value as IBranch[])?.map((item) => ({
				label: item.name,
				value: item.id,
			})) || [],
		icon: Building3,
		type: 'list',
	},
	{
		value: 'department_id',
		title: 'Department',
		items:
			(departments.value as IDepartment[])?.map((item) => ({
				label: item.name,
				value: item.id,
			})) || [],
		icon: Building,
		type: 'list',
	},
	{
		value: 'employment_type',
		title: 'Employment type',
		items: listEmploymentType,
		icon: Case,
		type: 'list',
	},
	{
		value: 'level',
		title: 'Level',
		items: listJobLevel,
		icon: Chart2,
		type: 'list',
	},
]);

const { data, isLoading } = useRecruitmentRequest(pagination, filterPayload);
const { mutate: submitRequest } = useSubmitRecruitmentRequest(pagination, filterPayload);
const { mutate: approveRequest } = useApproveRecruitmentRequest(pagination, filterPayload);
const { mutateAsync: rejectRequest, isPending: isRejecting } = useRejectRecruitmentRequest(
	pagination,
	filterPayload,
);

const recruimentRequests = computed<IRecruitmentRequest[]>(() => data.value?.data || []);
const meta = computed<IMeta | undefined>(() => data.value?.meta);

const setPageSize = (newSize: number) => (pageSize.value = newSize);
const setPageIndex = (newIndex: number) => (pageIndex.value = newIndex);

const setPagination = ({ pageIndex, pageSize }: PaginationState): PaginationState => {
	setPageIndex(pageIndex);
	setPageSize(pageSize);

	return { pageIndex, pageSize };
};

const handleOpenSheet = (data?: IRecruitmentRequest, view?: boolean) => {
	if (data instanceof PointerEvent) dataSent.value = undefined;
	else dataSent.value = data;

	isView.value = view ?? false;
	isOpenSheet.value = true;
};

const handleSubmitRequest = (id: string) => {
	submitRequest(id);
};

const handleApproveRequest = (id: string) => {
	approveRequest(id);
};

const handleOpenDialog = (payload: IRecruitmentRequest) => {
	dataSent.value = payload;
	isOpenDialog.value = true;
};

const table = useVueTable({
	get data() {
		return recruimentRequests.value;
	},
	get pageCount() {
		return pageCount.value ?? 0;
	},
	get rowCount() {
		return meta.value?.total_records ?? 0;
	},

	columns: recruitmentRequestColumn(
		handleOpenSheet,
		handleSubmitRequest,
		handleApproveRequest,
		handleOpenDialog,
	),
	initialState: {
		pagination: pagination.value,
	},
	manualPagination: true,

	getCoreRowModel: getCoreRowModel(),
	onPaginationChange: (updater) => {
		if (typeof updater === 'function') {
			setPagination(updater(pagination.value));
		} else {
			setPagination(updater);
		}
	},
});

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isOpenSheet.value = open;
};

const handleCloseDialog = (open: boolean) => {
	dataSent.value = undefined;
	isOpenDialog.value = open;
};

const handleRejectRequest = async (reason: string) => {
	const res = await rejectRequest({ id: dataSent.value?.id!, reason });
	if (res.status_code === 200) {
		isOpenDialog.value = false;
	}
};

const handleFilter = (payload: FilterData[]) => {
	const newFilter: Record<string, string[]> = {};
	payload.forEach((item) => {
		newFilter[item.field] = item.filters.map((i) => i.value);
	});
	filterPayload.value = newFilter;
};
</script>
<template>
	<ContentWrapper class="flex gap-2 flex-col">
		<Title>Recruitment requests</Title>
		<div class="flex justify-end gap-2 items-center">
			<FilterPopover :list="accordionItems" @update:value="handleFilter" />
			<Button
				class="h-auto py-2.5 px-6 rounded-2xl bg-blue-500 hover:bg-blue-600"
				@click="handleOpenSheet"
				>Add new request</Button
			>
		</div>
		<DataTable
			:table="table"
			@row:click="(payload) => handleOpenSheet(payload, true)"
			:is-loading="isLoading" />
		<Separator class="mb-4" />
		<DataTablePagination :table="table" :meta="meta" />
	</ContentWrapper>
	<RecruitmentRequestSheet
		:data="dataSent"
		:open="isOpenSheet"
		:is-view="isView"
		:pagination="pagination"
		:filter="filterPayload"
		@update:open="handleCloseSheet"
		@open-dialog="handleCloseDialog" />
	<RejectDialog
		:open="isOpenDialog"
		:is-loading="isRejecting"
		@update:open="handleCloseDialog"
		@confirm="handleRejectRequest" />
</template>
