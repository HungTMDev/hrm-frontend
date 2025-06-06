<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import CandidateSheetView from './sheet/CandidateSheetView.vue';
import SendEmail from './sheet/SendEmail.vue';
import { ref } from 'vue';
import CandidateSheetForm from './sheet/CandidateSheetForm.vue';
import type { PaginationState } from '@tanstack/vue-table';
import type { IApplicant, IApplicantFilter } from '@/types';

const props = defineProps<{
	open: boolean;
	data?: IApplicant;
	isView?: boolean;
	pagination: PaginationState;
	filter: Partial<IApplicantFilter>;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'back'): void;
	(e: 'delete', payload?: IApplicant): void;
	(e: 'openDialog'): void;
}>();

const isSendEmail = ref(false);

const handleOpen = (isOpen: boolean) => {
	isSendEmail.value = false;
	emits('update:open', isOpen);
};

const handleSendEmail = () => {
	isSendEmail.value = true;
};

const handleCancle = () => {
	isSendEmail.value = false;
};

const handleDelete = () => {
	emits('delete', props.data);
};

const handleClose = () => {
	isSendEmail.value = false;
	emits('update:open', false);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<SendEmail v-if="isSendEmail" @cancel="handleCancle" />
			<CandidateSheetView
				v-else-if="isView"
				:data="data"
				@edit="emits('edit')"
				@delete="handleDelete" />
			<CandidateSheetForm
				v-else
				:filter="filter"
				:pagination="pagination"
				:data="data"
				@close="handleClose"
				@back="emits('back')" />
		</SheetContentCustom>
	</Sheet>
</template>
