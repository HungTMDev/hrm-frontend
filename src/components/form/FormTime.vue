<script lang="ts" setup>
import type { FormFieldCommon } from '@/types';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import FormErrorCustom from './FormErrorCustom.vue';
import TimeInput from '../common/TimeInput.vue';

interface Prop extends FormFieldCommon {}

defineProps<Prop>();
</script>
<template>
	<FormField :model-value="modelValue" v-slot="{ componentField }" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel class="text-slate-600"
				>{{ label }} <span v-if="!required">(optional)</span></FormLabel
			>
			<FormControl>
				<TimeInput v-bind="componentField" />
			</FormControl>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
