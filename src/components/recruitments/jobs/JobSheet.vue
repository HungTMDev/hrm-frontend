<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import JobSheetForm from './sheet/JobSheetForm.vue';
import JobSheetView from './sheet/JobSheetView.vue';
import type { Job } from '@/types';
import CandidateView from './sheet/CandidateView.vue';
import { ref } from 'vue';

defineProps<{
	open: boolean;
	isView?: boolean;
	data?: Job;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'openAlert', payload: any): void;
	(e: 'edit'): void;
}>();

const isCandidateView = ref(false);
const candidateData = ref<any>();

const handleOpen = (isOpen: boolean) => {
	isCandidateView.value = false;
	emit('update:open', isOpen);
};

const handleViewCandidate = (payload: any) => {
	isCandidateView.value = true;
	candidateData.value = payload;
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<CandidateView v-if="isCandidateView" />
			<JobSheetView
				v-else-if="isView"
				@edit="emit('edit')"
				@view-candidate="handleViewCandidate" />
			<JobSheetForm v-else :data="data" />
		</SheetContentCustom>
	</Sheet>
</template>
