<script lang="ts" setup>
import ChatDots from '@/assets/icons/Outline/ChatDots.svg';
import Link from '@/assets/icons/Outline/Link.svg';
import MapPoint from '@/assets/icons/Outline/MapPoint.svg';
import PenNew from '@/assets/icons/Outline/PenNewRound.svg';
import SortByTime from '@/assets/icons/Outline/SortByTime.svg';
import UserSpeak from '@/assets/icons/Outline/UserSpeak.svg';
import CallApiButton from '@/components/common/CallApiButton.vue';
import FormArray from '@/components/form/FormArray.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormTime from '@/components/form/FormTime.vue';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetAccount } from '@/composables/auth/useAuth';
import { applicantKey } from '@/composables/recruitment/applicant/key';
import {
	useCreateInterview,
	useSendEmail,
	useUpdateInterview,
	useUpdateStage,
} from '@/composables/recruitment/applicant/useUpdateApplicant';
import { useListUser } from '@/composables/user/useUser';
import { listInterviewType } from '@/constants';
import {
	OFFLINE_INTERVIEW_INVITATION_EMAIL,
	ONLINE_INTERVIEW_INVITATION_EMAIL,
} from '@/constants/model';
import { useCustomToast } from '@/lib/customToast';
import {
	createISOStringFromDayAndTime,
	createNameByGender,
	formatISOStringToLocalDateTime,
} from '@/lib/utils';
import type { IApplicant, IApplicantInterview, InterviewPayload } from '@/types';
import { useQueryClient } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import Handlebars from 'handlebars';
import { useForm } from 'vee-validate';
import { computed, ref, watch, type Ref } from 'vue';
import { meetingScheduleSchema, type MeetingSchedulePayload } from './schema';

const props = defineProps<{
	applicant?: IApplicant;
	listInterview?: IApplicantInterview[];
}>();

const emits = defineEmits<{
	(e: 'back'): void;
	(e: 'closeSheet'): void;
}>();

const formSchema = toTypedSchema(meetingScheduleSchema);

const { showToast } = useCustomToast();
const queryClient = useQueryClient();
const { data: users } = useListUser();
const { data: account } = useGetAccount();

const data = ref<MeetingSchedulePayload>();
const nextStep = ref(false);
const renderedHtml = ref('');

const toStage = computed(() => {
	if (
		(props.applicant?.current_stage === 'INTERVIEW_2' &&
			props.listInterview
				?.filter((item) => item.stage === 'INTERVIEW_2')
				?.every((item) => item.status === 'CANCELED')) ||
		(props.applicant?.current_stage === 'INTERVIEW_1' &&
			props.listInterview
				?.filter((item) => item.stage === 'INTERVIEW_1')
				?.some((item) => item.status === 'COMPLETED'))
	) {
		return 'INTERVIEW_2';
	}

	return 'INTERVIEW_1';
});
const hrSelected = computed(() => {
	return users.value?.find((item) => item.id === data.value?.coordinator) || account.value;
});
const oldInterview = computed(() => {
	return props.listInterview?.find((item) => item.status === 'SCHEDULED');
});
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
	position: props.applicant?.job.title,
	hr_name: createNameByGender(
		hrSelected.value?.name?.split(' ').slice(-1)[0] || '',
		(hrSelected.value?.gender as unknown as string) || '',
	),
	hr_email: hrSelected.value?.email,
	phone_number: hrSelected.value?.phone_number || '',
	location:
		data.value?.location?.trim() || 'Tầng 4 - Tòa Hanvico, 217- 219 Lê Duẩn, Thanh Khê, Đà Nẵng',
}));
const initParticipants = computed(() => {
	return oldInterview.value?.participants.map((item) => item.id) ?? [''];
});

const { handleSubmit, values, resetForm } = useForm({
	validationSchema: formSchema,
	initialValues: {
		participant_ids: initParticipants.value,
	},
});

const { mutate: sendEmail } = useSendEmail();
const { mutate: updateStage } = useUpdateStage();
const { mutate: createInterview, isPending } = useCreateInterview();
const { mutate: updateInterview, isPending: updating } = useUpdateInterview();

const onSubmit = handleSubmit((values) => {
	data.value = values;
	nextStep.value = true;
});

const handleBack = () => {
	if (nextStep.value) {
		resetForm();
		nextStep.value = false;
		return;
	}
	data.value = undefined;
	emits('back');
};

