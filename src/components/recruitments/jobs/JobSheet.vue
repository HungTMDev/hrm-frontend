<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import { ref } from 'vue';
import Step1 from './sheet/Step1.vue';
import Step2 from './sheet/Step2.vue';
import Step0 from './sheet/Step0.vue';

defineProps<{
	open: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'openAlert', payload: any): void;
}>();

const step = ref(0);

const handleOpen = (isOpen: boolean) => {
	emit('update:open', isOpen);
};

const handleStep = (newStep: number) => {
	step.value = newStep;
};

const openAlert = () => {
	emit('openAlert', undefined);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<span v-if="step > 0" class="absolute top-8 right-8 text-sm text-gray-200">
				<span class="text-blue-500">Step {{ step }}</span> of 2
			</span>
			<div v-if="step === 0">
				<Step0 :step="step" @update:step="handleStep" @open-alert="openAlert" />
			</div>
			<div v-if="step === 1">
				<Step1 :step="step" @update:step="handleStep" />
			</div>
			<div v-if="step === 2">
				<Step2 :step="2" @update:step="handleStep" />
			</div>
		</SheetContentCustom>
	</Sheet>
</template>
<style scoped>
.custom-editor ::v-deep(.ql-toolbar) {
	display: none !important;
}
</style>
