<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Download from '@/assets/icons/Outline/Download Minimalistic.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import ChartSquare from '@/assets/icons/Outline/Chart Square.svg';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import UserHands from '@/assets/icons/Outline/User Hands.svg';
import UserPlus from '@/assets/icons/Outline/User Plus.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import AllEmployeeSheet from '@/components/employee/all-employee/AllEmployeeSheet.vue';
import { employeeColumn } from '@/components/employee/all-employee/employee.column';
import Button from '@/components/ui/button/Button.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import {
	DEFAULT_PAGINATION,
	listEmploymentType,
	listJobLevel,
	listJobStatus,
	ROWS_PER_PAGE,
} from '@/constants';
import { exportToExcel, valueUpdater } from '@/lib/utils';
import type { IEmployee, FilterAccordion, IMeta, IEmployeeFilter, FilterData } from '@/types';
import {
	getCoreRowModel,
	useVueTable,
	type PaginationState,
	type VisibilityState,
} from '@tanstack/vue-table';
import { computed, ref, watch } from 'vue';
import router from '@/routers';
import { useEmployee, useListEmployee } from '@/composables/employee/useEmployee';
import { useRoute } from 'vue-router';
import { useBranch } from '@/composables/branch/useBranch';
import { useDepartment } from '@/composables/department/useDepartment';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import { useCustomToast } from '@/lib/customToast';

const route = useRoute();
const { showToast } = useCustomToast();
const { data: branches } = useBranch();
const { data: departments } = useDepartment();

const query = computed(() => route.query);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const isGetAllEmployee = ref(false);
const dataSent = ref<IEmployee>();

const pageIndex = ref(
	query.value.page ? Number(query.value.page) - 1 : DEFAULT_PAGINATION.DEFAULT_PAGE - 1,
);
const pageSize = ref(
	query.value.limit ? Number(query.value.limit) : DEFAULT_PAGINATION.DEFAULT_LIMIT,
);
const filterPayload = ref<Partial<IEmployeeFilter>>({});
const filterData = ref<FilterData[]>([]);

const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));
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
	{
		value: 'level',
		title: 'Level',
		items: listJobLevel,
		icon: Chart2,
		type: 'list',
	},
]);

const { data, isLoading } = useEmployee(pagination, filterPayload);
const { data: allEmployee, isSuccess } = useListEmployee(isGetAllEmployee);

const employees = computed<IEmployee[]>(() => data.value?.data || []);
const meta = computed<IMeta | undefined>(() => data.value?.meta);
const pageCount = computed(() => meta.value?.total_pages);

const setPageSize = (newSize: number) => (pageSize.value = newSize);
const setPageIndex = (newIndex: number) => (pageIndex.value = newIndex);

const setPagination = ({ pageIndex, pageSize }: PaginationState): PaginationState => {
	setPageIndex(pageIndex);
	setPageSize(pageSize);

	return { pageIndex, pageSize };
};

const handleOpenSheet = (payload?: IEmployee) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = undefined;
	} else dataSent.value = payload;
	isOpenSheet.value = true;
};

const handleOpenAlert = (payload: IEmployee) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const handleNavigate = (id: string) => {
	router.push(`/employees/all-employee/${id}`);
};

const table = useVueTable({
	get data() {
		return employees.value;
	},
	get pageCount() {
		return pageCount.value ?? 0;
	},
	get rowCount() {
		return meta.value?.total_records ?? 0;
	},
	columns: employeeColumn(handleOpenSheet, handleOpenAlert),
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

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isOpenSheet.value = open;
};

const handleCloseAlert = (open: boolean) => {
	dataSent.value = undefined;
	isOpenAlert.value = open;
};

const handleExportToExcel = () => {
	isGetAllEmployee.value = true;
	showToast({
		message: 'Exporting to excel',
		type: 'loading',
	});
	setTimeout(() => {
		if (isSuccess) {
			exportToExcel(allEmployee.value || [], 'employees');
			isGetAllEmployee.value = false;
			showToast({
				message: 'Exported to excel',
				type: 'dismiss',
			});
		}
	}, 500);
};

const syncQueryToFilter = () => {
	const keys = Object.keys(query.value) as (keyof IEmployeeFilter)[];

	for (let key of keys) {
		if ((key as any) === 'page' || (key as any) === 'limit' || (key as any) === 'archived')
			continue;

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
					(filterPayload.value[key] as string[]).includes(i.value as string),
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
	<ContentWrapper>
		<Title>All employees</Title>
		<div
			v-if="table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected()"
			class="my-4 flex justify-between items-center">
			<p class="text-slate-600">
				{{ table.getFilteredSelectedRowModel().rows.length }} item(s) selected
			</p>
			<Button
				variant="ghost"
				class="bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-500 rounded-2xl"
				@click="handleOpenAlert">
				<IconFromSvg :icon="Trash" />
				Delete
			</Button>
		</div>
		<div v-else class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search employee" />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<FilterPopover :list="accordionItems" />
			<Button class="hover:bg-blue-600 rounded-2xl" @click="handleExportToExcel">
				<IconFromSvg :icon="Download" />Download
			</Button>
			<Button
				class="bg-blue-500 hover:bg-blue-600 rounded-2xl font-medium"
				@click="handleOpenSheet">
				<IconFromSvg :icon="UserPlus" />Add new employee
			</Button>
		</div>
		<div class="flex flex-col gap-2">
			<DataTable
				:table="table"
				:is-loading="isLoading"
				@row:click="(payload) => handleNavigate(payload.id)" />
			<Separator class="mb-2" />
			<DataTablePagination :table="table" />
		</div>
	</ContentWrapper>
	<AllEmployeeSheet
		:data="dataSent"
		:open="isOpenSheet"
		@update:open="handleCloseSheet"
		@delete="handleOpenAlert" />
	<AlertPopup :open="isOpenAlert" @update:open="handleCloseAlert" />
</template>
