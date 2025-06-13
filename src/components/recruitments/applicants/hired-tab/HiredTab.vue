<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useApplicant } from '@/composables/recruitment/applicant/useApplicant';
import { useCreateEmployeeFromApplicant } from '@/composables/recruitment/applicant/useUpdateApplicant';
import { useListJob } from '@/composables/recruitment/job/useJob';
import { DEFAULT_PAGINATION, RECRUITMENT_STAGE } from '@/constants';
import { useCustomToast } from '@/lib/customToast';
import { valueUpdater } from '@/lib/utils';
import type { FilterAccordion, FilterData, IApplicant, IApplicantFilter, IMeta } from '@/types';
import {
	getCoreRowModel,
	useVueTable,
	type PaginationState,
	type VisibilityState,
} from '@tanstack/vue-table';
import { computed, ref } from 'vue';
import ApplicantSheet from '../ApplicantSheet.vue';
import { hiredColumn } from './column';
import HiredDialog from './HiredDialog.vue';
import type { CreateEmployeeFromApplicantPayload } from './schema';
import { useQueryClient } from '@tanstack/vue-query';
import { applicantKey } from '@/composables/recruitment/applicant/key';

const queryClient = useQueryClient();
const { data: jobs } = useListJob();
const { showToast } = useCustomToast();

let timeout: any;
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const keywords = ref<string>();
const filter = ref<Record<string, string[]>>();
const isOpenSheet = ref(false);
const isOpenDialog = ref(false);
const dataSent = ref<IApplicant>();
const filterData = ref<FilterData[]>([]);

const pageIndex = ref(DEFAULT_PAGINATION.DEFAULT_PAGE - 1);
const pageSize = ref(DEFAULT_PAGINATION.DEFAULT_LIMIT);
const filterPayload = computed<Partial<IApplicantFilter>>(() => ({
	stage: [RECRUITMENT_STAGE.HIRED],
	keywords: keywords.value,
	...filter.value,
}));

const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));

const { data, isLoading } = useApplicant(pagination, filterPayload);
const { mutate: createUser, isPending: isCreating } = useCreateEmployeeFromApplicant();

const applicants = computed<IApplicant[]>(() => data.value?.data || []);
const meta = computed<IMeta | undefined>(() => data.value?.meta);
const pageCount = computed(() => meta.value?.total_pages);

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

const handleOpenSheet = (payload: IApplicant) => {
	dataSent.value = payload;
	isOpenSheet.value = true;
};

const handleOpenDialog = (payload: IApplicant) => {
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
	columns: hiredColumn(handleOpenSheet, handleOpenDialog),
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
		newFilter[item.field] = item.filters.map((i) => i.value as string);
	});
	pageIndex.value = 0;

	filterData.value = payload;
	filter.value = newFilter as Record<string, string[]>;
};

const handleCreateUser = (payload: CreateEmployeeFromApplicantPayload) => {
	createUser(
		{
			id: dataSent.value?.id ?? '',
			data: payload,
		},
		{
			onSuccess: () => {
				showToast({
					message: 'User created successfully',
					type: 'success',
				});

				queryClient.invalidateQueries({ queryKey: [applicantKey.base] });
				dataSent.value = undefined;
				isOpenDialog.value = false;
				isOpenSheet.value = false;
			},
		},
	);
};

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isOpenSheet.value = open;
};

const handleCloseDialog = (open: boolean) => {
	dataSent.value = undefined;
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
			<DataTable
				:table="table"
				:is-loading="isLoading"
				@row:click="(payload) => handleOpenSheet(payload)" />
			<Separator />
			<DataTablePagination :table="table" :meta="meta" />
		</div>
	</div>
	<ApplicantSheet
		:open="isOpenSheet"
		:applicant-id="dataSent?.id"
		@update:open="handleCloseSheet" />
	<HiredDialog
		:open="isOpenDialog"
		:is-loading="isCreating"
		:data="dataSent"
		@submit="handleCreateUser"
		@update:open="handleCloseDialog" />
</template>
