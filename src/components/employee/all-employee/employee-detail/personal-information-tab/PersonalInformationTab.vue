<script lang="ts" setup>
import Title from '@/components/common/Title.vue';
import UserRounded from '@/assets/icons/Outline/UserRounded.svg';
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Home from '@/assets/icons/Outline/Home.svg';
import UserId from '@/assets/icons/Outline/UserId.svg';
import UserHandUp from '@/assets/icons/Outline/UserHandUp.svg';
import Globus from '@/assets/icons/Outline/Globus.svg';
import UserHeart from '@/assets/icons/Outline/UserHeart.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import InformationItem from '@/components/common/InformationItem.vue';
import Button from '@/components/ui/button/Button.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { computed, ref } from 'vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import { genderCombobox, listMaritalStatus } from '@/constants';
import FormSelect from '@/components/form/FormSelect.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useRoute } from 'vue-router';
import { useGetPersonalInformation } from '@/composables/employee/useEmployee';
import { formatISOStringToLocalDateTime, formatStatus } from '@/lib/utils';
import FormUpload from '@/components/form/FormUpload.vue';
import { personalInformationSchema } from '../../employee.schema';
import { useEditPersonalInformation } from '@/composables/employee/useUpdateEmployee';
import { useQueryClient } from '@tanstack/vue-query';
import { employeeKey } from '@/composables/employee/key';
import { useCustomToast } from '@/lib/customToast';
import CallApiButton from '@/components/common/CallApiButton.vue';

const route = useRoute();
const queryClient = useQueryClient();
const { showToast } = useCustomToast();

const isEdit = ref(false);

const employeeId = computed(() => route.params.id as string);

const { data: personalInformation } = useGetPersonalInformation(employeeId);
const { mutate: editPersonalInformation, isPending: editing } = useEditPersonalInformation();

const formSchema = toTypedSchema(personalInformationSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	editPersonalInformation(
		{
			id: employeeId.value,
			payload: values,
		},
		{
			onSuccess: () => {
				isEdit.value = false;
				queryClient.invalidateQueries({
					queryKey: [employeeKey.personal, employeeId.value],
				});
				showToast({
					message: 'Success!',
					type: 'success',
				});
			},
		},
	);
});

const handleEdit = () => {
	isEdit.value = true;
};

