<script lang="ts" setup>
import Title from '@/components/common/Title.vue';
import UserRounded from '@/assets/icons/Outline/User Rounded.svg';
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Home from '@/assets/icons/Outline/Home.svg';
import UserId from '@/assets/icons/Outline/User Id.svg';
import UserHandUp from '@/assets/icons/Outline/User Hand Up.svg';
import Globus from '@/assets/icons/Outline/Globus.svg';
import UserHeart from '@/assets/icons/Outline/User Heart.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import InformationItem from '@/components/common/InformationItem.vue';
import Button from '@/components/ui/button/Button.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ref } from 'vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import { genderCombobox } from '@/constants';
import FormSelect from '@/components/form/FormSelect.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { personalInformationSchema } from './schema';
import { useForm } from 'vee-validate';

const isEdit = ref(false);

const formSchema = toTypedSchema(personalInformationSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	console.log(values);
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
			<form
				id="form"
				v-if="isEdit"
				class="grid grid-cols-2 gap-y-4 gap-x-6"
				@submit="onSubmit">
				<FormInput
					:required="true"
					:icon="UserRounded"
					name="employee_name"
					label="Employee name"
					class="w-full"
					placeholder="Enter employee name" />
				<FormInput
					:required="true"
					:icon="UserId"
					name="employee_id"
					label="Employee ID"
					class="w-full"
					placeholder="Enter employee id" />
				<FormSelectCalendar :required="true" name="date_of_birth" label="Date of birth" />
				<FormSelect
					:required="true"
					:icon="UserHandUp"
					name="gender"
					label="Gender"
					:list="genderCombobox"
					placeholder="Select gender" />
				<FormInput
					:required="true"
					:icon="Iphone"
					name="emergency_contact"
					label="Emergency contact"
					class="w-full"
					placeholder="Enter emergency contact" />
				<FormInput
					:icon="UserId"
					name="emergency_contact_name"
					label="Emergency contact name"
					class="w-full"
					placeholder="Enter emergency contact name" />
				<FormInput
					:required="true"
					:icon="Letter"
					name="personal_email"
					label="Personal email"
					class="w-full"
					placeholder="Enter personal email" />
				<FormInput
					:required="true"
					:icon="Iphone"
					name="phone_number"
					label="Phone number"
					class="w-full"
					placeholder="Enter phone number" />
				<FormInput
					:required="true"
					:icon="Letter"
					name="employee_email"
					label="Employee email"
					class="w-full"
					placeholder="Enter employee email" />
				<FormSelect
					:icon="Globus"
					name="nationality"
					label="Nationality"
					:list="[]"
					placeholder="Select nationality" />
				<FormInput
					:icon="Home"
					name="address"
					label="Address"
					class="w-full"
					placeholder="Enter address" />
				<FormSelect
					:icon="UserHeart"
					name="marital_status"
					label="Marital status"
					:list="[]"
					placeholder="Select marital status" />
			</form>
			<div v-else class="grid items-start grid-cols-2 gap-6">
				<InformationItem :icon="UserRounded" label="Employee name" value="Lê Minh Tâm" />
				<InformationItem :icon="UserId" label="Employee ID" value="351704" />
				<InformationItem
					:icon="CalendarIcon"
					label="Date of birth"
					value="22 March, 2000" />
				<InformationItem :icon="UserHandUp" label="Gender" value="Male" />
				<InformationItem :icon="Iphone" label="Phone number" value="0971234567" />
				<InformationItem :icon="Letter" label="Personal email" value="tamle@gmail.com" />
				<InformationItem :icon="Letter" label="Employee email" value="tamle@lutech.ltd" />
				<InformationItem :icon="Iphone" label="Emergency contact" value="0913453827" />
				<InformationItem
					:icon="UserRounded"
					label="Emergency contact name"
					value="Lê Minh Tuấn" />
				<InformationItem :icon="Globus" label="Nationality" value="Vietnamese" />
				<div class="grid grid-cols-2 items-start">
					<div class="flex gap-2 items-center">
						<IconFromSvg :icon="Home" />
						Address
					</div>
					<span class="text-black">123/56 Trần Cao Vân, Thanh Khê, Đà Nẵng</span>
				</div>
				<InformationItem :icon="UserHeart" label="Marital status" value="Single" />
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
			<Button
				form="form"
				v-if="isEdit"
				class="h-auto py-3 px-6 hover:bg-blue-600 rounded-2xl">
				Save
			</Button>
		</div>
	</div>
</template>
