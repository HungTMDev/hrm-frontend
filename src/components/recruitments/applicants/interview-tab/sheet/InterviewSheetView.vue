<script lang="ts" setup>
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Close from '@/assets/icons/Outline/Close.svg';
import AddCircle from '@/assets/icons/Outline/Add Circle.svg';
import ChatLine from '@/assets/icons/Outline/Chat Line.svg';
import ClockCircle from '@/assets/icons/Outline/Clock Circle.svg';
import Dollar from '@/assets/icons/Outline/Dollar Minimalistic.svg';
import FileText from '@/assets/icons/Outline/File Text.svg';
import File from '@/assets/icons/Outline/File.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import LetterOpen from '@/assets/icons/Outline/Letter Opened.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Ranking from '@/assets/icons/Outline/Ranking.svg';
import SquareAcademic from '@/assets/icons/Outline/Square Academic Cap.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Trash.svg';
import User from '@/assets/icons/Outline/User Hand Up.svg';
import UserSpeak from '@/assets/icons/Outline/User Speak.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import Button from '@/components/ui/button/Button.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import Separator from '@/components/ui/separator/Separator.vue';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetFooter from '@/components/ui/sheet/SheetFooter.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import { INTERVIEW_STATUS_STYLE } from '@/constants';
import { formatISOStringToLocalDateTime } from '@/lib/utils';
import type { IApplicantInterview, IApplicantInterviewFilter } from '@/types';
import type { PaginationState } from '@tanstack/vue-table';
import { computed, ref } from 'vue';
import {
	useAddParticipant,
	useRemoveParticipant,
} from '@/composables/recruitment/applicant/useUpdateApplicant';
import AddInterviewerDialog from '../AddInterviewerDialog.vue';
import type { AddInterviewerPayload } from '../schema';

const props = defineProps<{
	data?: IApplicantInterview;
	pagination: PaginationState;
	filter: Partial<IApplicantInterviewFilter>;
}>();

const emits = defineEmits<{
	(e: 'edit'): void;
	(e: 'openDialog'): void;
	(e: 'sendEmail'): void;
	(e: 'edit'): void;
}>();

const isOpenDialog = ref(false);

const applicantInterview = computed(() => props.data);
const id = computed(() => props.data?.id);
const filter = computed(() => props.filter);
const pagination = computed(() => props.pagination);

const { mutate: addParticipant } = useAddParticipant(id, pagination, filter);
const { mutate: removeParticipant } = useRemoveParticipant(id, pagination, filter);

const handleEdit = () => {
	emits('edit');
};

const handleOpenDialog = () => {
	isOpenDialog.value = true;
};

const handleCloseDialog = (open: boolean) => {
	isOpenDialog.value = open;
};

const handleRemoveInterviewer = (participant_id: string) => {
	removeParticipant({ interview_id: applicantInterview.value?.id || '', participant_id });
};

