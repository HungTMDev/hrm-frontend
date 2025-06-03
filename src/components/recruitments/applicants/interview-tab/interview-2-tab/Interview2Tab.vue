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
import { applicantKey } from '@/composables/recruitment/applicant/key';
import { useApplicantInterview } from '@/composables/recruitment/applicant/useApplicant';
import {
	useCancelInterview,
	useCompleteInterview,
	useCreateInterview,
	useUpdateStage,
} from '@/composables/recruitment/applicant/useUpdateApplicant';
import {
	DEFAULT_PAGINATION,
	listEmploymentType,
	listJobStatus,
	RECRUITMENT_STAGE,
} from '@/constants';
import { formatStatus, valueUpdater } from '@/lib/utils';
import type {
	FilterAccordion,
	FilterData,
	IApplicantInterview,
	IApplicantInterviewFilter,
	IMeta,
	InterviewPayload,
} from '@/types';
import { useQueryClient } from '@tanstack/vue-query';
import {
	getCoreRowModel,
	useVueTable,
	type PaginationState,
	type VisibilityState,
} from '@tanstack/vue-table';
import { computed, ref } from 'vue';
import SetInterviewDialog from '../../SetInterviewDialog.vue';
import { interviewColumn } from '../column';
import InterviewSheet from '../InterviewSheet.vue';

const { data: branches } = useBranch();
const { data: departments } = useDepartment();
const queryClient = useQueryClient();

let timeout: any;
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const keywords = ref<string>();
const filter = ref<Record<string, string[]>>();
const dataSent = ref<IApplicantInterview>();
const isOpenAlert = ref(false);
const isOpenSheet = ref(false);
const isOpenDialog = ref(false);
const action = ref<'cancel' | 'reject'>();

const pageIndex = ref(DEFAULT_PAGINATION.DEFAULT_PAGE - 1);
const pageSize = ref(DEFAULT_PAGINATION.DEFAULT_LIMIT);
const filterPayload = computed<Partial<IApplicantInterviewFilter>>(() => ({
	stage: RECRUITMENT_STAGE.INTERVIEW_2,
	keywords: keywords.value,
	...filter.value,
}));

const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));

const { data, isLoading } = useApplicantInterview(pagination, filterPayload);

const applicants = computed<IApplicantInterview[]>(() => data.value?.data || []);
const meta = computed<IMeta | undefined>(() => data.value?.meta);
const pageCount = computed(() => meta.value?.total_pages);

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

const { mutate: cancelInterview, isPending } = useCancelInterview(pagination, filterPayload);
const { mutate: createInterview, isPending: isPendingInterview } = useCreateInterview();
const { mutate: updateStage, isPending: isPendingUpdate } = useUpdateStage();
const { mutate: completeInterview, isPending: isCompleting } = useCompleteInterview(
	pagination,
	filterPayload,
);

const setPageSize = (newSize: number) => (pageSize.value = newSize);
const setPageIndex = (newIndex: number) => (pageIndex.value = newIndex);

const setPagination = ({ pageIndex, pageSize }: PaginationState): PaginationState => {
	setPageIndex(pageIndex);
	setPageSize(pageSize);

	return { pageIndex, pageSize };
};

const handleOpenAlert = (payload: IApplicantInterview, actionPayload: 'cancel' | 'reject') => {
	action.value = actionPayload;
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const handleOpenSheet = (payload?: IApplicantInterview) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = undefined;
	} else {
		dataSent.value = payload;
	}
	isOpenSheet.value = true;
};

const handleHireApplicant = (payload: IApplicantInterview) => {
	dataSent.value = payload;
	handleHire();
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
	columns: interviewColumn(
		handleOpenAlert,
		handleOpenSheet,
		handleOpenDialog,
		handleHireApplicant,
	),
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

	pageIndex.value = 0;

	filter.value = newFilter;
};

const handleHire = () => {
	updateStage(
		{
			id: dataSent.value?.application_id || '',
			data: { to_stage: RECRUITMENT_STAGE.HIRED, outcome: 'PASSED' },
		},
		{
			onSuccess: () => {
				isOpenSheet.value = false;
				dataSent.value = undefined;
			},
		},
	);
};

const handleConfirmAlert = () => {
	if (action.value === 'cancel') {
		cancelInterview(dataSent.value?.id || '', {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [applicantKey.base] });
				isOpenAlert.value = false;
				handleCloseSheet(false);
			},
		});
		return;
	}
	updateStage(
		{
			id: dataSent.value?.application_id || '',
			data: { to_stage: RECRUITMENT_STAGE.REJECTED, outcome: 'FAILED' },
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [applicantKey.base] });
				isOpenAlert.value = false;
				handleCloseSheet(false);
			},
		},
	);
};

const handleCreateInterview = (payload: InterviewPayload) => {
	const data: InterviewPayload = {
		...payload,
		stage: RECRUITMENT_STAGE.INTERVIEW_2,
	};

	createInterview(data, {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [applicantKey.base, 'INTERVIEW_2', pagination, filterPayload],
			});

			if (dataSent.value?.status === 'COMPLETED') {
				updateStage(
					{
						id: dataSent.value?.application_id || '',
						data: { to_stage: RECRUITMENT_STAGE.INTERVIEW_2, outcome: 'PASSED' },
					},
					{
						onSuccess: () => {
							dataSent.value = undefined;
						},
					},
				);
			}

			isOpenDialog.value = false;
			handleCloseSheet(false);
		},
	});
};

const handleCompleteInterview = () => {
	completeInterview(dataSent.value?.id || '', {
		onSuccess: () => {
			isOpenSheet.value = false;
			dataSent.value = undefined;
			queryClient.invalidateQueries({ queryKey: [applicantKey.base] });
		},
	});
};

const handleCloseAlert = (payload: boolean) => {
	isOpenAlert.value = payload;
};

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isOpenSheet.value = open;
};

const handleCloseDialog = (open: boolean) => {
	isOpenDialog.value = open;
};
</script>
<template>
	<div>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search..."
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
		:is-completing="isCompleting"
		:is-hiring="isPendingUpdate"
		@open-dialog="handleOpenDialog"
		@hire="handleHire"
		@cancel="(payload) => handleOpenAlert(payload.data, payload.action)"
		@reject="(payload) => handleOpenAlert(payload.data, payload.action)"
		@complete="handleCompleteInterview"
		@update:open="handleCloseSheet" />

	<SetInterviewDialog
		:id="dataSent?.application_id"
		:open="isOpenDialog"
		:pagination="pagination"
		:filters="filterPayload"
		:is-loading="isPendingInterview"
		@update:open="handleCloseDialog"
		@submit="handleCreateInterview" />

	<AlertPopup
		:open="isOpenAlert"
		:description="dataSent?.candidate.full_name"
		:is-loading="isPending || isPendingUpdate"
		:title="`Are you sure you want to ${action}?`"
		:button-label="formatStatus(action ?? '')"
		@update:open="handleCloseAlert"
		@confirm="handleConfirmAlert" />
</template>
