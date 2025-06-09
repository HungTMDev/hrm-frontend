import type { IActionGroupType, Employee } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import Trash from '@/assets/icons/Outline/TrashBinMinimalistic.svg';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { Check, Minus } from 'lucide-vue-next';

export const employeeColumn = (
	handleOpenSheet: (payload?: Employee) => void,
	handleOpenAlert: (payload: Employee) => void,
): ColumnDef<Employee>[] => [
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
					class: 'data-[state=checked]:bg-blue-500 overflow-hidden data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white',
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
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => row.original.id,
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
		accessorKey: 'position',
		header: 'Position',
		cell: ({ row }) => row.original.position,
	},
	{
		accessorKey: 'department',
		header: 'Department',
		cell: ({ row }) => row.original.department,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => row.original.status,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: IActionGroupType[] = [
				{
					label: 'Edit',
					icon: Pen2,
					style: '',
				},
				{
					label: 'Delete',
					icon: Trash,
					style: 'text-red-500 ',
				},
			];

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
			});
		},
	},
];
