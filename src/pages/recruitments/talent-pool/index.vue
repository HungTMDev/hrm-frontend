<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Title from '@/components/common/Title.vue';
import { Button } from '@/components/ui/button';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import UserPlus from '@/assets/icons/Outline/User Plus.svg';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import { useRecruitmentStore } from '@/stores/recruitment.store';
import { getCoreRowModel, useVueTable, type VisibilityState } from '@tanstack/vue-table';
import { talentPoolColumns } from '@/components/recruitments/talent-pool/talent-pool.column';
import { onBeforeMount, ref } from 'vue';
import { valueUpdater } from '@/lib/utils';
import { ROWS_PER_PAGE } from '@/constants';
import DataTable from '@/components/datatable/DataTable.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import type { TalentPool } from '@/types';
import TalentPoolSheet from '@/components/recruitments/talent-pool/TalentPoolSheet.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import AlertPopup from '@/components/common/AlertPopup.vue';

const recruitmentStore = useRecruitmentStore();

const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const isView = ref(false);
const dataSent = ref<TalentPool>();

const handleOpenSheet = (payload?: TalentPool, view?: boolean) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = undefined;
	} else dataSent.value = payload;
	isView.value = view || false;
	isOpenSheet.value = true;
};

const handleOpenAlert = (payload?: TalentPool) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const table = useVueTable({
	get data() {
		return recruitmentStore.talentPools;
	},
	columns: talentPoolColumns(handleOpenSheet, handleOpenAlert),
	getCoreRowModel: getCoreRowModel(),
	onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
	onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
	state: {
		get columnVisibility() {
			return columnVisibility.value;
		},
		get rowSelection() {
			return rowSelection.value;
		},
	},
	initialState: {
		pagination: {
			pageIndex: 0,
			pageSize: ROWS_PER_PAGE[0],
		},
	},
});

const handleCloseSheet = (open: boolean) => {
	isOpenSheet.value = open;
	dataSent.value = undefined;
	isView.value = false;
};

const handleCloseAlert = (open: boolean) => {
	isOpenAlert.value = open;
	dataSent.value = undefined;
	isView.value = false;
};

onBeforeMount(() => {
	if (recruitmentStore.talentPools.length === 0) {
		recruitmentStore.getAllTalentPool();
	}
});
</script>
<template>
	<ContentWrapper>
		<Title>Talent pool</Title>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search talent" />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<FilterPopover :list="[]" />
			<Button
				class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium"
				@click="handleOpenSheet">
				<IconFromSvg :icon="UserPlus" />Add new
			</Button>
		</div>
		<div class="flex flex-col gap-3">
			<DataTable :table="table" @row:click="(payload) => handleOpenSheet(payload, true)" />
			<Separator />
			<DataTablePagination :table="table" />
		</div>
	</ContentWrapper>
	<TalentPoolSheet
		:open="isOpenSheet"
		@update:open="handleCloseSheet"
		:is-view="isView"
		@edit="isView = false" />
	<AlertPopup :open="isOpenAlert" :description="dataSent?.name" @update:open="handleCloseAlert" />
</template>
