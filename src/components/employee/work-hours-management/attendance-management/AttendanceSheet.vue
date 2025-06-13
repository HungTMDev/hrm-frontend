<script lang="ts" setup>
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import CalendarAdd from '@/assets/icons/Outline/CalendarAdd.svg';
import ChartSquare from '@/assets/icons/Outline/ChartSquare.svg';
import ClipboardList from '@/assets/icons/Outline/ClipboardList.svg';
import ClockCircle from '@/assets/icons/Outline/ClockCircle.svg';
import FileRight from '@/assets/icons/Outline/FileRight.svg';
import User from '@/assets/icons/Outline/User.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Sheet from '@/components/ui/sheet/Sheet.vue';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetFooter from '@/components/ui/sheet/SheetFooter.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import { ATTENDANCE_STYLE, STATUS_STYLE } from '@/constants';
import type { AttendanceManagement } from '@/types';

defineProps<{
	open: boolean;
	data?: AttendanceManagement;
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
				<SheetTitle class="text-[28px] font-semibold">{{ data?.attendance }} Request </SheetTitle>
				<SheetDescription> </SheetDescription>
			</SheetHeader>
			<ScrollArea class="flex-1 pr-3 text-sm">
				<div class="grid gap-5">
					<div class="grid grid-cols-2 items-center">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="ChartSquare" />
							Status
						</div>
						<StatusTag :status="data?.status || ''" :class="STATUS_STYLE[data?.status || '']" />
					</div>
					<div class="grid grid-cols-2 items-center">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="User" />
							Request from
						</div>
						<div class="flex items-center gap-2 text-black">
							<UserAvatar class="w-8 h-8" />
							{{ data?.name }}
						</div>
					</div>

					<InformationItem :icon="CalendarAdd" label="Request date" value="April 10, 2025" />
					<div class="grid grid-cols-2 items-center">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="FileRight" />
							Request for
						</div>
						<StatusTag
							:status="data?.attendance || ''"
							:class="ATTENDANCE_STYLE[data?.attendance || '']" />
					</div>
					<InformationItem :icon="Calendar" label="Date" :value="data?.date || ''" />
					<InformationItem :icon="ClockCircle" label="Time" :value="data?.time || ''" />
				</div>
				<div class="mt-8">
					<div class="flex items-center gap-2"><IconFromSvg :icon="ClipboardList" /> Reason</div>
					<p class="text-black mt-2">
						I am writing to request an early leave today due to a personal matter that requires my
						immediate attention. I appreciate your understanding and support.
					</p>
				</div>
			</ScrollArea>
			<SheetFooter v-if="data?.status === 'To-do'">
				<Button variant="outline" class="font-medium px-8 py-[13px] h-auto rounded-2xl">
					Reject
				</Button>
				<Button
					class="font-medium px-8 py-[13px] h-auto rounded-2xl bg-blue-500 text-white hover:bg-blue-500">
					Approve
				</Button>
			</SheetFooter>
		</SheetContentCustom>
	</Sheet>
</template>
