<script setup lang="ts">
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import CaseRound from '@/assets/icons/Outline/Case Round Minimalistic.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import ChatLine from '@/assets/icons/Outline/Chat Line.svg';
import CheckList from '@/assets/icons/Outline/Checklist Minimalistic.svg';
import Clipboard from '@/assets/icons/Outline/Clipboard List.svg';
import CupStar from '@/assets/icons/Outline/Cup Star.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';
import User from '@/assets/icons/Outline/User.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import { Button } from '@/components/ui/button';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import {
	Sheet,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { RECRUITMENT_REQUEST_STATUS_STYLE } from '@/constants';
import { formatISOStringToLocalDateTime } from '@/lib/utils';
import type { IRecruitmentRequest } from '@/types';

defineProps<{
	open: boolean;
	data?: IRecruitmentRequest;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'openDialog', payload: boolean): void;
}>();

const handleOpen = (isOpen: boolean) => {
	emit('update:open', isOpen);
};

const handleReject = () => {
	emit('openDialog', true);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[660px] p-8 flex flex-col text-slate-600">
			<SheetHeader>
				<SheetTitle class="text-[28px] font-semibold">{{ data?.title || '' }}</SheetTitle>
				<SheetDescription> </SheetDescription>
			</SheetHeader>
			<ScrollArea class="flex-1 text-sm pr-3">
				<div class="flex flex-col gap-4">
					<div class="grid grid-cols-3 gap-6 py-[3px]">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="ChartSqare" />
							Status
						</div>
						<div class="col-span-2">
							<StatusTag
								:class="RECRUITMENT_REQUEST_STATUS_STYLE[data?.status || '']"
								:status="data?.status || ''" />
						</div>
					</div>
					<div
						v-if="data?.cancelled_reason"
						class="grid grid-cols-3 gap-6 py-[3px] items-start">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="ChatLine" />
							Reason for rejection
						</div>
						<div class="col-span-2 text-black">
							{{ data.cancelled_reason }}
						</div>
					</div>
					<div class="grid grid-cols-3 gap-6">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="User" />
							Request from
						</div>
						<div class="flex gap-2 items-center col-span-2 text-black">
							<UserAvatar class="w-8 h-8" />
							{{ data?.cancelled_by }}
						</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Building3" />
							Branch
						</div>
						<div class="col-span-2 text-black">{{ data?.branch_name }}</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Building" />
							Department
						</div>
						<div class="col-span-2 text-black">{{ data?.department.name }}</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="UserCircle" />
							Role
						</div>
						<div class="col-span-2 text-black">{{ data?.title }}</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Chart2" />
							Level
						</div>
						<div class="col-span-2 text-black">{{ data?.level }}</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Case" />
							Employment type
						</div>
						<div class="col-span-2 text-black">Fultime</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="CheckList" />
							Quantity
						</div>
						<div class="col-span-2 text-black">{{ data?.quantity }}</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Calendar" />
							Expected date
						</div>
						<div class="col-span-2 text-black">
							{{ formatISOStringToLocalDateTime(data?.expected_start_date).date }}
						</div>
					</div>
				</div>
				<div class="mt-4">
					<h3 class="flex gap-2 items-center">
						<IconFromSvg :icon="Clipboard" />Job Description
					</h3>
					<p class="mt-2 text-sm text-black">
						{{ data?.description }}
					</p>
				</div>
				<div class="mt-4">
					<h3 class="flex gap-2 items-center">
						<IconFromSvg :icon="CupStar" />Skill required
					</h3>
					<div class="mt-2 flex flex-wrap gap-2">
						<Badge
							v-for="(item, index) in data?.skills_required"
							:key="index"
							class="text-xs font-normal text-blue-500 bg-blue-50 hover:bg-blue-50 py-1.5 px-2.5">
							{{ item }}
						</Badge>
					</div>
				</div>
			</ScrollArea>

			<SheetFooter v-if="data?.status === 'Approved'">
				<Button class="rounded-2xl h-auto py-3.5 px-6 bg-blue-500 hover:bg-blue-600"
					><IconFromSvg :icon="CaseRound" />Create new job</Button
				>
			</SheetFooter>
			<SheetFooter v-if="data?.status === 'To-do'">
				<Button
					variant="outline"
					class="font-medium px-8 py-[13px] h-auto rounded-2xl"
					@click="handleReject"
					>Reject
				</Button>
				<Button
					class="font-medium px-8 py-[13px] h-auto rounded-2xl bg-blue-500 text-white hover:bg-blue-600">
					Approve
				</Button>
			</SheetFooter>
		</SheetContentCustom>
	</Sheet>
</template>
