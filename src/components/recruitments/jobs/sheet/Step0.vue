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
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Button from '@/components/ui/button/Button.vue';

const props = defineProps<{
	step: number;
}>();

const emit = defineEmits<{
	(e: 'update:step', payload: number): void;
	(e: 'openAlert', payload: any): void;
}>();

const handleNext = () => {
	emit('update:step', props.step + 1);
};

const openAlert = () => {
	emit('openAlert', undefined);
};
</script>
<template>
	<div class="text-sm">
		<SheetTitle class="text-[28px] font-semibold">UI/UX Designer</SheetTitle>
		<SheetDescription> </SheetDescription>

		<div class="grid grid-cols-2 gap-4 text-sm mt-8">
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="ChartSqare" />
					<span>Status</span>
				</div>
				<div class="my-[2px]"><StatusTag status="Opening" /></div>
			</div>
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="Building3" />
					<span>Branch</span>
				</div>
				<div class="text-black py-1.5">Đà nẵng</div>
			</div>
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="Building" />
					<span>Department</span>
				</div>
				<div class="text-black py-1.5">Design</div>
			</div>
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="UserCircle" />
					<span>Role</span>
				</div>
				<div class="text-black py-1.5">UI/UX Designer</div>
			</div>
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="Chart2" />
					<span>Level</span>
				</div>
				<div class="text-black py-1.5">Intern</div>
			</div>
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="Case" />
					<span>Employment type</span>
				</div>
				<div class="text-black py-1.5">Full-time</div>
			</div>
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="CheckList" />
					<span>Quantity</span>
				</div>
				<div class="text-black py-1.5">01</div>
			</div>
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="Calendar" />
					<span>Expected closing date</span>
				</div>
				<div class="text-black py-1.5">March 22, 2025</div>
			</div>
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="SqureAcademic" />
					<span>Education level</span>
				</div>
				<div class="text-black py-1.5">University</div>
			</div>
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="Ranking" />
					<span>Work experience</span>
				</div>
				<div class="text-black py-1.5">Not required</div>
			</div>
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="UserHand" />
					<span>Gender</span>
				</div>
				<div class="text-black py-1.5">Female</div>
			</div>
			<div class="grid grid-cols-2 items-center">
				<div class="flex items-center gap-2">
					<IconFromSvg :icon="MagicStick3" />
					<span>Appearance</span>
				</div>
				<div class="text-black py-1.5">Not required</div>
			</div>
		</div>

		<div class="mt-4">
			<h3 class="flex gap-2"><IconFromSvg :icon="Clipboard" />Job description</h3>
			<p class="mt-2 text-black">
				We are seeking a passionate UI/UX Design Intern to join our dynamic mobile app team.
				In this role, you will assist in creating intuitive and engaging user interfaces,
				and collaborating with developers to enhance the overall user experience. Ideal
				candidates should have a basic understanding of design principles and a desire to
				learn and grow in a fast-paced environment.
			</p>
		</div>

		<div class="mt-4">
			<h3 class="text-sm flex gap-2"><IconFromSvg :icon="CupStar" />Skill required</h3>
			<ul class="list-disc pl-6 mt-2 text-black">
				<li>Understanding of color theory and typography</li>
				<li>Basic knowledge of HTML and CSS</li>
				<li>Ability to create wireframes and prototypes</li>
				<li>Strong communication and collaboration skills</li>
				<li>Proficiency in design software like Adobe XD and Figma</li>
			</ul>
		</div>

		<div class="flex justify-end gap-2">
			<Button
				class="rounded-2xl h-auto px-7 py-3.5 text-blue-500 bg-blue-50 hover:bg-blue-100"
				@click="handleNext">
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
	</div>
</template>
