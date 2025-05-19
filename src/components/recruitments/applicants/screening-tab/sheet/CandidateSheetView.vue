<script lang="ts" setup>
import UserAvatar from '@/components/common/UserAvatar.vue';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetFooter from '@/components/ui/sheet/SheetFooter.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import LetterOpen from '@/assets/icons/Outline/Letter Opened.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import UserSpeak from '@/assets/icons/Outline/User Speak.svg';
import ClockCircle from '@/assets/icons/Outline/Clock Circle.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import User from '@/assets/icons/Outline/User Hand Up.svg';
import Ranking from '@/assets/icons/Outline/Ranking.svg';
import SquareAcademic from '@/assets/icons/Outline/Square Academic Cap.svg';
import Dollar from '@/assets/icons/Outline/Dollar Minimalistic.svg';
import FileText from '@/assets/icons/Outline/File Text.svg';
import File from '@/assets/icons/Outline/File.svg';
import ChatLine from '@/assets/icons/Outline/Chat Line.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Trash.svg';
import Button from '@/components/ui/button/Button.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import InformationItem from '@/components/common/InformationItem.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import type { IApplicant } from '@/types';

defineProps<{
	data?: IApplicant;
}>();

const emits = defineEmits<{
	(e: 'edit'): void;
	(e: 'openDialog'): void;
	(e: 'sendEmail'): void;
	(e: 'edit'): void;
}>();

const handleEdit = () => {
	emits('edit');
};

const handleOpenDialog = () => {
	emits('openDialog');
};

