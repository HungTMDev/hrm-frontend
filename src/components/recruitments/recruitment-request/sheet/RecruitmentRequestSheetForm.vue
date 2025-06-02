<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import CheckList from '@/assets/icons/Outline/Checklist Minimalistic.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';
import CallApiButton from '@/components/common/CallApiButton.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormCombobox from '@/components/form/FormCombobox.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormMarkdown from '@/components/form/FormMarkdown.vue';
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
	useSubmitRecruitmentRequest,
} from '@/composables/recruitment/recruitment-request/useUpdateRecruitmentRequest';
import { listEmploymentType, listJobLevel } from '@/constants';
import type { IRecruitmentRequest, IRecruitmentRequestFilter } from '@/types';
import type { PaginationState } from '@tanstack/vue-table';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import {
	recruitmentRequestSchema,
	type RecruitmentRequestPayload,
} from '../recruitment-request.schema';
import { recruitmentRequestKey } from '@/composables/recruitment/recruitment-request/key';
import { useQueryClient } from '@tanstack/vue-query';
import { useCustomToast } from '@/lib/customToast';

const { data: branches } = useBranch();
const { data: departments } = useDepartment();
const { data: positions } = usePosition();
const queryClient = useQueryClient();
const { showToast } = useCustomToast();

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

const { handleSubmit, values } = useForm({
	validationSchema: formSchema,
});

const { mutateAsync: createRecruitmentRequest, isPending: isLoadingCreate } =
	useCreateRecruitmentRequest();
const { mutateAsync: editRecruitmentRequest, isPending: isLoadingEdit } =
	useEditRecruitmentRequest();
const { mutate: submitRecruitmentRequest } = useSubmitRecruitmentRequest(pagination, filter);

const onSubmit = handleSubmit(async (values) => {
	props.data
		? await editRecruitmentRequest(
				{ id: props.data.id, data: values },
				{
					onSuccess: (data) => {
						submitRecruitmentRequest(data.id);
						emits('update:open', false);
					},
				},
			)
		: await createRecruitmentRequest(values, {
				onSuccess: (data) => {
					submitRecruitmentRequest(data.id);
					emits('update:open', false);
				},
			});
});

const handleCreateDraft = async () => {
	const payload: RecruitmentRequestPayload = {
		branch_id: values.branch_id || '',
		department_id: values.department_id || '',
		job_title_id: values.job_title_id || '',
		level: values.level || '',
		employment_type: values.employment_type || '',
		title: values.title || '',
		description: values.description || '',
		skills_required: values.skills_required || [],
		expected_start_date: values.expected_start_date || '',
		justification: values.justification || '',
		quantity: values.quantity || 0,
	};

	props.data
		? await editRecruitmentRequest(
				{ id: props.data.id, data: payload },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: [recruitmentRequestKey.base, pagination, filter],
						});
						showToast({
							message: 'Success!',
							type: 'success',
						});
						emits('update:open', false);
					},
				},
			)
		: await createRecruitmentRequest(payload, {
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [recruitmentRequestKey.base, pagination, filter],
					});
					showToast({
						message: 'Success!',
						type: 'success',
					});
					emits('update:open', false);
				},
			});
};
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
							placeholder="Add new recruitment request" />
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
					name="branch_id"
					label="Branch"
					:list="listBranch"
					:icon="Building3"
					:required="true"
					list-size="md"
					:modelValue="data?.branch_id"
					placeholder="Select company branch" />
				<FormCombobox
					name="department_id"
					label="Department"
					list-size="md"
					:list="listDepartment"
					:required="true"
					:icon="Building"
					:modelValue="data?.department.id"
					placeholder="Select department" />
				<FormCombobox
					name="job_title_id"
					label="Role"
					list-size="md"
					:list="listPosition"
					:required="true"
					:icon="UserCircle"
					:modelValue="data?.job_title_id"
					placeholder="Select department" />
				<FormCombobox
					name="level"
					label="Level"
					list-size="md"
					:required="true"
					:list="listJobLevel"
					:icon="Chart2"
					:modelValue="data?.level"
					placeholder="Select level" />
				<FormCombobox
					name="employment_type"
					label="Employment type"
					list-size="md"
					:required="true"
					:list="listEmploymentType"
					:icon="Case"
					:modelValue="data?.employment_type"
					placeholder="Select employment type" />
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
					label="Reason"
					class="w-full"
					:required="true"
					:icon="CheckList"
					:modelValue="data?.justification"
					placeholder="Enter reason" />
				<FormCalendar
					name="expected_start_date"
					label="Expected start date"
					class="w-full"
					:required="true"
					:icon="Calendar"
					:modelValue="data?.expected_start_date" />
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
	<div class="flex justify-end gap-2 mt-4">
		<CallApiButton
			variant="outline"
			class="h-auto py-3.5 px-6 rounded-2xl"
			:is-loading="isLoadingCreate || isLoadingEdit"
			@click="handleCreateDraft"
			>Save as draft</CallApiButton
		>
		<CallApiButton
			form="form"
			class="bg-blue-500 hover:bg-blue-600 rounded-2xl h-auto py-3.5 px-8 text-white"
			:is-loading="isLoadingCreate || isLoadingEdit">
			Create
		</CallApiButton>
	</div>
</template>
