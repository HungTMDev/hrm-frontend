<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import CheckList from '@/assets/icons/Outline/Checklist Minimalistic.svg';
import Ranking from '@/assets/icons/Outline/Ranking.svg';
import SqureAcademic from '@/assets/icons/Outline/Square Academic Cap 2.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';
import UserHand from '@/assets/icons/Outline/User Hands.svg';
import CallApiButton from '@/components/common/CallApiButton.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormDescription from '@/components/ui/form/FormDescription.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import Input from '@/components/ui/input/Input.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useBranch } from '@/composables/branch/useBranch';
import { useDepartment } from '@/composables/department/useDepartment';
import { usePosition } from '@/composables/position/usePosition';
import { useCreateJob, useUpdateJob } from '@/composables/recruitment/job/useUpdateJob';
import { useListRecruitmentRequest } from '@/composables/recruitment/recruitment-request/useRecruitmentRequest';
import { EDUCATION_LEVEL, genderCombobox, listEmploymentType, listJobLevel } from '@/constants';
import type {
	IBranch,
	IDepartment,
	IPosition,
	IRecruitmentRequest,
	IJob,
	IJobFilter,
} from '@/types';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, onMounted, ref } from 'vue';
import { jobSchema, type JobPayloadType } from '../job.schema';
import type { PaginationState } from '@tanstack/vue-table';

const { data: branches } = useBranch();
const { data: departments } = useDepartment();
const { data: positions } = usePosition();
const { data: recruitmentRequests } = useListRecruitmentRequest();

const props = defineProps<{
	data?: IJob;
	pagination: PaginationState;
	filter: Partial<IJobFilter>;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'update:submit', payload: JobPayloadType): void;
}>();

const pagination = computed(() => props.pagination);
const filter = computed(() => props.filter);

const listDepartment = computed(
	() =>
		(departments.value as IDepartment[])?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [],
);
const listBranch = computed(
	() =>
		(branches.value as IBranch[])?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [],
);
const listPosition = computed(
	() =>
		(positions.value as IPosition[])?.map((item) => ({
			label: item.title,
			value: item.id,
		})) || [],
);
const listRecruitmentRequest = computed(
	() =>
		(recruitmentRequests.value?.data as IRecruitmentRequest[])?.map((item) => ({
			label: item.title,
			value: item.id,
		})) || [],
);
const requisitionSelected = ref<IRecruitmentRequest>();

const { mutateAsync: createJob, isPending: isPendingCreate } = useCreateJob(pagination, filter);
const { mutateAsync: updateJob, isPending: isPendingUpdate } = useUpdateJob(pagination, filter);

const formSchema = toTypedSchema(jobSchema);

const { handleSubmit, setFieldValue, values, resetForm } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: JobPayloadType) => {
	const res = !props.data
		? await createJob(values)
		: await updateJob({ id: props.data.id, payload: values });
	if ([200, 201].includes(res.status_code)) {
		emits('update:open', false);
	}
});

const selectRequisition = (fieldName: any, value: any) => {
	const id = value as string;
	const requisition = recruitmentRequests.value?.data.find((item) => item.id === id);
	if (requisition) requisitionSelected.value = requisition;

	setFieldValue('branch_id', requisitionSelected.value?.branch_id);
	setFieldValue('department_id', requisitionSelected.value?.department.id);
	setFieldValue('level', requisitionSelected.value?.level);
	setFieldValue('employment_type', requisitionSelected.value?.employment_type);
	setFieldValue(fieldName, value);
};

const setValue = (fieldName: any, value: any) => {
	setFieldValue(fieldName, value);
};

