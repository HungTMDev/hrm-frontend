import CheckCircle from '@/assets/icons/Outline/Check Circle.svg';
import CloseCircle from '@/assets/icons/Outline/Close Circle.svg';
import Eye from '@/assets/icons/Outline/Eye.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import { RECRUITMENT_REQUEST_STATUS_STYLE } from '@/constants';
import { formatISOStringToLocalDateTime } from '@/lib/utils';
import type { IActionGroupType, IRecruitmentRequest } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import { Checkbox } from '../../ui/checkbox';

export const recruitmentRequestColumn = (
	handleOpenSheet: (payload?: IRecruitmentRequest, view?: boolean) => void,
	handleSubmit: (id: string) => void,
	handleApproveRequest: (id: string) => void,
	handleRejectRequest: (payload: IRecruitmentRequest) => void,
): ColumnDef<IRecruitmentRequest>[] => [
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
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => row.original.title,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		cell: ({ row }) => row.original.quantity,
	},
	{
		accessorKey: 'level',
		header: 'Level',
		cell: ({ row }) => row.original.level,
	},
	{
		accessorKey: 'hiring_manager',
		header: 'Request From',
		cell: ({ row }) => row.original.hiring_manager.name,
	},
	{
		accessorKey: 'expected_date',
		header: 'Expected Date',
		cell: ({ row }) => formatISOStringToLocalDateTime(row.original.expected_start_date).date,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				class: [RECRUITMENT_REQUEST_STATUS_STYLE[row.original.status]],
				status: row.original.status,
			}),
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions = (): IActionGroupType[] => {
				if (row.original.status === 'DRAFT') {
					return [
						{
							label: 'View',
							icon: Eye,
							style: 'text-slate-600',
						},
						{
							label: 'Edit',
							icon: Pen2,
							style: 'text-yellow-500',
						},
						{
							label: 'Submit',
							icon: CheckCircle,
							style: 'text-slate-600',
						},
					];
				}
				if (row.original.status === 'ON_HOLD') {
					return [
						{
							label: 'View',
							icon: Eye,
							style: 'text-slate-600',
						},
						{
							label: 'Approve',
							icon: CheckCircle,
							style: 'text-green-500',
						},
						{
							label: 'Reject',
							icon: CloseCircle,
							style: 'text-red-500',
						},
					];
				}
				return [
					{
						label: 'View',
						icon: Eye,
						style: 'text-slate-600',
					},
				];
			};

			const onView = () => {
				handleOpenSheet(row.original, true);
			};

			const onEdit = () => {
				handleOpenSheet(row.original);
			};

			const onSubmit = () => {
				handleSubmit(row.original.id);
			};

			const onApprove = () => {
				handleApproveRequest(row.original.id);
			};

			const onReject = () => {
				handleRejectRequest(row.original);
			};
			return h(ActionGroupCommon, {
				actions: actions(),
				onSubmit,
				onView,
				onReject,
				onApprove,
				onEdit,
			});
		},
	},
];
