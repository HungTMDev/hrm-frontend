<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import CheckList from '@/assets/icons/Outline/Checklist Minimalistic.svg';
import CallApiButton from '@/components/common/CallApiButton.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormMarkdown from '@/components/form/FormMarkdown.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormDescription from '@/components/ui/form/FormDescription.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import Input from '@/components/ui/input/Input.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { SheetDescription, SheetTitle } from '@/components/ui/sheet';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import { useBranch } from '@/composables/branch/useBranch';
import { useDepartment } from '@/composables/department/useDepartment';
import { usePosition } from '@/composables/position/usePosition';
import {
	useCreateRecruitmentRequest,
	useEditRecruitmentRequest,
} from '@/composables/recruitment/recruitment-request/useUpdateRecruitmentRequest';
import { listEmploymentType, listJobLevel } from '@/constants';
import type { IRecruitmentRequest, IRecruitmentRequestFilter } from '@/types';
import type { PaginationState } from '@tanstack/vue-table';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, onMounted } from 'vue';
import { recruitmentRequestSchema } from '../recruitment-request.schema';

const { data: branches } = useBranch();
const { data: departments } = useDepartment();
const { data: positions } = usePosition();

const props = defineProps<{
	data?: IRecruitmentRequest;
	pagination: PaginationState;
	filter: Partial<IRecruitmentRequestFilter>;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
}>();

const listDepartment = computed(
	() => departments.value?.map((item) => ({ label: item.name, value: item.id })) || [],
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
			label: item.title,
			value: item.id,
		})) || [],
);
const filter = computed(() => props.filter);
const pagination = computed(() => props.pagination);

const formSchema = toTypedSchema(recruitmentRequestSchema);

const { handleSubmit, setFieldValue, values } = useForm({
	validationSchema: formSchema,
});

const { mutateAsync: createRecruitmentRequest, isPending: isLoadingCreate } =
	useCreateRecruitmentRequest(pagination, filter);
const { mutateAsync: editRecruitmentRequest, isPending: isLoadingEdit } = useEditRecruitmentRequest(
	pagination,
	filter,
);

const onSubmit = handleSubmit(async (values) => {
	const res = props.data
		? await editRecruitmentRequest({ id: props.data.id, data: values })
		: await createRecruitmentRequest(values);
	if ([200, 201].includes(res.status_code)) {
		emits('update:open', false);
	}
});

const setValue = (fieldName: any, value: any) => {
	setFieldValue(fieldName, value);
};

onMounted(() => {
	if (props.data) {
		const keys = Object.keys(values) as (keyof IRecruitmentRequest)[];
		keys.forEach((key) => {
			if ((key as any) === 'department_id') setValue(key, props.data?.department.id);
			else setValue(key, props.data?.[key]);
		});
	}
});
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<form id="form" @submit="onSubmit">
			<FormField :modelValue="data?.title" name="title" v-slot="{ componentField }">
				<FormItem>
					<FormControl>
						<Input
							v-bind="componentField"
							class="focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-[28px] text-black px-0 placeholder:text-gray-200 font-semibold p-2"
							placeholder="Title" />
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
					name="branch_id"
					label="Branch"
					:list="listBranch"
					:icon="Building3"
					:required="true"
					:modelValue="data?.branch_id"
					placeholder="Select company branch"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormSelect
					name="department_id"
					label="Department"
					:list="listDepartment"
					:required="true"
					:icon="Building"
					:modelValue="data?.department.id"
					placeholder="Select department"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormSelect
					name="job_title_id"
					label="Job title"
					:list="listPosition"
					:required="true"
					:icon="Building"
					:modelValue="data?.job_title_id"
					placeholder="Select department"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormSelect
					name="level"
					label="Level"
					:required="true"
					:list="listJobLevel"
					:icon="Chart2"
					:modelValue="data?.level"
					placeholder="Select level"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormSelect
					name="employment_type"
					label="Employment type"
					:required="true"
					:list="listEmploymentType"
					:icon="Case"
					:modelValue="data?.employment_type"
					placeholder="Select employment type"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormInput
					name="quantity"
					type="number"
					label="Quantity"
					class="w-full"
					:icon="CheckList"
					:required="true"
					:modelValue="data?.quantity"
					placeholder="Enter quantity" />
				<FormInput
					name="justification"
					label="Justification"
					class="w-full"
					:icon="CheckList"
					:required="true"
					:modelValue="data?.justification"
					placeholder="Enter justification" />
				<FormCalendar
					name="expected_start_date"
					label="Expected start date"
					:required="true"
					:icon="Calendar"
					class="w-full"
					:modelValue="data?.expected_start_date"
					placeholder="dd/mm/yyyy"
					@update:value="(payload) => setValue(payload.fieldName, payload.data)" />
			</div>
			<div class="mt-6 grid gap-4">
				<FormTextarea
					label="Job description"
					name="description"
					:model-value="data?.description"
					placeholder="A detailed job description"
					class="rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 h-72" />
				<FormMarkdown
					name="skills_required"
					label="Skill required"
					:modelValue="data?.skills_required"
					:required="true"
					placeholder="Enter skill required" />
			</div>
		</form>
	</ScrollArea>
	<div class="text-end mt-4">
		<CallApiButton
			form="form"
			class="bg-blue-500 hover:bg-blue-600 rounded-2xl h-auto py-3.5 px-10 text-white"
			:is-loading="isLoadingCreate || isLoadingEdit">
			Submit
		</CallApiButton>
	</div>
</template>
