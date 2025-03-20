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
	small_padding?: boolean;
}

const handleRowClick = () => {
	console.log(1111);
};
defineProps<Prop>();
</script>

<template>
	<div class="space-y-4">
		<div class="">
			<CustomTable :class="static_header ? 'max-h-[800px]' : ''">
				<TableHeader :class="static_header ? 'sticky top-0 bg-muted shadow z-[35]' : ''">
					<TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
						<TableHead
							v-for="header in headerGroup.headers"
							:key="header.id"
							:class="small_padding ? 'px-1.5' : ''">
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
								:key="i">
								<Skeleton class="h-5 w-3/4" />
							</TableCell>
						</TableRow>
					</template>

					<template v-else-if="table.getRowModel().rows?.length">
						<template v-for="row in table.getRowModel().rows" :key="row.id">
							<!-- Hàng cha -->
							<button @click="handleRowClick">
								<TableRow
									:data-state="row.getIsSelected() && 'selected'"
									class="border-none">
									<TableCell
										v-for="cell in row.getVisibleCells()"
										:key="cell.id"
										:class="small_padding ? 'py-1.5 px-2' : ''">
										<FlexRender
											v-if="!cell.column.columnDef.enableHiding"
											:render="cell.column.columnDef.cell"
											:props="cell.getContext()" />
									</TableCell>
								</TableRow>
							</button>
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