const handleSendEmail = () => {
	emits('sendEmail');
};
</script>
<template>
	<SheetHeader>
		<div class="flex gap-8 items-center">
			<UserAvatar class="w-36 h-36" />
			<div class="flex flex-col gap-2">
				<SheetTitle class="text-[28px] font-semibold flex items-center gap-2"
					>{{ data?.candidate.full_name }}
					<StatusTag class="bg-blue-50 text-blue-500 hover:bg-blue-100" status="Applied"
				/></SheetTitle>
				<SheetDescription class="text-base font-medium text-black">
					{{ data?.position.title }}
				</SheetDescription>
				<div class="flex items-center gap-2 text-sm">
					<IconFromSvg :icon="Iphone" /><span>{{ data?.candidate.phone_number }}</span>
				</div>
				<div class="flex items-center gap-2 text-sm">
					<IconFromSvg :icon="Letter" /><span>{{ data?.candidate.email }}</span>
				</div>
			</div>
		</div>
	</SheetHeader>
	<ScrollArea class="flex-1 pr-3">
		<div v-if="data?.current_stage !== 'APPLIED'" class="flex items-center justify-between">
			<h3 class="text-base text-black font-semibold">Interview</h3>
			<Button variant="outline" class="rounded-2xl" @click="handleOpenDialog">
				<IconFromSvg :icon="Calendar" />Interview schedule
			</Button>
		</div>
		<div v-if="data?.current_stage !== 'APPLIED'" class="mt-4">
			<h4 class="text-sm text-black font-medium">Interview 1</h4>
			<div class="grid grid-cols-2 text-sm gap-4 mt-4">
				<InformationItem :icon="Calendar" label="interview date" value="22 March, 2000" />
				<InformationItem :icon="ClockCircle" label="Interview time" value="14:00" />
				<InformationItem :icon="UserSpeak" label="Interviewer" value="Trịnh Minh Hưng" />
			</div>

			<h4 class="text-sm text-black font-medium mt-4">Interview 2</h4>
			<div class="grid grid-cols-2 text-sm gap-4 mt-4">
				<InformationItem :icon="Calendar" label="interview date" value="22 March, 2000" />
				<InformationItem :icon="ClockCircle" label="Interview time" value="14:00" />
				<InformationItem :icon="UserSpeak" label="Interviewer" value="Trịnh Minh Hưng" />
			</div>
		</div>
		<Separator v-if="data?.current_stage !== 'APPLIED'" class="my-4" />
		<div class="flex items-center justify-between">
			<h3 class="text-sm text-black font-semibold">Email</h3>
			<Button variant="outline" class="rounded-2xl" @click="handleSendEmail">
				<IconFromSvg :icon="Letter" />Send email
			</Button>
		</div>
		<Separator class="my-4" />
		<h3 class="text-base text-black font-semibold mb-4">General information</h3>
		<div class="grid grid-cols-2 text-sm gap-4">
			<InformationItem :icon="Calendar" label="Date of birth" value="22 March, 2000" />
			<InformationItem :icon="User" label="Gender" value="Male" />
			<InformationItem :icon="SquareAcademic" label="Education level" value="University" />
		</div>

		<Separator class="my-4" />
		<h3 class="text-base text-black font-semibold mb-4">Application details</h3>
		<div class="grid grid-cols-2 text-sm gap-4">
			<InformationItem :icon="Ranking" label="Work experience" value="Less than 1 year" />
			<InformationItem :icon="Dollar" label="Expected salary" value="đ15,000,000" />
			<div class="grid grid-cols-2 items-start">
				<div class="flex gap-2 items-center py-1.5">
					<IconFromSvg :icon="FileText" />
					<span>CV</span>
				</div>
				<div class="flex flex-col gap-1">
					<a
						href="#"
						target="_blank"
						class="flex gap-2 items-center bg-blue-50 text-blue-500 justify-center w-fit p-1.5 rounded-2xl text-xs"
						><IconFromSvg :icon="File" class="!w-4 !h-4" />leminhtam_cv.pdf</a
					>
					<a
						href="#"
						target="_blank"
						class="flex gap-2 items-center bg-blue-50 text-blue-500 justify-center w-fit p-1.5 rounded-2xl text-xs"
						><IconFromSvg :icon="File" class="!w-4 !h-4" />leminhtam_cv.pdf</a
					>
				</div>
			</div>
		</div>
		<div class="mt-8">
			<div class="flex items-center gap-2 text-sm">
				<IconFromSvg :icon="LetterOpen" /><span>Cover letter</span>
			</div>
			<div class="p-4 rounded-2xl border mt-4">
				<p class="text-sm text-black">
					Dear Hiring Manager, <br /><br />
					I am excited to apply for the Junior Data Analyst position at your esteemed
					company. With a strong foundation in data analysis and a passion for uncovering
					insights, I am eager to contribute to your team. My recent internship allowed me
					to develop skills in data visualization and statistical analysis, using tools
					like Excel and Tableau. I am particularly drawn to your company’s commitment to
					innovation and data-driven decision-making. <br /><br />Thank you for
					considering my application. I look forward to the opportunity to discuss how I
					can add value to your team.<br /><br />
					Best regards,<br /><br />
					Lê Minh Tâm
				</p>
			</div>
		</div>

		<div class="mt-4">
			<div class="flex items-center gap-2 text-sm">
				<IconFromSvg :icon="ChatLine" /><span>Preliminary assessment</span>
			</div>
			<div class="mt-4 p-4 border rounded-2xl">
				<div class="flex gap-2 items-center">
					<UserAvatar class="w-[44px] h-[44px]" />
					<div>
						<p class="text-black text-base font-medium">Le Thi Linh Ly</p>
						<span class="text-xs">March 5, 2025</span>
					</div>
				</div>
				<p class="text-sm mt-2 text-black">
					The candidate demonstrates a strong understanding of data analysis techniques
					and tools, showcasing proficiency in SQL and Python. Their previous experience
					in data-driven decision-making aligns well with our needs. Additionally, their
					ability to communicate complex data insights clearly is a valuable asset.
					Overall, they appear to be a promising fit for the Data Analyst role.
				</p>
			</div>
		</div>

		<Separator class="my-8" />
		<h3 class="text-base text-black font-semibold mb-4">Hiring stages</h3>
		<div class="mt-4 text-sm">
			<div class="relative z-10 pb-8">
				<div class="absolute bg-slate-100 h-full w-[3px] top-3 left-2.5 z-0"></div>
				<div class="flex gap-2 items-center">
					<div
						class="w-6 h-6 rounded-full bg-slate-300 border-[6px] border-slate-100 self-start relative z-10"></div>
					<div class="flex-1">
						<p class="font-medium text-base text-black">Screening</p>
						<span class="text-xs">February 20, 2025</span>
					</div>
					<StatusTag status="Passed" />
				</div>
				<div class="ml-8 mt-4 border rounded-2xl p-4">
					<div class="flex gap-2 items-center">
						<UserAvatar class="w-[44px] h-[44px]" />
						<div>
							<h4 class="text-base font-medium text-black">Le Thi Linh Ly</h4>
							<span class="text-xs">March 5, 2025</span>
						</div>
					</div>
					<p class="text-black mt-4">
						Their varied portfolio showcases creativity and proficiency in Adobe
						Illustrator and Photoshop, making them a great fit for our internship.
					</p>
				</div>
			</div>
			<div class="relative z-10">
				<div class="flex gap-2 items-center">
					<div
						class="w-6 h-6 rounded-full bg-slate-300 border-[6px] border-slate-100 self-start relative z-10"></div>
					<div class="flex-1">
						<p class="font-medium text-base text-black">1st Interview</p>
						<span class="text-xs">February 20, 2025</span>
					</div>
					<StatusTag status="Failed" />
				</div>
				<div class="ml-8 mt-4 border rounded-2xl p-4">
					<div class="flex gap-2 items-center">
						<UserAvatar class="w-[44px] h-[44px]" />
						<div>
							<h4 class="text-base font-medium text-black">Le Thi Linh Ly</h4>
							<span class="text-xs">February 25, 2025</span>
						</div>
					</div>
					<p class="text-black mt-4">
						Their varied portfolio showcases creativity and proficiency in Adobe
						Illustrator and Photoshop, making them a great fit for our internship.
					</p>
				</div>
			</div>
		</div>
	</ScrollArea>

	<SheetFooter>
		<Button
			variant="outline"
			class="font-medium px-8 py-[13px] h-auto rounded-2xl hover:text-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-100 border-none"
			@click="handleEdit">
			<IconFromSvg :icon="Pen2" />Edit
		</Button>
		<Button
			class="font-medium px-8 py-[13px] h-auto rounded-2xl bg-red-50 text-red-500 hover:bg-red-100">
			<IconFromSvg :icon="Trash" />Delete
		</Button>
	</SheetFooter>
</template>
