<script setup lang="ts">
import FormCombobox from '@/components/form/FormCombobox.vue';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useListUser } from '@/composables/user/useUser';
import { listInterviewRole } from '@/constants';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { addInterviewerSchema, type AddInterviewerPayload } from './schema';
import UserSpeak from '@/assets/icons/Outline/User Speak.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';

defineProps<{
	open: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'submit', payload: AddInterviewerPayload): void;
}>();

const { data } = useListUser();

const formSchema = toTypedSchema(addInterviewerSchema);

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
		<DialogContent class="sm:max-w-[425px] sm:rounded-2xl">
			<DialogHeader>
				<DialogTitle>Add interviewer</DialogTitle>
				<DialogDescription> </DialogDescription>
			</DialogHeader>
			<form id="form" @submit="onSubmit" class="grid gap-2">
				<FormCombobox
					:list="data?.map((user) => ({ label: user.name, value: user.id })) || []"
					:required="true"
					:is-search="true"
					:icon="UserSpeak"
					list-size="md"
					name="participant_id"
					label="Participant" />
				<FormCombobox
					:list="listInterviewRole"
					:required="true"
					:icon="UserCircle"
					name="role"
					label="Role" />
			</form>
			<DialogFooter>
				<Button form="form" type="submit" class="hover:bg-blue-600 rounded-2xl h-auto py-3">
					Save changes
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
