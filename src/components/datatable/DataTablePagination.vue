<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import {
	Pagination,
	PaginationEllipsis,
	PaginationFirst,
	PaginationLast,
	PaginationList,
	PaginationListItem,
	PaginationNext,
	PaginationPrev,
} from '@/components/ui/pagination';
import type { Table } from '@tanstack/vue-table';
import DoubleLeft from '@/assets/icons/Outline/Double Alt Arrow Left.svg';
import Left from '@/assets/icons/Outline/Alt Arrow Left.svg';
import DoubleRight from '@/assets/icons/Outline/Double Alt Arrow Right.svg';
import Right from '@/assets/icons/Outline/Alt Arrow Right.svg';
import IconFromSvg from '../common/IconFromSvg.vue';
import { getItemRange } from '@/lib/utils';
import { computed } from 'vue';
import type { IMeta } from '@/types';

interface DataTablePaginationProps {
	table: Table<any>;
	itemName?: string;
	meta?: IMeta;
}
const props = defineProps<DataTablePaginationProps>();

const handleUpdatePage = (page: number) => {
	props.table.setPageIndex(page - 1);
};

const rangeItem = computed(() => {
	return getItemRange(
		props.meta?.current_page || 1,
		props.meta?.limit || 10,
		props.meta?.total_records || 0,
	);
});
</script>

<template>
	<div class="flex flex-wrap gap-2 items-center justify-between px-2">
		<div class="flex-1 text-sm text-slate-400 font-normal">
			Showing
			<span class="font-medium text-slate-600">
				<span v-if="rangeItem.start === rangeItem.end"
					>{{ rangeItem.start }} of {{ table.getRowCount() }}</span
				>
				<span v-else
					>{{ rangeItem.start }} to {{ rangeItem.end }} of {{ table.getRowCount() }}</span
				>
			</span>
			{{ itemName ?? 'item(s)' }}
		</div>
		<div class="flex items-center gap-2 flex-wrap space-x-6 lg:space-x-8">
			<Pagination
				v-slot="{ page }"
				:total="table.getRowCount()"
				:items-per-page="table.getState().pagination.pageSize"
				:sibling-count="1"
				show-edges
				:default-page="table.getState().pagination.pageIndex + 1"
				:page="meta?.current_page ? meta?.current_page : 1"
				@update:page="handleUpdatePage">
				<PaginationList v-slot="{ items }" class="flex items-center gap-1">
					<PaginationFirst class="w-8 h-8 rounded-xl">
						<IconFromSvg :icon="DoubleLeft" />
					</PaginationFirst>
					<PaginationPrev class="w-8 h-8 rounded-xl">
						<IconFromSvg :icon="Left" />
					</PaginationPrev>
					<template v-for="(item, index) in items">
						<PaginationListItem
							v-if="item.type === 'page'"
							:key="index"
							:value="item.value"
							as-child>
							<Button
								:class="[
									'w-8 h-8 p-0  rounded-xl hover:bg-blue-500 hover:text-white',
									item.value === page ? 'bg-blue-500 text-white' : '',
								]"
								variant="outline">
								{{ item.value }}
							</Button>
						</PaginationListItem>
						<PaginationEllipsis v-else :key="item.type" :index="index" />
					</template>

					<PaginationNext class="w-8 h-8 rounded-xl">
						<IconFromSvg :icon="Right" />
					</PaginationNext>
					<PaginationLast class="w-8 h-8 rounded-xl">
						<IconFromSvg :icon="DoubleRight" />
					</PaginationLast>
				</PaginationList>
			</Pagination>
		</div>
	</div>
</template>
