import type { ColumnDef } from '@tanstack/vue-table';
import type { Asset } from './type';
import { h } from 'vue';
import DetailsCell from './DetailsCell.vue';

export const assetsColumn: ColumnDef<Asset>[] = [
	{
		accessorKey: 'asset_id',
		header: 'Asset ID',
	},
	{
		accessorKey: 'asset_type',
		header: 'Asset type',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'assigned_date',
		header: 'Assigned date',
	},
	{
		accessorKey: 'details',
		header: 'Details',
		cell: ({ row }) => h(DetailsCell, { data: row.original.details }),
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
	},
];
