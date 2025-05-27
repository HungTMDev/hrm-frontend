<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import DocumentAdd from '@/assets/icons/Outline/Document Add.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import RejectDialog from '@/components/common/RejectDialog.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { recruitmentRequestColumn } from '@/components/recruitments/recruitment-request/recruitment-request.column';
import RecruitmentRequestSheet from '@/components/recruitments/recruitment-request/RecruitmentRequestSheet.vue';
import Button from '@/components/ui/button/Button.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useBranch } from '@/composables/branch/useBranch';
import { useDepartment } from '@/composables/department/useDepartment';
import { useRecruitmentRequest } from '@/composables/recruitment/recruitment-request/useRecruitmentRequest';
import {
	useApproveRecruitmentRequest,
	useCancelRecruitmentRequest,
	useRejectRecruitmentRequest,
	useSubmitRecruitmentRequest,
} from '@/composables/recruitment/recruitment-request/useUpdateRecruitmentRequest';
import {
	DEFAULT_PAGINATION,
	listEmploymentType,
	listJobLevel,
	listRecruitmentRequestStatus,
} from '@/constants';
import router from '@/routers';
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
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { data: branches } = useBranch();
const { data: departments } = useDepartment();

const query = computed(() => route.query);
const isOpenSheet = ref(false);
const isOpenDialog = ref(false);
const isOpenAlert = ref(false);
const isView = ref(false);
const dataSent = ref<IRecruitmentRequest>();
const pageIndex = ref(
	query.value.page ? Number(query.value.page) - 1 : DEFAULT_PAGINATION.DEFAULT_PAGE - 1,
);
const pageSize = ref(
	query.value.limit ? Number(query.value.limit) : DEFAULT_PAGINATION.DEFAULT_LIMIT,
);
const filterData = ref<FilterData[]>([]);

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
const { mutate: rejectRequest, isPending: isRejecting } = useRejectRecruitmentRequest(
	pagination,
	filterPayload,
);
const { mutate: cancelRequest, isPending } = useCancelRecruitmentRequest(pagination, filterPayload);

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
	isOpenSheet.value = false;
};

const handleApproveRequest = (id: string) => {
	approveRequest(id);
	isOpenSheet.value = false;
};

const handleOpenDialog = (payload: IRecruitmentRequest) => {
	dataSent.value = payload;
	isOpenDialog.value = true;
};

const handleRecall = (payload: IRecruitmentRequest) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
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
		handleRecall,
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
	isOpenDialog.value = open;
};

const handleRejectRequest = (reason: string) => {
	rejectRequest(
		{ id: dataSent.value?.id!, reason },
		{
			onSuccess: () => {
				dataSent.value = undefined;
				isOpenDialog.value = false;
				isOpenSheet.value = false;
			},
		},
	);
};

const handleFilter = (payload: FilterData[]) => {
	const newFilter: Record<string, string[]> = {};
	payload.forEach((item) => {
		newFilter[item.field] = item.filters.map((i) => i.value);
	});

	pageIndex.value = 0;

	filterPayload.value = newFilter;
};

const handleCancelRequest = () => {
	cancelRequest(dataSent.value?.id || '', {
		onSuccess: () => {
			dataSent.value = undefined;
			isOpenAlert.value = false;
			isOpenSheet.value = false;
		},
	});
};

const handleCloseAlert = () => {
	isOpenAlert.value = false;
};

const syncQueryToFilter = () => {
	const keys = Object.keys(query.value) as (keyof IRecruitmentRequestFilter)[];

	for (let key of keys) {
		if ((key as any) === 'page' || (key as any) === 'limit') continue;

		if (key === 'order') {
			filterPayload.value[key] = 'DESC';
			continue;
		}

		if (key === 'keywords') {
			filterPayload.value[key] = (query.value[key] as string) ?? undefined;
			continue;
		}

		filterPayload.value[key] =
			typeof query.value[key] === 'string'
				? [query.value[key] as string]
				: (query.value[key] as string[]);

		const item = accordionItems.value.find((item) => item.value === key);
		if (item) {
			const selectedItems =
				item.items?.filter((i) =>
					(filterPayload.value[key] as string[]).includes(i.value),
				) || [];

			if (selectedItems.length) {
				filterData.value.push({
					field: key,
					filters: selectedItems,
				});
			}
		}
	}
};

watch([pageIndex, pageSize, filterPayload], () => {
	router.replace({
		query: { page: pageIndex.value + 1, limit: pageSize.value, ...filterPayload.value },
	});
});

watch([branches, departments], ([newBranches, newDepartments]) => {
	if (newBranches && newDepartments) {
		syncQueryToFilter();
	}
});
</script>
<template>
	<ContentWrapper class="flex gap-2 flex-col">
		<Title>Recruitment Requests</Title>
		<div class="flex justify-end gap-2 items-center">
			<FilterPopover
				:model-value="filterData"
				:list="accordionItems"
				@update:value="handleFilter" />
			<Button
				class="h-auto py-2.5 px-4 rounded-2xl bg-blue-500 hover:bg-blue-600"
				@click="handleOpenSheet"
				><IconFromSvg :icon="DocumentAdd" /> Create request</Button
			>
		</div>
		<DataTable
			:table="table"
			@row:click="(payload) => handleOpenSheet(payload, true)"
			:is-loading="isLoading" />
		<Separator class="mb-4" />
		<DataTablePagination :table="table" :meta="meta" item-name="requests" />
	</ContentWrapper>
	<RecruitmentRequestSheet
		:data="dataSent"
		:open="isOpenSheet"
		:is-view="isView"
		:pagination="pagination"
		:filter="filterPayload"
		@edit="isView = false"
		@update:open="handleCloseSheet"
		@open-dialog="isOpenDialog = true"
		@approve="handleApproveRequest"
		@recall="handleCancelRequest" />
	<RejectDialog
		:open="isOpenDialog"
		:is-loading="isRejecting"
		:description="dataSent?.title"
		@update:open="handleCloseDialog"
		@confirm="handleRejectRequest" />
	<AlertPopup
		:open="isOpenAlert"
		:description="dataSent?.title"
		:is-loading="isPending"
		title="Are  you sure you want to delete this request?"
		@confirm="handleCancelRequest"
		@update:open="handleCloseAlert" />
</template>
