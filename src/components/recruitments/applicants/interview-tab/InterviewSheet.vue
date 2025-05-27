<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import type { IApplicantInterviewFilter } from '@/types';
import { computed, ref } from 'vue';
import InterviewSheetView from './sheet/InterviewSheetView.vue';
import type { PaginationState } from '@tanstack/vue-table';
import { useGetApplicantById } from '@/composables/recruitment/applicant/useApplicant';
import InterviewSheetForm from './sheet/InterviewSheetForm.vue';

const props = defineProps<{
	open: boolean;
	data?: string;
	isView?: boolean;
	pagination: PaginationState;
	filter: Partial<IApplicantInterviewFilter>;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'openDialog'): void;
}>();

const isSendEmail = ref(false);

const id = computed(() => props.data);

const { data: applicantInterview } = useGetApplicantById(id);

const handleOpen = (isOpen: boolean) => {
	isSendEmail.value = false;
	emits('update:open', isOpen);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<InterviewSheetView
				v-if="isView"
				:data="applicantInterview"
				:filter="filter"
				:pagination="pagination" />
			<InterviewSheetForm v-else :data="applicantInterview" />
		</SheetContentCustom>
	</Sheet>
</template>
