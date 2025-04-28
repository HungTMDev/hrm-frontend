<script lang="ts" setup>
import CheckCircle from '@/assets/icons/Outline/Check Circle.svg';
import File from '@/assets/icons/Outline/File.svg';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { ROWS_PER_PAGE } from '@/constants';
import { valueUpdater } from '@/lib/utils';
import { useRecruitmentStore } from '@/stores/recruitment.store';
import type { ActionGroupType } from '@/types';
import {
	getCoreRowModel,
	useVueTable,
	type ColumnDef,
	type VisibilityState,
} from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h, onBeforeMount, ref } from 'vue';

const recruitmentStore = useRecruitmentStore();

const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const columns = (): ColumnDef<any>[] => [
	{
		id: 'select',
		header: ({ table }) =>
			h(
				Checkbox,
				{
					modelValue:
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate'),
					'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
					ariaLabel: 'Select all',
					class: 'data-[state=checked]:bg-blue-500 overflow-hidden data-[state=checked]:text-white data-[state=checked]:border-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white border-gray-300',
				},
				() => (table.getIsSomePageRowsSelected() ? h(Minus) : h(Check)),
			),
		cell: ({ row }) =>
			h(Checkbox, {
				onClick: (event: any) => event.stopPropagation(),
				modelValue: row.getIsSelected(),
				'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
				ariaLabel: 'Select row',
				class: 'data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300',
			}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.name,
		enableHiding: false,
	},
	{
		accessorKey: 'email',
		header: 'Email address',
		cell: ({ row }) => row.original.email,
		enableHiding: false,
	},
	{
		accessorKey: 'phone',
		header: 'Phone number',
		cell: ({ row }) => row.original.phone,
		enableHiding: false,
	},
	{
		accessorKey: 'job',
		header: 'Job',
		cell: ({ row }) => row.original.job,
	},
	{
		accessorKey: 'cv',
		header: 'CV',
		cell: ({ row }) => {
			return h(
				'a',
				{
					href: row.original.cv,
					target: '_blank',
					class: 'text-blue-500 block w-[100px] p-1 bg-blue-50 rounded-xl flex gap-2 items-center justify-center',
				},
				[h(IconFromSvg, { icon: File }), 'CV'],
			);
		},
		enableHiding: false,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			return row.original.status ? h(StatusTag, { status: row.original.status }) : '';
		},
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: ActionGroupType[] = [
				{
					label: 'Edit',
					icon: Pen2,
				},
				{
					label: 'Delete',
					icon: Trash,
					style: 'text-red-500',
				},
			];

			const onEdit = () => {};

			const onDelete = () => {};

			return h(ActionGroupCommon, {
				actions,
				onEdit,
				onDelete,
			});
		},
	},
];

const table = useVueTable({
	get data() {
		return recruitmentStore.applicantDoneStage;
	},
	columns: columns(),
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

onBeforeMount(() => {
	recruitmentStore.getDoneStageData();
});
</script>
a
<template>
	<ContentWrapper class="rounded-tl-none">
		<div class="flex gap-4 items-center mb-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search talent" />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<FilterPopover :list="[]" />
		</div>
		<div class="flex flex-col gap-3">
			<DataTable :table="table" />
			<Separator />
			<DataTablePagination :table="table" />
		</div>
	</ContentWrapper>
</template>
