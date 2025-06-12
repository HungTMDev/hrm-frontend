<script lang="ts" setup>
import { TimeFieldInput, TimeFieldRoot } from 'reka-ui';
import ClockCircle from '@/assets/icons/Outline/ClockCircle.svg';
import IconFromSvg from './IconFromSvg.vue';
import { onMounted, ref, watch, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
	modelValue?: string;
	class?: HTMLAttributes['class'];
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

		const isDate = !isNaN(date.getTime());

		const time = {
			hour: isDate ? date.getHours() : props.modelValue.split(':')[0],
			millisecond: isDate ? date.getMilliseconds() : '00',
			minute: isDate ? date.getMinutes() : props.modelValue.split(':')[1],
			second: isDate ? date.getSeconds() : props.modelValue.split(':')[2],
		} as any;
		value.value = time;
		emits(
			'update:modelValue',
			`${String(value.value.hour).padStart(2, '0')}:${String(value.value.minute).padStart(2, '0')}:${String(value.value.second).padStart(2, '0')}`,
		);
	}
});
watch(
	() => props.modelValue,
	(newVal) => {
		if (newVal) {
			const date = new Date(newVal);
			const isDate = !isNaN(date.getTime());
			const time = {
				hour: isDate ? date.getHours() : newVal.split(':')[0],
				millisecond: isDate ? date.getMilliseconds() : '00',
				minute: isDate ? date.getMinutes() : newVal.split(':')[1],
				second: isDate ? date.getSeconds() : newVal.split(':')[2],
			} as any;
			value.value = time;
			emits(
				'update:modelValue',
				`${String(value.value.hour).padStart(2, '0')}:${String(value.value.minute).padStart(2, '0')}:${String(value.value.second).padStart(2, '0')}`,
			);
		}
	},
);
</script>
<template>
	<TimeFieldRoot
		v-slot="{ segments }"
		:hour-cycle="24"
		:model-value="value"
		:class="
			cn(
				'flex gap-1 items-end border px-3 py-2.5 rounded-2xl pl-10 relative text-sm text-slate-600',
				props.class,
			)
		"
		@update:model-value="handleInput">
		<div class="absolute top-3 left-3 text-gray-200">
			<IconFromSvg :icon="ClockCircle" />
		</div>
		<template v-for="item in segments" :key="item.part">
			<TimeFieldInput v-if="item.part === 'literal'" :part="item.part" class="p-0.5">
				{{ item.value }}
			</TimeFieldInput>
			<TimeFieldInput v-else :part="item.part" class="rounded p-0.5 focus:outline text-black">
				{{ item.value }}
			</TimeFieldInput>
		</template>
	</TimeFieldRoot>
</template>
