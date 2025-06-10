<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useApplicant } from '@/composables/recruitment/applicant/useApplicant';
import { useListJob } from '@/composables/recruitment/job/useJob';
import { DEFAULT_PAGINATION, RECRUITMENT_STAGE } from '@/constants';
import { createNameByGender, valueUpdater } from '@/lib/utils';
import type { FilterAccordion, FilterData, IApplicant, IApplicantFilter, IMeta } from '@/types';
import {
	getCoreRowModel,
	useVueTable,
	type PaginationState,
	type VisibilityState,
} from '@tanstack/vue-table';
import { computed, ref, watch, type Ref } from 'vue';
import ApplicantSheet from '../ApplicantSheet.vue';
import { rejectedColumn } from './column';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Letter from '@/assets/icons/Outline/Letter.svg';
import { Button } from '@/components/ui/button';
import AlertPopup from '@/components/common/AlertPopup.vue';
import { useSendEmail } from '@/composables/recruitment/applicant/useUpdateApplicant';
import { THANKS_EMAIL } from '@/constants/model';
import { useCustomToast } from '@/lib/customToast';
import { useGetAccount } from '@/composables/auth/useAuth';
import Handlebars from 'handlebars';

const { data: jobs } = useListJob();
const { showToast } = useCustomToast();
const { data: user } = useGetAccount();

let timeout: any;
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const keywords = ref<string>();
const filter = ref<Record<string, string[]>>();
const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const renderedHtml = ref('');
const dataSent = ref<IApplicant | IApplicant[]>();

const pageIndex = ref(DEFAULT_PAGINATION.DEFAULT_PAGE - 1);
const pageSize = ref(DEFAULT_PAGINATION.DEFAULT_LIMIT);
const filterPayload = computed<Partial<IApplicantFilter>>(() => ({
	stage: [RECRUITMENT_STAGE.REJECTED, RECRUITMENT_STAGE.WITHDRAWN],
	keywords: keywords.value,
	...filter.value,
}));

const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));

const dataFill: Ref<{
	location: string;
	hr_name: string;
	hr_email: string;
	phone_number: string;
}> = computed(() => ({
	hr_name: createNameByGender(
		user.value?.name?.split(' ').slice(-1)[0] || '',
		(user.value?.gender as unknown as string) || '',
	),
	hr_email: user.value?.email || '',
	phone_number: user.value?.phone_number || '',
	location: 'Tầng 4 - Tòa Hanvico, 217- 219 Lê Duẩn, Thanh Khê, Đà Nẵng',
}));

const { data, isLoading } = useApplicant(pagination, filterPayload);
const { mutateAsync: sendEmail, isPending: isSending } = useSendEmail();

const alertDetail = computed(() => {
	if (Array.isArray(dataSent.value)) {
		return {
			title: 'Are you sure you want to reject all selected candidates?',
			description: 'All',
		};
	}
	return {
		title: 'Are you sure you want to reject this candidate?',
		description: dataSent.value?.candidate.full_name,
	};
});
const applicants = computed<IApplicant[]>(() => data.value?.data || []);
const meta = computed<IMeta | undefined>(() => data.value?.meta);
const pageCount = computed(() => meta.value?.total_pages);
const accordionItems = computed<FilterAccordion[]>(() => [
	{
		value: 'job_id',
		title: 'Job',
		items: jobs.value?.map((item) => ({ label: item.title, value: item.id })) || [],
		icon: Building3,
		type: 'list',
	},
]);

const setPageSize = (newSize: number) => (pageSize.value = newSize);
const setPageIndex = (newIndex: number) => (pageIndex.value = newIndex);

const setPagination = ({ pageIndex, pageSize }: PaginationState): PaginationState => {
	setPageIndex(pageIndex);
	setPageSize(pageSize);

	return { pageIndex, pageSize };
};

const handleOpenSheet = (payload: IApplicant) => {
	dataSent.value = payload;
	isOpenSheet.value = true;
};

const handleOpenAlert = (payload?: IApplicant) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = table.getSelectedRowModel().rows.map((item) => item.original);
	} else dataSent.value = payload;

	isOpenAlert.value = true;
};

