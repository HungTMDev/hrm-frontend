<script lang="ts" setup>
import StatusTag from '@/components/common/StatusTag.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { REQUEST_STATUS_STYLE } from '@/constants';
import UserId from '@/assets/icons/Outline/UserId.svg';
import CheckCircle from '@/assets/icons/Outline/CheckCircle.svg';
import CloseCircle from '@/assets/icons/Outline/CloseCircle.svg';
import UserGroup from '@/assets/icons/Outline/UsersGroupTwoRounded.svg';
import UserCircle from '@/assets/icons/Outline/UserCircle.svg';
import UserRounded from '@/assets/icons/Outline/UserRounded.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Chart2 from '@/assets/icons/Outline/Chart2.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Clipboard from '@/assets/icons/Outline/ClipboardList.svg';
import SortByTime from '@/assets/icons/Outline/SortByTime.svg';
import StopWatch from '@/assets/icons/Outline/StopwatchPlay.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import ClockCircle from '@/assets/icons/Outline/ClockCircle.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import FileText from '@/assets/icons/Outline/FileText.svg';
import InformationItem from '@/components/common/InformationItem.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Button from '@/components/ui/button/Button.vue';
import type { LeaveRequest } from '@/types/center-request';
import { useGetAccount } from '@/composables/auth/useAuth';
import CallApiButton from '@/components/common/CallApiButton.vue';

const props = defineProps<{
	data?: LeaveRequest;
}>();

const emits = defineEmits<{
	(e: 'edit'): void;
	(e: 'reject'): void;
	(e: 'recall'): void;
}>();

const { data: account } = useGetAccount();

const handleEdit = () => {
	emits('edit');
};
</script>
<template>
	<ScrollArea class="text-sm flex-1 pr-3">
		<SheetHeader class="flex-row items-center gap-4">
			<SheetTitle class="text-black font-semibold text-[28px]">Leave request</SheetTitle>
			<SheetDescription>
				<StatusTag
					:status="data?.status || ''"
					:class="REQUEST_STATUS_STYLE[data?.status || '']" />
			</SheetDescription>
		</SheetHeader>

		<div class="grid grid-cols-2 gap-4 mt-8 gap-x-8 gap-y-6">
			<InformationItem label="Employee ID" :icon="UserId" />
			<InformationItem label="Employee name" :icon="UserRounded" />
			<InformationItem label="Employee email" :icon="Letter" />
			<InformationItem label="Branch" :icon="Building3" />
			<InformationItem label="Department" :icon="Buildings" />
			<InformationItem label="Position" :icon="UserCircle" />
			<InformationItem label="Level" :icon="Chart2" />
			<InformationItem label="Team" :icon="UserGroup" />
		</div>

		<div class="mt-6">
			<div class="flex items-center gap-2">
				<IconFromSvg :icon="Clipboard" />
				Leave reason
			</div>
			<p class="text-black mt-2">
				I am writing to formally request a leave of absence for a duration of two days, as I
				am currently experiencing some health issues that require my attention. I appreciate
				your understanding and support during this time, and I assure you that I will do my
				best to catch up on any missed work upon my return. Thank you for considering my
				request.
			</p>
		</div>

		<div class="grid grid-cols-2 gap-4 mt-8 gap-x-8 gap-y-6">
			<InformationItem label="Leave time type" :icon="SortByTime" />
			<InformationItem label="Leave shift" :icon="StopWatch" />
			<InformationItem label="Leave start time" :icon="ClockCircle" />
			<InformationItem label="Leave end time" :icon="ClockCircle" />
			<InformationItem label="Leave start day" :icon="Calendar" />
			<InformationItem label="Leave end day" :icon="Calendar" />
			<InformationItem label="Day" :icon="Calendar" />
			<InformationItem label="Total leave days" :icon="ClockCircle" />
			<InformationItem label="Attached file" :icon="FileText" />
			<InformationItem label="CC’d" :icon="Letter" :value="['fdsfs', 'sdfdsf']" />
		</div>
	</ScrollArea>
	<div v-if="account?.roles.includes('USER')" class="flex justify-end gap-2 items-center">
		<Button
			v-if="data?.status === 'DRAFT'"
			class="bg-blue-50 hover:bg-blue-50 text-blue-500 h-auto rounded-2xl p-3 px-6"
			@click="handleEdit">
			<IconFromSvg :icon="Pen2" />Edit
		</Button>
		<Button
			v-if="data?.status === 'TO_DO' || data?.status === 'APPROVED'"
			class="h-auto rounded-2xl p-3 px-8 hover:bg-blue-500"
			@click="emits('recall')">
			Recall
		</Button>
		<Button
			v-if="data?.status === 'DRAFT'"
			class="h-auto rounded-2xl p-3 px-8 hover:bg-blue-500"
			>Send</Button
		>
	</div>
	<div
		v-if="account?.roles.some((item) => item === 'ADMIN' || item === 'CEO')"
		class="flex justify-end gap-2">
		<Button
			v-if="data?.status === 'TO_DO' || data?.status === 'CANCELING'"
			class="h-auto p-3 px-6 rounded-2xl bg-red-50 hover:bg-red-50 text-red-500"
			@click="emits('reject')">
			<IconFromSvg :icon="CloseCircle" />Reject
		</Button>
		<CallApiButton
			v-if="data?.status === 'TO_DO' || data?.status === 'CANCELING'"
			class="h-auto p-3 px-6 rounded-2xl bg-green-50 hover:bg-green-50 text-green-500">
			<IconFromSvg :icon="CheckCircle" />Approve
		</CallApiButton>
	</div>
</template>
