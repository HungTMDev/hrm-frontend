<script setup lang="ts">
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import type { FormFieldCommon } from '@/types';
import { type HTMLAttributes } from 'vue';
import CommonDatePicker from '../common/CommonDatePicker.vue';
import FormErrorCustom from './FormErrorCustom.vue';
import { cn } from '@/lib/utils';

interface Prop extends FormFieldCommon {
	class?: HTMLAttributes['class'];
}
defineProps<Prop>();
</script>

<template>
	<FormField :model-value="modelValue" v-slot="{ componentField, errors }" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel class="text-slate-600"
				>{{ label }} <span v-if="!required">(optional)</span></FormLabel
			>
			<CommonDatePicker
				v-bind="componentField"
				:class="cn(errors.length > 0 && 'border-destructive')" />
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
