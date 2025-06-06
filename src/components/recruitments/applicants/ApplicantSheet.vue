<script setup lang="ts">
import UserRoundedBold from '@/assets/icons/Bold/User Rounded.svg';
import UserSpeakBold from '@/assets/icons/Bold/User Speak.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import ChatLine from '@/assets/icons/Outline/Chat Line.svg';
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
import UserRounded from '@/assets/icons/Outline/User Rounded.svg';
import UserSpeak from '@/assets/icons/Outline/User Speak.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import Button from '@/components/ui/button/Button.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import Separator from '@/components/ui/separator/Separator.vue';
import { Sheet } from '@/components/ui/sheet';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetFooter from '@/components/ui/sheet/SheetFooter.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetApplicantById } from '@/composables/recruitment/applicant/useApplicant';
import { APPLICANT_STAGE_STYLE } from '@/constants';
import { computed, ref, watch } from 'vue';
import InterviewInformationTab from './sheet/interview-tab/InterviewInformationTab.vue';
import CallApiButton from '@/components/common/CallApiButton.vue';
import type { IApplicantInterview } from '@/types';
import { formatISOStringToLocalDateTime } from '@/lib/utils';

const props = defineProps<{
	open: boolean;
	applicantId?: string;
	applicantInterview?: IApplicantInterview;
	isView?: boolean;
	isCreateSchedule?: boolean;
	isCompleting?: boolean;
	isHiring?: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'offer'): void;
	(e: 'cancel', payload: { data: IApplicantInterview; action: 'cancel' | 'reject' }): void;
	(e: 'reject', payload: { data: IApplicantInterview; action: 'cancel' | 'reject' }): void;
	(e: 'complete'): void;
}>();

const activeTab = ref('general');
const view = ref(true);
const id = computed(() => props.applicantId);

const { data: applicant } = useGetApplicantById(id);

const handleOpen = (isOpen: boolean) => {
	activeTab.value = 'general';
	emits('update:open', isOpen);
};

const handleCancel = () => {
	emits('cancel', { data: props.applicantInterview as IApplicantInterview, action: 'cancel' });
};
const handleReject = () => {
	emits('reject', { data: props.applicantInterview as IApplicantInterview, action: 'reject' });
};

watch(
	() => props.isView,
	(newVal) => {
		view.value = newVal !== undefined ? newVal : true;
	},
);

