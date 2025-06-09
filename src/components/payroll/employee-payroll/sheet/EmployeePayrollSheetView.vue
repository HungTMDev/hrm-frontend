<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Chart2 from '@/assets/icons/Outline/Chart2.svg';
import ChartSquare from '@/assets/icons/Outline/ChartSquare.svg';
import DocumentAdd from '@/assets/icons/Outline/DocumentAdd.svg';
import Dollar from '@/assets/icons/Outline/DollarMinimalistic.svg';
import FileText from '@/assets/icons/Outline/FileText.svg';
import File from '@/assets/icons/Outline/File.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import Trash from '@/assets/icons/Outline/TrashBinMinimalistic.svg';
import UserID from '@/assets/icons/Outline/UserId.svg';
import UserGroup from '@/assets/icons/Outline/UsersGroupTwoRounded.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import {
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet/index';
import { PAYROLL_FILE_STATUS_STYLE } from '@/constants';
import type { EmployeePayroll } from '@/types';

defineProps<{
	data?: EmployeePayroll;
}>();

const emit = defineEmits<{
	(e: 'edit'): void;
	(e: 'delete'): void;
}>();

const handleEdit = () => {
	emit('edit');
};

const handleDelete = () => {
	emit('delete');
};
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<SheetHeader>
			<div class="flex gap-8 items-center">
				<UserAvatar class="w-36 h-36" />
				<div class="flex flex-col gap-2">
					<SheetTitle class="text-[28px] font-semibold flex items-center gap-2"
						>{{ data?.name }}
						<StatusTag
							class="bg-blue-50 text-blue-500 hover:bg-blue-50 text-xs"
							status="Full-time"
					/></SheetTitle>
					<SheetDescription class="text-base font-medium text-black">
						{{ data?.role }}
					</SheetDescription>
					<div class="flex items-center gap-2 text-sm">
						<IconFromSvg :icon="Iphone" /><span>0971234567</span>
					</div>
					<div class="flex items-center gap-2 text-sm">
						<IconFromSvg :icon="Letter" /><span>tamle@gmail.com</span>
					</div>
				</div>
			</div>
		</SheetHeader>
		<div class="mt-6">
			<h3 class="text-base font-semibold text-black">Payroll information</h3>
			<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
				<InformationItem :icon="Dollar" label="Salary" value="đ25,000,000" />
				<div class="grid grid-cols-2 items-center">
					<div class="flex gap-2 items-center">
						<IconFromSvg :icon="ChartSquare" />
						Salary status
					</div>
					<StatusTag
						status="Pending"
						:class="
							data?.status === 'Processed'
								? 'bg-green-50 hover:bg-green-50 text-green-500'
								: 'bg-red-50 hover:bg-red-50 text-red-500'
						" />
				</div>
				<div class="grid grid-cols-2 items-center">
					<div class="flex gap-2 items-center">
						<IconFromSvg :icon="ChartSquare" />
						Status
					</div>
					<StatusTag status="Confirmed" :class="PAYROLL_FILE_STATUS_STYLE['Confirmed']" />
				</div>
				<div class="grid grid-cols-2 items-center">
					<div class="flex gap-2 items-center">
						<IconFromSvg :icon="FileText" />
						Payroll file
					</div>
					<a
						href="#"
						class="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-500 rounded-2xl w-fit">
						<IconFromSvg :icon="File" class="!w-4 !h-4" />
						<span class="text-xs w-24 truncate">payroll_nguyenducphat.pdf</span>
					</a>
				</div>
			</div>
		</div>
		<Separator class="my-6" />
		<div>
			<h3 class="text-base font-semibold text-black">Employee information</h3>
			<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
				<InformationItem :icon="Building3" label="Branch" value="Đà Nẵng" />
				<InformationItem :icon="Buildings" label="Department" value="Design" />
				<InformationItem :icon="Chart2" label="Level" value="Junior" />
				<InformationItem :icon="UserID" label="Employee ID" value="351704" />
				<InformationItem :icon="Calendar" label="Joining date" value="30 May, 2021" />
				<InformationItem :icon="UserGroup" label="Line manager" value="Nguyễn Văn Luân" />
				<InformationItem :icon="DocumentAdd" label="Contract type" value="Permanent" />
				<div class="grid grid-cols-2 items-center">
					<div class="flex gap-2 items-center">
						<IconFromSvg :icon="FileText" />
						Contract file
					</div>
					<a
						href="#"
						class="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-500 rounded-2xl w-fit">
						<IconFromSvg :icon="File" class="!w-4 !h-4" />
						<span class="text-xs w-24 truncate">payroll_nguyenducphat.pdf</span>
					</a>
				</div>
			</div>
		</div>
	</ScrollArea>
	<SheetFooter>
		<Button
			class="text-blue-500 bg-blue-50 hover:bg-blue-100 h-auto py-3 px-6 rounded-2xl"
			@click="handleEdit">
			<IconFromSvg :icon="Pen2" /> Edit
		</Button>
		<Button
			class="text-red-500 bg-red-50 hover:bg-red-100 h-auto py-3 px-6 rounded-2xl"
			@click="handleDelete">
			<IconFromSvg :icon="Trash" />
			Delete
		</Button>
	</SheetFooter>
</template>
