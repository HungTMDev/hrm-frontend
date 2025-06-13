<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import type { IApplicant, IJob, IJobFilter } from '@/types';
import { ref } from 'vue';
import CandidateView from './sheet/CandidateView.vue';
import JobSheetForm from './sheet/JobSheetForm.vue';
import JobSheetView from './sheet/JobSheetView.vue';
import type { PaginationState } from '@tanstack/vue-table';

defineProps<{
	open: boolean;
	isView?: boolean;
	data?: IJob;
	pagination: PaginationState;
	filter: Partial<IJobFilter>;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'openAlert', payload: any): void;
	(e: 'edit'): void;
}>();

const isCandidateView = ref(false);
const candidateData = ref<IApplicant>();

const handleOpen = (isOpen: boolean) => {
	isCandidateView.value = false;
	emit('update:open', isOpen);
};

const handleViewCandidate = (payload: IApplicant) => {
	candidateData.value = payload;
	isCandidateView.value = true;
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<CandidateView
				:applicant="candidateData"
				v-if="isCandidateView"
				@back="isCandidateView = false" />
			<JobSheetView
				v-else-if="isView"
				:data="data"
				@edit="emit('edit')"
				@view-candidate="handleViewCandidate" />
			<JobSheetForm
				v-else
				:data="data"
				:pagination="pagination"
				:filter="filter"
				@update:open="(payload) => emit('update:open', payload)" />
		</SheetContentCustom>
	</Sheet>
</template>
