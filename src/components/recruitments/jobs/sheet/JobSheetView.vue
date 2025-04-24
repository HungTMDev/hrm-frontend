<script lang="ts" setup>
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import CheckList from '@/assets/icons/Outline/Checklist Minimalistic.svg';
import MagicStick3 from '@/assets/icons/Outline/Magic Stick 3.svg';
import Ranking from '@/assets/icons/Outline/Ranking.svg';
import SqureAcademic from '@/assets/icons/Outline/Square Academic Cap 2.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';
import UserHand from '@/assets/icons/Outline/User Hands.svg';
import Clipboard from '@/assets/icons/Outline/Clipboard List.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Trash.svg';
import CupStar from '@/assets/icons/Outline/Cup Star.svg';
import UserGroup from '@/assets/icons/Outline/Users Group Two Rounded.svg';
import Right from '@/assets/icons/Outline/Alt Arrow Right.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import { JOB_STATUS_STYLE } from '@/constants';
import UserAvatar from '@/components/common/UserAvatar.vue';

const emit = defineEmits<{
	(e: 'openAlert', payload: any): void;
	(e: 'edit'): void;
	(e: 'viewCandidate', payload: any): void;
}>();

const openAlert = () => {
	emit('openAlert', undefined);
};

const onEdit = () => {
	emit('edit');
};

const handleViewCandidate = (payload: any) => {
	emit('viewCandidate', payload);
};

const listCandidates = [
	{
		id: 1,
		name: 'Ngô Văn Khánh',
		email: 'vankhanh@gmail.com',
	},
	{
		id: 2,
		name: 'Đỗ Thị Mai',
		email: 'maido@gmail.com',
	},
	{
		id: 3,
		name: 'Nguyễn Tiểu Linh',
		email: 'tieulinh@gmail.com',
	},
	{
		id: 4,
		name: 'Trần Văn Hoà',
		email: 'vanhoa@gmail.com',
	},
];
</script>
<template>
	<ScrollArea class="text-sm flex-1 pr-3">
		<SheetTitle class="text-[28px] font-semibold">UI/UX Designer</SheetTitle>
		<SheetDescription> </SheetDescription>

		<div class="grid grid-cols-2 gap-4 text-sm mt-8">
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="ChartSqare" />
					<span>Status</span>
				</div>
				<div class="my-[2px]">
					<StatusTag status="Opening" :class="JOB_STATUS_STYLE['Opening']" />
				</div>
			</div>

			<InformationItem :icon="Building3" label="Branch" value="Đà Nẵng" />
			<InformationItem :icon="Building" label="Department" value="Design" />
			<InformationItem :icon="UserCircle" label="Role" value="UI/UX Designer" />
			<InformationItem :icon="Chart2" label="Level" value="Intern" />
			<InformationItem :icon="Case" label="Employment type" value="Full-time" />
			<InformationItem :icon="CheckList" label="Quantity" value="01" />
			<InformationItem
				:icon="Calendar"
				label="Expected closing date"
				value="March 22, 2025" />
			<InformationItem :icon="SqureAcademic" label="Education level" value="University" />
			<InformationItem :icon="Ranking" label="Work experience" value="Not required" />
			<InformationItem :icon="UserHand" label="Gender" value="Female" />
			<InformationItem :icon="MagicStick3" label="Appearance" value="Not required" />
		</div>

		<div class="mt-8">
			<h3 class="flex gap-2"><IconFromSvg :icon="Clipboard" />Job description</h3>
			<p class="mt-2 text-black">
				We are seeking a passionate UI/UX Design Intern to join our dynamic mobile app team.
				In this role, you will assist in creating intuitive and engaging user interfaces,
				and collaborating with developers to enhance the overall user experience. Ideal
				candidates should have a basic understanding of design principles and a desire to
				learn and grow in a fast-paced environment.
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
					v-for="item in listCandidates"
					:key="item.id"
					variant="outline"
					class="flex gap-2 items-center justify-start p-4 rounded-2xl h-auto w-full"
					@click="handleViewCandidate(item)">
					<UserAvatar class="w-[44px] h-[44px]" />
					<div class="flex-1 flex flex-col items-start">
						<p class="text-base font-medium text-black">{{ item.name }}</p>
						<span class="text-sm text-slate-600">{{ item.email }}</span>
					</div>
					<IconFromSvg :icon="Right" />
				</Button>
			</div>
		</div>
	</ScrollArea>
	<div class="flex justify-end gap-2">
		<Button
			class="rounded-2xl h-auto px-7 py-3.5 text-blue-500 bg-blue-50 hover:bg-blue-100"
			@click="onEdit">
			<IconFromSvg :icon="Pen2" />
			Edit
		</Button>
		<Button
			class="rounded-2xl h-auto px-5 py-3.5 text-red-500 bg-red-50 hover:bg-red-100"
			@click="openAlert">
			<IconFromSvg :icon="Trash" />
			Delete
		</Button>
	</div>
</template>
