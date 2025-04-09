<script lang="ts" setup>
import BillList from '@/assets/icons/Outline/Bill List.svg';
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import City from '@/assets/icons/Outline/City.svg';
import DocumentAdd from '@/assets/icons/Outline/Document Add.svg';
import DocumentMedicine from '@/assets/icons/Outline/Document Medicine.svg';
import Dollar from '@/assets/icons/Outline/Dollar Minimalistic.svg';
import FileText from '@/assets/icons/Outline/File Text.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import MapPoint from '@/assets/icons/Outline/Map Point Wave.svg';
import Signpost from '@/assets/icons/Outline/Signpost.svg';
import StreetMap from '@/assets/icons/Outline/Streets Map Point.svg';
import UserHandUp from '@/assets/icons/Outline/User Hand Up.svg';
import UserID from '@/assets/icons/Outline/User Id.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import UserGroup from '@/assets/icons/Outline/Users Group Two Rounded.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Title from '@/components/common/Title.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetFooter from '@/components/ui/sheet/SheetFooter.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import type { Employee } from '@/types';

const props = defineProps<{
	data: Employee;
}>();

const emit = defineEmits<{
	(e: 'edit'): void;
	(e: 'delete', payload: Employee): void;
}>();

const handleEdit = () => {
	emit('edit');
};

const handleDelete = () => {
	emit('delete', props.data);
};
</script>
<template>
	<ScrollArea class="flex-1">
		<SheetHeader>
			<div class="flex gap-8 items-center">
				<UserAvatar class="w-36 h-36" />
				<div class="flex flex-col gap-2">
					<SheetTitle class="text-[28px] font-semibold flex items-center gap-2"
						>Le Minh Tam
						<StatusTag
							class="bg-blue-50 text-blue-500 hover:bg-blue-100"
							status="Full-time"
					/></SheetTitle>
					<SheetDescription class="text-base font-medium text-black">
						Data Analyst
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
		<div class="text-sm mt-10">
			<Title class="text-black text-base font-semibold">General infomations</Title>
			<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
				<InformationItem label="Date of birth" value="22 March, 2000" :icon="Calendar" />
				<InformationItem label="Gender" value="Male" :icon="UserHandUp" />
				<InformationItem
					label="Social insurance"
					value="048836912641"
					:icon="DocumentMedicine" />
				<InformationItem label="Personal Tax ID" value="732639219" :icon="BillList" />
			</div>
		</div>

		<Separator class="my-6" />

		<div class="text-sm">
			<Title class="text-black text-base font-semibold">Employment informations</Title>
			<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
				<InformationItem label="Branch" value="Đà Nẵng" :icon="Building3" />
				<InformationItem label="Department" value="Data" :icon="Buildings" />
				<InformationItem label="Employee ID" value="351704" :icon="UserID" />
				<InformationItem label="Salary" value="đ15,000,000" :icon="Dollar" />
				<InformationItem label="Joining date" value="30 May, 2025" :icon="Calendar" />
				<InformationItem label="Line manager" value="Nguyễn Thanh Long" :icon="UserGroup" />
				<InformationItem label="Contract type" value="Probationary" :icon="DocumentAdd" />
				<InformationItem label="Contract file" value="" :icon="FileText" />
			</div>
		</div>
		<Separator class="my-6" />
		<div class="text-sm">
			<Title class="text-black text-base font-semibold">Place of birth</Title>
			<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
				<InformationItem label="City or province" value="Bà Rịa - Vũng tàu" :icon="City" />
				<InformationItem label="District" value="Xuyên Mộc" :icon="StreetMap" />
				<InformationItem label="Ward" value="Hòa Bình" :icon="MapPoint" />
				<InformationItem label="Street" value="-" :icon="Signpost" />
			</div>
		</div>
		<Separator class="my-6" />
		<div class="text-sm">
			<Title class="text-black text-base font-semibold">Permanent address</Title>
			<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
				<InformationItem label="City or province" value="Bà Rịa - Vũng tàu" :icon="City" />
				<InformationItem label="District" value="Xuyên Mộc" :icon="StreetMap" />
				<InformationItem label="Ward" value="Hòa Bình" :icon="MapPoint" />
				<InformationItem label="Street" value="-" :icon="Signpost" />
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
