<script lang="ts" setup>
import InputWithIcon from '../common/InputWithIcon.vue';
import { FormField } from '../ui/form';
import FormControl from '../ui/form/FormControl.vue';
import FormDescription from '../ui/form/FormDescription.vue';
import FormItem from '../ui/form/FormItem.vue';
import FormLabel from '../ui/form/FormLabel.vue';
import { cn } from '@/lib/utils';
import FormErrorCustom from './FormErrorCustom.vue';
import type { FormFieldCommon } from '@/types';

interface Prop extends FormFieldCommon {
	modelValue?: string | number;
	type?: string;
	icon?: any;
}

const props = defineProps<Prop>();
</script>
<template>
	<FormField :model-value="modelValue" v-slot="{ componentField, errors }" :name="name">
		<FormItem>
			<FormLabel>{{ label }}</FormLabel>
			<FormControl>
				<InputWithIcon
					:type="type"
					:model-value="modelValue"
					:placeholder="placeholder"
					:icon="icon"
					:class="cn(props.class, errors.length ? 'border-destructive' : '')"
					v-bind="componentField" />
			</FormControl>
			<FormDescription />
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
