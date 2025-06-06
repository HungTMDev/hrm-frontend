<script setup lang="ts">
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Card from '@/assets/icons/Outline/Card.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSquare from '@/assets/icons/Outline/Chart Square.svg';
import ClockCircle from '@/assets/icons/Outline/Clock Circle.svg';
import DocumentAdd from '@/assets/icons/Outline/Document Add.svg';
import Dollar from '@/assets/icons/Outline/Dollar Minimalistic.svg';
import HomeAdd from '@/assets/icons/Outline/Home Add.svg';
import Home from '@/assets/icons/Outline/Home.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';
import UserHands from '@/assets/icons/Outline/User Hands.svg';
import UserID from '@/assets/icons/Outline/User Id.svg';
import UserRounded from '@/assets/icons/Outline/User Rounded.svg';
import UserGroup from '@/assets/icons/Outline/Users Group Rounded.svg';
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import FormUpload from '@/components/form/FormUpload.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { Sheet } from '@/components/ui/sheet';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetFooter from '@/components/ui/sheet/SheetFooter.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import { useBranch } from '@/composables/branch/useBranch';
import { useDepartment } from '@/composables/department/useDepartment';
import { usePosition } from '@/composables/position/usePosition';
import { useListUser } from '@/composables/user/useUser';
import {
	genderCombobox,
	listContractStatus,
	listContractType,
	listEmploymentType,
	listJobLevel,
	listWorkHour,
} from '@/constants';
import type { Employee, StepType } from '@/types';
import { toTypedSchema } from '@vee-validate/zod';
import { Form, type FormMeta, type GenericObject } from 'vee-validate';
import { computed, ref } from 'vue';
import { employeeSchema } from './employee.schema';

defineProps<{
	open: boolean;
	data?: Employee;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'delete', payload: Employee): void;
}>();

const { data: branches } = useBranch();
const { data: departments } = useDepartment();
const { data: positions } = usePosition();
const { data: users } = useListUser();

const step = ref(1);
const totalStep = ref(5);

const stepState = computed<StepType>(() => {
	return {
		current: step.value,
		total: totalStep.value,
	};
});
const listBranch = computed(
	() =>
		branches.value?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [],
);
const listDepartment = computed(
	() =>
		departments.value?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [],
);
const listPosition = computed(
	() =>
		positions.value?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [],
);
const listUser = computed(
	() =>
		users.value?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [],
);

const handleOpen = (isOpen: boolean) => {
	emits('update:open', isOpen);
};

const onSubmit = (values: any) => {
	console.log(values);
};

const handleSubmit = (
	e: any,
	meta: FormMeta<GenericObject>,
	values: GenericObject,
	validate: () => void,
) => {
	e.preventDefault();
	validate();

	if (step.value < totalStep.value && meta.valid) {
		step.value++;
		return;
	}

	if (step.value === totalStep.value && meta.valid) {
		onSubmit(values);
		return;
	}
};

const handleBack = () => {
	if (step.value > 1) {
		step.value--;
	}
};

