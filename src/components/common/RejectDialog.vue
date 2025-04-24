<script setup lang="ts">
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import FormErrorCustom from '../form/FormErrorCustom.vue';
import { Button } from '../ui/button';
import { FormControl, FormDescription, FormField, FormItem } from '../ui/form';
import { Textarea } from '../ui/textarea';

defineProps<{
	open: boolean;
	title?: string;
	description?: string;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'confirm'): void;
}>();

const formSchema = toTypedSchema(
	z.object({
		reason: z.string({ message: 'Please enter the reason' }).min(1, 'Please enter the reason'),
	}),
);

const { handleSubmit, resetForm, meta } = useForm({
	validationSchema: formSchema,
	validateOnMount: false,
});

const onSubmit = handleSubmit((values) => {
	console.log(values);
});

const handleOpen = (open: boolean) => {
	resetForm();
	emit('update:open', open);
};
</script>

<template>
	<AlertDialog :open="open" @update:open="handleOpen">
		<AlertDialogContent class="w-[400px]">
			<AlertDialogHeader class="sm:text-center gap-0">
				<AlertDialogTitle>{{
					title ?? 'Are your sure you want to reject?'
				}}</AlertDialogTitle>
				<AlertDialogDescription>
					<span v-if="description">"{{ description }}"</span>
				</AlertDialogDescription>
			</AlertDialogHeader>
			<form id="form" @submit="onSubmit">
				<FormField v-slot="{ componentField, errors }" name="reason">
					<FormItem class="flex flex-col">
						<FormControl>
							<Textarea
								placeholder="Please enter the reason for rejection"
								:class="
									cn(
										'resize-none h-[200px] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl placeholder:text-gray-200',
										errors.length > 0 ? 'border-red-500' : 'border-gray-100',
									)
								"
								v-bind="{ ...componentField, onBlur: () => {} }" />
						</FormControl>
						<FormDescription> </FormDescription>
						<FormErrorCustom class="!mt-0" />
					</FormItem>
				</FormField>
			</form>
			<AlertDialogFooter class="sm:justify-center sm:gap-4">
				<AlertDialogCancel class="rounded-2xl w-full py-3.5 h-auto"
					>Cancel</AlertDialogCancel
				>
				<Button
					class="rounded-2xl w-full py-3 h-auto"
					variant="destructive"
					form="form"
					:disabled="!meta.valid"
					>Reject</Button
				>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>
