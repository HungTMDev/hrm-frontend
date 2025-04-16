<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import type { SalaryDefinition } from '@/types';
import SalaryDefinitionSheetView from './sheet/SalaryDefinitionSheetView.vue';
import SalaryDefinitionSheetForm from './sheet/SalaryDefinitionSheetForm.vue';

defineProps<{
	open: boolean;
	data?: SalaryDefinition;
	isView?: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'delete', payload: SalaryDefinition): void;
}>();

const handleOpen = (isOpen: boolean) => {
	emit('update:open', isOpen);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom
			class="rounded-l-3xl sm:max-w-[660px] p-8 flex flex-col text-slate-600 text-sm">
			<!-- <SalaryDefinitionSheetView /> -->
			<SalaryDefinitionSheetForm />
		</SheetContentCustom>
	</Sheet>
</template>