watch(
	() => props.isCreateSchedule,
	() => {
		if (props.isCreateSchedule) activeTab.value = 'interview';
	},
);
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<SheetHeader>
				<div class="flex gap-8 items-center">
					<UserAvatar class="w-36 h-36" />
					<div class="flex flex-col gap-2">
						<SheetTitle class="text-[28px] font-semibold flex items-center gap-2"
							>{{ applicant?.candidate.full_name }}
							<StatusTag
								:class="APPLICANT_STAGE_STYLE[applicant?.current_stage || '']"
								:status="applicant?.current_stage || ''"
						/></SheetTitle>
						<SheetDescription class="text-base font-medium text-black">
							{{ applicant?.job.title }}
						</SheetDescription>
						<div class="flex items-center gap-2 text-sm">
							<IconFromSvg :icon="Iphone" /><span>{{
								applicant?.candidate.phone_number
							}}</span>
						</div>
						<div class="flex items-center gap-2 text-sm">
							<IconFromSvg :icon="Letter" /><span>{{
								applicant?.candidate.email
							}}</span>
						</div>
					</div>
				</div>
			</SheetHeader>

			<Tabs v-model="activeTab">
				<TabsList v-if="applicant?.current_stage !== 'APPLIED'" class="rounded-2xl p-0.5">
					<TabsTrigger
						class="rounded-2xl px-4 py-2 w-40 data-[state=active]:text-blue-500"
						value="general">
						<div class="flex items-center gap-2">
							<IconFromSvg v-if="activeTab === 'general'" :icon="UserRoundedBold" />
							<IconFromSvg v-else :icon="UserRounded" /> General
						</div>
					</TabsTrigger>
					<TabsTrigger
						class="rounded-2xl px-4 py-2 w-40 data-[state=active]:text-blue-500"
						value="interview">
						<div class="flex items-center gap-2">
							<IconFromSvg v-if="activeTab === 'interview'" :icon="UserSpeakBold" />
							<IconFromSvg v-else :icon="UserSpeak" /> Interview
						</div>
					</TabsTrigger>
				</TabsList>

				<div>
					<TabsContent value="general" class="h-full flex flex-col gap-2">
						<ScrollArea class="h-[calc(100vh-400px)] pr-3">
							<h3 class="text-base text-black font-semibold mb-4">
								General information
							</h3>
							<div class="grid grid-cols-2 text-sm gap-4">
								<InformationItem
									:icon="Calendar"
									label="Date of birth"
									:value="applicant?.candidate.date_of_birth" />
								<InformationItem
									:icon="User"
									label="Gender"
									:value="applicant?.candidate.gender" />
								<InformationItem
									:icon="SquareAcademic"
									label="Education level"
									:value="applicant?.candidate.education?.major" />
							</div>

							<Separator class="my-4" />
							<h3 class="text-base text-black font-semibold mb-4">
								Application details
							</h3>
							<div class="grid grid-cols-2 text-sm gap-4">
								<InformationItem :icon="Ranking" label="Work experience" />
								<InformationItem :icon="Dollar" label="Expected salary" />
								<div class="grid grid-cols-2 items-start">
									<div class="flex gap-2 items-center py-1.5">
										<IconFromSvg :icon="FileText" />
										<span>CV</span>
									</div>
									<div class="flex flex-col gap-1">
										<a
											v-if="applicant?.resume_url !== 'REFER'"
											:href="applicant?.resume_url"
											target="_blank"
											class="flex gap-2 items-center bg-blue-50 text-blue-500 justify-center w-fit p-1.5 rounded-2xl text-xs"
											><IconFromSvg :icon="File" class="!w-4 !h-4" />CV</a
										>
									</div>
								</div>
							</div>
							<div v-if="applicant?.cover_letter" class="mt-8">
								<div class="flex items-center gap-2 text-sm">
									<IconFromSvg :icon="LetterOpen" /><span>Cover letter</span>
								</div>
								<div class="p-4 rounded-2xl border mt-4">
									<p class="text-sm text-black">
										{{ applicant.cover_letter }}
									</p>
								</div>
							</div>

							<div v-if="applicant?.notes && applicant?.notes !== ''" class="mt-4">
								<div class="flex items-center gap-2 text-sm">
									<IconFromSvg :icon="ChatLine" /><span>Note</span>
								</div>
								<div class="mt-4 p-4 border rounded-2xl">
									<div class="flex gap-2 items-center">
										<UserAvatar class="w-[44px] h-[44px]" />
										<div>
											<p class="text-black text-base font-medium">
												{{ applicant?.created_by_user?.name }}
											</p>
											<span class="text-xs">{{
												formatISOStringToLocalDateTime(
													applicant?.created_at,
												).date
											}}</span>
										</div>
									</div>
									<p class="text-sm mt-2 text-black">
										{{ applicant?.notes }}
									</p>
								</div>
							</div>

							<!-- <Separator class="my-8" />
							<h3 class="text-base text-black font-semibold mb-4">Hiring stages</h3>
							<div class="mt-4 text-sm">
								<div class="relative z-10 pb-8">
									<div
										class="absolute bg-slate-100 h-full w-[3px] top-3 left-2.5 z-0"></div>
									<div class="flex gap-2 items-center">
										<div
											class="w-6 h-6 rounded-full bg-slate-300 border-[6px] border-slate-100 self-start relative z-10"></div>
										<div class="flex-1">
											<p class="font-medium text-base text-black">
												Screening
											</p>
											<span class="text-xs">February 20, 2025</span>
										</div>
										<StatusTag status="Passed" />
									</div>
									<div class="ml-8 mt-4 border rounded-2xl p-4">
										<div class="flex gap-2 items-center">
											<UserAvatar class="w-[44px] h-[44px]" />
											<div>
												<h4 class="text-base font-medium text-black">
													Le Thi Linh Ly
												</h4>
												<span class="text-xs">March 5, 2025</span>
											</div>
										</div>
										<p class="text-black mt-4">
											Their varied portfolio showcases creativity and
											proficiency in Adobe Illustrator and Photoshop, making
											them a great fit for our internship.
										</p>
									</div>
								</div>
								<div class="relative z-10">
									<div class="flex gap-2 items-center">
										<div
											class="w-6 h-6 rounded-full bg-slate-300 border-[6px] border-slate-100 self-start relative z-10"></div>
										<div class="flex-1">
											<p class="font-medium text-base text-black">
												1st Interview
											</p>
											<span class="text-xs">February 20, 2025</span>
										</div>
										<StatusTag status="Failed" />
									</div>
									<div class="ml-8 mt-4 border rounded-2xl p-4">
										<div class="flex gap-2 items-center">
											<UserAvatar class="w-[44px] h-[44px]" />
											<div>
												<h4 class="text-base font-medium text-black">
													Le Thi Linh Ly
												</h4>
												<span class="text-xs">February 25, 2025</span>
											</div>
										</div>
										<p class="text-black mt-4">
											Their varied portfolio showcases creativity and
											proficiency in Adobe Illustrator and Photoshop, making
											them a great fit for our internship.
										</p>
									</div>
								</div>
							</div> -->
						</ScrollArea>
						<SheetFooter>
							<!-- <Button
								variant="outline"
								class="font-medium px-8 py-[13px] h-auto rounded-2xl hover:text-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-100 border-none">
								<IconFromSvg :icon="Pen2" />Edit
							</Button>
							<Button
								class="font-medium px-8 py-[13px] h-auto rounded-2xl bg-red-50 text-red-500 hover:bg-red-100">
								<IconFromSvg :icon="Trash" />Delete
							</Button> -->
						</SheetFooter>
					</TabsContent>
					<TabsContent value="interview">
						<InterviewInformationTab
							:data="applicant"
							:view="!isCreateSchedule"
							@close-sheet="emits('update:open', false)"
							:stage="applicant?.current_stage" />
					</TabsContent>
				</div>
			</Tabs>
			<SheetFooter v-if="applicantInterview">
				<Button
					v-if="applicantInterview?.status === 'SCHEDULED'"
					class="font-medium px-8 py-[13px] h-auto rounded-2xl bg-red-50 text-red-500 hover:bg-red-100"
					@click="handleCancel">
					Cancel
				</Button>
				<CallApiButton
					v-if="applicantInterview?.status === 'SCHEDULED'"
					:is-loading="isCompleting"
					class="font-medium px-8 py-[13px] h-auto rounded-2xl hover:text-green-500 bg-green-50 text-green-500 hover:bg-green-100"
					@click="emits('complete')">
					Complete
				</CallApiButton>
				<Button
					v-if="
						applicantInterview?.status === 'CANCELED' ||
						applicantInterview?.status === 'COMPLETED'
					"
					class="font-medium px-8 py-[13px] h-auto rounded-2xl bg-red-50 text-red-500 hover:bg-red-100"
					@click="handleReject">
					Reject
				</Button>
				<CallApiButton
					v-if="applicantInterview?.status === 'COMPLETED'"
					:is-loading="isHiring"
					class="font-medium px-8 py-[13px] h-auto rounded-2xl hover:text-green-500 bg-green-50 text-green-500 hover:bg-green-100"
					@click="emits('offer')">
					Offer
				</CallApiButton>
			</SheetFooter>
		</SheetContentCustom>
	</Sheet>
</template>
