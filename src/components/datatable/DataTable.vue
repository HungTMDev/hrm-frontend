<script lang="ts" setup>
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import type { Table } from '@tanstack/vue-table';
import { FlexRender } from '@tanstack/vue-table';
import CustomTable from './CustomTable.vue';
import Skeleton from '../ui/skeleton/Skeleton.vue';

interface Prop {
	table: Table<any>;
	isLoading?: boolean;
	static_header?: boolean;
}
defineProps<Prop>();

const emit = defineEmits<{
	(e: 'row:click', payload: any): void;
}>();

const handleClickRow = (data: any) => {
	emit('row:click', data);
};
</script>

<template>
	<div class="space-y-4">
		<div class="">
			<CustomTable :class="static_header ? 'max-h-[800px]' : ''">
				<TableHeader :class="static_header ? 'sticky top-0 z-[35] ' : ''">
					<TableRow
						v-for="headerGroup in table.getHeaderGroups()"
						:key="headerGroup.id"
						class="hover:bg-[#0E6EED0D]">
						<TableHead
							v-for="header in headerGroup.headers"
							:key="header.id"
							:class="'p-2 border-b text-sm font-normal'">
							<FlexRender
								v-if="
									!header.isPlaceholder && !header.column.columnDef.enableHiding
								"
								:render="header.column.columnDef.header"
								:props="header.getContext()" />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<template v-if="isLoading">
						<TableRow v-for="item in 5" :key="item">
							<TableCell
								v-for="i in table.getHeaderGroups()[0].headers.length"
								:key="i"
								class="p-2">
								<Skeleton class="h-5 w-3/4" />
							</TableCell>
						</TableRow>
					</template>

					<template v-else-if="table.getRowModel().rows?.length">
						<template v-for="row in table.getRowModel().rows" :key="row.id">
							<!-- Hàng cha -->
							<TableRow
								:data-state="row.getIsSelected() && 'selected'"
								class="border-none hover:bg-[#0E6EED0D] data-[state=selected]:bg-[#0E6EED0D]"
								@click="handleClickRow(row.original)">
								<TableCell
									v-for="(cell, index) in row.getVisibleCells()"
									:key="cell.id"
									class="p-2"
									:class="[
										index === 0 && 'rounded-l-xl',
										index === row.getVisibleCells().length - 1 &&
											'rounded-r-xl',
									]">
									<FlexRender
										v-if="!cell.column.columnDef.enableHiding"
										:render="cell.column.columnDef.cell"
										:props="cell.getContext()" />
								</TableCell>
							</TableRow>
							<!-- Kiểm tra và hiển thị hàng con nếu có -->
							<template v-if="row.getIsExpanded() && row.subRows.length > 0">
								<TableRow
									v-for="subRow in row.subRows"
									:key="subRow.id"
									class="bg-accent/90">
									<!-- Ô trống cho cột mở rộng -->
									<TableCell
										v-for="cell in subRow.getVisibleCells()"
										:key="cell.id">
										<FlexRender
											v-if="!cell.column.columnDef.enableHiding"
											:render="cell.column.columnDef.cell"
											:props="cell.getContext()" />
									</TableCell>
								</TableRow>
							</template>
						</template>
					</template>

					<TableRow v-else>
						<TableCell :colspan="table.getAllColumns().length" class="h-24 text-center">
							No results.
						</TableCell>
					</TableRow>
				</TableBody>
			</CustomTable>
		</div>
	</div>
</template>
