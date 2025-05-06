import File from '@/assets/icons/Outline/File.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import CommonCombobox from '@/components/common/CommonCombobox.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { applicantStages } from '@/constants';
import type { IActionGroupType, Applicant } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';

export const applicantColumn = (
	handleOpenSheet: (payload?: Applicant, view?: boolean) => void,
	handleOpenAlert: (payload: any) => void,
): ColumnDef<Applicant>[] => [
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
					class: 'data-[state=checked]:bg-blue-500 border-gray-300 overflow-hidden data-[state=checked]:text-white data-[state=checked]:border-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white',
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
					onClick: (event: any) => event.stopPropagation(),
					href: row.original.cv,
					target: '_blank',
					class: 'text-blue-500 p-1 bg-blue-50 rounded-xl flex gap-2 items-center justify-center',
				},
				[h(IconFromSvg, { icon: File }), 'CV'],
			);
		},
		enableHiding: false,
	},
	{
		accessorKey: 'stage',
		header: 'Stage',
		cell: ({ row }) => {
			return h(CommonCombobox, {
				list: applicantStages,
				defaultValue: row.original.stage.toUpperCase(),
				class: 'border-none hover:bg-inherit',
				label: 'Stage',
				onClick: (event: any) => event.stopPropagation(),
			});
		},
		enableHiding: false,
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
