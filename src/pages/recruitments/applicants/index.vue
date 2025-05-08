<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Title from '@/components/common/Title.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClipboardText from '@/assets/icons/Outline/Clipboard Text.svg';
import ClipboardTextBold from '@/assets/icons/Bold/Clipboard Text.svg';
import Dialog from '@/assets/icons/Outline/Dialog.svg';
import DialogBold from '@/assets/icons/Bold/Dialog.svg';
import DocumentAdd from '@/assets/icons/Outline/Document Add.svg';
import DocumentAddBold from '@/assets/icons/Bold/Document Add.svg';
import CloseCircle from '@/assets/icons/Outline/Close Circle.svg';
import CloseCircleBold from '@/assets/icons/Bold/Close Circle.svg';
import { ref } from 'vue';
import ScreeningTab from '@/components/recruitments/applicants/screening-tab/ScreeningTab.vue';
import InterviewTab from '@/components/recruitments/applicants/interview-tab/InterviewTab.vue';

const activeTab = ref('screening');
</script>
<template>
	<ContentWrapper>
		<Title>Applicants</Title>
		<Tabs v-model="activeTab" class="flex gap-4 mt-4" orientation="vertical">
			<TabsList class="grid grid-cols-1 gap-4 p-4 border rounded-2xl bg-white h-fit">
				<TabsTrigger
					class="py-2 px-3 text-slate-600 w-40 justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
					value="screening">
					<div class="flex items-center gap-2">
						<IconFromSvg
							v-if="activeTab === 'screening'"
							:icon="ClipboardTextBold"
							class="!w-6 !h-6" />
						<IconFromSvg v-else :icon="ClipboardText" class="!w-6 !h-6" /> Screening
					</div>
				</TabsTrigger>
				<TabsTrigger
					class="py-2 px-3 text-slate-600 w-40 justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
					value="interview">
					<div class="flex items-center gap-2">
						<IconFromSvg
							v-if="activeTab === 'interview'"
							:icon="DialogBold"
							class="!w-6 !h-6" />
						<IconFromSvg v-else :icon="Dialog" class="!w-6 !h-6" /> Interview
					</div>
				</TabsTrigger>
				<TabsTrigger
					class="py-2 px-3 text-slate-600 w-40 justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
					value="hired">
					<div class="flex items-center gap-2">
						<IconFromSvg
							v-if="activeTab === 'hired'"
							:icon="DocumentAddBold"
							class="!w-6 !h-6" />
						<IconFromSvg v-else :icon="DocumentAdd" class="!w-6 !h-6" /> Hired
					</div>
				</TabsTrigger>
				<TabsTrigger
					class="py-2 px-3 text-slate-600 w-40 justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
					value="rejected">
					<div class="flex items-center gap-2">
						<IconFromSvg
							v-if="activeTab === 'rejected'"
							:icon="CloseCircleBold"
							class="!w-6 !h-6" />
						<IconFromSvg v-else :icon="CloseCircle" class="!w-6 !h-6" /> Rejected
					</div>
				</TabsTrigger>
			</TabsList>
			<div class="flex-1">
				<TabsContent class="mt-0" value="screening"> <ScreeningTab /> </TabsContent>
				<TabsContent class="mt-0" value="interview"> <InterviewTab /> </TabsContent>
				<TabsContent class="mt-0" value="hired"> hired </TabsContent>
				<TabsContent class="mt-0" value="rejected"> rejected </TabsContent>
			</div>
		</Tabs>
	</ContentWrapper>
</template>