onMounted(() => {
	resetForm();
	if (props.data) {
		const keys = Object.keys(values);
		keys.forEach((key) => {
			if (props.data?.[key]) setValue(key, props.data?.[key]);
		});
	}
});
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<form id="form" @submit="onSubmit">
			<FormField
				:modelValue="data?.title || requisitionSelected?.title"
				name="title"
				v-slot="{ componentField }">
				<FormItem>
					<FormControl>
						<Input
							v-bind="componentField"
							class="focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-[28px] text-black px-0 placeholder:text-gray-200 font-semibold p-2"
							placeholder="Enter job title" />
					</FormControl>
					<FormDescription />
					<FormErrorCustom />
				</FormItem>
			</FormField>

			<SheetHeader>
				<SheetTitle></SheetTitle>
				<SheetDescription></SheetDescription>
			</SheetHeader>

			<div class="grid grid-cols-2 gap-6">
				<FormSelect
					name="requisition_id"
					label="Requisition"
					:list="listRecruitmentRequest"
					:model-value="data?.requisition_id"
					:icon="ChartSqare"
					:required="true"
					placeholder="Select requisition"
					@update:modelValue="
						(payload) => selectRequisition(payload.fieldName, payload.data)
					" />

				<FormSelect
					name="branch_id"
					label="Branch"
					:list="listBranch"
					:modelValue="data?.branch_id || requisitionSelected?.branch_id"
					:icon="Building3"
					:required="true"
					placeholder="Select company branch"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />

				<FormSelect
					name="department_id"
					label="Department"
					:list="listDepartment"
					:modelValue="data?.department_id || requisitionSelected?.department.id"
					:required="true"
					:icon="Building"
					placeholder="Select department"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />

				<FormSelect
					name="position_id"
					label="Position"
					:list="listPosition"
					:modelValue="data?.position_id"
					:required="true"
					:icon="Building"
					placeholder="Select position"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />

				<div class="hidden">
					<FormInput
						name="hiring_manager_id"
						:required="true"
						label="Hiring manager"
						:modelValue="
							data?.hiring_manager_id || requisitionSelected?.hiring_manager.id
						"
						:icon="UserCircle"
						class="w-full"
						placeholder="Enter hiring manager id" />
				</div>

				<FormSelect
					name="level"
					label="Level"
					:required="true"
					:list="listJobLevel"
					:modelValue="data?.level || requisitionSelected?.level"
					:icon="Chart2"
					:multiple="true"
					placeholder="Select level"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />

				<FormSelect
					name="employment_type"
					label="Employment type"
					:required="true"
					:list="listEmploymentType"
					:modelValue="data?.employment_type || requisitionSelected?.employment_type"
					:icon="Case"
					placeholder="Select employment type"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />

				<FormInput
					name="quantity"
					type="number"
					:required="true"
					:modelValue="data?.quantity || requisitionSelected?.quantity"
					label="Quantity"
					class="w-full"
					:icon="CheckList"
					placeholder="Enter quantity" />

				<FormCalendar
					name="due_date"
					label="Expected closing date"
					:required="true"
					:icon="Calendar"
					:model-value="data?.due_date"
					class="w-full"
					placeholder="dd/MM/yyyy"
					@update:value="(payload) => setValue(payload.fieldName, payload.data)" />

				<FormInput
					name="location"
					label="Location"
					class="w-full"
					:icon="CheckList"
					placeholder="Enter location" />

				<FormSelect
					name="education_level"
					label="Education level"
					:list="EDUCATION_LEVEL"
					:icon="SqureAcademic"
					placeholder="Select education level"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />

				<FormSelect
					name="work_experience"
					label="Work experience"
					:list="[
						{
							label: '1 year',
							value: '1-year',
						},
						{
							label: '2 years',
							value: '2-years',
						},
						{
							label: '3 years',
							value: '3-years',
						},
						{
							label: '4 years',
							value: '4-years',
						},
						{
							label: '5 years',
							value: '5-years',
						},
					]"
					:icon="Ranking"
					placeholder="Select work experience"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />

				<FormSelect
					name="gender"
					label="Gender"
					:list="genderCombobox"
					:icon="UserHand"
					placeholder="Select gender"
					@update:modelValue="
						(payload) => setValue(payload.fieldName, Number(payload.data))
					" />
			</div>
			<div class="mt-6 grid gap-4">
				<FormTextarea
					label="Description"
					name="description"
					:model-value="data?.description || requisitionSelected?.description"
					placeholder="A detailed job description"
					class="rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 h-72" />

				<FormTextarea
					label="Requirements"
					name="requirements"
					:model-value="data?.requirements"
					placeholder="Essential skills needed for the job"
					class="rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 h-72" />
			</div>
		</form>
	</ScrollArea>
	<div class="text-end mt-4">
		<CallApiButton
			:isLoading="isPendingCreate || isPendingUpdate"
			form="form"
			class="bg-blue-500 hover:bg-blue-600 rounded-2xl h-auto py-3.5 px-10 text-white">
			Submit
		</CallApiButton>
	</div>
</template>
