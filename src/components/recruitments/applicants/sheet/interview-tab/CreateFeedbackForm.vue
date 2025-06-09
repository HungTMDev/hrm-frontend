<script lang="ts" setup>
import FormInput from '@/components/form/FormInput.vue';
import FormMarkdown from '@/components/form/FormMarkdown.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { listRecommendRecruitment } from '@/constants';
import Chart2 from '@/assets/icons/Outline/Chart2.svg';
import UserCircle from '@/assets/icons/Outline/UserCircle.svg';
import { toTypedSchema } from '@vee-validate/zod';
import {
	interviewFeedbackScheama,
	type InterviewerFeedbackPayload,
} from '../../interview-tab/schema';
import { useForm } from 'vee-validate';
import { useCreateInterviewFeedback } from '@/composables/recruitment/applicant/useUpdateApplicant';
import { applicantKey } from '@/composables/recruitment/applicant/key';
import { useQueryClient } from '@tanstack/vue-query';
import Button from '@/components/ui/button/Button.vue';
import CallApiButton from '@/components/common/CallApiButton.vue';

const props = defineProps<{
	interviewId?: string;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'cancel'): void;
}>();

const queryClient = useQueryClient();

const formSchema = toTypedSchema(interviewFeedbackScheama);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const { mutate: createInterviewFeedback, isPending: isCreating } = useCreateInterviewFeedback();

const onSubmit = handleSubmit((values) => {
	const payload: InterviewerFeedbackPayload = {
		...values,
		strengths: (values.strengths as string[]).join('\n'),
		weaknesses: (values.weaknesses as string[]).join('\n'),
	};

	createInterviewFeedback(
		{
			id: props.interviewId || '',
			data: payload,
		},
		{
			onSuccess: () => {
				emits('cancel');

				queryClient.invalidateQueries({
					queryKey: [applicantKey.feedback, props.interviewId || ''],
				});

				queryClient.invalidateQueries({
					queryKey: [applicantKey.base],
				});

				queryClient.invalidateQueries({
					queryKey: [applicantKey.interview],
				});
			},
		},
	);
});
</script>
<template>
	<ScrollArea class="h-[calc(100vh-390px)] pr-3">
		<form id="form" @submit="onSubmit">
			<div class="grid grid-cols-2 gap-6">
				<FormInput
					name="score"
					type="number"
					label="Score"
					:required="true"
					:icon="Chart2"
					:min="0"
					:max="10"
					:step="0.0001"
					class="w-full"
					placeholder="Enter score" />
				<FormSelect
					name="recommendation"
					label="Recommendation"
					:list="listRecommendRecruitment"
					:icon="UserCircle"
					:required="true"
					placeholder="Select recommendation" />
				<FormMarkdown
					name="strengths"
					label="Strengths"
					:required="true"
					class="rounded-2xl h-[150px]"
					placeholder="Enter strengths" />
				<FormMarkdown
					name="weaknesses"
					label="Weaknesses"
					:required="true"
					class="rounded-2xl h-[150px]"
					placeholder="Enter weaknesses" />
			</div>

			<div class="mt-6 grid gap-4">
				<FormTextarea
					name="comments"
					label="Comments"
					:required="true"
					class="rounded-2xl h-[200px]"
					placeholder="Enter comments" />
			</div>
		</form>
	</ScrollArea>
	<div class="mt-2 flex justify-end gap-2 mb-4">
		<Button variant="outline" class="rounded-2xl h-auto py-3 px-6" @click="emits('cancel')">
			Cancel
		</Button>
		<CallApiButton
			:is-loading="isCreating"
			form="form"
			class="rounded-2xl h-auto py-3 px-5 bg-blue-500 hover:bg-blue-600">
			Create
		</CallApiButton>
	</div>
</template>
