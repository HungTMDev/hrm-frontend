<script lang="ts" setup>
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import ChartSquare from '@/assets/icons/Outline/ChartSquare.svg';
import Download from '@/assets/icons/Outline/DownloadMinimalistic.svg';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Trash from '@/assets/icons/Outline/TrashBinMinimalistic.svg';
import UserHands from '@/assets/icons/Outline/UserHands.svg';
import UserPlus from '@/assets/icons/Outline/UserPlus.svg';
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
import { ROWS_PER_PAGE } from '@/constants';
import { exportToExcel, valueUpdater } from '@/lib/utils';
import router from '@/routers';
import type { Employee, FilterAccordion } from '@/types';
import { getCoreRowModel, useVueTable, type VisibilityState } from '@tanstack/vue-table';
import { ref } from 'vue';

const data: Employee[] = [
	{
		id: 351613,
		name: 'Trần Song Quynh',
		email: 'songquynh@lutech.ltd',
		position: 'UI/UX Designer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351614,
		name: 'Nguyễn Đức Phát',
		email: 'ducphat@lutech.ltd',
		position: 'UI/UX Designer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351615,
		name: 'Trịnh Minh Hưng',
		email: 'minhhung@lutech.ltd',
		position: 'Back-end Developer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351616,
		name: 'Ngô Công Linh',
		email: 'conglinh@lutech.ltd',
		position: 'Android Developer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351617,
		name: 'Huỳnh Minh Huy',
		email: 'minhhuy@lutech.ltd',
		position: 'Graphic Designer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351618,
		name: 'Lê Tất Tuấn',
		email: 'tattuan@lutech.ltd',
		position: 'Back-end Developer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351619,
		name: 'Nguyễn Thanh Long',
		email: 'thanhlong@lutech.ltd',
		position: 'Product Owner',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351620,
		name: 'Lê Quang Phúc',
		email: 'quangphuc@lutech.ltd',
		position: 'Graphic Designer',
		department: 'Design',
		status: 'Full-time',
	},
];

const filter: FilterAccordion[] = [
	{
		title: 'Status',
		value: 'status',
		icon: ChartSquare,
		items: [
			{ label: 'Full-time', value: 'full_time' },
			{ label: 'Part-time', value: 'part_time' },
			{ label: 'Freelance', value: 'freelance' },
		],
		type: 'list',
	},
	{
		title: 'Branch',
		value: 'branch',
		icon: Building3,
		items: [
			{ label: 'Đà nẵng', value: 'dn' },
			{ label: 'Hà nội', value: 'hn' },
		],
		type: 'list',
	},
	{
		title: 'Department',
		value: 'department',
		icon: Buildings,
		items: [
			{ label: 'Design', value: 'design' },
			{ label: 'Marketing', value: 'marketing' },
			{ label: 'Product', value: 'product' },
			{ label: 'Development', value: 'Development' },
			{ label: 'Back Office', value: 'BO' },
			{ label: 'E-commerce', value: 'ecommerce' },
		],
		type: 'list',
	},
	{
		title: 'Gender',
		value: 'gender',
		icon: UserHands,
		items: [
			{ label: 'Male', value: '0' },
			{ label: 'Female', value: '1' },
		],
		type: 'list',
	},
	{
		title: 'Salary',
		value: 'salary',
		icon: UserHands,
		type: 'numberSlider',
		min: 0,
		max: 100000000,
		step: 1000000,
	},
	{
		title: 'Quarter',
		value: 'quarter',
		icon: UserHands,
		type: 'timeRange',
	},
];

const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const dataSent = ref<Employee>();

const handleOpenSheet = (payload?: Employee) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = undefined;
	} else dataSent.value = payload;
	isOpenSheet.value = true;
};

const handleOpenAlert = (payload: Employee) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const handleNavigate = (id: string) => {
	router.push(`/employees/all-employee/${id}`);
};

const table = useVueTable({
	data: data,
	columns: employeeColumn(handleOpenSheet, handleOpenAlert),
	getCoreRowModel: getCoreRowModel(),
	onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
	onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
	state: {
		get columnVisibility() {
			return columnVisibility.value;
		},
		get rowSelection() {
			return rowSelection.value;
		},
	},
	initialState: {
		pagination: {
			pageIndex: 0,
			pageSize: ROWS_PER_PAGE[0],
		},
	},
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
	exportToExcel(data, 'employees');
};
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
			<FilterPopover :list="filter" />
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
			<DataTable :table="table" @row:click="(payload) => handleNavigate(payload.id)" />
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
