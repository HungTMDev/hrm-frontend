<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { FormFieldCommon } from '@/types';
import FormErrorCustom from './FormErrorCustom.vue';

interface Prop extends FormFieldCommon {}

const props = defineProps<Prop>();
</script>

<template>
	<FormField :model-value="modelValue" v-slot="{ componentField, errors }" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel
				>{{ label }}
				<span v-if="!required" class="text-slate-400 font-light">(optional)</span></FormLabel
			>
			<FormControl>
				<Textarea
					:placeholder="placeholder"
					class="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl placeholder:text-gray-200"
					:class="cn(errors.length > 0 && 'border-destructive', props.class)"
					v-bind="componentField" />
			</FormControl>
			<FormDescription> </FormDescription>
			<FormErrorCustom class="!mt-0" />
		</FormItem>
	</FormField>
</template>
