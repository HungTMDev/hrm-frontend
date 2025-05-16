<script setup lang="ts">
import UserSpeakBold from '@/assets/icons/Bold/User Speak.svg';
import Link from '@/assets/icons/Outline/Link.svg';
import UserSpeak from '@/assets/icons/Outline/User Speak.svg';
import CallApiButton from '@/components/common/CallApiButton.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useListUser } from '@/composables/user/useUser';
import { listInterviewType } from '@/constants';
import { createISOStringFromDayAndTime } from '@/lib/utils';
import type { IApplicantFilter, InterviewPayload } from '@/types';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { interviewSchema, type InterviewFormData } from './schema';
import type { PaginationState } from '@tanstack/vue-table';
import {
	useCreateInterview,
	useUpdateStage,
} from '@/composables/recruitment/applicant/useUpdateApplicant';
import { applicantKey } from '@/composables/recruitment/applicant/key';

const props = defineProps<{
	open: boolean;
	id?: string;
	pagination: PaginationState;
	filters: Partial<IApplicantFilter>;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
}>();

const { data: users } = useListUser();

const activeTab = ref('INTERVIEW_1');

const filters = computed(() => props.filters);
const pagination = computed(() => props.pagination);

const formSchema = toTypedSchema(interviewSchema);

const { handleSubmit, setFieldValue, resetForm } = useForm({
	validationSchema: formSchema,
	initialValues: {
		interviewer: [''],
	},
});

const { mutate: updateStage } = useUpdateStage(applicantKey.base, pagination, filters);
const { mutate: createInterview, isPending } = useCreateInterview();

const onSubmit = handleSubmit((values: InterviewFormData) => {
	try {
		const payload: InterviewPayload = {
			interview_name: values.interview_name,
			interview_type: values.interview_type,
			participant_ids: values.interviewer,
			scheduled_time: createISOStringFromDayAndTime(
				values.interview_date,
				values.interview_time,
			),
			application_id: props.id || '',
			duration_minutes: values.duration_minutes,
			location: values.location,
			meeting_link: values.meeting_link,
			stage: activeTab.value,
		};
		updateStage(
			{ id: props.id || '', data: { to_stage: activeTab.value, outcome: 'PASSED' } },
			{
				onSuccess: () => {
					createInterview(payload, {
						onSuccess: () => {
							emits('update:open', false);
						},
					});
				},
			},
		);
	} catch (error) {
		return error;
	}
});

const handleOpen = (isOpen: boolean) => {
	emits('update:open', isOpen);
};

const setValue = (payload: { fieldName: any; data: any }) => {
	setFieldValue(payload.fieldName, payload.data);
};

const handleTab = (payload: any) => {
	resetForm();
	activeTab.value = payload;
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
				<Tabs
					:model-value="activeTab"
					class="flex flex-col gap-2 items-center"
					@update:model-value="handleTab">
					<TabsList class="rounded-2xl p-0.5 mx-auto">
						<TabsTrigger
							class="w-40 px-3 py-2 rounded-2xl data-[state=active]:text-blue-500"
							value="INTERVIEW_1">
							<div class="flex items-center gap-2">
								<IconFromSvg
									v-if="activeTab === 'interview1'"
									:icon="UserSpeakBold" />
								<IconFromSvg v-else :icon="UserSpeak" />
								Interview 1
							</div>
						</TabsTrigger>
						<TabsTrigger
							class="w-40 px-3 py-2 rounded-2xl data-[state=active]:text-blue-500"
							value="INTERVIEW_2">
							<div class="flex items-center gap-2">
								<IconFromSvg
									v-if="activeTab === 'interview2'"
									:icon="UserSpeakBold" />
								<IconFromSvg v-else :icon="UserSpeak" />
								Interview 2
							</div>
						</TabsTrigger>
					</TabsList>
					<TabsContent class="w-full" value="INTERVIEW_1">
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
								:list="
									users?.map((user) => ({ label: user.name, value: user.id })) ||
									[]
								"
								@update:select="setValue" />
						</div>
					</TabsContent>
					<TabsContent class="w-full" value="INTERVIEW_2">
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
								:list="
									users?.map((user) => ({ label: user.name, value: user.id })) ||
									[]
								"
								@update:select="setValue" />
						</div>
					</TabsContent>
				</Tabs>
			</form>

			<DialogFooter>
				<CallApiButton
					form="form"
					class="h-auto p-3 bg-blue-500 hover:bg-blue-600 rounded-2xl px-8"
					:is-loading="isPending">
					Submit
				</CallApiButton>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
