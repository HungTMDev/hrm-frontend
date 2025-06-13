<script setup lang="ts">
import Link from '@/assets/icons/Outline/Link.svg';
import MapPoint from '@/assets/icons/Outline/MapPoint.svg';
import UserSpeak from '@/assets/icons/Outline/UserSpeak.svg';
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
import {
	createISOStringFromDayAndTime,
	createNameByGender,
	formatISOStringToLocalDateTime,
} from '@/lib/utils';
import type { InterviewPayload } from '@/types';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import Handlebars from 'handlebars';
import { computed, ref, watch, type Ref } from 'vue';
import { meetingScheduleSchema, type MeetingSchedulePayload } from './sheet/interview-tab/schema';
import {
	OFFLINE_INTERVIEW_INVITATION_EMAIL,
	ONLINE_INTERVIEW_INVITATION_EMAIL,
} from '@/constants/model';
import { useGetAccount } from '@/composables/auth/useAuth';
import Button from '@/components/ui/button/Button.vue';
import { useGetApplicantById } from '@/composables/recruitment/applicant/useApplicant';

const props = defineProps<{
	open: boolean;
	id?: string;
	isLoading?: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(
		e: 'submit',
		payload: {
			data: InterviewPayload;
			email: string;
		},
	): void;
}>();

const { data: account } = useGetAccount();
const { data: users } = useListUser();

const data = ref<MeetingSchedulePayload>();
const nextStep = ref(false);
const renderedHtml = ref('');

const id = computed(() => props.id);
const { data: applicant } = useGetApplicantById(id);
const interviewDateTime = computed(() => {
	const str = createISOStringFromDayAndTime(
		data.value?.interview_date || '',
		data.value?.interview_time || '',
	);
	return formatISOStringToLocalDateTime(str);
});
const confirmDateTime = computed(() => {
	const str = createISOStringFromDayAndTime(
		data.value?.confirmation_before_date || '',
		data.value?.confirmation_before_time || '',
	);
	return formatISOStringToLocalDateTime(str);
});
const hrSelected = computed(() => {
	return users.value?.find((item) => item.id === data.value?.coordinator) || account.value;
});
const dataFill: Ref<
	Partial<
		MeetingSchedulePayload & {
			position: string;
			hr_name: string;
			hr_email: string;
			phone_number: string;
		}
	>
> = computed(() => ({
	...data.value,
	interview_date: interviewDateTime.value.date,
	interview_time: interviewDateTime.value.time,
	confirmation_before_date: confirmDateTime.value.date,
	confirmation_before_time: confirmDateTime.value.time,
	position: applicant.value?.job.title,
	hr_name: createNameByGender(
		hrSelected.value?.name?.split(' ').slice(-1)[0] || '',
		(hrSelected.value?.gender as unknown as string) || '',
	),
	hr_email: hrSelected.value?.email,
	phone_number: hrSelected.value?.phone_number || '',
	location:
		data.value?.location?.trim() || 'Tầng 4 - Tòa Hanvico, 217- 219 Lê Duẩn, Thanh Khê, Đà Nẵng',
}));

const formSchema = toTypedSchema(meetingScheduleSchema);

const { handleSubmit, setFieldValue, values, errors } = useForm({
	validationSchema: formSchema,
	initialValues: {
		participant_ids: [''],
	},
});

const onSubmit = handleSubmit((values) => {
	data.value = values;
	nextStep.value = true;
});

const handleOpen = (isOpen: boolean) => {
	emits('update:open', isOpen);
};

const setValue = (payload: { fieldName: any; data: any }) => {
	setFieldValue(payload.fieldName, payload.data);
};

