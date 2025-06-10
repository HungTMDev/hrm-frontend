import File from '@/assets/icons/Outline/File.svg';
import Eye from '@/assets/icons/Outline/Eye.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import type { IActionGroupType, IApplicant } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import { createPathFromServerDomain, formatISOStringToLocalDateTime } from '@/lib/utils';
import { useGetAccount } from '@/composables/auth/useAuth';

export const rejectedColumn = (
	handleOpenSheet: (payload: IApplicant) => void,
	handleOpenAlert: (payload: IApplicant) => void,
): ColumnDef<IApplicant>[] => {
	const { data: account } = useGetAccount();

	return [
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
			cell: ({ row }) => row.original.candidate.full_name,
			enableHiding: false,
		},
		{
			accessorKey: 'email',
			header: 'Email address',
			cell: ({ row }) => row.original.candidate.email,
			enableHiding: false,
		},
		{
			accessorKey: 'phone',
			header: 'Phone number',
			cell: ({ row }) => row.original.candidate.phone_number,
			enableHiding: false,
		},
		{
			accessorKey: 'position',
			header: 'Position',
			cell: ({ row }) => row.original.job.title,
		},
		{
			accessorKey: 'cv',
			header: () => h('div', { class: 'w-[100px]' }, 'CV'),
			cell: ({ row }) => {
				if (!row.original.resume) {
					return '';
				}
				return h(
					'a',
					{
						onClick: (event: any) => event.stopPropagation(),
						href: createPathFromServerDomain(row.original.resume.path),
						target: '_blank',
						class: 'text-blue-500 px-3 py-1 bg-blue-50 rounded-xl flex gap-2 items-center justify-center w-fit',
					},
					[h(IconFromSvg, { icon: File }), 'CV'],
				);
			},
			enableHiding: false,
		},
		{
			accessorKey: 'updated_at',
			header: 'Last updated',
			cell: ({ row }) => formatISOStringToLocalDateTime(row.original.updated_at).date,
		},
		{
			accessorKey: 'created_at',
			header: 'Created at',
			cell: ({ row }) => formatISOStringToLocalDateTime(row.original.created_at).date,
		},
		// {
		// 	accessorKey: 'status',
		// 	header: 'Status',
		// 	cell: ({ row }) => row.original.application_status,
		// },
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
				];

				if (
					account.value?.roles.includes('ADMIN') ||
					account.value?.roles.includes('HR_LEADER')
				) {
					actions.push({
						label: 'Send email',
						icon: Letter,
						style: 'text-red-500',
					});
				}

				const onView = () => {
					handleOpenSheet(row.original);
				};

				const onSendEmail = () => {
					handleOpenAlert(row.original);
				};

				return h(ActionGroupCommon, {
					actions,
					onView,
					onSendEmail,
				});
			},
		},
	];
};
