<script lang="ts" setup>
import Chart2 from '@/assets/icons/Outline/Chart2.svg';
import UserCircle from '@/assets/icons/Outline/UserCircle.svg';
import Title from '@/components/common/Title.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { listRecommendRecruitment } from '@/constants';
import type { IApplicantInterview, IApplicantInterviewFilter } from '@/types';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { interviewFeedbackScheama, type InterviewerFeedbackPayload } from '../schema';
import FormMarkdown from '@/components/form/FormMarkdown.vue';
import { useCreateInterviewFeedback } from '@/composables/recruitment/applicant/useUpdateApplicant';
import type { PaginationState } from '@tanstack/vue-table';
import CallApiButton from '@/components/common/CallApiButton.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { applicantKey } from '@/composables/recruitment/applicant/key';
import { computed } from 'vue';

const props = defineProps<{
	data?: IApplicantInterview;
	pagination: PaginationState;
	filter: Partial<IApplicantInterviewFilter>;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'cancel'): void;
}>();

const queryClient = useQueryClient();

const pagination = computed(() => props.pagination);
const filter = computed(() => props.filter);

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
			id: props.data?.id || '',
			data: payload,
		},
		{
			onSuccess: () => {
				emits('cancel');

				queryClient.invalidateQueries({
					queryKey: [applicantKey.feedback, props.data?.id || ''],
				});

				queryClient.invalidateQueries({
					queryKey: [applicantKey.base, filter.value.stage, pagination, filter],
				});
			},
		},
	);
});

const handleCancel = () => emits('cancel');
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<Title class="text-[28px] text-black">Candidate evaluation</Title>
		<form id="form" @submit="onSubmit">
			<SheetHeader>
				<SheetTitle></SheetTitle>
				<SheetDescription> </SheetDescription>
			</SheetHeader>

			<div class="grid grid-cols-2 gap-6">
				<FormInput
					name="score"
					type="number"
					label="Score"
					:required="true"
					:icon="Chart2"
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
					class="rounded-2xl h-[200px]"
					placeholder="Enter strengths" />
				<FormMarkdown
					name="weaknesses"
					label="Weaknesses"
					:required="true"
					class="rounded-2xl h-[200px]"
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
	<SheetFooter>
		<Button variant="outline" class="rounded-2xl h-auto py-3 px-6" @click="handleCancel">
			Cancel
		</Button>
		<CallApiButton
			:is-loading="isCreating"
			form="form"
			class="rounded-2xl h-auto py-3 px-5 bg-blue-500 hover:bg-blue-600">
			Create
		</CallApiButton>
	</SheetFooter>
</template>
