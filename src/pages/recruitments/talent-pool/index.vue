<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { talentPoolColumns } from '@/components/recruitments/talent-pool/talent-pool.column';
import TalentPoolSheet from '@/components/recruitments/talent-pool/TalentPoolSheet.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useTalentPool } from '@/composables/recruitment/talent-pool/useTalentPool';
import { useDeleteTalentPool } from '@/composables/recruitment/talent-pool/useUpdateTalentPool';
import { DEFAULT_PAGINATION } from '@/constants';
import { valueUpdater } from '@/lib/utils';
import router from '@/routers';
import type { ICandidate, ICandidateFilter, IMeta } from '@/types';
import {
	getCoreRowModel,
	useVueTable,
	type PaginationState,
	type VisibilityState,
} from '@tanstack/vue-table';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const query = computed(() => route.query);
let timeout: any;
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const isView = ref(false);
const searchValue = ref<string>();
const dataSent = ref<ICandidate>();

const pageIndex = ref(
	query.value.page ? Number(query.value.page) - 1 : DEFAULT_PAGINATION.DEFAULT_PAGE - 1,
);
const pageSize = ref(
	query.value.limit ? Number(query.value.limit) : DEFAULT_PAGINATION.DEFAULT_LIMIT,
);
const filterPayload = ref<Partial<ICandidateFilter>>({});

const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));

const { data, isLoading } = useTalentPool(pagination, filterPayload);
const { mutate: deleteCandidate, isPending } = useDeleteTalentPool(pagination, filterPayload);

const candidates = computed<ICandidate[]>(() => data.value?.data || []);
const meta = computed<IMeta | undefined>(() => data.value?.meta);
const pageCount = computed(() => meta.value?.total_pages);

const setPageSize = (newSize: number) => (pageSize.value = newSize);
const setPageIndex = (newIndex: number) => (pageIndex.value = newIndex);

const setPagination = ({ pageIndex, pageSize }: PaginationState): PaginationState => {
	setPageIndex(pageIndex);
	setPageSize(pageSize);

	return { pageIndex, pageSize };
};

const handleOpenSheet = (payload?: ICandidate, view?: boolean) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = undefined;
	} else dataSent.value = payload;
	isView.value = view || false;
	isOpenSheet.value = true;
};

const handleOpenAlert = (payload?: ICandidate) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const table = useVueTable({
	get data() {
		return candidates;
	},
	get pageCount() {
		return pageCount.value ?? 0;
	},
	get rowCount() {
		return meta.value?.total_records ?? 0;
	},
	columns: talentPoolColumns(handleOpenSheet, handleOpenAlert),
	state: {
		get rowSelection() {
			return rowSelection.value;
		},
		get columnVisibility() {
			return columnVisibility.value;
		},
	},
	initialState: {
		pagination: pagination.value,
	},
	manualPagination: true,
	getCoreRowModel: getCoreRowModel(),
	onPaginationChange: (updater) => {
		if (typeof updater === 'function') {
			setPagination(updater(pagination.value));
		} else {
			setPagination(updater);
		}
	},
	onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
	onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
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

const handleSearch = (value: string | number) => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		searchValue.value = value === '' ? undefined : (value as string);
		filterPayload.value = {
			...filterPayload.value,
			keywords: value === '' ? undefined : (value as string),
		};
	}, 500);
};

const handleDelete = () => {
	deleteCandidate(dataSent.value!.id, {
		onSuccess: () => {
			isOpenAlert.value = false;
			dataSent.value = undefined;
		},
	});
};

watch([pageIndex, pageSize, filterPayload], () => {
	router.replace({
		query: { page: pageIndex.value + 1, limit: pageSize.value, ...filterPayload.value },
	});
});
</script>
<template>
	<ContentWrapper>
		<Title>Talent pool</Title>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search..."
				@update:model-value="handleSearch" />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<!-- <Button
				class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium"
				@click="handleOpenSheet">
				<IconFromSvg :icon="UserPlus" />Add new
			</Button> -->
		</div>
		<div class="flex flex-col gap-3">
			<DataTable
				:table="table"
				@row:click="(payload) => handleOpenSheet(payload, true)"
				:is-loading="isLoading" />
			<Separator />
			<DataTablePagination :table="table" :meta="meta" />
		</div>
	</ContentWrapper>
	<TalentPoolSheet
		:data="dataSent"
		:open="isOpenSheet"
		:is-view="isView"
		@update:open="handleCloseSheet"
		@edit="isView = false" />
	<AlertPopup
		:open="isOpenAlert"
		:is-loading="isPending"
		:description="dataSent?.full_name"
		@update:open="handleCloseAlert"
		@confirm="handleDelete" />
</template>
