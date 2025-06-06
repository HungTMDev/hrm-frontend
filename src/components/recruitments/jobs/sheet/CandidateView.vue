<script lang="ts" setup>
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import Ranking from '@/assets/icons/Outline/Ranking.svg';
import FileText from '@/assets/icons/Outline/File Text.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { SheetDescription, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import File from '@/assets/icons/Outline/File.svg';
import Separator from '@/components/ui/separator/Separator.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import { Button } from '@/components/ui/button';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Trash.svg';
import type { IApplicant } from '@/types';

defineProps<{
	applicant?: IApplicant;
}>();

const emits = defineEmits<{
	(e: 'back'): void;
}>();
</script>
<template>
	<SheetHeader>
		<div class="flex gap-8 items-center">
			<UserAvatar class="w-36 h-36" />
			<div class="flex flex-col gap-2">
				<SheetTitle class="text-[28px] font-semibold flex items-center gap-2">{{
					applicant?.candidate?.full_name
				}}</SheetTitle>
				<SheetDescription class="text-base font-medium text-black">
					{{ applicant?.position?.name }}
				</SheetDescription>
				<div class="flex items-center gap-2 text-sm">
					<IconFromSvg :icon="Iphone" /><span>{{
						applicant?.candidate?.phone_number
					}}</span>
				</div>
				<div class="flex items-center gap-2 text-sm">
					<IconFromSvg :icon="Letter" /><span>{{ applicant?.candidate?.email }}</span>
				</div>
			</div>
		</div>
	</SheetHeader>

	<ScrollArea class="flex-1 text-sm pr-3">
		<div class="grid grid-cols-2 text-sm gap-6 mt-4">
			<InformationItem :icon="Chart2" label="Level" />
			<InformationItem :icon="Ranking" label="Work experience" />
			<div class="grid grid-cols-2 items-start">
				<div class="flex gap-2 items-center py-1.5">
					<IconFromSvg :icon="FileText" />
					<span>Attachment</span>
				</div>
				<div class="flex flex-col gap-2">
					<a
						:href="applicant?.resume_url"
						target="_blank"
						class="flex gap-2 items-center bg-blue-50 text-blue-500 justify-center w-fit p-1.5 rounded-2xl text-xs"
						><IconFromSvg :icon="File" class="!w-4 !h-4" />CV</a
					>
				</div>
			</div>
		</div>

		<!-- <Separator class="my-8" />

		<h4 class="text-base font-semibold text-black">Hiring stages</h4>

		<div class="mt-4">
			<div class="relative z-10 pb-8">
				<div class="absolute bg-slate-100 h-full w-[3px] top-3 left-2.5 z-0"></div>
				<div class="flex gap-2 items-center">
					<div
						class="w-6 h-6 rounded-full bg-slate-300 border-[6px] border-slate-100 self-start relative z-10"></div>
					<div class="flex-1">
						<p class="font-medium text-base text-black">Screening</p>
						<span>February 20, 2025</span>
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
						<span>February 20, 2025</span>
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
		</div> -->
	</ScrollArea>
	<SheetFooter>
		<Button variant="outline" class="h-auto p-3 px-8 rounded-2xl" @click="emits('back')"
			>Back</Button
		>
		<!-- <Button
			variant="outline"
			class="font-medium px-6 py-[13px] h-auto rounded-2xl hover:text-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-100 border-none">
			<IconFromSvg :icon="Pen2" />Edit
		</Button>
		<Button
			class="font-medium px-6 py-[13px] h-auto rounded-2xl bg-red-50 text-red-500 hover:bg-red-100">
			<IconFromSvg :icon="Trash" />Delete
		</Button> -->
	</SheetFooter>
</template>
