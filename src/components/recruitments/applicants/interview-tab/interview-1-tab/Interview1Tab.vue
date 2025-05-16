<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useBranch } from '@/composables/branch/useBranch';
import { useDepartment } from '@/composables/department/useDepartment';
import { useApplicantInterview } from '@/composables/recruitment/applicant/useApplicant';
import {
	useCancelInterview,
	useCompleteInterview,
	useCreateInterview,
} from '@/composables/recruitment/applicant/useUpdateApplicant';
import {
	DEFAULT_PAGINATION,
	listEmploymentType,
	listJobStatus,
	RECRUITMENT_STAGE,
} from '@/constants';
import { valueUpdater } from '@/lib/utils';
import type {
	FilterAccordion,
	FilterData,
	IApplicantInterview,
	IApplicantInterviewFilter,
	IMeta,
	InterviewPayload,
} from '@/types';
import {
	getCoreRowModel,
	useVueTable,
	type PaginationState,
	type VisibilityState,
} from '@tanstack/vue-table';
import { computed, onMounted, ref } from 'vue';
import { interviewColumn } from '../column';
import InterviewSheet from '../InterviewSheet.vue';
import SetInterviewDialog from '../../SetInterviewDialog.vue';
import { applicantKey } from '@/composables/recruitment/applicant/key';
import { useQueryClient } from '@tanstack/vue-query';

const { data: branches } = useBranch();
const { data: departments } = useDepartment();

let timeout: any;
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const keywords = ref<string>();
const dataSent = ref<IApplicantInterview>();
const filter = ref<Record<string, string[]>>();
const isOpenAlert = ref(false);
const isOpenSheet = ref(false);
const isOpenDialog = ref(false);

const pageIndex = ref(DEFAULT_PAGINATION.DEFAULT_PAGE - 1);
const pageSize = ref(DEFAULT_PAGINATION.DEFAULT_LIMIT);
const filterPayload = computed<Partial<IApplicantInterviewFilter>>(() => ({
	stage: RECRUITMENT_STAGE.INTERVIEW_1,
	keywords: keywords.value,
	...filter.value,
}));

const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));

const { data, isLoading, refetch } = useApplicantInterview(pagination, filterPayload);

const applicants = computed<IApplicantInterview[]>(() => data.value?.data || []);
const meta = computed<IMeta | undefined>(() => data.value?.meta);
const pageCount = computed(() => meta.value?.total_pages);

const { mutate: completeInterview } = useCompleteInterview(pagination, filterPayload);
const { mutate: cancelInterview, isPending } = useCancelInterview(pagination, filterPayload);
const { mutate: createInterview } = useCreateInterview();

const accordionItems = computed<FilterAccordion[]>(() => [
	{
		value: 'status',
		title: 'Status',
		items: listJobStatus,
		icon: ChartSqare,
		type: 'list',
	},
	{
		value: 'branch',
		title: 'Branch',
		items: branches.value?.map((item: any) => ({ label: item.name, value: item.id })) || [],
		icon: Building3,
		type: 'list',
	},
	{
		value: 'department',
		title: 'Department',
		items: departments.value?.map((item: any) => ({ label: item.name, value: item.id })) || [],
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
]);

const setPageSize = (newSize: number) => (pageSize.value = newSize);
const setPageIndex = (newIndex: number) => (pageIndex.value = newIndex);

const setPagination = ({ pageIndex, pageSize }: PaginationState): PaginationState => {
	setPageIndex(pageIndex);
	setPageSize(pageSize);

	return { pageIndex, pageSize };
};

const handleOpenAlert = (payload: IApplicantInterview) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const handleComplete = (payload: IApplicantInterview) => {
	completeInterview(payload.id);
};

const handleOpenSheet = (payload?: IApplicantInterview, view?: boolean) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = undefined;
	} else {
		dataSent.value = payload;
	}
	isOpenSheet.value = true;
};

const handleOpenDialog = (payload?: IApplicantInterview) => {
	dataSent.value = payload;
	isOpenDialog.value = true;
};

const table = useVueTable({
	get data() {
		return applicants.value;
	},
	get pageCount() {
		return pageCount.value ?? 0;
	},
	get rowCount() {
		return meta.value?.total_records ?? 0;
	},
	columns: interviewColumn(handleComplete, handleOpenAlert, handleOpenSheet, handleOpenDialog),
	state: {
		get rowSelection() {
			return rowSelection.value;
		},
		get columnVisibility() {
			return columnVisibility.value;
		},
	},
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
	onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
	onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
});

const handleSearch = (payload: string | number) => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		keywords.value = payload === '' ? undefined : (payload as string);
	}, 500);
};

const handleFilter = (payload: FilterData[]) => {
	const newFilter: Record<string, string[]> = {};
	payload.forEach((item) => {
		newFilter[item.field] = item.filters.map((i) => i.value);
	});
	filter.value = newFilter;
};

const handleCloseAlert = (payload: boolean) => {
	dataSent.value = undefined;
	isOpenAlert.value = payload;
};

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isOpenSheet.value = open;
};

const handleCloseDialog = (open: boolean) => {
	dataSent.value = undefined;
	isOpenDialog.value = open;
};

const handleCancelInterview = () => {
	cancelInterview(dataSent.value?.id || '', {
		onSuccess: () => {
			isOpenAlert.value = false;
			dataSent.value = undefined;
		},
	});
};

const handleCreateInterview = (payload: InterviewPayload) => {
	createInterview(payload, {
		onSuccess: () => {
			const queryClient = useQueryClient();
			queryClient.invalidateQueries({
				queryKey: [applicantKey.interview, pagination, filter],
			});
		},
	});
};

onMounted(() => {
	refetch();
});
</script>
<template>
	<div>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search candidate"
				@update:model-value="handleSearch" />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<FilterPopover :list="accordionItems" @update:value="handleFilter" />
		</div>
		<div class="flex flex-col gap-3">
			<DataTable :table="table" :is-loading="isLoading" @row:click="handleOpenSheet" />
			<Separator />
			<DataTablePagination :table="table" :meta="meta" />
		</div>
	</div>

	<InterviewSheet
		:open="isOpenSheet"
		:data="dataSent?.id"
		:filter="filterPayload"
		:pagination="pagination"
		@update:open="handleCloseSheet" />

	<SetInterviewDialog
		:id="dataSent?.id"
		:open="isOpenDialog"
		:key="applicantKey.interview"
		:pagination="pagination"
		:filters="filterPayload"
		@update:open="handleCloseDialog"
		@submit="handleCreateInterview" />

	<AlertPopup
		:open="isOpenAlert"
		:description="dataSent?.candidate.full_name"
		:is-loading="isPending"
		@update:open="handleCloseAlert"
		@confirm="handleCancelInterview" />
</template>
