<script setup lang="ts">
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
import FormInput from '@/components/form/FormInput.vue';
import type { IApplicant } from '@/types';
import CallApiButton from '@/components/common/CallApiButton.vue';
import {
	createEmployeeFromApplicantSchema,
	type CreateEmployeeFromApplicantPayload,
} from './schema';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import { genderCombobox, listMaritalStatus } from '@/constants';
import Letter from '@/assets/icons/Outline/Letter.svg';
import User from '@/assets/icons/Outline/User.svg';
import iPhone from '@/assets/icons/Outline/iPhone.svg';
import UserRounded from '@/assets/icons/Outline/UserRounded.svg';
import UserId from '@/assets/icons/Outline/UserId.svg';
import Home from '@/assets/icons/Outline/Home.svg';
import Globus from '@/assets/icons/Outline/Globus.svg';
import UserHeart from '@/assets/icons/Outline/UserHeart.svg';

defineProps<{
	open: boolean;
	data?: IApplicant;
	isLoading?: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'submit', payload: CreateEmployeeFromApplicantPayload): void;
}>();

const formSchema = toTypedSchema(createEmployeeFromApplicantSchema);

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
		<DialogContent class="sm:max-w-[725px] max-w-[1000px]">
			<DialogHeader>
				<DialogTitle>Create user</DialogTitle>
				<DialogDescription> </DialogDescription>
			</DialogHeader>
			<form id="form" @submit="onSubmit" class="grid grid-cols-2 gap-4">
				<FormInput
					name="email"
					label="Email"
					:required="true"
					:icon="Letter"
					class="w-full"
					placeholder="Enter email" />
				<FormInput
					name="personal_email"
					label="Personal email"
					:model-value="data?.candidate.email ?? undefined"
					:required="true"
					:icon="Letter"
					class="w-full"
					placeholder="Enter personal email" />
				<FormInput
					name="name"
					label="Name"
					:model-value="data?.candidate.full_name ?? undefined"
					:required="true"
					:icon="User"
					class="w-full"
					placeholder="Enter name" />
				<FormInput
					name="phone_number"
					label="Phone number"
					:icon="iPhone"
					:model-value="data?.candidate.phone_number ?? undefined"
					:required="true"
					class="w-full"
					placeholder="Enter phone number" />
				<FormSelectCalendar
					:model-value="data?.candidate.date_of_birth ?? undefined"
					name="date_of_birth"
					label="Date of birth" />
				<FormSelect
					name="gender"
					label="Gender"
					:icon="UserRounded"
					:model-value="data?.candidate.gender ?? undefined"
					:required="true"
					:list="genderCombobox" />
				<FormInput
					name="employee_number"
					label="Employee ID"
					:icon="UserId"
					:required="true"
					class="w-full"
					placeholder="Enter employee ID" />
				<FormInput
					name="address"
					label="Address"
					:icon="Home"
					:model-value="data?.candidate.address ?? undefined"
					class="w-full"
					placeholder="Enter address" />
				<FormInput
					:icon="Home"
					name="hometown"
					label="Hometown"
					class="w-full"
					placeholder="Enter hometown" />
				<FormInput
					name="permanent_residence"
					:icon="Home"
					label="Permanent residence"
					class="w-full"
					placeholder="Enter permanent residence" />
				<FormInput
					name="nationality"
					label="Nationality"
					class="w-full"
					:icon="Globus"
					placeholder="Enter nationality" />
				<FormInput
					name="emergency_contact_name"
					label="Emergency contact name"
					:icon="UserRounded"
					class="w-full"
					placeholder="Enter emergency contact name" />
				<FormInput
					name="emergency_contact"
					label="Emergency contact"
					:icon="iPhone"
					class="w-full"
					placeholder="Enter emergency contact" />
				<FormSelect
					name="marital_status"
					:icon="UserHeart"
					label="Marital status"
					:list="listMaritalStatus" />
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