const handleSend = () => {
	const payload: InterviewPayload = {
		...data.value,
		scheduled_time: createISOStringFromDayAndTime(
			data.value?.interview_date || '',
			data.value?.interview_time || '',
		),
		interview_type: data.value?.interview_type || '',
		interview_name: data.value?.interview_name || '',
		application_id: props.applicant?.id || '',
		stage: toStage.value,
	};

	if (oldInterview.value) {
		updateInterview(
			{
				id: oldInterview.value.id,
				data: payload,
			},
			{
				onSuccess: () => {
					emits('back');
					queryClient.invalidateQueries({
						queryKey: [applicantKey.interview],
					});

					showToast({
						message: 'Re-schedule success!',
						type: 'success',
					});

					sendEmail(
						{
							email: props.applicant?.candidate.email || '',
							content: renderedHtml.value.replace(/"/g, "'"),
							subject: '[THƯ MỜI PHỎNG VẤN - LUTECH.LTD]',
						},
						{
							onSuccess: () => {
								showToast({
									message: 'Sent email success!',
									type: 'success',
								});
							},
						},
					);
				},
			},
		);
		return;
	}

	createInterview(payload, {
		onSuccess: () => {
			emits('closeSheet');

			updateStage({
				id: props.applicant?.id || '',
				data: { to_stage: toStage.value, outcome: 'PASSED' },
			});
			queryClient.invalidateQueries({
				queryKey: [applicantKey.interview],
			});

			sendEmail(
				{
					email: props.applicant?.candidate.email || '',
					content: renderedHtml.value.replace(/"/g, "'"),
					subject: '[THƯ MỜI PHỎNG VẤN - LUTECH.LTD]',
				},
				{
					onSuccess: () => {
						showToast({
							message: 'Sent email success!',
							type: 'success',
						});
					},
				},
			);
		},
	});
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
	<ScrollArea class="h-[calc(100vh-380px)] pr-3">
		<div v-if="nextStep" class="text-sm border p-4 rounded-2xl">
			<div v-html="renderedHtml"></div>
		</div>
		<form v-else id="form" @submit="onSubmit">
			<div class="grid grid-cols-2 gap-x-8 gap-y-6">
				<FormInput
					name="interview_name"
					label="Interview name"
					:model-value="data?.interview_name ?? oldInterview?.interview_name"
					:required="true"
					:icon="PenNew"
					placeholder="Enter interview name"
					class="w-full" />

				<FormSelect
					name="interview_type"
					label="Interview type"
					:icon="ChatDots"
					:model-value="data?.interview_type ?? oldInterview?.interview_type"
					:required="true"
					:list="listInterviewType" />

				<div class="flex gap-4">
					<div class="w-3/5">
						<FormCalendar
							name="interview_date"
							label="Interview date"
							:model-value="data?.interview_date ?? oldInterview?.scheduled_time"
							class="w-full"
							:required="true" />
					</div>
					<div class="w-2/5">
						<FormTime
							name="interview_time"
							label="Interview time"
							:model-value="data?.interview_time ?? oldInterview?.scheduled_time"
							:required="true" />
					</div>
				</div>
				<div class="flex gap-4">
					<div class="w-3/5">
						<FormCalendar
							name="confirmation_before_date"
							:required="true"
							:model-value="data?.confirmation_before_date"
							label="Confirmation (date)" />
					</div>
					<div class="w-2/5">
						<FormTime
							name="confirmation_before_time"
							label="Confirmation (time)"
							:model-value="data?.confirmation_before_time"
							:required="true" />
					</div>
				</div>

				<FormInput
					name="duration_minutes"
					type="number"
					:model-value="data?.duration_minutes ?? oldInterview?.duration_minutes"
					:required="true"
					:icon="SortByTime"
					label="Duration minutes"
					placeholder="Enter duration minutes"
					class="w-full" />

				<FormSelect
					name="coordinator"
					label="Coordinator"
					:model-value="data?.coordinator ?? account?.id"
					:icon="UserSpeak"
					:list="users?.map((user) => ({ label: user.name, value: user.id })) || []" />

				<FormInput
					v-if="values.interview_type !== 'ONLINE'"
					name="location"
					label="Location"
					:required="true"
					:model-value="data?.location ?? oldInterview?.location ?? undefined"
					:icon="MapPoint"
					placeholder="Enter location"
					class="w-full" />

				<FormInput
					v-else
					name="meeting_link"
					label="Meeting link"
					:model-value="data?.meeting_link ?? oldInterview?.meeting_link ?? undefined"
					:icon="Link"
					:required="true"
					placeholder="Enter meeting link"
					class="w-full" />

				<div>
					<FormArray
						name="participant_ids"
						label="Interviewer"
						label-size="xs"
						:required="true"
						:init-value="''">
						<template #default="{ baseName, index }">
							<FormSelect
								:name="baseName"
								:model-value="
									data?.participant_ids?.[index] ?? oldInterview?.participants?.[index]?.id
								"
								:icon="UserSpeak"
								label=""
								:list="users?.map((user) => ({ label: user.name, value: user.id })) || []"
								:required="true" />
						</template>
					</FormArray>
				</div>
			</div>
		</form>
	</ScrollArea>
	<div class="flex justify-end gap-2 mb-4">
		<Button variant="outline" class="rounded-2xl h-auto py-3 px-6" @click="handleBack">
			Back
		</Button>
		<Button
			v-if="!nextStep"
			form="form"
			class="rounded-2xl h-auto py-3 px-8 bg-blue-500 hover:bg-blue-600">
			Next
		</Button>
		<CallApiButton
			v-else
			form="form"
			:is-loading="isPending || updating"
			class="rounded-2xl h-auto py-3 px-8 bg-blue-500 hover:bg-blue-600"
			@click="handleSend">
			Send
		</CallApiButton>
	</div>
</template>
