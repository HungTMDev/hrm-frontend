<script setup lang="ts">
import Link from '@/assets/icons/Outline/Link.svg';
import UserSpeak from '@/assets/icons/Outline/User Speak.svg';
import CallApiButton from '@/components/common/CallApiButton.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectArray from '@/components/form/FormSelectArray.vue';
import FormTime from '@/components/form/FormTime.vue';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useListUser } from '@/composables/user/useUser';
import { listInterviewType } from '@/constants';
import { createISOStringFromDayAndTime } from '@/lib/utils';
import type { InterviewPayload } from '@/types';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { interviewSchema, type InterviewFormData } from './applicant.schema';

const props = defineProps<{
	open: boolean;
	id?: string;
	isLoading?: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'submit', payload: InterviewPayload): void;
}>();

const { data: users } = useListUser();

const formSchema = toTypedSchema(interviewSchema);

const { handleSubmit, setFieldValue } = useForm({
	validationSchema: formSchema,
	initialValues: {
		interviewer: [''],
	},
});

const onSubmit = handleSubmit((values: InterviewFormData) => {
	const payload: InterviewPayload = {
		interview_name: values.interview_name,
		interview_type: values.interview_type,
		participant_ids: values.interviewer,
		scheduled_time: createISOStringFromDayAndTime(values.interview_date, values.interview_time),
		application_id: props.id || '',
		duration_minutes: values.duration_minutes,
		location: values.location,
		meeting_link: values.meeting_link,
		stage: 'INTERVIEW_1',
	};
	emits('submit', payload);
});

const handleOpen = (isOpen: boolean) => {
	emits('update:open', isOpen);
};

const setValue = (payload: { fieldName: any; data: any }) => {
	setFieldValue(payload.fieldName, payload.data);
};
</script>

<template>
	<Dialog :open="open" @update:open="handleOpen">
		<DialogContent class="w-96">
			<DialogHeader>
				<DialogTitle class="text-base font-medium">Schedule interview</DialogTitle>
				<DialogDescription> </DialogDescription>
			</DialogHeader>
			<form id="form" @submit="onSubmit">
				<div class="grid gap-2">
					<FormInput
						name="interview_name"
						label="Interview name"
						:required="true"
						placeholder="Enter interview name"
						class="w-full" />
					<FormSelect
						name="interview_type"
						label="Interview type"
						:required="true"
						:list="listInterviewType" />
					<div class="flex gap-4">
						<div class="w-3/5">
							<FormCalendar
								name="interview_date"
								label="Interview date"
								class="w-full"
								:required="true" />
						</div>
						<div class="w-2/5">
							<FormTime
								name="interview_time"
								label="Interview time"
								:required="true" />
						</div>
					</div>

					<FormInput
						name="duration_minutes"
						type="number"
						label="Duration minutes"
						:required="true"
						placeholder="Enter duration minutes"
						class="w-full" />
					<FormInput
						name="meeting_link"
						label="Meeting link"
						:icon="Link"
						:required="true"
						placeholder="Enter meeting link"
						class="w-full" />
					<FormSelectArray
						name="interviewer"
						label="Interviewer"
						class="w-full"
						:icon="UserSpeak"
						:required="true"
						:list="users?.map((user) => ({ label: user.name, value: user.id })) || []"
						@update:select="setValue" />
				</div>
			</form>

			<DialogFooter>
				<CallApiButton
					form="form"
					class="h-auto p-3 bg-blue-500 hover:bg-blue-600 rounded-2xl px-8"
					:is-loading="isLoading">
					Submit
				</CallApiButton>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