const handleCancel = () => {
	emits('update:open', false);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom
			:steps="stepState"
			:is-show-step="true"
			class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<Form
				v-slot="{ meta, values, validate }"
				as=""
				keep-values
				:validation-schema="toTypedSchema(employeeSchema[step - 1])"
				class="flex-1 flex flex-col">
				<ScrollArea class="flex-1 pr-3">
					<SheetHeader>
						<SheetTitle></SheetTitle>
						<SheetDescription> </SheetDescription>
					</SheetHeader>

					<form @submit="(e) => handleSubmit(e, meta, values, validate)" id="form">
						<div v-if="step === 1">
							<h3 class="text-[28px] font-semibold text-black">
								Personal information
							</h3>
							<div class="mt-8 grid grid-cols-2 gap-x-12 gap-y-6">
								<FormInput
									name="employee_name"
									label="Employee name"
									:icon="UserRounded"
									:required="true"
									class="w-full"
									placeholder="Enter employee name" />
								<FormInput
									name="employee_id"
									label="Employee ID"
									:icon="UserID"
									:required="true"
									class="w-full"
									placeholder="Enter employee ID" />
								<FormSelectCalendar
									name="date_of_birth"
									label="Date of birth"
									:required="true" />
								<FormSelect
									name="gender"
									label="Gender"
									:list="genderCombobox"
									:required="true"
									:icon="UserHands"
									placeholder="Select gender" />
								<FormInput
									name="personal_email"
									label="Personal email"
									:icon="Letter"
									:required="true"
									class="w-full"
									placeholder="Enter personal email" />
								<FormInput
									name="phone_number"
									label="Phone number"
									:icon="Iphone"
									:required="true"
									class="w-full"
									placeholder="Enter phone number" />
								<FormInput
									name="employee_email"
									label="Employee email"
									:icon="Letter"
									:required="true"
									class="w-full"
									placeholder="Enter employee email" />
								<FormInput
									name="address"
									label="Address"
									:icon="Home"
									class="w-full"
									placeholder="Enter address" />
								<FormInput
									name="emergency_contact"
									label="Emergency contact"
									:icon="Iphone"
									:required="true"
									class="w-full"
									placeholder="Enter emergency contact" />
								<FormInput
									name="emergency_contact_name"
									label="Emergency contact name"
									:icon="UserRounded"
									class="w-full"
									placeholder="Enter emergency contact name" />
								<FormInput
									name="hometown"
									label="Hometown"
									:icon="Home"
									class="w-full"
									placeholder="Enter hometown" />
							</div>
						</div>
						<div v-if="step === 2">
							<h3 class="text-[28px] font-semibold text-black">Work information</h3>
							<div class="mt-8 grid grid-cols-2 gap-x-12 gap-y-6 mb-6">
								<FormSelect
									name="branch_id"
									label="Branch"
									:list="listBranch"
									:required="true"
									:icon="Building3"
									placeholder="Select branch" />
								<FormSelect
									name="department_id"
									label="Department"
									:list="listDepartment"
									:required="true"
									:icon="Buildings"
									placeholder="Select department" />
								<FormSelect
									name="position_id"
									label="Position"
									:list="listPosition"
									:required="true"
									:icon="UserCircle"
									placeholder="Select position" />
								<FormSelect
									name="level"
									label="Level"
									:list="listJobLevel"
									:icon="Chart2"
									placeholder="Select level" />
								<FormSelect
									name="line_manager_id"
									label="Line manager"
									:list="listUser"
									:required="true"
									:icon="UserGroup"
									placeholder="Select line manager" />
								<FormInput
									type="number"
									name="salary"
									label="Salary"
									:icon="Dollar"
									:required="true"
									class="w-full"
									placeholder="Enter salary" />
								<FormSelectCalendar
									name="joining_date"
									label="Joining date"
									:required="true" />
								<FormSelect
									name="work_status"
									label="Work status"
									:list="listEmploymentType"
									:required="true"
									:icon="ChartSquare"
									placeholder="Select work status" />
								<FormSelect
									name="working_hours"
									label="Working hours"
									:list="listWorkHour"
									:required="true"
									:icon="ClockCircle"
									placeholder="Select working hours" />
								<FormSelectCalendar
									name="work_status_end_date"
									label="Work status end date"
									:required="true" />
							</div>
							<FormTextarea
								name="job_description"
								label="Job description"
								placeholder="Enter job description"
								class="h-[300px] overflow-auto" />
						</div>
						<div v-if="step === 3">
							<h3 class="text-[28px] font-semibold text-black">Bank information</h3>
							<div class="mt-8 grid grid-cols-2 gap-x-12 gap-y-6">
								<FormInput
									name="bank_name"
									label="Bank name"
									:icon="Building3"
									:required="true"
									class="w-full"
									placeholder="Enter bank name" />
								<FormInput
									name="account_number"
									label="Account number"
									:icon="Card"
									:required="true"
									class="w-full"
									placeholder="Enter account number" />
								<FormInput
									name="account_holder_name"
									label="Account holder name"
									:icon="UserID"
									:required="true"
									class="w-full"
									placeholder="Enter account holder name" />
								<FormInput
									name="bank_branch"
									label="Bank branch"
									:icon="HomeAdd"
									class="w-full"
									placeholder="Enter bank branch" />
							</div>
						</div>
						<div v-if="step === 4">
							<h3 class="text-[28px] font-semibold text-black">Contract detail</h3>
							<div class="mt-8 grid grid-cols-2 gap-x-12 gap-y-6">
								<FormSelect
									name="contract_type"
									label="Contract type"
									placeholder="Select contract type"
									:icon="DocumentAdd"
									:required="true"
									:list="listContractType" />
								<FormSelectCalendar
									name="contract_start_date"
									label="Contract start date"
									:required="true" />
								<FormSelectCalendar
									name="contract_end_date"
									label="Contract end date"
									:required="true" />
								<FormSelect
									name="contract_status"
									label="Contract status"
									placeholder="Select contract status"
									:icon="ChartSquare"
									:required="true"
									:list="listContractStatus" />
								<FormUpload
									name="contract_file"
									label="Contract file"
									type="file"
									:required="true" />
							</div>
						</div>
						<div v-if="step === 5">
							<h3 class="text-[28px] font-semibold text-black">Documents</h3>
							<div class="mt-8 grid grid-cols-2 gap-x-12 gap-y-6">
								<FormUpload
									type="photo"
									name="photo"
									label="Photo"
									:required="true" />
								<FormUpload type="file" name="cv" label="CV" :required="true" />
								<FormUpload
									type="file"
									name="degree_or_certificate"
									label="Degree / Certificate"
									:required="true" />
								<FormUpload type="file" name="id" label="ID" :required="true" />
							</div>
						</div>
					</form>
				</ScrollArea>
				<SheetFooter>
					<Button
						v-if="step > 1"
						variant="outline"
						class="h-auto py-3 px-8 rounded-2xl"
						@click="handleBack">
						Back
					</Button>
					<Button
						v-else
						variant="outline"
						class="h-auto py-3 px-8 rounded-2xl"
						@click="handleCancel"
						>Cancel</Button
					>
					<Button
						form="form"
						type="submit"
						:disabled="!meta.valid"
						class="bg-blue-500 hover:bg-blue-600 h-auto py-3 px-8 rounded-2xl">
						{{ step === totalStep ? 'Submit' : 'Next' }}
					</Button>
				</SheetFooter>
			</Form>
		</SheetContentCustom>
	</Sheet>
</template>
