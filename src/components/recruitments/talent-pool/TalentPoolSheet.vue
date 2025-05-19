<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import TalentPoolSheetView from './sheet/TalentPoolSheetView.vue';
import TalentPoolSheetForm from './sheet/TalentPoolSheetForm.vue';
import type { ICandidate } from '@/types';

defineProps<{
	open: boolean;
	data?: ICandidate;
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
			<TalentPoolSheetView v-if="isView" :data="data" @edit="emit('edit')" />
			<TalentPoolSheetForm v-else :data="data" />
		</SheetContentCustom>
	</Sheet>
</template>
