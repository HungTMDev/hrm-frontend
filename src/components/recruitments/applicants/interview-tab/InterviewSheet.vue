<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import type { IApplicantInterview, IApplicantInterviewFilter } from '@/types';
import { computed, ref } from 'vue';
import InterviewSheetView from './sheet/InterviewSheetView.vue';
import type { PaginationState } from '@tanstack/vue-table';
import { useGetApplicantInterviewById } from '@/composables/recruitment/applicant/useApplicant';
import InterviewSheetForm from './sheet/InterviewSheetForm.vue';

const props = defineProps<{
	open: boolean;
	data?: string;
	isView?: boolean;
	pagination: PaginationState;
	filter: Partial<IApplicantInterviewFilter>;
	isCompleting?: boolean;
	isHiring?: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'hire'): void;
	(e: 'cancel', payload: { data: IApplicantInterview; action: 'cancel' | 'reject' }): void;
	(e: 'reject', payload: { data: IApplicantInterview; action: 'cancel' | 'reject' }): void;
	(e: 'complete'): void;
	(e: 'openDialog', payload?: IApplicantInterview): void;
}>();

const isSendEmail = ref(false);
const isCreateFeedback = ref(false);

const id = computed(() => props.data);

const { data: applicantInterview } = useGetApplicantInterviewById(id);

const handleOpen = (isOpen: boolean) => {
	isSendEmail.value = false;
	isCreateFeedback.value = false;
	emits('update:open', isOpen);
};

const handleCancel = () => {
	emits('cancel', { data: applicantInterview.value as IApplicantInterview, action: 'cancel' });
};
const handleReject = () => {
	emits('reject', { data: applicantInterview.value as IApplicantInterview, action: 'reject' });
};

const handleOpenDialog = () => {
	emits('openDialog', applicantInterview.value);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<InterviewSheetView
				v-if="!isCreateFeedback"
				:data="applicantInterview"
				:filter="filter"
				:pagination="pagination"
				:is-completing="isCompleting"
				:is-hiring="isHiring"
				@open-dialog="handleOpenDialog"
				@create-feedback="isCreateFeedback = true"
				@hire="emits('hire')"
				@complete="emits('complete')"
				@reject="handleReject"
				@cancel="handleCancel"
				@update:open="handleOpen" />
			<InterviewSheetForm
				v-else
				:data="applicantInterview"
				:pagination="pagination"
				:filter="filter"
				@update:open="handleOpen"
				@cancel="isCreateFeedback = false" />
		</SheetContentCustom>
	</Sheet>
</template>
