import CommonSelect from '@/components/common/CommonSelect.vue';
import { candidateStages } from '@/constants';
import type { Candidate } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Copy } from 'lucide-vue-next';
import { h } from 'vue';

export const candidateColumn: ColumnDef<Candidate>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: 'email',
		header: 'Email address',
		cell: ({ row }) => row.original.email,
	},
	{
		accessorKey: 'phone',
		header: 'Phone number',
		cell: ({ row }) => row.original.phone,
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
					class: 'text-blue-500 px-2 py-1 bg-blue-50 rounded-xl flex items-center justify-around',
				},
				[h(Copy, { size: 16 }), 'CV'],
			);
		},
	},
	{
		accessorKey: 'stage',
		header: 'Stage',
		cell: ({ row }) => {
			return h(CommonSelect, {
				list: candidateStages,
				defaultValue: row.original.stage.toUpperCase(),
			});
		},
	},
];
