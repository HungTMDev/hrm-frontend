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
	<FormField :model-value="modelValue" v-slot="{ componentField }" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel>{{ label }}</FormLabel>
			<FormControl>
				<Textarea
					:placeholder="placeholder"
					class="resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
					:class="cn(props.class)"
					v-bind="componentField" />
			</FormControl>
			<FormDescription> </FormDescription>
			<FormErrorCustom class="!mt-0" />
		</FormItem>
	</FormField>
</template>
