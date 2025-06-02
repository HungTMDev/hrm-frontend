<script lang="ts" setup>
import type { FormFieldCommon } from '@/types';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import FormErrorCustom from './FormErrorCustom.vue';
import TimeInput from '../common/TimeInput.vue';
import { cn } from '@/lib/utils';

interface Prop extends FormFieldCommon {}

defineProps<Prop>();
</script>
<template>
	<FormField :model-value="modelValue" v-slot="{ componentField, errors }" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel class="text-slate-600"
				>{{ label }} <span v-if="!required">(optional)</span></FormLabel
			>
			<FormControl>
				<TimeInput
					v-bind="componentField"
					:class="cn(errors.length > 0 && 'border-destructive')" />
			</FormControl>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
