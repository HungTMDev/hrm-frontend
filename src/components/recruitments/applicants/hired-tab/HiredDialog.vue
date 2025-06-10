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
import { createUserSchema, type CreateUserPayload } from './schema';
import { useForm } from 'vee-validate';
import FormInput from '@/components/form/FormInput.vue';
import type { IApplicant } from '@/types';
import CallApiButton from '@/components/common/CallApiButton.vue';

defineProps<{
	open: boolean;
	data?: IApplicant;
	isLoading?: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'submit', payload: CreateUserPayload): void;
}>();

const formSchema = toTypedSchema(createUserSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	emits('submit', values);
});

const handleClose = (open: boolean) => {
	emits('update:open', open);
};
</script>

<template>
	<Dialog :open="open" @update:open="handleClose">
		<DialogContent class="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Create user</DialogTitle>
				<DialogDescription> </DialogDescription>
			</DialogHeader>
			<form id="form" @submit="onSubmit" class="grid gap-2">
				<FormInput
					name="name"
					label="Name"
					:model-value="data?.candidate.full_name"
					:required="true"
					class="w-full"
					placeholder="Enter name" />
				<FormInput
					name="email"
					label="Email"
					:required="true"
					class="w-full"
					placeholder="Enter email" />
				<FormInput
					type="password"
					name="password"
					label="Password"
					:required="true"
					class="w-full"
					placeholder="Enter password" />
			</form>
			<DialogFooter>
				<CallApiButton
					form="form"
					:is-loading="isLoading"
					class="h-auto p-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-2xl">
					Create
				</CallApiButton>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
