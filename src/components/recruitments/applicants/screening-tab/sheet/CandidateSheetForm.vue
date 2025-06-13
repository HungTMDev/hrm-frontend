<script lang="ts" setup>
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import CaseRound from '@/assets/icons/Outline/CaseRoundMinimalistic.svg';
import Dollar from '@/assets/icons/Outline/DollarMinimalistic.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import UserHand from '@/assets/icons/Outline/UserHands.svg';
import CallApiButton from '@/components/common/CallApiButton.vue';
import MultipleUploadField from '@/components/common/MultipleUploadField.vue';
import FormCombobox from '@/components/form/FormCombobox.vue';
import FormCurrency from '@/components/form/FormCurrency.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import FormUpload from '@/components/form/FormUpload.vue';
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
import { useUploadFile } from '@/composables/common';
import {
	useCreateApplicant,
	useEditApplicant,
} from '@/composables/recruitment/applicant/useUpdateApplicant';
import { useListJob } from '@/composables/recruitment/job/useJob';
import { genderCombobox } from '@/constants';
import { useCustomToast } from '@/lib/customToast';
import { createPathFromServerDomain, fetchFileFromUrl } from '@/lib/utils';
import type { IApplicant, IApplicantFilter, IJob } from '@/types';
import type { PaginationState } from '@tanstack/vue-table';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, onMounted, ref } from 'vue';
import { addApplicantSchema, type AddApplicantPayload } from '../schema';

const props = defineProps<{
	data?: IApplicant;
	pagination: PaginationState;
	filter: Partial<IApplicantFilter>;
}>();

const emits = defineEmits<{
	(e: 'back'): void;
	(e: 'close'): void;
}>();

const { data: jobs } = useListJob();
const { showToast } = useCustomToast();

const resumeFile = ref<File>();
const attachesFile = ref<(File | undefined)[]>();

const listJob = computed(() => {
	return (
		jobs.value
			?.filter((item) => item.status === 'OPENING')
			.map((item: IJob) => ({
				label: item.title,
				value: item.id,
			})) || []
	);
});
const pagination = computed(() => props.pagination);
const filter = computed(() => props.filter);

const formSchema = toTypedSchema(addApplicantSchema);

const { handleSubmit, setFieldValue } = useForm({
	validationSchema: formSchema,
});

const { mutate: createApplicant, isPending: creating } = useCreateApplicant(pagination, filter);
const { mutate: editApplicant, isPending: editing } = useEditApplicant(pagination, filter);
const { mutateAsync: uploadFile } = useUploadFile();

const onSubmit = handleSubmit(async (values) => {
	if (!values.attaches || !values.resume) {
		showToast({
			message: 'Please upload resume and attaches',
			type: 'warning',
		});
		return;
	}

	const resumeResponse = await uploadFile(values.resume as File);

	const attachesResponse = await Promise.all(
		values.attaches.map((item) => uploadFile(item as File)),
	);

	const payload: AddApplicantPayload = {
		...values,
		resume: resumeResponse,
		attaches: attachesResponse,
	};

	if (props.data) {
		editApplicant(
			{
				id: props.data.id,
				data: payload,
			},
			{
				onSuccess: () => {
					emits('close');
				},
			},
		);
		return;
	}

	createApplicant(payload, {
		onSuccess: () => {
			emits('close');
		},
	});
});
const setAttaches = (payload: File[] | undefined) => {
	setFieldValue('attaches', payload);
};

onMounted(async () => {
	if (props.data?.resume) {
		resumeFile.value = await fetchFileFromUrl(
			props.data?.resume?.path
				? createPathFromServerDomain(props.data?.resume?.path)
				: props.data.resume.url,
		);
	}
	attachesFile.value = await Promise.all(
		props.data?.attaches?.map((item) => fetchFileFromUrl(createPathFromServerDomain(item.path))) ||
			[],
	);
});
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<form id="form" @submit="onSubmit" class="flex-1 overflow-y-auto">
			<FormField
				:model-value="data?.candidate.full_name"
				name="full_name"
				v-slot="{ componentField }">
				<FormItem>
					<FormControl>
						<Input
							v-bind="componentField"
							class="focus-visible:ring-0 text-black focus-visible:ring-offset-0 border-none text-[28px] px-0 placeholder:text-gray-200 font-semibold p-2"
							placeholder="Full name" />
					</FormControl>
					<FormErrorCustom />
				</FormItem>
			</FormField>
			<SheetHeader>
				<SheetTitle></SheetTitle>
				<SheetDescription> </SheetDescription>
			</SheetHeader>

			<div class="grid grid-cols-2 gap-x-8 gap-y-4">
				<FormInput
					name="phone_number"
					label="Phone number"
					class="w-full"
					placeholder="Enter phone number"
					:required="true"
					:icon="Iphone"
					:model-value="data?.candidate.phone_number" />
				<FormInput
					name="email"
					label="Email address"
					:required="true"
					class="w-full"
					placeholder="Enter email address"
					:icon="Letter"
					:model-value="data?.candidate.email" />
				<FormCombobox
					name="job_id"
					label="Job"
					:list="listJob"
					:required="true"
					:icon="CaseRound"
					list-size="md"
					placeholder="Select job"
					:model-value="data?.job.id" />
				<FormSelectCalendar
					name="date_of_birth"
					label="Date of birth"
					:icon="Calendar"
					class="w-full"
					:model-value="data?.candidate.date_of_birth" />
				<FormSelectCalendar
					name="applied_at"
					label="Applied at"
					:required="true"
					:icon="Calendar"
					class="w-full"
					:model-value="data?.applied_at" />
				<FormCurrency
					name="expected_salary"
					label="Expected salary"
					:icon="Dollar"
					placeholder="Enter expected salary"
					:model-value="data?.expected_salary ?? undefined" />
				<FormSelect
					name="gender"
					label="Gender"
					list-size="md"
					:model-value="data?.candidate.gender"
					:icon="UserHand"
					:list="genderCombobox"
					placeholder="Select gender" />
				<FormCombobox
					name="referred_by"
					label="Referred by"
					:list="[]"
					list-size="md"
					:icon="UserHand"
					placeholder="Select referred" />
				<FormUpload
					:model-value="resumeFile"
					name="resume"
					label="Resume"
					:required="true"
					:data-response="data?.resume"
					type="file" />
				<MultipleUploadField
					:model-value="attachesFile as File[]"
					:list-response="data?.attaches"
					name="attaches"
					label="Attaches"
					@update:value="setAttaches" />
			</div>

			<div class="mt-4 flex flex-col gap-4">
				<FormTextarea
					name="cover_letter"
					label="Cover letter"
					:model-value="data?.cover_letter ?? undefined"
					class="w-full rounded-2xl h-[150px]"
					placeholder="Enter cover letter" />

				<FormTextarea
					name="notes"
					label="Notes"
					:model-value="data?.notes ?? undefined"
					class="w-full rounded-2xl h-[150px]"
					placeholder="Write a note" />
			</div>
		</form>
	</ScrollArea>
	<SheetFooter>
		<Button
			v-if="data"
			variant="outline"
			@click="emits('back')"
			class="rounded-2xl h-auto py-3.5 px-5">
			Back
		</Button>
		<CallApiButton
			:is-loading="creating || editing"
			form="form"
			class="rounded-2xl h-auto py-3.5 px-5 bg-blue-500 hover:bg-blue-600">
			Submit
		</CallApiButton>
	</SheetFooter>
</template>
