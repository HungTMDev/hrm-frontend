<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import type { PayrollFileManagement } from '@/types';
import PayrollFileSheetView from './sheet/PayrollFileSheetView.vue';
import PayrollFileSheetForm from './sheet/PayrollFileSheetForm.vue';

defineProps<{
	open: boolean;
	data?: PayrollFileManagement;
	isView?: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'delete', payload: PayrollFileManagement): void;
}>();

const handleOpen = (isOpen: boolean) => {
	emit('update:open', isOpen);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom
			class="rounded-l-3xl sm:max-w-[660px] p-8 flex flex-col text-slate-600 text-sm">
			<PayrollFileSheetView
				v-if="isView"
				:data="data"
				@edit="emit('edit')"
				@delete="emit('delete', data!)" />
			<PayrollFileSheetForm v-else />
		</SheetContentCustom>
	</Sheet>
</template>
