<script lang="ts" setup>
import Right from '@/assets/icons/Outline/AltArrowRight.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart2.svg';
import ChartSqare from '@/assets/icons/Outline/ChartSquare.svg';
import CheckList from '@/assets/icons/Outline/ChecklistMinimalistic.svg';
import Clipboard from '@/assets/icons/Outline/ClipboardList.svg';
import CupStar from '@/assets/icons/Outline/CupStar.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import Ranking from '@/assets/icons/Outline/Ranking.svg';
import SqureAcademic from '@/assets/icons/Outline/SquareAcademicCap2.svg';
import UserCircle from '@/assets/icons/Outline/UserCircle.svg';
import UserHand from '@/assets/icons/Outline/UserHands.svg';
import UserGroup from '@/assets/icons/Outline/UsersGroupTwoRounded.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import { useGetApplicantsByJobId } from '@/composables/recruitment/applicant/useApplicant';
import { JOB_STATUS_STYLE } from '@/constants';
import { formatISOStringToLocalDateTime, formatStatus, parseGender } from '@/lib/utils';
import type { IApplicant, IJob } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
	data?: IJob;
}>();

const emit = defineEmits<{
	(e: 'openAlert', payload: any): void;
	(e: 'edit'): void;
	(e: 'viewCandidate', payload: IApplicant): void;
}>();

const jobId = computed(() => props.data?.id);

const { data: applicants } = useGetApplicantsByJobId(jobId);

const openAlert = () => {
	emit('openAlert', undefined);
};

const onEdit = () => {
	emit('edit');
};

const handleViewCandidate = (payload: IApplicant) => {
	emit('viewCandidate', payload);
};
</script>
<template>
	<ScrollArea class="text-sm flex-1 pr-3">
		<SheetTitle class="text-[28px] font-semibold mt-2">{{ data?.title }}</SheetTitle>
		<SheetDescription> </SheetDescription>

		<div class="grid grid-cols-2 gap-4 text-sm mt-8">
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="ChartSqare" />
					<span>Status</span>
				</div>
				<div class="my-[2px]">
					<StatusTag
						:status="data?.status || ''"
						:class="JOB_STATUS_STYLE[data?.status || '']" />
				</div>
			</div>

			<InformationItem :icon="Building3" label="Branch" :value="data?.branch.name || ''" />
			<InformationItem
				:icon="Building"
				label="Department"
				:value="data?.department.name || ''" />
			<InformationItem
				:icon="UserCircle"
				label="Position"
				:value="data?.position.name || ''" />
			<InformationItem
				:icon="Chart2"
				label="Level"
				:value="formatStatus(data?.level as string)" />
			<InformationItem
				:icon="Case"
				label="Employment type"
				:value="formatStatus((data?.employment_type as string) || '')" />
			<InformationItem
				:icon="CheckList"
				label="Quantity"
				:value="data?.quantity ? String(data.quantity) : ''" />
			<InformationItem
				:icon="Calendar"
				label="Due date"
				:value="formatISOStringToLocalDateTime(data?.due_date)?.date || ''" />
			<InformationItem
				:icon="SqureAcademic"
				label="Education level"
				:value="data?.education_level || 'Not required'" />
			<InformationItem
				:icon="Ranking"
				label="Work experience"
				:value="data?.work_experience || 'Not required'" />
			<InformationItem
				:icon="UserHand"
				label="Gender"
				:value="
					parseGender(data?.gender) === '' ? 'Not required' : parseGender(data?.gender)
				" />
		</div>

		<div class="mt-8">
			<h3 class="flex gap-2"><IconFromSvg :icon="Clipboard" />Job description</h3>
			<p class="mt-2 text-black">
				{{ data?.description }}
			</p>
		</div>

		<div class="mt-8">
			<h3 class="text-sm flex gap-2"><IconFromSvg :icon="CupStar" />Skill required</h3>
			<ul class="list-disc pl-6 mt-2 text-black">
				<li>Understanding of color theory and typography</li>
				<li>Basic knowledge of HTML and CSS</li>
				<li>Ability to create wireframes and prototypes</li>
				<li>Strong communication and collaboration skills</li>
				<li>Proficiency in design software like Adobe XD and Figma</li>
			</ul>
		</div>

		<div class="mt-8">
			<h3 class="flex gap-2"><IconFromSvg :icon="UserGroup" />Candidates</h3>
			<div class="grid grid-cols-2 gap-4 mt-2">
				<Button
					v-for="item in applicants?.slice(0, 6)"
					:key="item.id"
					variant="outline"
					class="flex gap-2 items-center justify-start p-4 rounded-2xl h-auto w-full"
					@click="handleViewCandidate(item)">
					<UserAvatar class="w-[44px] h-[44px]" />
					<div class="flex-1 flex flex-col items-start">
						<p class="text-base font-medium text-black">
							{{ item.candidate.full_name }}
						</p>
						<span class="text-sm text-slate-600">{{ item.candidate.email }}</span>
					</div>
					<IconFromSvg :icon="Right" />
				</Button>
			</div>
		</div>
	</ScrollArea>
	<div class="flex justify-end gap-2">
		<Button
			v-if="data?.status === 'DRAFT'"
			class="rounded-2xl h-auto px-7 py-3.5 text-blue-500 bg-blue-50 hover:bg-blue-100"
			@click="onEdit">
			<IconFromSvg :icon="Pen2" />
			Edit
		</Button>
		<!-- <Button
			class="rounded-2xl h-auto px-5 py-3.5 text-red-500 bg-red-50 hover:bg-red-100"
			@click="openAlert">
			<IconFromSvg :icon="Trash" />
			Delete
		</Button> -->
	</div>
</template>
