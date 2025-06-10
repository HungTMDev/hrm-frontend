<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Upload from '@/assets/icons/Outline/UploadMinimalistic.svg';
import UserPlus from '@/assets/icons/Outline/UserPlus.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { Button } from '@/components/ui/button';
import Separator from '@/components/ui/separator/Separator.vue';
import { useApplicant } from '@/composables/recruitment/applicant/useApplicant';
import {
	useDeleteApplicant,
	useUpdateStage,
} from '@/composables/recruitment/applicant/useUpdateApplicant';
import { useListJob } from '@/composables/recruitment/job/useJob';
import { DEFAULT_PAGINATION, RECRUITMENT_STAGE } from '@/constants';
import { formatStatus, valueUpdater } from '@/lib/utils';
import type { FilterAccordion, FilterData, IApplicant, IApplicantFilter, IMeta } from '@/types';
import {
	getCoreRowModel,
	useVueTable,
	type PaginationState,
	type VisibilityState,
} from '@tanstack/vue-table';
import { computed, ref } from 'vue';
import CandidateSheet from '../CandidateSheet.vue';
import { screeningColumn } from '../columns';
import AppliedDialog from './AppliedDialog.vue';
import { useCustomToast } from '@/lib/customToast';

let timeout: any;
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const keywords = ref<string>();
const filter = ref<Record<string, string[]>>();

const isOpenDialog = ref(false);
const isOpenAlert = ref(false);
const isOpenSheet = ref(false);
const isView = ref(false);
const action = ref('');
const dataSent = ref<IApplicant>();

const pageIndex = ref(DEFAULT_PAGINATION.DEFAULT_PAGE - 1);
const pageSize = ref(DEFAULT_PAGINATION.DEFAULT_LIMIT);
const filterPayload = computed<Partial<IApplicantFilter>>(() => ({
	stage: RECRUITMENT_STAGE.APPLIED,
	keywords: keywords.value,
	...filter.value,
}));

const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));

const { data, isLoading } = useApplicant(pagination, filterPayload);
const { data: jobs } = useListJob();
const { showToast } = useCustomToast();

const applicants = computed<IApplicant[]>(() => data.value?.data || []);
const meta = computed<IMeta | undefined>(() => data.value?.meta);
const pageCount = computed(() => meta.value?.total_pages);

const { mutate: deleteApplicant } = useDeleteApplicant(pagination, filterPayload);
const { mutate: updateStage } = useUpdateStage();

const accordionItems = computed<FilterAccordion[]>(() => [
	{
		value: 'job_id',
		title: 'Job',
		items: jobs.value?.map((item) => ({ label: item.title, value: item.id })) || [],
		icon: Building3,
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

const handleOpenAlert = (payload?: IApplicant, actionPayload?: 'delete' | 'reject') => {
	action.value = actionPayload ?? 'delete';
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const handleOpenSheet = (payload?: IApplicant, view?: boolean) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = undefined;
	} else {
		dataSent.value = payload;
	}
	isView.value = view || false;
	isOpenSheet.value = true;
};

const handleStage = (action: string, payload: IApplicant) => {
	if (action === 'PASS') {
		updateStage(
			{
				id: payload.id,
				data: { to_stage: RECRUITMENT_STAGE.SCREENING, outcome: 'PASSED' },
			},
			{
				onSuccess: () => {
					showToast({
						message: 'Success!',
						type: 'success',
					});
				},
			},
		);
		return;
	}
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
	columns: screeningColumn({ handleOpenSheet, handleOpenAlert, handleStage }),
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
	const newFilter: Record<string, (string | number)[]> = {};
	payload.forEach((item) => {
		newFilter[item.field] = item.filters.map((i) => i.value);
	});

	pageIndex.value = 0;

	filter.value = newFilter as Record<string, string[]>;
};

const handleOpenDialog = () => {
	isOpenDialog.value = true;
};

const handleCloseDialog = (open: boolean) => {
	dataSent.value = undefined;
	isOpenDialog.value = open;
};

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isOpenSheet.value = open;
};

const handleCloseAlert = (open: boolean) => {
	dataSent.value = undefined;
	isOpenAlert.value = open;
};

const handleConfirm = () => {
	if (action.value === 'delete') {
		deleteApplicant(dataSent.value!.id, {
			onSuccess: () => {
				isOpenAlert.value = false;
			},
		});
		return;
	}
	updateStage(
		{
			id: dataSent.value!.id,
			data: { to_stage: RECRUITMENT_STAGE.REJECTED, outcome: 'FAILED' },
		},
		{
			onSuccess: () => {
				showToast({
					message: 'Success!',
					type: 'success',
				});
				isOpenAlert.value = false;
			},
		},
	);
};
</script>
<template>
	<div>
		<div class="flex gap-2 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search..."
				@update:model-value="handleSearch" />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<FilterPopover :list="accordionItems" @update:value="handleFilter" />
			<Button
				class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium"
				@click="handleOpenDialog">
				<IconFromSvg :icon="Upload" />Upload
			</Button>
			<Button
				class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium"
				@click="handleOpenSheet">
				<IconFromSvg :icon="UserPlus" />Add new
			</Button>
		</div>
		<div class="flex flex-col gap-3">
			<DataTable
				:table="table"
				:is-loading="isLoading"
				@row:click="(payload) => handleOpenSheet(payload, true)" />
			<Separator />
			<DataTablePagination :table="table" :meta="meta" />
		</div>
	</div>
	<CandidateSheet
		:open="isOpenSheet"
		:is-view="isView"
		:data="dataSent"
		:pagination="pagination"
		:filter="filterPayload"
		@back="isView = true"
		@edit="isView = false"
		@delete="(payload) => handleOpenAlert(payload, 'delete')"
		@update:open="handleCloseSheet"
		@open-dialog="handleOpenDialog" />
	<AppliedDialog
		:open="isOpenDialog"
		:pagination="pagination"
		:filter="filterPayload"
		@update:open="handleCloseDialog" />
	<AlertPopup
		:open="isOpenAlert"
		:title="`Are you sure you want to ${action} this candidate?`"
		:description="dataSent?.candidate.full_name"
		:button-label="formatStatus(action ?? '')"
		@update:open="handleCloseAlert"
		@confirm="handleConfirm" />
</template>
