<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import CandidateSheetView from './sheet/CandidateSheetView.vue';
import SendEmail from './sheet/SendEmail.vue';
import { ref } from 'vue';
import CandidateSheetForm from './sheet/CandidateSheetForm.vue';

defineProps<{
	open: boolean;
	data?: any;
	isView?: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'openDialog'): void;
}>();

const isSendEmail = ref(false);

const handleOpen = (isOpen: boolean) => {
	emits('update:open', isOpen);
};

const handleSendEmail = () => {
	isSendEmail.value = true;
};

const handleCancle = () => {
	isSendEmail.value = false;
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<SendEmail v-if="isSendEmail" @cancel="handleCancle" />
			<CandidateSheetView
				v-else-if="isView"
				@edit="emits('edit')"
				@open-dialog="emits('openDialog')"
				@send-email="handleSendEmail" />
			<CandidateSheetForm v-else :data="data" />
		</SheetContentCustom>
	</Sheet>
</template>
