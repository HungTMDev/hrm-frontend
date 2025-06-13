<script lang="ts" setup>
import type { FormFieldCommon } from '@/types';
import { useVModel } from '@vueuse/core';
import QuillEditor from '../common/QuillEditor.vue';
import { FormField } from '../ui/form';
import FormControl from '../ui/form/FormControl.vue';
import FormItem from '../ui/form/FormItem.vue';
import FormLabel from '../ui/form/FormLabel.vue';
import FormErrorCustom from './FormErrorCustom.vue';

interface Prop extends Omit<FormFieldCommon, 'modelValue' | 'defaultValue'> {
	modelValue?: string[];
	defaultValue?: string[];
	type?: 'ordered' | 'bullet';
}

const props = defineProps<Prop>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string[] | undefined): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
	passive: true,
	defaultValue: props.defaultValue,
});
</script>
<template>
	<FormField :model-value="modelValue" v-slot="{ componentField }" :name="name">
		<FormItem>
			<FormLabel
				>{{ label }}
				<span v-if="!required" class="text-slate-400 font-light">(optional)</span></FormLabel
			>
			<FormControl>
				<QuillEditor v-bind="componentField" :placeholder="placeholder || ''" :type="type" />
			</FormControl>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
