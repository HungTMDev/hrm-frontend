<script lang="ts" setup>
import AddCircle from '@/assets/icons/Outline/Add Circle.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import ClockCircle from '@/assets/icons/Outline/Clock Circle.svg';
import Close from '@/assets/icons/Outline/Close.svg';
import UserSpeak from '@/assets/icons/Outline/User Speak.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Button from '@/components/ui/button/Button.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import Separator from '@/components/ui/separator/Separator.vue';
import { applicantKey } from '@/composables/recruitment/applicant/key';
import {
	useGetInterviewByApplicantId,
	useGetListFeedback,
} from '@/composables/recruitment/applicant/useApplicant';
import {
	useAddParticipant,
	useRemoveParticipant,
} from '@/composables/recruitment/applicant/useUpdateApplicant';
import { INTERVIEW_STATUS_STYLE } from '@/constants';
import { useCustomToast } from '@/lib/customToast';
import { cn, formatISOStringToLocalDateTime, formatStatus } from '@/lib/utils';
import type { IApplicant, IUser } from '@/types';
import { useQueryClient } from '@tanstack/vue-query';
import { computed, onMounted, ref } from 'vue';
import AddInterviewerDialog from '../../interview-tab/AddInterviewerDialog.vue';
import type { AddInterviewerPayload } from '../../interview-tab/schema';
import CreateFeedbackForm from './CreateFeedbackForm.vue';
import MeetingScheduleForm from './MeetingScheduleForm.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';

const props = defineProps<{
	data?: IApplicant;
	stage?: string;
	view?: boolean;
}>();

const emits = defineEmits<{
	(e: 'closeSheet'): void;
}>();

const queryClient = useQueryClient();
const { showToast } = useCustomToast();

const id = computed(() => props.data?.id);
const isOpenDialog = ref(false);
const isOpenAlert = ref(false);
const isView = ref(true);
const isCreateFeedback = ref(false);
const selectedInterviewId = ref<string>();
const selectedParticipant = ref<IUser>();
const interviewId = ref<string>();

const { data: interviews } = useGetInterviewByApplicantId(id);

const listInterview = computed(() => interviews.value ?? []);
const listFeedbackResponse = useGetListFeedback(listInterview);

const listFeedback = computed(() => listFeedbackResponse.value.map((item) => item.data));

const isShowMeetingSchedule = computed(() => {
	if (props.stage === 'SCREENING') {
		return true;
	}

	if (props.stage === 'INTERVIEW_1' || props.stage === 'INTERVIEW_2') {
		return (
			listInterview.value.some((item) => item.status === 'COMPLETED') ||
			listInterview.value.every((item) => item.status === 'CANCELED')
		);
	}

	return false;
});

const { mutate: removeParticipant } = useRemoveParticipant();
const { mutate: addParticipant } = useAddParticipant();

const handleRemoveInterviewer = (interview_id: string, participant: IUser) => {
	isOpenAlert.value = true;
	selectedInterviewId.value = interview_id;
	selectedParticipant.value = participant;
};

const handleDeleteParticipant = () => {
	removeParticipant(
		{
			interview_id: selectedInterviewId.value || '',
			participant_id: selectedParticipant.value?.id || '',
		},
		{
			onSuccess: () => {
				isOpenAlert.value = false;
				queryClient.invalidateQueries({
					queryKey: [applicantKey.interview, id],
				});
				showToast({
					message: 'Success!',
					type: 'success',
				});
			},
		},
	);
};

const handleAddInterviewer = (payload: AddInterviewerPayload) => {
	addParticipant(
		{ interview_id: selectedInterviewId.value || '', ...payload },
		{
			onSuccess: () => {
				isOpenDialog.value = false;
				showToast({
					message: 'Success!',
					type: 'success',
				});
				queryClient.invalidateQueries({
					queryKey: [applicantKey.interview, id],
				});
			},
		},
	);
};

const handleOpenDialog = (interview_id: string) => {
	selectedInterviewId.value = interview_id;
	isOpenDialog.value = true;
};

const handleCloseDialog = (open: boolean) => {
	isOpenDialog.value = open;
};

const handleCloseAlert = (open: boolean) => {
	isOpenAlert.value = open;
};

const handleNavigate = () => {
	isView.value = !isView.value;
};

const handleCreateFeedback = (id: string) => {
	interviewId.value = id;
	isCreateFeedback.value = true;
	isView.value = false;
};

const handleCancleCreateFeedback = () => {
	isCreateFeedback.value = false;
	isView.value = true;
};

