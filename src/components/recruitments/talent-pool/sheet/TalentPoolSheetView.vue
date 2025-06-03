<script lang="ts" setup>
import Down from '@/assets/icons/Outline/Alt Arrow Down.svg';
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChatLine from '@/assets/icons/Outline/Chat Line.svg';
import FileText from '@/assets/icons/Outline/File Text.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Ranking from '@/assets/icons/Outline/Ranking.svg';
import SquareAcademic from '@/assets/icons/Outline/Square Academic Cap.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Trash.svg';
import UserHand from '@/assets/icons/Outline/User Hand Up.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Title from '@/components/common/Title.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetFooter from '@/components/ui/sheet/SheetFooter.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import { formatISOStringToLocalDateTime } from '@/lib/utils';
import type { ICandidate } from '@/types';

const accordionItems = [
	{
		value: 'item-1',
		title: 'Đỗ Thị Mai applied for UI/UX Designer Intern position',
		content: 'Yes. It adheres to the WAI-ARIA design pattern.',
	},
	{
		value: 'item-2',
		title: 'Đỗ Thị Mai applied for UI/UX Designer Intern position',
		content: "Yes. It's unstyled by default, giving you freedom over the look and feel.",
	},
	{
		value: 'item-3',
		title: 'Đỗ Thị Mai applied for UI/UX Designer Intern position',
		content: 'Yes! You can use the transition prop to configure the animation.',
	},
];

defineProps<{
	data?: ICandidate;
}>();

const emit = defineEmits<{
	(e: 'edit'): void;
}>();

const handleEdit = () => {
	emit('edit');
};
</script>
<template>
	<div class="flex-1 overflow-y-auto flex flex-col gap-4 text-sm">
		<SheetHeader>
			<div class="flex gap-8 items-center">
				<UserAvatar class="w-36 h-36" />
				<div class="flex flex-col gap-2">
					<SheetTitle class="text-[28px] font-semibold flex items-center gap-2"
						>{{ data?.full_name }}
						<StatusTag
							class="bg-blue-50 text-blue-500 hover:bg-blue-100"
							status="Applied"
					/></SheetTitle>
					<SheetDescription class="text-base font-medium text-black"> </SheetDescription>
					<div class="flex items-center gap-2 text-sm">
						<IconFromSvg :icon="Iphone" /><span>{{ data?.phone_number }}</span>
					</div>
					<div class="flex items-center gap-2 text-sm">
						<IconFromSvg :icon="Letter" /><span>{{ data?.email }}</span>
					</div>
				</div>
			</div>
		</SheetHeader>

		<ScrollArea class="flex-1 pr-3">
			<div class="grid gap-4">
				<div>
					<Title class="text-base font-semibold text-black">General information</Title>
					<div class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
						<InformationItem
							:icon="Calendar"
							label="Date of birth"
							:value="formatISOStringToLocalDateTime(data?.date_of_birth).date" />
						<InformationItem
							:icon="UserHand"
							label="Gender"
							:value="data?.gender || ''" />
						<InformationItem :icon="Building3" label="City" value="" />
						<InformationItem
							:icon="SquareAcademic"
							label="Education level"
							:value="data?.education?.school || ''" />
					</div>
				</div>

				<Separator class="my-2" />

				<div>
					<Title class="text-base font-semibold text-black">Candidate profile</Title>
					<div class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
						<InformationItem :icon="Chart2" label="Level" />
						<InformationItem :icon="Ranking" label="Work experience" />
						<InformationItem :icon="FileText" label="Attachments" />
					</div>
				</div>

				<div class="mt-4">
					<div class="flex items-center gap-2">
						<IconFromSvg :icon="ChatLine" /><span>Candidate evaluation</span>
					</div>
					<div class="border rounded-2xl p-4 mt-4">
						<div class="flex gap-2 items-center">
							<UserAvatar class="w-10 h-10" />
							<div>
								<h4 class="text-base font-medium text-black">Le Thi Linh Ly</h4>
								<span class="text-xs">March 5, 2025</span>
							</div>
						</div>
						<p class="text-black mt-2">
							{{ data?.notes }}
						</p>
					</div>
				</div>
				<div>
					<Title class="text-base font-semibold text-black">Applicant history</Title>
					<div class="mt-4">
						<Accordion type="single" class="w-full grid gap-2" collapsible>
							<AccordionItem
								v-for="item in accordionItems"
								:key="item.value"
								:value="item.value"
								class="border rounded-2xl p-4">
								<AccordionTrigger class="p-0 hover:no-underline text-base">
									<div class="grid">
										<span class="text-black">{{ item.title }}</span>
										<span class="text-xs text-start"> February 16, 2025 </span>
									</div>
									<template #icon>
										<IconFromSvg
											:icon="Down"
											class="transition-transform duration-200" />
									</template>
								</AccordionTrigger>
								<AccordionContent class="p-0 pt-4 grid gap-4">
									<div>
										<div class="flex items-center gap-6">
											<div
												class="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
											<div class="flex-1">
												<p class="text-base text-black">Screening</p>
												<span class="text-xs">February 20, 2025</span>
											</div>
											<StatusTag status="Passed" />
										</div>
										<div class="border rounded-2xl p-4 mt-2 ml-6">
											<div class="flex gap-2 items-center">
												<UserAvatar class="w-10 h-10" />
												<div>
													<h4 class="text-base font-medium text-black">
														Le Thi Linh Ly
													</h4>
													<span class="text-xs">March 5, 2025</span>
												</div>
											</div>
											<p class="text-black mt-2">
												The candidate exhibits a keen eye for design and a
												solid grasp of graphic design principles. Their
												portfolio showcases a variety of creative projects,
												demonstrating proficiency in tools like Adobe
												Illustrator and Photoshop. They have experience
												collaborating with clients to bring their visions to
												life, which is essential for our team. Overall, they
												seem to be a strong contender for the Graphic
												Designer position.
											</p>
										</div>
									</div>
									<div>
										<div class="flex items-center gap-6">
											<div
												class="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
											<div class="flex-1">
												<p class="text-base text-black">Screening</p>
												<span class="text-xs">February 20, 2025</span>
											</div>
											<StatusTag status="Passed" />
										</div>
										<div class="border rounded-2xl p-4 mt-2 ml-6">
											<div class="flex gap-2 items-center">
												<UserAvatar class="w-10 h-10" />
												<div>
													<h4 class="text-base font-medium text-black">
														Le Thi Linh Ly
													</h4>
													<span class="text-xs">March 5, 2025</span>
												</div>
											</div>
											<p class="text-black mt-2">
												The candidate exhibits a keen eye for design and a
												solid grasp of graphic design principles. Their
												portfolio showcases a variety of creative projects,
												demonstrating proficiency in tools like Adobe
												Illustrator and Photoshop. They have experience
												collaborating with clients to bring their visions to
												life, which is essential for our team. Overall, they
												seem to be a strong contender for the Graphic
												Designer position.
											</p>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</div>
		</ScrollArea>
	</div>

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
