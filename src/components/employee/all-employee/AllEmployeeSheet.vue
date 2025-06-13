<script setup lang="ts">
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Card from '@/assets/icons/Outline/Card.svg';
import Chart2 from '@/assets/icons/Outline/Chart2.svg';
import ChartSquare from '@/assets/icons/Outline/ChartSquare.svg';
import UsersGroup from '@/assets/icons/Outline/UsersGroupRounded.svg';
import ClockCircle from '@/assets/icons/Outline/ClockCircle.svg';
import DocumentAdd from '@/assets/icons/Outline/DocumentAdd.svg';
import Dollar from '@/assets/icons/Outline/DollarMinimalistic.svg';
import HomeAdd from '@/assets/icons/Outline/HomeAdd.svg';
import Home from '@/assets/icons/Outline/Home.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import UserCircle from '@/assets/icons/Outline/UserCircle.svg';
import UserHands from '@/assets/icons/Outline/UserHands.svg';
import UserID from '@/assets/icons/Outline/UserId.svg';
import UserRounded from '@/assets/icons/Outline/UserRounded.svg';
import UserGroup from '@/assets/icons/Outline/UsersGroupRounded.svg';
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
	DOCUMENT_TYPE,
	genderCombobox,
	listContractStatus,
	listContractType,
	listDocumentType,
	listEmploymentType,
	listJobLevel,
	listWorkHour,
	listWorkStatus,
} from '@/constants';
import type { IEmployee, StepType } from '@/types';
import { toTypedSchema } from '@vee-validate/zod';
import { Form, type FormMeta, type GenericObject } from 'vee-validate';
import { computed, reactive, ref } from 'vue';
import {
	bankInformationKeys,
	contractInformationKeys,
	employeeSchema,
	personalInformationKeys,
	workInformationKeys,
	type BankInformationPayload,
	type ContractInformationPayload,
	type CreateEmployeePayload,
	type PersonalInformationPayload,
	type WorkInformationPayload,
} from './employee.schema';
import FormCurrency from '@/components/form/FormCurrency.vue';
import FormArray from '@/components/form/FormArray.vue';
import { useUploadFile } from '@/composables/common';
import { createPathFromServerDomain } from '@/lib/utils';
import { useCreateEmployee } from '@/composables/employee/useUpdateEmployee';
import CallApiButton from '@/components/common/CallApiButton.vue';
import { useCustomToast } from '@/lib/customToast';
import { useQueryClient } from '@tanstack/vue-query';
import { employeeKey } from '@/composables/employee/key';

defineProps<{
	open: boolean;
	data?: IEmployee;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'delete', payload: IEmployee): void;
}>();

const { data: branches } = useBranch();
const { data: departments } = useDepartment();
const { data: positions } = usePosition();
const { data: users } = useListUser();
const { showToast } = useCustomToast();
const queryClient = useQueryClient();

const step = ref(1);
const totalStep = ref(5);
const data = reactive<Record<string, any>>({
	personal_information: {} as PersonalInformationPayload,
	work_information: {} as WorkInformationPayload,
	bank_information: {} as BankInformationPayload,
	contract_information: {} as ContractInformationPayload,
	documents: [],
});
const formValues = ref<any>({});

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
const listDepartment = computed(() => {
	if (formValues.value.branch_id) {
		return (
			departments.value
				?.filter((item) => item.branch_id === formValues.value.branch_id)
				.map((item) => ({
					label: item.name,
					value: item.id,
				})) || []
		);
	}
	return departments.value?.map((item) => ({ label: item.name, value: item.id })) || [];
});
const listPosition = computed(() => {
	if (formValues.value.department_id) {
		return (
			positions.value
				?.filter((item) => item.department_id === formValues.value.department_id)
				.map((item) => ({
					label: item.name,
					value: item.id,
				})) || []
		);
	}
	return (
		positions.value?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || []
	);
});
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