const table = useVueTable({
	get data() {
		return applicants.value;
	},
	get pageCount() {
		return pageCount.value ?? 0;
	},
	get rowCount() {
		return meta.value?.total_records ?? 0;
	},
	columns: rejectedColumn(handleOpenSheet, handleOpenAlert),
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

const handleSearch = (payload: string | number) => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		keywords.value = payload === '' ? undefined : (payload as string);
	}, 500);
};

const handleFilter = (payload: FilterData[]) => {
	const newFilter: Record<string, (string | number)[]> = {};
	payload.forEach((item) => {
		newFilter[item.field] = item.filters.map((i) => i.value as string);
	});

	pageIndex.value = 0;
	filter.value = newFilter as Record<string, string[]>;
};

const handleConfirm = async () => {
	if (Array.isArray(dataSent.value)) {
		const states = dataSent.value.map(() => false);

		await Promise.all(
			dataSent.value.map(async (item, index) => {
				const res = await sendEmail({
					email: item.candidate.email,
					content: renderedHtml.value.replace(/"/g, "'"),
					subject: '[THƯ CẢM ƠN ỨNG TUYỂN - LUTECH.LTD]',
				});
				if (res.status_code === 200) states[index] = true;
			}),
		);

		const countSuccess = states.filter((item) => item === true).length;

		if (countSuccess === dataSent.value.length) {
			showToast({
				message: `Sent email to ${countSuccess} candidate(s) success!`,
				type: 'success',
			});
		} else {
			showToast({
				message: `Sent email to ${dataSent.value.length - countSuccess} candidate(s) error!`,
				type: 'error',
			});
			showToast({
				message: `Sent email to ${countSuccess} candidate(s) success!`,
				type: 'success',
			});
		}

		isOpenSheet.value = false;
		isOpenAlert.value = false;
		dataSent.value = undefined;
		return;
	}

	sendEmail(
		{
			email: dataSent.value?.candidate.email ?? '',
			content: renderedHtml.value.replace(/"/g, "'"),
			subject: '[THƯ CẢM ƠN ỨNG TUYỂN - LUTECH.LTD]',
		},
		{
			onSuccess: () => {
				isOpenSheet.value = false;
				isOpenAlert.value = false;
				dataSent.value = undefined;
				showToast({
					message: 'Sent email success!',
					type: 'success',
				});
			},
		},
	);
};

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isOpenSheet.value = open;
};

const handleCloseAlert = (open: boolean) => {
	isOpenAlert.value = open;
	dataSent.value = undefined;
};

watch(dataFill, () => {
	const rawTemplate = THANKS_EMAIL;
	const compiled = Handlebars.compile(rawTemplate);
	renderedHtml.value = compiled(dataFill.value);
});
</script>
<template>
	<div>
		<div
			v-if="table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected()"
			class="my-4 flex justify-between items-center">
			<p class="text-slate-600">
				{{ table.getFilteredSelectedRowModel().rows.length }} item(s) selected
			</p>
			<Button
				variant="ghost"
				class="bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-500 rounded-2xl"
				@click="handleOpenAlert">
				<IconFromSvg :icon="Letter" />
				Send email
			</Button>
		</div>
		<div v-else class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search..."
				@update:model-value="handleSearch" />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<FilterPopover :list="accordionItems" @update:value="handleFilter" />
		</div>
		<div class="flex flex-col gap-3">
			<DataTable
				:table="table"
				:is-loading="isLoading"
				@row:click="(payload) => handleOpenSheet(payload)" />
			<Separator />
			<DataTablePagination :table="table" :meta="meta" />
		</div>
	</div>

	<ApplicantSheet
		:open="isOpenSheet"
		:applicant-id="(dataSent as IApplicant)?.id"
		@update:open="handleCloseSheet" />

	<AlertPopup
		:open="isOpenAlert"
		:description="alertDetail.description"
		:title="alertDetail.title"
		:is-loading="isSending"
		button-label="Confirm"
		@confirm="handleConfirm"
		@update:open="handleCloseAlert" />
</template>
