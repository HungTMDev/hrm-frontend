<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import ChatLine from '@/assets/icons/Outline/Chat Line.svg';
import CheckList from '@/assets/icons/Outline/Checklist Minimalistic.svg';
import Clipboard from '@/assets/icons/Outline/Clipboard List.svg';
import CupStar from '@/assets/icons/Outline/Cup Star.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';
import User from '@/assets/icons/Outline/User.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import { Button } from '@/components/ui/button';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { RECRUITMENT_REQUEST_STATUS_STYLE } from '@/constants';
import { formatISOStringToLocalDateTime, formatStatus } from '@/lib/utils';
import type { IRecruitmentRequest } from '@/types';

const props = defineProps<{
	data?: IRecruitmentRequest;
}>();

const emits = defineEmits<{
	(e: 'openDialog', payload: boolean): void;
	(e: 'edit'): void;
	(e: 'approve', id: string): void;
	(e: 'recall'): void;
}>();

const handleReject = () => {
	emits('openDialog', true);
};

const handleEdit = () => {
	emits('edit');
};

const handleApprove = () => {
	emits('approve', props.data?.id || '');
};

const handleRecall = () => {
	emits('recall');
};
</script>
<template>
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
			<div v-if="data?.cancelled_reason" class="grid grid-cols-3 gap-6 py-[3px] items-start">
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
					{{ data?.hiring_manager.name }}
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
				<div class="col-span-2 text-black">
					{{ formatStatus((data?.level as string) || '') }}
				</div>
			</div>
			<div class="grid grid-cols-3 gap-6 py-1.5">
				<div class="flex gap-2 items-center">
					<IconFromSvg :icon="Case" />
					Employment type
				</div>
				<div class="col-span-2 text-black">
					{{ formatStatus((data?.employment_type as string) || '') }}
				</div>
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
				<IconFromSvg :icon="Clipboard" />Job description
			</h3>
			<p class="mt-2 text-sm text-black">
				{{ data?.description }}
			</p>
		</div>
		<div class="mt-4">
			<h3 class="flex gap-2 items-center"><IconFromSvg :icon="CupStar" />Skill required</h3>
			<ul class="list-disc list-inside mt-2 text-black ml-4">
				<li v-for="(item, index) in data?.skills_required" :key="index">{{ item }}</li>
			</ul>
		</div>
	</ScrollArea>
	<SheetFooter>
		<Button
			v-if="data?.status === 'DRAFT'"
			variant="outline"
			class="font-medium px-8 py-[13px] h-auto rounded-2xl"
			@click="handleRecall">
			Recall
		</Button>
		<Button
			v-if="data?.status === 'DRAFT'"
			class="font-medium px-8 py-[13px] h-auto rounded-2xl bg-blue-50 text-blue-500 hover:bg-blue-50"
			@click="handleEdit">
			<IconFromSvg :icon="Pen2" /> Edit
		</Button>
		<Button
			v-if="data?.status === 'TO_DO'"
			variant="outline"
			class="font-medium px-8 py-[13px] h-auto rounded-2xl"
			@click="handleReject"
			>Reject
		</Button>
		<Button
			v-if="data?.status === 'TO_DO'"
			class="font-medium px-8 py-[13px] h-auto rounded-2xl bg-blue-500 text-white hover:bg-blue-600"
			@click="handleApprove">
			Approve
		</Button>
	</SheetFooter>
</template>
