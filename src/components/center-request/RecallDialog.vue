<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import FormTextarea from '../form/FormTextarea.vue';

defineProps<{
	open: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'submit', payload: { reason: string }): void;
}>();

const formSchema = toTypedSchema(
	z.object({
		reason: z.string().min(1),
	}),
);

const { handleSubmit, meta } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	emits('submit', values);
});

const handleCloseDialog = (open: boolean) => {
	emits('update:open', open);
};
</script>

<template>
	<Dialog :open="open" @update:open="handleCloseDialog">
		<DialogContent class="sm:max-w-[425px] sm:rounded-2xl">
			<DialogHeader>
				<DialogTitle class="text-center leading-6">
					Are your sure you want to recall your late arrival early leave request?
				</DialogTitle>
				<DialogDescription> </DialogDescription>
			</DialogHeader>
			<form id="form" @submit="onSubmit">
				<FormTextarea
					name="reason"
					label=""
					:required="true"
					class="h-56"
					placeholder="Please enter your reason for recall" />
			</form>
			<DialogFooter class="sm:justify-between sm:gap-x-4">
				<Button
					variant="outline"
					class="h-auto py-3 w-1/2 rounded-2xl"
					@click="handleCloseDialog(false)">
					Cancel
				</Button>
				<Button
					form="form"
					class="h-auto py-3 w-1/2 rounded-2xl hover:bg-blue-500"
					:disabled="!meta.valid">
					Recall
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
