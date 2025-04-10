<script setup lang="ts">
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import CheckList from '@/assets/icons/Outline/Checklist Minimalistic.svg';
import Clipboard from '@/assets/icons/Outline/Clipboard List.svg';
import CupStar from '@/assets/icons/Outline/Cup Star.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';
import User from '@/assets/icons/Outline/User.svg';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { STATUS_STYLE } from '@/constants';
import type { RecruitmentRequest } from '@/types';
import IconFromSvg from '../common/IconFromSvg.vue';
import StatusTag from '../common/StatusTag.vue';
import UserAvatar from '../common/UserAvatar.vue';
import SheetContentCustom from '../custom/SheetContentCustom.vue';
import Badge from '../ui/badge/Badge.vue';

defineProps<{
	open: boolean;
	data?: RecruitmentRequest;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
}>();

const handleOpen = (isOpen: boolean) => {
	emit('update:open', isOpen);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[660px] p-8 flex flex-col text-slate-600">
			<SheetHeader>
				<SheetTitle class="text-[28px] font-semibold">{{
					data?.position || ''
				}}</SheetTitle>
				<SheetDescription> </SheetDescription>
			</SheetHeader>
			<div class="flex-1 text-sm overflow-y-auto">
				<div class="flex flex-col gap-4">
					<div class="grid grid-cols-3 gap-6 py-[3px]">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="ChartSqare" />
							Status
						</div>
						<div class="col-span-2">
							<StatusTag
								:class="STATUS_STYLE[data?.status || '']"
								:status="data?.status || ''" />
						</div>
					</div>
					<div class="grid grid-cols-3 gap-6">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="User" />
							Request from
						</div>
						<div class="flex gap-2 items-center col-span-2">
							<UserAvatar class="w-8 h-8" />
							{{ data?.request_from }}
						</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Building3" />
							Branch
						</div>
						<div class="col-span-2">Da Nang</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Building" />
							Department
						</div>
						<div class="col-span-2">Design</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="UserCircle" />
							Role
						</div>
						<div class="col-span-2">{{ data?.position }}</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Chart2" />
							Level
						</div>
						<div class="col-span-2">{{ data?.level }}</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Case" />
							Employment type
						</div>
						<div class="col-span-2">Fultime</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="CheckList" />
							Quantity
						</div>
						<div class="col-span-2">{{ data?.quantity }}</div>
					</div>
					<div class="grid grid-cols-3 gap-6 py-1.5">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Calendar" />
							Expected date
						</div>
						<div class="col-span-2">{{ data?.expected_date }}</div>
					</div>
				</div>
				<div class="mt-4">
					<h3 class="flex gap-2 items-center">
						<IconFromSvg :icon="Clipboard" />Job Description
					</h3>
					<p class="mt-2 text-sm">
						We are seeking a passionate UI/UX Design Intern to join our dynamic mobile
						app team. In this role, you will assist in creating intuitive and engaging
						user interfaces, and collaborating with developers to enhance the overall
						user experience. Ideal candidates should have a basic understanding of
						design principles and a desire to learn and grow in a fast-paced
						environment. We are seeking a passionate UI/UX Design Intern to join our
						dynamic mobile app team. In this role, you will assist in creating intuitive
						and engaging user interfaces, and collaborating with developers to enhance
						the overall user experience. Ideal candidates should have a basic
						understanding of design principles and a desire to learn and grow in a
						fast-paced environment.
					</p>
				</div>
				<div class="mt-4">
					<h3 class="flex gap-2 items-center">
						<IconFromSvg :icon="CupStar" />Skill required
					</h3>
					<div class="mt-2 flex flex-wrap gap-2">
						<Badge
							class="text-xs font-normal text-blue-500 bg-blue-50 hover:bg-blue-50 py-1.5 px-2.5">
							User Interface Design
						</Badge>
						<Badge
							class="text-xs font-normal text-blue-500 bg-blue-50 hover:bg-blue-50 py-1.5 px-2.5">
							User Interface Design
						</Badge>
						<Badge
							class="text-xs font-normal text-blue-500 bg-blue-50 hover:bg-blue-50 py-1.5 px-2.5">
							User Interface Design
						</Badge>
						<Badge
							class="text-xs font-normal text-blue-500 bg-blue-50 hover:bg-blue-50 py-1.5 px-2.5">
							User Interface Design
						</Badge>
						<Badge
							class="text-xs font-normal text-blue-500 bg-blue-50 hover:bg-blue-50 py-1.5 px-2.5">
							User Interface Design
						</Badge>
						<Badge
							class="text-xs font-normal text-blue-500 bg-blue-50 hover:bg-blue-50 py-1.5 px-2.5">
							User Interface Design
						</Badge>
					</div>
				</div>
			</div>

			<SheetFooter v-if="data?.status === 'To-do'">
				<Button variant="outline" class="font-medium px-8 py-[13px] h-auto rounded-2xl"
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
