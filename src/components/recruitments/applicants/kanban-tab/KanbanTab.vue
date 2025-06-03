<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Upload from '@/assets/icons/Outline/Upload Minimalistic.svg';
import UserPlus from '@/assets/icons/Outline/User Plus.svg';
import FilterPopover from '@/components/common/FilterPopover.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ScrollBar from '@/components/ui/scroll-area/ScrollBar.vue';
import {
	useAllApplicant,
	useAllApplicantInterview,
} from '@/composables/recruitment/applicant/useApplicant';
import { useUpdateStage } from '@/composables/recruitment/applicant/useUpdateApplicant';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/app.store';
import { computed, ref } from 'vue';
import KanbanApplicantColumn from './KanbanApplicantColumn.vue';
import type { KanbanApplicantItem } from './type';
import AppliedDialog from '../screening-tab/applied-tab/AppliedDialog.vue';
import AlertPopup from '@/components/common/AlertPopup.vue';
import ApplicantSheet from '../ApplicantSheet.vue';

const appStore = useAppStore();
const {
	data: allApplicant,
	refetch: refetchAllApplicant,
	isLoading: loadingApplicant,
} = useAllApplicant();
const {
	data: allApplicantInterview,
	refetch: refetchAllApplicantInterview,
	isLoading: loadingApplicantInterview,
} = useAllApplicantInterview();

const isOpenDialog = ref(false);
const isOpenAlert = ref(false);
const isOpenSheet = ref(false);
const dataSent = ref<string>();

const list = computed<{
	applied: KanbanApplicantItem[];
	passed: KanbanApplicantItem[];
	interview_1: KanbanApplicantItem[];
	interview_2: KanbanApplicantItem[];
	offering: KanbanApplicantItem[];
	hired: KanbanApplicantItem[];
	rejected: KanbanApplicantItem[];
}>(() => {
	return {
		applied: filterData(allApplicant.value, 'APPLIED'),
		passed: filterData(allApplicant.value, 'SCREENING'),
		interview_1: filterData(allApplicantInterview.value, 'INTERVIEW_1'),
		interview_2: filterData(allApplicantInterview.value, 'INTERVIEW_2'),
		offering: filterData(allApplicant.value, 'OFFER'),
		hired: filterData(allApplicant.value, 'HIRED'),
		rejected: filterData(allApplicant.value, 'REJECTED'),
	};
});

const filterData = (data: any, stage: string) => {
	return (
		data
			?.filter((item: any) => item.current_stage === stage || item.stage === stage)
			?.map((item: any) => ({
				id: item.application_id ?? item.id,
				name: item.candidate.full_name,
				email: item.candidate.email,
				position: item?.job?.title ?? item.interview_name,
				applied_at: item.applied_at,
				status: item.status,
			})) || []
	);
};

const { mutate: updateStage } = useUpdateStage();

const onAdd = (event: any) => {
	const targetColumnName = event.to.dataset.name as string;
	const movedItem = event.item.__draggable_context.element;

	const outcome = targetColumnName === 'rejected' ? 'FAILED' : 'PASSED';

	updateStage(
		{
			id: movedItem.id,
			data: {
				to_stage: targetColumnName.toUpperCase(),
				outcome,
			},
		},
		{
			onError: () => {
				refetchAllApplicant();
				refetchAllApplicantInterview();
			},
		},
	);
};

const handleOpenSheet = (id: string) => {
	dataSent.value = id;
	isOpenSheet.value = true;
};

const handleCloseAlert = (open: boolean) => {
	isOpenAlert.value = open;
};

const handleCloseDialog = (open: boolean) => {
	isOpenDialog.value = open;
};

const handleCloseSheet = (open: boolean) => {
	isOpenSheet.value = open;
};
</script>
<template>
	<div class="flex gap-2 items-center my-4">
		<InputWithIcon :icon="Magnifer" class="py-2 flex-1 rounded-full" placeholder="Search..." />
		<FilterPopover :list="[]" />
		<Button
			class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium"
			@click="isOpenDialog = true">
			<IconFromSvg :icon="Upload" />Upload
		</Button>
		<Button class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium">
			<IconFromSvg :icon="UserPlus" />Add new
		</Button>
	</div>
	<ScrollArea
		:class="
			cn(
				'transition-all duration-300 ease-in-out pb-3',
				appStore.isSmallSidebar ? 'w-[calc(100vw-160px)]' : 'w-[calc(100vw-320px)]',
			)
		">
		<div class="flex gap-4">
			<KanbanApplicantColumn
				label="Applied"
				column-name="applied"
				group="applicants"
				:list="list.applied"
				:is-loading="loadingApplicant"
				@item:click="handleOpenSheet"
				@add="onAdd" />
			<KanbanApplicantColumn
				label="Passed"
				column-name="screening"
				group="applicants"
				:is-loading="loadingApplicant"
				:list="list.passed"
				@item:click="handleOpenSheet"
				@add="onAdd" />
			<KanbanApplicantColumn
				label="Interview 1"
				column-name="interview_1"
				group="applicants"
				:is-loading="loadingApplicantInterview"
				:list="list.interview_1"
				@item:click="handleOpenSheet"
				@add="onAdd" />
			<KanbanApplicantColumn
				label="Interview 2"
				column-name="interview_2"
				group="applicants"
				:is-loading="loadingApplicantInterview"
				:list="list.interview_2"
				@item:click="handleOpenSheet"
				@add="onAdd" />
			<KanbanApplicantColumn
				label="Offering"
				column-name="offer"
				group="applicants"
				:is-loading="loadingApplicant"
				:list="list.offering"
				@item:click="handleOpenSheet"
				@add="onAdd" />
			<KanbanApplicantColumn
				label="Hired"
				column-name="hired"
				group="applicants"
				:is-loading="loadingApplicant"
				:list="list.hired"
				@item:click="handleOpenSheet"
				@add="onAdd" />
			<KanbanApplicantColumn
				label="Rejected"
				column-name="rejected"
				group="applicants"
				:is-loading="loadingApplicant"
				:list="list.rejected"
				@item:click="handleOpenSheet"
				@add="onAdd" />
		</div>

		<ScrollBar orientation="horizontal" />
	</ScrollArea>

	<ApplicantSheet :open="isOpenSheet" :data="dataSent" @update:open="handleCloseSheet" />

	<AppliedDialog :open="isOpenDialog" @update:open="handleCloseDialog" />

	<AlertPopup :open="isOpenAlert" @update:open="handleCloseAlert" />
</template>