const { mutateAsync: uploadFile, isPending: uploading } = useUploadFile();
const { mutate: createEmployee, isPending: creating } = useCreateEmployee();

const onSubmit = async (values: any) => {
	personalInformationKeys.forEach((key) => {
		data.personal_information[key] = values[key];
	});

	for (let key of workInformationKeys) {
		if (key === 'shift_start_time' || key === 'shift_end_time') continue;
		data.work_information[key] = values[key];
		if (key === 'work_hour') {
			const [start, end] = values[key].split('-');
			data.work_information.shift_start_time = start;
			data.work_information.shift_end_time = end;
		}
	}

	bankInformationKeys.forEach((key) => {
		data.bank_information[key] = values[key];
	});

	contractInformationKeys.forEach((key) => {
		data.contract_information[key] = values[key];
	});

	for (let key of contractInformationKeys) {
		data.contract_information[key] = values[key];
		if (key === 'contract_start_date') {
			data.contract_information.start_date = values[key];
		}
		if (key === 'contract_end_date') {
			data.contract_information.end_date = values[key];
		}
	}

	const contractFile = await uploadFile(data.contract_information.contract_detail.file);
	const contractDetail: any = { ...data.contract_information.contract_detail };
	contractDetail.file_name = contractFile.original_filename;
	contractDetail.file_type = contractFile.resource_type;
	contractDetail.file_size = contractFile.bytes;
	contractDetail.document_type = DOCUMENT_TYPE.EMPLOYMENT_CONTRACT;
	contractDetail.storage_path = createPathFromServerDomain(contractFile.path);
	data.contract_information.contract_detail = contractDetail;

	const documentsArray: any[] = [];

	await Promise.all(
		values.documents.map(async (item: any) => {
			const file = await uploadFile(item.file);
			const temp: any = {};
			temp.file_name = file.original_filename;
			temp.file_type = file.resource_type;
			temp.file_size = file.bytes;
			temp.document_name = item.document_name;
			temp.document_type = item.document_type;
			temp.storage_path = createPathFromServerDomain(file.path);
			documentsArray.push(temp);
		}),
	);

	data.documents = documentsArray;

	createEmployee(data as CreateEmployeePayload, {
		onSuccess: () => {
			showToast({
				message: 'Employee created successfully',
				type: 'success',
			});
			queryClient.invalidateQueries({ queryKey: [employeeKey.base] });
			handleOpen(false);
		},
	});
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
				<template>
					{{ formValues = values }}
				</template>
				<ScrollArea class="flex-1 pr-3">
					<SheetHeader>
						<SheetTitle></SheetTitle>
						<SheetDescription> </SheetDescription>
					</SheetHeader>
					<form @submit="(e) => handleSubmit(e, meta, values, validate)" id="form">
						<div v-if="step === 1">
							<h3 class="text-[28px] font-semibold text-black">Personal information</h3>
							<div class="mt-8 grid grid-cols-2 gap-x-12 gap-y-6">
								<FormInput
									name="name"
									label="Employee name"
									:icon="UserRounded"
									:required="true"
									class="w-full"
									placeholder="Enter employee name" />
								<FormInput
									name="employee_number"
									label="Employee ID"
									:icon="UserID"
									:required="true"
									class="w-full"
									placeholder="Enter employee ID" />
								<FormInput
									name="email"
									label="Employee email"
									:icon="Letter"
									:required="true"
									class="w-full"
									placeholder="Enter employee email" />
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
								<FormSelectCalendar name="date_of_birth" label="Date of birth" :required="true" />
								<FormSelect
									name="gender"
									label="Gender"
									:list="genderCombobox"
									:required="true"
									:icon="UserHands"
									placeholder="Select gender" />
								<FormInput
									name="address"
									label="Address"
									:icon="Home"
									class="w-full"
									placeholder="Enter address" />
								<FormInput
									name="hometown"
									label="Hometown"
									:icon="Home"
									class="w-full"
									placeholder="Enter hometown" />
								<FormSelect
									name="marital_status"
									label="Marital status"
									:list="[]"
									:icon="UserHands"
									placeholder="Select marital status" />
								<FormInput
									name="emergency_contact"
									label="Emergency contact"
									:icon="Iphone"
									class="w-full"
									placeholder="Enter emergency contact" />
								<FormInput
									name="emergency_contact_name"
									label="Emergency contact name"
									:icon="UserRounded"
									class="w-full"
									placeholder="Enter emergency contact name" />
								<FormUpload label="Avatar" name="avatar" type="photo" />
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
									name="team_id"
									label="Team"
									:list="[]"
									:icon="UsersGroup"
									placeholder="Select team" />
								<FormSelect
									name="level"
									label="Level"
									:required="true"
									:list="listJobLevel"
									:icon="Chart2"
									placeholder="Select level" />
								<FormSelect
									name="manager_id"
									label="Manager"
									:list="listUser"
									:required="true"
									:icon="UserGroup"
									placeholder="Select manager" />
								<FormCurrency
									name="salary"
									label="Salary"
									:icon="Dollar"
									:required="true"
									placeholder="Enter salary" />
								<FormSelectCalendar name="start_date" label="Joining date" :required="true" />
								<FormSelectCalendar name="end_date" label="End date" />
								<FormSelect
									name="work_status"
									label="Work status"
									:list="listWorkStatus"
									:required="true"
									:icon="ChartSquare"
									placeholder="Select work status" />
								<FormInput
									name="work_location"
									label="Work location"
									:icon="Home"
									:required="true"
									class="w-full"
									placeholder="Enter work location" />
								<FormSelect
									name="work_hour"
									label="Work hour"
									:list="listWorkHour"
									:required="true"
									:icon="ClockCircle"
									placeholder="Select working hours" />
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
									:required="true"
									class="w-full"
									placeholder="Enter bank branch" />
							</div>
						</div>
						<div v-if="step === 4">
							<h3 class="text-[28px] font-semibold text-black">Contract detail</h3>
							<div class="mt-8 grid grid-cols-2 gap-x-12 gap-y-6">
								<FormInput
									label="Contract name"
									name="contract_detail.document_name"
									class="w-full"
									:icon="DocumentAdd"
									:required="true"
									placeholder="Enter contract name" />
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
									name="status"
									label="Contract status"
									placeholder="Select contract status"
									:icon="ChartSquare"
									:required="true"
									:list="listContractStatus" />
								<FormUpload
									name="contract_detail.file"
									label="Contract file"
									type="file"
									:required="true" />
							</div>
						</div>
						<div v-if="step === 5">
							<h3 class="text-[28px] font-semibold text-black">Documents</h3>
							<FormArray
								name="documents"
								label="Documents"
								:required="true"
								:init-value="{}"
								label-size="sm">
								<template #default="{ baseName }">
									<div class="grid grid-cols-2 gap-4 mt-2">
										<FormInput
											:name="`${baseName}.document_name`"
											:required="true"
											class="w-full"
											:icon="DocumentAdd"
											placeholder="Enter document name"
											label="Document name" />
										<FormSelect
											:name="`${baseName}.document_type`"
											label="Document type"
											:required="true"
											:icon="DocumentAdd"
											placeholder="Select document type"
											:list="listDocumentType" />
										<FormUpload
											label="Document file"
											:required="true"
											:name="`${baseName}.file`"
											type="file" />
									</div>
								</template>
							</FormArray>
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
					<CallApiButton
						form="form"
						type="submit"
						:is-loading="uploading || creating"
						:disabled="!meta.valid"
						class="bg-blue-500 hover:bg-blue-600 h-auto py-3 px-8 rounded-2xl">
						{{ step === totalStep ? 'Submit' : 'Next' }}
					</CallApiButton>
				</SheetFooter>
			</Form>
		</SheetContentCustom>
	</Sheet>
</template>