const handleSend = () => {
	const payload: InterviewPayload = {
		interview_name: data.value?.interview_name || '',
		interview_type: data.value?.interview_type || '',
		participant_ids: data.value?.participant_ids || [],
		scheduled_time: createISOStringFromDayAndTime(
			data.value?.interview_date || '',
			data.value?.interview_time || '',
		),
		application_id: props.id || '',
		duration_minutes: data.value?.duration_minutes,
		location: data.value?.location,
		meeting_link: data.value?.meeting_link,
		stage: 'INTERVIEW_1',
	};
	emits('submit', {
		data: payload,
		email: renderedHtml.value.replace(/"/g, "'"),
	});
};

const handleBack = () => {
	setFieldValue('participant_ids', data.value?.participant_ids);
	nextStep.value = false;
};

watch(dataFill, () => {
	const rawTemplate =
		data.value?.interview_type === 'ONLINE'
			? ONLINE_INTERVIEW_INVITATION_EMAIL
			: OFFLINE_INTERVIEW_INVITATION_EMAIL;
	const compiled = Handlebars.compile(rawTemplate);
	renderedHtml.value = compiled(dataFill.value);
});
</script>

<template>
	<Dialog :open="open" @update:open="handleOpen">
		<DialogContent class="w-[500px]">
			<DialogHeader>
				<DialogTitle class="text-base font-medium">Schedule interview</DialogTitle>
				<DialogDescription> </DialogDescription>
			</DialogHeader>
			<div v-if="nextStep" class="text-sm border p-4 rounded-2xl">
				<div v-html="renderedHtml"></div>
			</div>

			<form v-else id="form" @submit="onSubmit">
				<div class="grid gap-2">
					<FormInput
						name="interview_name"
						label="Interview name"
						:model-value="data?.interview_name"
						:required="true"
						placeholder="Enter interview name"
						class="w-full" />
					<FormSelect
						name="interview_type"
						label="Interview type"
						:required="true"
						:model-value="data?.interview_type"
						:list="listInterviewType" />
					<div class="flex gap-4">
						<div class="w-3/5">
							<FormCalendar
								name="interview_date"
								label="Interview date"
								class="w-full"
								:model-value="data?.interview_date"
								:required="true" />
						</div>
						<div class="w-2/5">
							<FormTime
								name="interview_time"
								label="Interview time"
								:model-value="data?.interview_time"
								:required="true" />
						</div>
					</div>

					<div class="flex gap-4">
						<div class="w-3/5">
							<FormCalendar
								name="confirmation_before_date"
								label="Confirmation date"
								class="w-full"
								:model-value="data?.confirmation_before_date"
								:required="true" />
						</div>
						<div class="w-2/5">
							<FormTime
								name="confirmation_before_time"
								label="Confirmation time"
								:model-value="data?.confirmation_before_time"
								:required="true" />
						</div>
					</div>

					<FormInput
						name="duration_minutes"
						type="number"
						label="Duration minutes"
						:required="true"
						:model-value="data?.duration_minutes"
						placeholder="Enter duration minutes"
						class="w-full" />
					<FormInput
						v-if="values.interview_type === 'ONLINE'"
						name="meeting_link"
						label="Meeting link"
						:icon="Link"
						:model-value="data?.meeting_link"
						:required="true"
						placeholder="Enter meeting link"
						class="w-full" />
					<FormInput
						v-else
						name="location"
						label="Location"
						:icon="MapPoint"
						:model-value="data?.location"
						:required="true"
						placeholder="Enter location"
						class="w-full" />
					<FormSelectArray
						name="participant_ids"
						label="Participant"
						class="w-full"
						:icon="UserSpeak"
						:required="true"
						:list="users?.map((user) => ({ label: user.name, value: user.id })) || []"
						@update:select="setValue" />
				</div>
			</form>

			<DialogFooter>
				<Button
					v-if="nextStep"
					variant="outline"
					class="h-auto p-3 rounded-2xl px-8"
					@click="handleBack"
					>Back</Button
				>
				<Button
					form="form"
					class="h-auto p-3 bg-blue-500 hover:bg-blue-600 rounded-2xl px-8"
					v-if="!nextStep"
					>Next</Button
				>
				<CallApiButton
					v-else
					class="h-auto p-3 bg-blue-500 hover:bg-blue-600 rounded-2xl px-8"
					:is-loading="isLoading"
					@click="handleSend">
					Send
				</CallApiButton>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
