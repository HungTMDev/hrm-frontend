<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import EmployeeSheetForm from './sheet/EmployeeSheetForm.vue';
import EmployeeSheetView from './sheet/EmployeeSheetView.vue';
import type { Employee } from '@/types';

defineProps<{
	open: boolean;
	data?: Employee;
	isView?: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'delete', payload: Employee): void;
}>();

const handleOpen = (isOpen: boolean) => {
	emit('update:open', isOpen);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<EmployeeSheetView
				v-if="isView"
				:data="data!"
				@edit="emit('edit')"
				@delete="emit('delete', data!)" />
			<EmployeeSheetForm v-else :data="data" />
		</SheetContentCustom>
	</Sheet>
</template>
