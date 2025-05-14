<script lang="ts" setup>
import { TimeFieldInput, TimeFieldRoot } from 'reka-ui';
import ClockCircle from '@/assets/icons/Outline/Clock Circle.svg';
import IconFromSvg from './IconFromSvg.vue';
import { onMounted, ref } from 'vue';

const props = defineProps<{
	modelValue?: string;
}>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string): void;
}>();

const value = ref<any>();

const handleInput = (value: any) => {
	emits('update:modelValue', value.toString());
};

onMounted(() => {
	if (props.modelValue) {
		const date = new Date(props.modelValue);
		const time = {
			hour: date.getHours(),
			millisecond: date.getMilliseconds(),
			minute: date.getMinutes(),
			second: date.getSeconds(),
		} as any;
		value.value = time;
		emits(
			'update:modelValue',
			`${String(value.value.hour).padStart(2, '0')}:${String(value.value.minute).padStart(2, '0')}:${String(value.value.second).padStart(2, '0')}`,
		);
	}
});
</script>
<template>
	<TimeFieldRoot
		v-slot="{ segments }"
		:hour-cycle="24"
		:model-value="value"
		class="flex gap-1 items-end border px-3 py-2.5 rounded-2xl pl-10 relative text-sm text-slate-600"
		@update:model-value="handleInput">
		<div class="absolute top-3 left-3 text-gray-200">
			<IconFromSvg :icon="ClockCircle" />
		</div>
		<template v-for="item in segments" :key="item.part">
			<TimeFieldInput v-if="item.part === 'literal'" :part="item.part" class="p-0.5">
				{{ item.value }}
			</TimeFieldInput>
			<TimeFieldInput v-else :part="item.part" class="rounded p-0.5 focus:outline">
				{{ item.value }}
			</TimeFieldInput>
		</template>
	</TimeFieldRoot>
</template>
