<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import CandidatesSheetView from './sheet/CandidatesSheetView.vue';
import CandidatesSheetForm from './sheet/CandidatesSheetForm.vue';

defineProps<{
	open: boolean;
	data?: any;
	isView?: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
}>();

const handleOpen = (isOpen: boolean) => {
	emit('update:open', isOpen);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<CandidatesSheetView v-if="isView" @edit="emit('edit')" />
			<CandidatesSheetForm v-else :data="data" />
		</SheetContentCustom>
	</Sheet>
</template>
