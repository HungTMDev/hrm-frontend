<script lang="ts" setup>
import { generateQuarterOptions } from '@/lib/utils';
import { computed, ref, watch } from 'vue';
import QuarterSelect from './QuarterSelect.vue';

const emit = defineEmits<{
	(e: 'update:value', payload: { from: string; to: string }): void;
}>();

const START_YEAR = 2020;
const END_YEAR = ref(new Date().getFullYear());
const quarterList = ref(generateQuarterOptions(START_YEAR, END_YEAR.value));
const from = ref<string | undefined>();
const to = ref<string | undefined>();

const quarterComboboxList = computed(() => quarterList.value.map((q) => ({ label: q, value: q })));

watch([from, to], () => {
	if (from.value && to.value) {
		emit('update:value', { from: from.value, to: to.value });
	}
});
</script>
<template>
	<div class="flex gap-4 justify-center">
		<div>
			<label class="text-sm text-slate-600">From</label>
			<QuarterSelect
				:list="quarterComboboxList"
				class="rounded-2xl w-[130px]"
				@update:model-value="(value) => (from = value)"
				:max="to" />
		</div>
		<div>
			<label class="text-sm text-slate-600">To</label>
			<QuarterSelect
				:list="quarterComboboxList"
				class="rounded-2xl w-[130px]"
				@update:model-value="(value) => (to = value)"
				:min="from" />
		</div>
	</div>
</template>
