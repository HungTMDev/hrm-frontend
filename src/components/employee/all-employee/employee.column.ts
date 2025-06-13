import type { IActionGroupType, IEmployee } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import Trash from '@/assets/icons/Outline/TrashBinMinimalistic.svg';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { Check, Minus } from 'lucide-vue-next';
import { formatStatus } from '@/lib/utils';
import Eye from '@/assets/icons/Outline/Eye.svg';
import StatusTag from '@/components/common/StatusTag.vue';

export const employeeColumn = (
	handleOpenSheet: (payload?: IEmployee) => void,
	handleOpenAlert: (payload: IEmployee) => void,
	handleView: (payload: IEmployee) => void,
): ColumnDef<IEmployee>[] => [
	// {
	// 	id: 'select',
	// 	header: ({ table }) =>
	// 		h(
	// 			Checkbox,
	// 			{
	// 				modelValue:
	// 					table.getIsAllPageRowsSelected() ||
	// 					(table.getIsSomePageRowsSelected() && 'indeterminate'),
	// 				'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
	// 				ariaLabel: 'Select all',
	// 				class: 'data-[state=checked]:bg-blue-500 overflow-hidden data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white',
	// 			},
	// 			() => (table.getIsSomePageRowsSelected() ? h(Minus) : h(Check)),
	// 		),
	// 	cell: ({ row }) =>
	// 		h(Checkbox, {
	// 			onClick: (event: any) => event.stopPropagation(),
	// 			modelValue: row.getIsSelected(),
	// 			'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
	// 			ariaLabel: 'Select row',
	// 			class: 'data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300',
	// 		}),
	// 	enableSorting: false,
	// 	enableHiding: false,
	// },
	{
		accessorKey: 'employee_id',
		header: 'ID',
		cell: ({ row }) => row.original.employee_number,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => row.original.email,
	},
	{
		accessorKey: 'phone_number',
		header: 'Phone number',
		cell: ({ row }) =>
			h(
				'p',
				{ class: row.original.phone_number ? '' : 'italic text-gray-200' },
				row.original.phone_number ?? 'No data',
			),
	},
	{
		accessorKey: 'position',
		header: 'Position',
		cell: ({ row }) =>
			h(
				'p',
				{ class: row.original.position.name ? '' : 'italic text-gray-200' },
				formatStatus(row.original.position.name ?? 'No data'),
			),
	},
	{
		accessorKey: 'department',
		header: 'Department',
		cell: ({ row }) =>
			h(
				'p',
				{ class: row.original.department.name ? '' : 'italic text-gray-200' },
				formatStatus(row.original.department.name ?? 'No data'),
			),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			if (!row.original.work_information.work_status) {
				return h('p', { class: 'italic text-gray-200' }, 'No data');
			}
			return h(StatusTag, {
				status: row.original.work_information.work_status,
				class: 'text-blue-500 bg-blue-50 hover:bg-blue-50',
			});
		},
	},
	{
		accessorKey: 'branch',
		header: 'Branch',
		cell: ({ row }) =>
			h(
				'p',
				{ class: row.original.branch.name ? '' : 'italic text-gray-200' },
				row.original.branch.name ?? 'No data',
			),
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: IActionGroupType[] = [
				{
					label: 'View',
					icon: Eye,
					style: 'text-slate-600',
				},
				// {
				// 	label: 'Edit',
				// 	icon: Pen2,
				// 	style: '',
				// },
				{
					label: 'Delete',
					icon: Trash,
					style: 'text-red-500 ',
				},
			];

			const onView = () => {
				handleView(row.original);
			};

			const onEdit = () => {
				handleOpenSheet(row.original);
			};
			const onDelete = () => {
				handleOpenAlert(row.original);
			};

			return h(ActionGroupCommon, {
				actions,
				onEdit,
				onDelete,
				onView,
			});
		},
	},
];
