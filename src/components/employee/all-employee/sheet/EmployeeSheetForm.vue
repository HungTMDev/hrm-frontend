<script lang="ts" setup>
import BillList from '@/assets/icons/Outline/Bill List.svg';
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import ChartSquare from '@/assets/icons/Outline/Chart Square.svg';
import City from '@/assets/icons/Outline/City.svg';
import StreetMap from '@/assets/icons/Outline/Streets Map Point.svg';
import MapPoint from '@/assets/icons/Outline/Map Point Wave.svg';
import UserID from '@/assets/icons/Outline/User Id.svg';
import Signpost from '@/assets/icons/Outline/Signpost.svg';
import DocumentAdd from '@/assets/icons/Outline/Document Add.svg';
import DocumentMedicine from '@/assets/icons/Outline/Document Medicine.svg';
import Dollar from '@/assets/icons/Outline/Dollar Minimalistic.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';
import UserHands from '@/assets/icons/Outline/User Hands.svg';
import UserGroup from '@/assets/icons/Outline/Users Group Rounded.svg';
import UploadField from '@/components/common/UploadField.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import Button from '@/components/ui/button/Button.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import Input from '@/components/ui/input/Input.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetFooter from '@/components/ui/sheet/SheetFooter.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { employeeSchema } from '../employee.schema';
import Title from '@/components/common/Title.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { genderCombobox } from '@/constants';
import { useDefaultStore } from '@/stores/default.store';
import { ref } from 'vue';
import type { ComboboxType } from '@/types';

const defaultStore = useDefaultStore();

const districtBornedList = ref<ComboboxType[]>([]);
const currentDistrictList = ref<ComboboxType[]>([]);
const wardBornedList = ref<ComboboxType[]>([]);
const currentWardList = ref<ComboboxType[]>([]);

const formSchema = toTypedSchema(employeeSchema);

const { handleSubmit, setFieldValue } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	console.log(values);
});

const setData = (payload: { fieldName: any; data: string | string[] | undefined }) => {
	setFieldValue(payload.fieldName, payload.data);
};

const handleSelectCity = async (payload: {
	fieldName: any;
	data: string | string[] | undefined;
}) => {
	if (payload.fieldName === 'cityBorned') {
		districtBornedList.value = (await defaultStore.getDistrictByProvince(
			payload.data as string,
		)) as ComboboxType[];
	} else {
		currentDistrictList.value = (await defaultStore.getDistrictByProvince(
			payload.data as string,
		)) as ComboboxType[];
	}

	setFieldValue(payload.fieldName, Number(payload.data));
};

const handleSelectDistrict = async (payload: {
	fieldName: any;
	data: string | string[] | undefined;
}) => {
	if (payload.fieldName === 'districtBorned') {
		wardBornedList.value = (await defaultStore.getWardByDistrict(
			payload.data as string,
		)) as ComboboxType[];
	} else {
		currentWardList.value = (await defaultStore.getWardByDistrict(
			payload.data as string,
		)) as ComboboxType[];
	}

	setFieldValue(payload.fieldName, Number(payload.data));
};

