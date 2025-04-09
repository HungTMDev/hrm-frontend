<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import JobSheetForm from './sheet/JobSheetForm.vue';
import JobSheetView from './sheet/JobSheetView.vue';
import type { Job } from '@/types';

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

const handleOpen = (isOpen: boolean) => {
	emit('update:open', isOpen);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<JobSheetView v-if="isView" @edit="emit('edit')" />
			<JobSheetForm v-else :data="data" />
		</SheetContentCustom>
	</Sheet>
</template>
