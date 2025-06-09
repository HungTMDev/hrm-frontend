<script lang="ts" setup>
import AlignTopBold from '@/assets/icons/Bold/AlignTop.svg';
import ChatRoundMoneyBold from '@/assets/icons/Bold/ChatRoundMoney.svg';
import ChecklistBold from '@/assets/icons/Bold/ChecklistMinimalistic.svg';
import ClipboardTextBold from '@/assets/icons/Bold/ClipboardText.svg';
import CloseCircleBold from '@/assets/icons/Bold/CloseCircle.svg';
import DialogBold from '@/assets/icons/Bold/Dialog.svg';
import DocumentAddBold from '@/assets/icons/Bold/DocumentAdd.svg';
import AlignTop from '@/assets/icons/Outline/AlignTop.svg';
import ChatRoundMoney from '@/assets/icons/Outline/ChatRoundMoney.svg';
import Checklist from '@/assets/icons/Outline/ChecklistMinimalistic.svg';
import ClipboardText from '@/assets/icons/Outline/ClipboardText.svg';
import CloseCircle from '@/assets/icons/Outline/CloseCircle.svg';
import Dialog from '@/assets/icons/Outline/Dialog.svg';
import DocumentAdd from '@/assets/icons/Outline/DocumentAdd.svg';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Title from '@/components/common/Title.vue';
import HiredTab from '@/components/recruitments/applicants/hired-tab/HiredTab.vue';
import InterviewTab from '@/components/recruitments/applicants/interview-tab/InterviewTab.vue';
import KanbanTab from '@/components/recruitments/applicants/kanban-tab/KanbanTab.vue';
import OfferingTab from '@/components/recruitments/applicants/offering-tab/OfferingTab.vue';
import RejectedTab from '@/components/recruitments/applicants/rejected-tab/RejectedTab.vue';
import ScreeningTab from '@/components/recruitments/applicants/screening-tab/ScreeningTab.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import router from '@/routers';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const query = computed(() => route.query);

const activeTab = ref();
const view = ref('table');

const handleUpdate = (value: any) => {
	activeTab.value = value;
	router.push({ query: { view: view.value, tab: activeTab.value } });
};

const handleView = (payload: any) => {
	view.value = payload;
	activeTab.value = 'screening';
	router.push({ query: { view: view.value } });
};

onMounted(() => {
	activeTab.value = query.value.tab ? (query.value.tab as string) : 'screening';
	view.value = query.value.view ? (query.value.view as string) : 'table';
});
</script>
<template>
	<ContentWrapper>
		<Tabs :model-value="view" @update:model-value="handleView">
			<div class="flex justify-between items-center">
				<Title>Applicants</Title>
				<TabsList v-show="false" class="w-fit rounded-2xl">
					<TabsTrigger
						class="py-2 px-3 text-slate-600 justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
						value="table">
						<div class="flex items-center gap-2">
							<IconFromSvg v-if="view === 'table'" :icon="ChecklistBold" />
							<IconFromSvg v-else :icon="Checklist" />
						</div>
					</TabsTrigger>
					<TabsTrigger
						class="py-2 px-3 text-slate-600 justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
						value="kanban">
						<div class="flex items-center gap-2">
							<IconFromSvg v-if="view === 'kanban'" :icon="AlignTopBold" />
							<IconFromSvg v-else :icon="AlignTop" />
						</div>
					</TabsTrigger>
				</TabsList>
			</div>
			<div class="mt-4">
				<TabsContent class="mt-0" value="table">
					<Tabs
						:model-value="activeTab"
						@update:model-value="handleUpdate"
						class="flex gap-4 mt-4"
						orientation="vertical">
						<TabsList
							class="grid grid-cols-1 gap-4 p-4 border rounded-2xl bg-white h-fit">
							<TabsTrigger
								class="py-2 px-3 text-slate-600 w-40 justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
								value="screening">
								<div class="flex items-center gap-2">
									<IconFromSvg
										v-if="activeTab === 'screening'"
										:icon="ClipboardTextBold"
										class="!w-6 !h-6" />
									<IconFromSvg v-else :icon="ClipboardText" class="!w-6 !h-6" />
									Screening
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
									<IconFromSvg v-else :icon="Dialog" class="!w-6 !h-6" />
									Interview
								</div>
							</TabsTrigger>
							<TabsTrigger
								class="py-2 px-3 text-slate-600 w-40 justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
								value="offering">
								<div class="flex items-center gap-2">
									<IconFromSvg
										v-if="activeTab === 'offering'"
										:icon="ChatRoundMoneyBold"
										class="!w-6 !h-6" />
									<IconFromSvg v-else :icon="ChatRoundMoney" class="!w-6 !h-6" />
									Offering
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
									<IconFromSvg v-else :icon="DocumentAdd" class="!w-6 !h-6" />
									Hired
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
									<IconFromSvg v-else :icon="CloseCircle" class="!w-6 !h-6" />
									Rejected
								</div>
							</TabsTrigger>
						</TabsList>
						<div class="flex-1">
							<TabsContent class="mt-0" value="screening">
								<ScreeningTab />
							</TabsContent>
							<TabsContent class="mt-0" value="interview">
								<InterviewTab />
							</TabsContent>
							<TabsContent class="mt-0" value="offering">
								<OfferingTab />
							</TabsContent>
							<TabsContent class="mt-0" value="hired"> <HiredTab /> </TabsContent>
							<TabsContent class="mt-0" value="rejected">
								<RejectedTab />
							</TabsContent>
						</div>
					</Tabs>
				</TabsContent>
				<TabsContent class="mt-0" value="kanban"> <KanbanTab /> </TabsContent>
			</div>
		</Tabs>
	</ContentWrapper>
</template>
