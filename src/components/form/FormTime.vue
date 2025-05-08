<script lang="ts" setup>
import type { FormFieldCommon } from '@/types';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import FormErrorCustom from './FormErrorCustom.vue';
import { TimeFieldInput, TimeFieldRoot } from 'reka-ui';
import ClockCircle from '@/assets/icons/Outline/Clock Circle.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';

interface Prop extends FormFieldCommon {}

const props = defineProps<Prop>();

const emits = defineEmits<{
	(e: 'update:value', payload: { fieldName: string; data: string | undefined }): void;
}>();

const handleValue = (value: any) => {
	emits('update:value', { fieldName: props.name, data: value?.toString() });
};
</script>
<template>
	<FormField :name="name">
		<FormItem class="flex flex-col">
			<FormLabel class="text-slate-600"
				>{{ label }} <span v-if="!required">(optional)</span></FormLabel
			>
			<FormControl>
				<TimeFieldRoot
					v-slot="{ segments }"
					class="flex gap-1 items-end border px-3 py-2.5 rounded-2xl pl-10 relative text-sm text-slate-600"
					:hour-cycle="24"
					@update:model-value="handleValue">
					<div class="absolute top-3 left-3 text-gray-200">
						<IconFromSvg :icon="ClockCircle" />
					</div>
					<template v-for="item in segments" :key="item.part">
						<TimeFieldInput
							v-if="item.part === 'literal'"
							:part="item.part"
							class="p-0.5">
							{{ item.value }}
						</TimeFieldInput>
						<TimeFieldInput
							v-else
							:part="item.part"
							class="rounded p-0.5 focus:outline">
							{{ item.value }}
						</TimeFieldInput>
					</template>
				</TimeFieldRoot>
			</FormControl>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
