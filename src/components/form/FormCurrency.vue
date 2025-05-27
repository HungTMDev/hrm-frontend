<script lang="ts" setup>
import { cn } from '@/lib/utils';
import type { FormFieldCommon } from '@/types';
import CurrencyInput from '../common/CurrencyInput.vue';
import { FormField } from '../ui/form';
import FormControl from '../ui/form/FormControl.vue';
import FormItem from '../ui/form/FormItem.vue';
import FormLabel from '../ui/form/FormLabel.vue';
import FormErrorCustom from './FormErrorCustom.vue';

interface Prop extends Omit<FormFieldCommon, 'modelValue'> {
	modelValue?: number;
	icon?: any;
}

const props = defineProps<Prop>();
</script>
<template>
	<FormField :model-value="modelValue" v-slot="{ componentField, errors }" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel class="text-slate-600"
				>{{ label }}
				<span v-if="!required" class="text-slate-400 font-light"
					>(optional)</span
				></FormLabel
			>
			<FormControl>
				<CurrencyInput
					:icon="icon"
					v-bind="componentField"
					:class="
						cn(
							props.class,
							errors.length
								? 'border-destructive focus-within:border-destructive'
								: 'focus-within:border-blue-100 ',
						)
					"
					:placeholder="placeholder" />
			</FormControl>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