const handleCancel = () => {
	isEdit.value = false;
};
</script>
<template>
	<div class="flex flex-col gap-6 h-full">
		<Title class="text-xl">Personal information</Title>
		<ScrollArea class="text-slate-600 pr-3 h-[calc(100vh-400px)]">
			<form id="form" v-if="isEdit" class="grid grid-cols-2 gap-y-4 gap-x-6" @submit="onSubmit">
				<FormInput
					:required="true"
					:icon="UserRounded"
					:model-value="personalInformation?.name ?? undefined"
					name="name"
					label="Employee name"
					class="w-full"
					placeholder="Enter employee name" />
				<FormInput
					:required="true"
					:icon="UserId"
					:model-value="personalInformation?.personal_information?.employee_number ?? undefined"
					name="employee_number"
					label="Employee ID"
					class="w-full"
					placeholder="Enter employee id" />
				<FormSelectCalendar
					:required="true"
					:model-value="personalInformation?.date_of_birth ?? undefined"
					name="date_of_birth"
					label="Date of birth" />
				<FormSelect
					:required="true"
					:icon="UserHandUp"
					:model-value="personalInformation?.gender.toUpperCase() ?? undefined"
					name="gender"
					label="Gender"
					:list="genderCombobox"
					placeholder="Select gender" />
				<FormInput
					:icon="Iphone"
					:model-value="personalInformation?.personal_information.emergency_contact ?? undefined"
					name="emergency_contact"
					label="Emergency contact"
					class="w-full"
					placeholder="Enter emergency contact" />
				<FormInput
					:icon="UserId"
					:model-value="
						personalInformation?.personal_information.emergency_contact_name ?? undefined
					"
					name="emergency_contact_name"
					label="Emergency contact name"
					class="w-full"
					placeholder="Enter emergency contact name" />
				<FormInput
					:required="true"
					:icon="Letter"
					:model-value="personalInformation?.personal_email ?? undefined"
					name="personal_email"
					label="Personal email"
					class="w-full"
					placeholder="Enter personal email" />
				<FormInput
					:required="true"
					:icon="Iphone"
					:model-value="personalInformation?.phone_number ?? undefined"
					name="phone_number"
					label="Phone number"
					class="w-full"
					placeholder="Enter phone number" />
				<FormInput
					:required="true"
					:icon="Letter"
					:model-value="personalInformation?.email ?? undefined"
					name="email"
					label="Employee email"
					class="w-full"
					placeholder="Enter employee email" />
				<FormSelect
					:icon="Globus"
					:model-value="personalInformation?.personal_information.nationality ?? undefined"
					name="nationality"
					label="Nationality"
					:list="[]"
					placeholder="Select nationality" />
				<FormInput
					:icon="Home"
					:model-value="personalInformation?.personal_information.address ?? undefined"
					name="address"
					label="Address"
					class="w-full"
					placeholder="Enter address" />
				<FormInput
					:icon="Home"
					:model-value="personalInformation?.personal_information.hometown ?? undefined"
					name="hometown"
					label="Hometown"
					class="w-full"
					placeholder="Enter hometown" />
				<FormInput
					:icon="Home"
					:model-value="personalInformation?.personal_information.permanent_residence ?? undefined"
					name="permanent_residence"
					label="Permanent residence"
					class="w-full"
					placeholder="Enter permanent residence" />
				<FormSelect
					:icon="UserHeart"
					:model-value="personalInformation?.personal_information.marital_status ?? undefined"
					name="marital_status"
					label="Marital status"
					:list="listMaritalStatus"
					placeholder="Select marital status" />
				<FormUpload label="Avatar" name="avatar" type="photo" />
			</form>
			<div v-else class="grid items-start grid-cols-2 gap-6">
				<InformationItem
					:icon="UserRounded"
					label="Employee name"
					:value="personalInformation?.name" />
				<InformationItem
					:icon="UserId"
					label="Employee ID"
					:value="personalInformation?.personal_information.employee_number" />
				<InformationItem
					:icon="CalendarIcon"
					label="Date of birth"
					:value="formatISOStringToLocalDateTime(personalInformation?.date_of_birth).date" />
				<InformationItem :icon="UserHandUp" label="Gender" :value="personalInformation?.gender" />
				<InformationItem
					:icon="Iphone"
					label="Phone number"
					:value="personalInformation?.phone_number" />
				<InformationItem
					:icon="Letter"
					label="Personal email"
					:value="personalInformation?.personal_email" />
				<InformationItem
					:icon="Letter"
					label="Employee email"
					:value="personalInformation?.email" />
				<InformationItem
					:icon="Iphone"
					label="Emergency contact"
					:value="personalInformation?.personal_information?.emergency_contact" />
				<InformationItem
					:icon="UserRounded"
					label="Emergency contact name"
					:value="personalInformation?.personal_information?.emergency_contact_name" />
				<InformationItem
					:icon="Globus"
					label="Nationality"
					:value="personalInformation?.personal_information?.nationality" />
				<div class="grid grid-cols-2 items-start">
					<div class="flex gap-2 items-center">
						<IconFromSvg :icon="Home" />
						Address
					</div>
					<span class="text-black">{{ personalInformation?.personal_information?.address }}</span>
				</div>
				<InformationItem
					:icon="UserHeart"
					label="Marital status"
					:value="formatStatus(personalInformation?.personal_information?.marital_status || '')" />
			</div>
		</ScrollArea>
		<div class="flex justify-end gap-3">
			<Button
				v-if="!isEdit"
				class="bg-blue-50 text-blue-500 hover:bg-blue-50 h-auto py-3 rounded-2xl px-6"
				@click="handleEdit">
				<IconFromSvg :icon="Pen2" />Edit
			</Button>
			<Button
				v-if="isEdit"
				variant="outline"
				class="h-auto py-3 px-6 rounded-2xl"
				@click="handleCancel">
				Cancel
			</Button>
			<CallApiButton
				form="form"
				v-if="isEdit"
				:is-loading="editing"
				class="h-auto py-3 px-6 hover:bg-blue-600 rounded-2xl">
				Save
			</CallApiButton>
		</div>
	</div>
</template>
