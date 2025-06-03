<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import type { IRecruitmentRequest, IRecruitmentRequestFilter } from '@/types';
import RecruitmentRequestSheetView from './sheet/RecruitmentRequestSheetView.vue';
import RecruitmentRequestSheetForm from './sheet/RecruitmentRequestSheetForm.vue';
import type { PaginationState } from '@tanstack/vue-table';

defineProps<{
	open: boolean;
	data?: IRecruitmentRequest;
	isView?: boolean;
	pagination: PaginationState;
	filter: Partial<IRecruitmentRequestFilter>;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'openDialog'): void;
	(e: 'edit'): void;
	(e: 'approve', id: string): void;
	(e: 'recall'): void;
}>();

const handleOpen = (isOpen: boolean) => {
	emits('update:open', isOpen);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<RecruitmentRequestSheetView
				v-if="isView"
				:data="data"
				@edit="emits('edit')"
				@open-dialog="emits('openDialog')"
				@approve="(id) => emits('approve', id)"
				@recall="emits('recall')" />
			<RecruitmentRequestSheetForm
				v-else
				:data="data"
				:pagination="pagination"
				:filter="filter"
				@update:open="(open) => emits('update:open', open)" />
		</SheetContentCustom>
	</Sheet>
</template>
