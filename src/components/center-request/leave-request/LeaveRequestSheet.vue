<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import { ref } from 'vue';
import LeaveRequestSheetForm from './sheet/LeaveRequestSheetForm.vue';
import LeaveRequestSheetView from './sheet/LeaveRequestSheetView.vue';
import type { LeaveRequest } from '@/types/center-request';

const props = defineProps<{
	open: boolean;
	isView?: boolean;
	data?: LeaveRequest;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'openAlert', payload: any): void;
	(e: 'edit'): void;
	(e: 'back'): void;
	(e: 'reject', payload?: LeaveRequest): void;
	(e: 'recall', payload?: LeaveRequest): void;
}>();

const isCandidateView = ref(false);

const handleOpen = (isOpen: boolean) => {
	isCandidateView.value = false;
	emits('update:open', isOpen);
};

const handleReject = () => {
	emits('reject', props.data);
};

const handleRecall = () => {
	emits('recall', props.data);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<LeaveRequestSheetView
				:data="data"
				v-if="isView"
				@edit="emits('edit')"
				@recall="handleRecall"
				@reject="handleReject" />
			<LeaveRequestSheetForm v-else :data="data" @back="emits('back')" />
		</SheetContentCustom>
	</Sheet>
</template>