onMounted(() => {
	isView.value = props.view !== undefined ? props.view : true;
});
</script>
<template>
	<ScrollArea v-if="isView" class="h-[calc(100vh-400px)] pr-3">
		<div class="flex justify-between items-center">
			<h3 class="text-base text-black font-semibold">Interview</h3>
			<Button
				v-if="isShowMeetingSchedule"
				variant="outline"
				class="rounded-2xl"
				@click="handleNavigate">
				<IconFromSvg :icon="Calendar" />Meeting schedule
			</Button>
		</div>

		<div v-if="listInterview.length === 0">
			<Separator class="my-4" />
			<div class="text-center text-sm py-8">No result</div>
			<Separator class="my-4" />
		</div>

		<div v-else v-for="(item, idx) in listInterview" :key="item.id" class="mt-4">
			<div class="flex justify-between items-center">
				<div class="flex items-center gap-3">
					<h4 class="text-sm text-black font-medium">
						{{ formatStatus(item?.stage || '') }}
					</h4>
					<StatusTag
						:status="item?.status"
						:class="cn('w-fit', INTERVIEW_STATUS_STYLE[item?.status || ''])" />
				</div>
				<Button
					v-if="item.status === 'SCHEDULED'"
					variant="outline"
					class="rounded-2xl"
					@click="handleCreateFeedback(item.id)">
					Create feedback
				</Button>
			</div>

			<div class="grid grid-cols-2 text-sm gap-4 mt-4">
				<InformationItem
					:icon="Calendar"
					label="Interview date"
					:value="formatISOStringToLocalDateTime(item?.scheduled_time).date" />
				<InformationItem
					:icon="ClockCircle"
					label="Interview time"
					:value="formatISOStringToLocalDateTime(item?.scheduled_time).time" />
				<div class="grid grid-cols-2 items-start">
					<div class="flex gap-2 items-center py-1.5">
						<IconFromSvg :icon="UserSpeak" />
						<span>Interviewer</span>
					</div>
					<div class="flex flex-col gap-1 text-black">
						<div
							v-for="(i, index) in item?.participants ?? []"
							:key="index"
							class="flex items-center pt-1.5">
							<p class="flex-1 truncate">
								{{ i.name }}
							</p>
							<Button
								variant="outline"
								class="p-0 h-auto text-red-500 hover:text-red-600"
								@click="handleRemoveInterviewer(item.id, i)">
								<IconFromSvg :icon="Close" />
							</Button>
						</div>
						<Button
							variant="outline"
							class="h-auto py-1 rounded-xl mt-2 text-sm"
							@click="handleOpenDialog(item.id)">
							<IconFromSvg :icon="AddCircle" class="!w-4 !h-4" />
							Add interviewer
						</Button>
					</div>
				</div>
			</div>

			<div v-if="listFeedback[idx] && listFeedback[idx].length > 0" class="text-sm">
				<h3 class="text-base text-black font-semibold">Feedback</h3>
				<div class="mt-4 grid gap-4">
					<div
						v-for="(item, index) in listFeedback[idx]"
						:key="index"
						class="border rounded-2xl p-4">
						<div class="flex justify-between items-center">
							<div class="flex gap-2 items-center">
								<UserAvatar class="w-[44px] h-[44px]" />
								<div>
									<h4 class="text-base font-medium text-black">
										{{ item.interviewer.name }}
									</h4>
									<span class="text-xs">{{
										formatISOStringToLocalDateTime(item.submitted_at).date
									}}</span>
								</div>
							</div>
							<div class="text-black">
								<p><span class="text-slate-600">Score:</span> {{ item.score }}</p>
								<p>
									<span class="text-slate-600">Recommend:</span>
									{{ formatStatus(item.recommendation) }}
								</p>
							</div>
						</div>

						<div class="mt-4">
							<h3 class="text-sm text-black font-medium">Strengths</h3>
							<ul class="text-black mt-2 list-disc list-inside ml-2">
								<li v-for="(i, idx) in item.strengths.split('\n')" :key="idx">
									{{ i }}
								</li>
							</ul>
							<Separator class="my-4" />
							<h3 class="text-sm text-black font-medium">Weaknesses</h3>
							<ul class="text-black mt-2 list-disc list-inside ml-2">
								<li v-for="(i, idx) in item.weaknesses.split('\n')" :key="idx">
									{{ i }}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<Separator v-if="idx < listInterview.length - 1" class="my-4" />
		</div>
	</ScrollArea>

	<CreateFeedbackForm
		v-else-if="isCreateFeedback"
		:interview-id="interviewId"
		@cancel="handleCancleCreateFeedback" />

	<MeetingScheduleForm
		v-else
		:applicant="data"
		:list-interview="listInterview"
		@close-sheet="emits('closeSheet')"
		@back="handleNavigate" />

	<AddInterviewerDialog
		:open="isOpenDialog"
		@update:open="handleCloseDialog"
		@submit="handleAddInterviewer" />

	<AlertPopup
		:open="isOpenAlert"
		:description="selectedParticipant?.name"
		title="Are you sure remove?"
		button-label="Remove"
		@update:open="handleCloseAlert"
		@confirm="handleDeleteParticipant" />
</template>
