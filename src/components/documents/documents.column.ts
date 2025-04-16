import type { Document } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import DocumentActionGroup from './DocumentActionGroup.vue';

export const documentsColumn = (handleDownload: () => void): ColumnDef<Document>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: 'create_by',
		header: 'Created By',
		cell: ({ row }) => row.original.create_by,
	},
	{
		accessorKey: 'createdAt',
		header: 'Created Date',
		cell: ({ row }) => row.original.createdAt,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => row.original.description,
	},
	{
		accessorKey: 'share_with',
		header: 'share_with',
		cell: ({ row }) => row.original.share_with,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: () => {
			return h(DocumentActionGroup, { onDownload: handleDownload });
		},
	},
];