const handleSelectWard = (payload: { fieldName: any; data: string | string[] | undefined }) => {
	setFieldValue(payload.fieldName, Number(payload.data));
};
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<form id="form" @submit="onSubmit">
			<FormField name="employeeName" v-slot="{ componentField }">
				<FormItem>
					<FormControl>
						<Input
							v-bind="componentField"
							class="focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-[28px] px-0 placeholder:text-gray-200 font-semibold p-2"
							placeholder="Employee name" />
					</FormControl>
					<FormErrorCustom />
				</FormItem>
			</FormField>
			<SheetHeader>
				<SheetTitle></SheetTitle>
				<SheetDescription> </SheetDescription>
			</SheetHeader>

			<div>
				<Title class="text-black text-base font-semibold">General infomations</Title>
				<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
					<FormInput
						name="phoneNumber"
						label="Phone number"
						placeholder="Enter phone number"
						:required="true"
						class="w-full"
						:icon="Iphone" />
					<FormInput
						name="email"
						label="Email address"
						placeholder="Enter email address"
						:required="true"
						class="w-full"
						:icon="Letter" />
					<FormCalendar name="dob" label="Date of birth" class="w-full p-3" />
					<FormSelect
						name="gender"
						label="Gender"
						:list="genderCombobox"
						:icon="UserHands"
						:required="true"
						placeholder="Select gender"
						class="p-3"
						:is-search="true"
						@update:model-value="setData" />
					<FormInput
						name="socialInsurance"
						label="Social insurance"
						placeholder="Enter social insurance"
						:required="true"
						class="w-full"
						:icon="DocumentMedicine" />
					<FormInput
						name="personalTaxId"
						label="Personal Tax ID"
						placeholder="Enter tax ID number"
						:required="true"
						class="w-full"
						:icon="BillList" />
				</div>
			</div>

			<Separator class="my-6" />

			<div>
				<Title class="text-black text-base font-semibold">Employment informations</Title>
				<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
					<FormSelect
						name="branch"
						label="Branch"
						:list="[]"
						:icon="Building3"
						:required="true"
						placeholder="Select company branch"
						class="p-3"
						@update:model-value="setData" />
					<FormSelect
						name="department"
						label="Department"
						:list="[]"
						:icon="Buildings"
						:required="true"
						placeholder="Select department"
						class="p-3"
						@update:model-value="setData" />
					<FormInput
						name="role"
						label="Role"
						placeholder="Enter job title"
						:required="true"
						class="w-full"
						:icon="UserCircle" />
					<FormInput
						name="employeeId"
						label="Employee ID"
						placeholder="Enter your employee ID"
						:required="true"
						class="w-full"
						:icon="UserID" />
					<FormInput
						name="workEmail"
						label="Work email address"
						placeholder="Enter email address"
						:required="true"
						class="w-full"
						:icon="Letter" />
					<FormSelect
						name="status"
						label="Status"
						:list="[]"
						:icon="ChartSquare"
						:required="true"
						placeholder="Select employment status"
						class="p-3"
						@update:model-value="setData" />
					<FormInput
						name="salary"
						label="Salary"
						placeholder="Enter salary"
						:required="true"
						class="w-full"
						:icon="Dollar" />
					<FormCalendar name="joiningDate" label="Joining date" class="w-full p-3" />
					<FormInput
						name="lineManager"
						label="Line manager"
						placeholder="Enter line manager"
						:required="true"
						class="w-full"
						:icon="UserGroup" />
					<FormSelect
						name="contractType"
						label="Contract type"
						:list="[]"
						:icon="DocumentAdd"
						:required="true"
						placeholder="Select contract type"
						class="p-3"
						@update:model-value="setData" />

					<UploadField name="contractFile" label="Contract file" />
					<UploadField name="photo" label="Photo" type="photo" />
				</div>
			</div>

			<Separator class="my-6" />

			<div>
				<Title class="text-black text-base font-semibold"
					>Place of birth
					<span class="text-slate-400 font-normal">(optional)</span></Title
				>
				<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
					<FormSelect
						name="cityBorned"
						label="City or province"
						:list="defaultStore.provinces"
						:icon="City"
						:required="true"
						placeholder="Select your city or province"
						class="p-3"
						:is-search="true"
						@update:model-value="handleSelectCity" />
					<FormSelect
						name="districtBorned"
						label="Distrist"
						:list="districtBornedList"
						:icon="StreetMap"
						:required="true"
						placeholder="Select your district"
						class="p-3"
						@update:model-value="handleSelectDistrict" />
					<FormSelect
						name="wardBorned"
						label="Ward"
						:list="wardBornedList"
						:icon="MapPoint"
						:required="true"
						placeholder="Select your ward"
						class="p-3"
						@update:model-value="handleSelectWard" />
					<FormInput
						name="streetBorned"
						label="Street"
						placeholder="Enter your street"
						:required="true"
						class="w-full"
						:icon="Signpost" />
				</div>
			</div>

			<Separator class="my-6" />

			<div>
				<Title class="text-black text-base font-semibold"
					>Permanent address
					<span class="text-slate-400 font-normal">(optional)</span></Title
				>
				<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
					<FormSelect
						name="currentCity"
						label="City or province"
						:list="defaultStore.provinces"
						:icon="City"
						:required="true"
						placeholder="Select your city or province"
						class="p-3"
						@update:model-value="handleSelectCity" />
					<FormSelect
						name="currentDistrict"
						label="Distrist"
						:list="currentDistrictList"
						:icon="StreetMap"
						:required="true"
						placeholder="Select your district"
						class="p-3"
						@update:model-value="handleSelectDistrict" />
					<FormSelect
						name="currentWard"
						label="Ward"
						:list="currentWardList"
						:icon="MapPoint"
						:required="true"
						placeholder="Select your ward"
						class="p-3"
						@update:model-value="handleSelectWard" />
					<FormInput
						name="currentStreet"
						label="Street"
						placeholder="Enter your street"
						:required="true"
						class="w-full"
						:icon="Signpost" />
				</div>
			</div>
		</form>
	</ScrollArea>
	<SheetFooter>
		<Button
			form="form"
			type="submit"
			class="bg-blue-500 hover:bg-blue-600 h-auto py-3 px-6 rounded-2xl">
			Submit
		</Button>
	</SheetFooter>
</template>
