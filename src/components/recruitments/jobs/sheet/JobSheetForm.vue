<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart2.svg';
import ChartSqare from '@/assets/icons/Outline/ChartSquare.svg';
import CheckList from '@/assets/icons/Outline/ChecklistMinimalistic.svg';
import Ranking from '@/assets/icons/Outline/Ranking.svg';
import SqureAcademic from '@/assets/icons/Outline/SquareAcademicCap2.svg';
import UserCircle from '@/assets/icons/Outline/UserCircle.svg';
import UserHand from '@/assets/icons/Outline/UserHands.svg';
import CallApiButton from '@/components/common/CallApiButton.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormCombobox from '@/components/form/FormCombobox.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
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
import type { IJob, IJobFilter, IRecruitmentRequest } from '@/types';
import type { PaginationState } from '@tanstack/vue-table';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { jobSchema, type JobPayloadType } from '../job.schema';

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
		departments.value?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [],
);
const listBranch = computed(
	() =>
		branches.value?.map((item) => ({
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
const listRecruitmentRequest = computed(() => {
	return (
		recruitmentRequests.value?.data
			?.filter((item) => item.status === 'APPROVED')
			.map((item) => ({
				label: item.title,
				value: item.id,
			})) || []
	);
});
const requisitionSelected = ref<IRecruitmentRequest>();

const { mutateAsync: createJob, isPending: isPendingCreate } = useCreateJob(pagination, filter);
const { mutateAsync: updateJob, isPending: isPendingUpdate } = useUpdateJob(pagination, filter);

const formSchema = toTypedSchema(jobSchema);

const { handleSubmit, values } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: JobPayloadType) => {
	try {
		const res = !props.data
			? await createJob(values)
			: await updateJob({ id: props.data.id, payload: values });
		if ([200, 201].includes(res.status_code)) {
			emits('update:open', false);
		}
	} catch (error) {
		return error;
	}
});

watch(
	() => values.requisition_id,
	(newVal) => {
		const requisition = recruitmentRequests.value?.data.find((item) => item.id === newVal);
		if (requisition) requisitionSelected.value = requisition;
	},
);
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<form id="form" @submit="onSubmit">
			<FormField
				:modelValue="data?.title ?? requisitionSelected?.title"
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
				<FormCombobox
					name="requisition_id"
					label="Requisition"
					:list="listRecruitmentRequest"
					:model-value="data?.requisition_id"
					:icon="ChartSqare"
					list-size="md"
					placeholder="Select requisition" />

				<FormCombobox
					name="branch_id"
					label="Branch"
					:list="listBranch"
					:modelValue="requisitionSelected?.branch_id ?? data?.branch_id"
					:icon="Building3"
					:required="true"
					list-size="md"
					placeholder="Select company branch" />

				<FormCombobox
					name="department_id"
					label="Department"
					:list="listDepartment"
					:modelValue="requisitionSelected?.department.id ?? data?.department_id"
					:required="true"
					:icon="Building"
					list-size="md"
					placeholder="Select department" />

				<FormCombobox
					name="position_id"
					label="Position"
					:list="listPosition"
					:modelValue="requisitionSelected?.job_title_id ?? data?.position_id"
					:required="true"
					:icon="Building"
					list-size="md"
					placeholder="Select position" />

				<div class="hidden">
					<FormInput
						name="hiring_manager_id"
						:required="true"
						label="Hiring manager"
						:modelValue="requisitionSelected?.hiring_manager.id ?? data?.hiring_manager_id"
						:icon="UserCircle"
						class="w-full"
						placeholder="Enter hiring manager id" />
				</div>

				<FormCombobox
					name="level"
					label="Level"
					:required="true"
					:list="listJobLevel"
					:modelValue="requisitionSelected?.level ?? data?.level"
					:icon="Chart2"
					list-size="md"
					placeholder="Select level" />

				<FormCombobox
					name="employment_type"
					label="Employment type"
					:required="true"
					:list="listEmploymentType"
					:modelValue="requisitionSelected?.employment_type ?? data?.employment_type"
					:icon="Case"
					list-size="md"
					placeholder="Select employment type" />

				<FormInput
					name="quantity"
					type="number"
					:required="true"
					:modelValue="requisitionSelected?.quantity ?? data?.quantity"
					label="Quantity"
					class="w-full"
					:icon="CheckList"
					placeholder="Enter quantity" />

				<FormCalendar
					name="due_date"
					label="Due date"
					:icon="Calendar"
					:model-value="data?.due_date ?? undefined"
					class="w-full"
					placeholder="dd/MM/yyyy" />

				<FormInput
					name="location"
					label="Location"
					:required="true"
					class="w-full"
					:icon="CheckList"
					placeholder="Enter location" />

				<FormCombobox
					name="education_level"
					label="Education level"
					:list="EDUCATION_LEVEL"
					:icon="SqureAcademic"
					list-size="md"
					placeholder="Select education level" />

				<FormCombobox
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
					list-size="md"
					placeholder="Select work experience" />

				<FormCombobox
					name="gender"
					label="Gender"
					:list="genderCombobox"
					:icon="UserHand"
					list-size="md"
					placeholder="Select gender" />
			</div>
			<div class="mt-6 grid gap-4">
				<FormTextarea
					label="Description"
					name="description"
					:required="true"
					:model-value="requisitionSelected?.description ?? data?.description"
					placeholder="A detailed job description"
					class="rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 h-72" />

				<FormTextarea
					label="Requirements"
					name="requirements"
					:required="true"
					:model-value="data?.requirements"
					placeholder="Essential skills needed for the job"
					class="rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 h-72" />
			</div>
		</form>
	</ScrollArea>
	<div class="flex justify-end gap-2 mt-4">
		<CallApiButton variant="outline" class="h-auto py-3.5 px-4 rounded-2xl"
			>Save as draft</CallApiButton
		>
		<CallApiButton
			:isLoading="isPendingCreate || isPendingUpdate"
			form="form"
			class="bg-blue-500 hover:bg-blue-600 rounded-2xl h-auto py-3.5 px-10 text-white">
			Submit
		</CallApiButton>
	</div>
</template>
