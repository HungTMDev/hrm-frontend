<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import type { EmployeePayroll } from '@/types';
import EmployeePayrollSheetView from './sheet/EmployeePayrollSheetView.vue';
import EmployeePayrollSheetForm from './sheet/EmployeePayrollSheetForm.vue';

defineProps<{
	open: boolean;
	data?: EmployeePayroll;
	isView?: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'delete', payload: EmployeePayroll): void;
}>();

const handleOpen = (isOpen: boolean) => {
	emit('update:open', isOpen);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom
			class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600 text-sm">
			<EmployeePayrollSheetView
				v-if="isView"
				:data="data"
				@edit="emit('edit')"
				@delete="emit('delete', data!)" />
			<EmployeePayrollSheetForm v-else />
		</SheetContentCustom>
	</Sheet>
</template>
