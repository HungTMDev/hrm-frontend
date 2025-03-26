<script setup lang="ts">
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import { Sheet } from '@/components/ui/sheet';
import { onUpdated, ref } from 'vue';
import Step0 from './sheet/Step0.vue';
import Step1 from './sheet/Step1.vue';
import Step2 from './sheet/Step2.vue';

const props = defineProps<{
	open: boolean;
	data?: any;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
}>();

const step = ref(1);

const handleOpen = (isOpen: boolean) => {
	emit('update:open', isOpen);
};

onUpdated(() => {
	step.value = props.data ? 0 : 1;
});
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-[#475569]">
			<template v-if="step === 0">
				<Step0 />
			</template>
			<template v-if="step === 1">
				<Step1 />
			</template>
			<template v-if="step === 2">
				<Step2 />
			</template>
		</SheetContentCustom>
	</Sheet>
</template>