const handleAddInterviewer = (payload: AddInterviewerPayload) => {
	addParticipant(
		{ interview_id: applicantInterview.value?.id || '', ...payload },
		{
			onSuccess: () => {
				isOpenDialog.value = false;
			},
		},
	);
};
</script>
<template>
	<SheetHeader>
		<div class="flex gap-8 items-center">
			<UserAvatar class="w-36 h-36" />
			<div class="flex flex-col gap-2">
				<SheetTitle class="text-[28px] font-semibold flex items-center gap-2"
					>{{ applicantInterview?.candidate.full_name }}
					<StatusTag
						:class="INTERVIEW_STATUS_STYLE[applicantInterview?.status || '']"
						:status="applicantInterview?.status || ''"
				/></SheetTitle>
				<SheetDescription class="text-base font-medium text-black"> </SheetDescription>
				<div class="flex items-center gap-2 text-sm">
					<IconFromSvg :icon="Iphone" /><span>{{
						applicantInterview?.candidate.phone_number
					}}</span>
				</div>
				<div class="flex items-center gap-2 text-sm">
					<IconFromSvg :icon="Letter" /><span>{{
						applicantInterview?.candidate.email
					}}</span>
				</div>
			</div>
		</div>
	</SheetHeader>
	<ScrollArea class="flex-1 pr-3">
		<div class="flex items-center justify-between">
			<h3 class="text-base text-black font-semibold">Interview</h3>
			<Button variant="outline" class="rounded-2xl" @click="">
				<IconFromSvg :icon="Pen2" />Edit
			</Button>
		</div>
		<div class="mt-4">
			<h4 class="text-sm text-black font-medium">Interview 1</h4>
			<div class="grid grid-cols-2 text-sm gap-4 mt-4">
				<InformationItem
					:icon="Calendar"
					label="interview date"
					:value="
						formatISOStringToLocalDateTime(applicantInterview?.scheduled_time).date
					" />
				<InformationItem
					:icon="ClockCircle"
					label="Interview time"
					:value="
						formatISOStringToLocalDateTime(applicantInterview?.scheduled_time).time
					" />
				<div class="grid grid-cols-2 items-start">
					<div class="flex gap-2 items-center py-1.5">
						<IconFromSvg :icon="UserSpeak" />
						<span>Interviewer</span>
					</div>
					<div class="flex flex-col gap-1 text-black">
						<div
							v-for="(item, index) in applicantInterview?.participants ?? []"
							:key="index"
							class="flex items-center pt-1.5">
							<p class="flex-1 truncate">
								{{ item.name }}
							</p>
							<Button
								variant="outline"
								class="p-0 h-auto text-red-500 hover:text-red-600"
								@click="handleRemoveInterviewer(item.id)"
								><IconFromSvg :icon="Close"
							/></Button>
						</div>
						<Button
							variant="outline"
							class="h-auto py-1 rounded-xl mt-2 text-sm"
							@click="handleOpenDialog">
							<IconFromSvg :icon="AddCircle" class="!w-4 !h-4" /> Add interviewer
						</Button>
					</div>
				</div>
			</div>
		</div>
		<Separator class="my-4" />
		<h3 class="text-base text-black font-semibold mb-4">General information</h3>
		<div class="grid grid-cols-2 text-sm gap-4">
			<InformationItem
				:icon="Calendar"
				label="Date of birth"
				:value="
					applicantInterview?.candidate.date_of_birth
						? formatISOStringToLocalDateTime(
								applicantInterview?.candidate.date_of_birth,
							).date
						: ''
				" />
			<InformationItem
				:icon="User"
				label="Gender"
				:value="applicantInterview?.candidate.gender || ''" />
			<InformationItem
				:icon="SquareAcademic"
				label="Education level"
				:value="applicantInterview?.candidate.education || ''" />
		</div>

		<Separator class="my-4" />
		<h3 class="text-base text-black font-semibold mb-4">Application details</h3>
		<div class="grid grid-cols-2 text-sm gap-4">
			<InformationItem :icon="Ranking" label="Work experience" value="Less than 1 year" />
			<InformationItem :icon="Dollar" label="Expected salary" value="đ15,000,000" />
			<div class="grid grid-cols-2 items-start">
				<div class="flex gap-2 items-center py-1.5">
					<IconFromSvg :icon="FileText" />
					<span>CV</span>
				</div>
				<div class="flex flex-col gap-1">
					<a
						href="#"
						target="_blank"
						class="flex gap-2 items-center bg-blue-50 text-blue-500 justify-center w-fit p-1.5 rounded-2xl text-xs"
						><IconFromSvg :icon="File" class="!w-4 !h-4" />leminhtam_cv.pdf</a
					>
					<a
						href="#"
						target="_blank"
						class="flex gap-2 items-center bg-blue-50 text-blue-500 justify-center w-fit p-1.5 rounded-2xl text-xs"
						><IconFromSvg :icon="File" class="!w-4 !h-4" />leminhtam_cv.pdf</a
					>
				</div>
			</div>
		</div>
		<div class="mt-8">
			<div class="flex items-center gap-2 text-sm">
				<IconFromSvg :icon="LetterOpen" /><span>Cover letter</span>
			</div>
			<div class="p-4 rounded-2xl border mt-4">
				<p class="text-sm text-black">
					Dear Hiring Manager, <br /><br />
					I am excited to apply for the Junior Data Analyst position at your esteemed
					company. With a strong foundation in data analysis and a passion for uncovering
					insights, I am eager to contribute to your team. My recent internship allowed me
					to develop skills in data visualization and statistical analysis, using tools
					like Excel and Tableau. I am particularly drawn to your company’s commitment to
					innovation and data-driven decision-making. <br /><br />Thank you for
					considering my application. I look forward to the opportunity to discuss how I
					can add value to your team.<br /><br />
					Best regards,<br /><br />
					Lê Minh Tâm
				</p>
			</div>
		</div>

		<div class="mt-4">
			<div class="flex items-center gap-2 text-sm">
				<IconFromSvg :icon="ChatLine" /><span>Preliminary assessment</span>
			</div>
			<div class="mt-4 p-4 border rounded-2xl">
				<div class="flex gap-2 items-center">
					<UserAvatar class="w-[44px] h-[44px]" />
					<div>
						<p class="text-black text-base font-medium">Le Thi Linh Ly</p>
						<span class="text-xs">March 5, 2025</span>
					</div>
				</div>
				<p class="text-sm mt-2 text-black">
					The candidate demonstrates a strong understanding of data analysis techniques
					and tools, showcasing proficiency in SQL and Python. Their previous experience
					in data-driven decision-making aligns well with our needs. Additionally, their
					ability to communicate complex data insights clearly is a valuable asset.
					Overall, they appear to be a promising fit for the Data Analyst role.
				</p>
			</div>
		</div>

		<Separator class="my-8" />
		<h3 class="text-base text-black font-semibold mb-4">Hiring stages</h3>
		<div class="mt-4 text-sm">
			<div class="relative z-10 pb-8">
				<div class="absolute bg-slate-100 h-full w-[3px] top-3 left-2.5 z-0"></div>
				<div class="flex gap-2 items-center">
					<div
						class="w-6 h-6 rounded-full bg-slate-300 border-[6px] border-slate-100 self-start relative z-10"></div>
					<div class="flex-1">
						<p class="font-medium text-base text-black">Screening</p>
						<span class="text-xs">February 20, 2025</span>
					</div>
					<StatusTag status="Passed" />
				</div>
				<div class="ml-8 mt-4 border rounded-2xl p-4">
					<div class="flex gap-2 items-center">
						<UserAvatar class="w-[44px] h-[44px]" />
						<div>
							<h4 class="text-base font-medium text-black">Le Thi Linh Ly</h4>
							<span class="text-xs">March 5, 2025</span>
						</div>
					</div>
					<p class="text-black mt-4">
						Their varied portfolio showcases creativity and proficiency in Adobe
						Illustrator and Photoshop, making them a great fit for our internship.
					</p>
				</div>
			</div>
			<div class="relative z-10">
				<div class="flex gap-2 items-center">
					<div
						class="w-6 h-6 rounded-full bg-slate-300 border-[6px] border-slate-100 self-start relative z-10"></div>
					<div class="flex-1">
						<p class="font-medium text-base text-black">1st Interview</p>
						<span class="text-xs">February 20, 2025</span>
					</div>
					<StatusTag status="Failed" />
				</div>
				<div class="ml-8 mt-4 border rounded-2xl p-4">
					<div class="flex gap-2 items-center">
						<UserAvatar class="w-[44px] h-[44px]" />
						<div>
							<h4 class="text-base font-medium text-black">Le Thi Linh Ly</h4>
							<span class="text-xs">February 25, 2025</span>
						</div>
					</div>
					<p class="text-black mt-4">
						Their varied portfolio showcases creativity and proficiency in Adobe
						Illustrator and Photoshop, making them a great fit for our internship.
					</p>
				</div>
			</div>
		</div>
	</ScrollArea>

	<SheetFooter>
		<Button
			variant="outline"
			class="font-medium px-8 py-[13px] h-auto rounded-2xl hover:text-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-100 border-none"
			@click="handleEdit">
			<IconFromSvg :icon="Pen2" />Edit
		</Button>
		<Button
			class="font-medium px-8 py-[13px] h-auto rounded-2xl bg-red-50 text-red-500 hover:bg-red-100">
			<IconFromSvg :icon="Trash" />Delete
		</Button>
	</SheetFooter>
	<AddInterviewerDialog
		:open="isOpenDialog"
		@update:open="handleCloseDialog"
		@submit="handleAddInterviewer" />
</template>
