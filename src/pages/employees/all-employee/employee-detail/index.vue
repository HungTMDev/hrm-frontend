<script lang="ts" setup>
import CaseRoundBold from '@/assets/icons/Bold/Case Round.svg';
import Chair2Bold from '@/assets/icons/Bold/Chair 2.svg';
import ChartBold from '@/assets/icons/Bold/Chart.svg';
import ClockCircleBold from '@/assets/icons/Bold/Clock Circle.svg';
import DocumentAddBold from '@/assets/icons/Bold/Document Add.svg';
import DollarBold from '@/assets/icons/Bold/Dollar.svg';
import ExitBold from '@/assets/icons/Bold/Exit.svg';
import HealthBold from '@/assets/icons/Bold/Health.svg';
import LibraryBold from '@/assets/icons/Bold/Library.svg';
import MenuDots from '@/assets/icons/Bold/Menu Dots.svg';
import MoneyBagBold from '@/assets/icons/Bold/Money Bag.svg';
import PresentationBold from '@/assets/icons/Bold/Presentation Graph.svg';
import UserRoundedBold from '@/assets/icons/Bold/User Rounded.svg';
import AchiveDown from '@/assets/icons/Outline/Archive Down.svg';
import CaseRound from '@/assets/icons/Outline/Case Round.svg';
import Chair2 from '@/assets/icons/Outline/Chair 2.svg';
import Chart from '@/assets/icons/Outline/Chart.svg';
import ClockCircle from '@/assets/icons/Outline/Clock Circle.svg';
import DocumentAdd from '@/assets/icons/Outline/Document Add.svg';
import Dollar from '@/assets/icons/Outline/Dollar.svg';
import Exit from '@/assets/icons/Outline/Exit.svg';
import Health from '@/assets/icons/Outline/Health.svg';
import Library from '@/assets/icons/Outline/Library.svg';
import MoneyBag from '@/assets/icons/Outline/Money Bag.svg';
import Presentation from '@/assets/icons/Outline/Presentation Graph.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Trash.svg';
import UserRounded from '@/assets/icons/Outline/User Rounded.svg';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Title from '@/components/common/Title.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import AssetsTab from '@/components/employee/all-employee/employee-detail/assets-tab/AssetsTab.vue';
import AttendanceHistoryTab from '@/components/employee/all-employee/employee-detail/attendance-history-tab/AttendanceHistoryTab.vue';
import BankInformationTab from '@/components/employee/all-employee/employee-detail/bank-information-tab/BankInformationTab.vue';
import ContractDetailTab from '@/components/employee/all-employee/employee-detail/contract-detail-tab/ContractDetailTab.vue';
import HistoryTab from '@/components/employee/all-employee/employee-detail/history-tab/HistoryTab.vue';
import InsuranceInformationTab from '@/components/employee/all-employee/employee-detail/insurance-information-tab/InsuranceInformationTab.vue';
import LeaveHistoryTab from '@/components/employee/all-employee/employee-detail/leave-history-tab/LeaveHistoryTab.vue';
import PerformanceTab from '@/components/employee/all-employee/employee-detail/perfomance-tab/PerformanceTab.vue';
import PersonalInformationTab from '@/components/employee/all-employee/employee-detail/personal-information-tab/PersonalInformationTab.vue';
import SalaryInformationTab from '@/components/employee/all-employee/employee-detail/salary-information-tab/SalaryInformationTab.vue';
import TrainingTab from '@/components/employee/all-employee/employee-detail/training-tab/TrainingTab.vue';
import WorkInformationTab from '@/components/employee/all-employee/employee-detail/work-information-tab/WorkInformationTab.vue';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import Separator from '@/components/ui/separator/Separator.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	useGetPersonalInformation,
	useGetWorkInformation,
} from '@/composables/employee/useEmployee';
import router from '@/routers';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const query = computed(() => route.query);
const employeeId = computed(() => route.params.id as string);

const { data: personalInformation, isError } = useGetPersonalInformation(employeeId);
const { data: workInformation } = useGetWorkInformation(employeeId);

const activeTab = ref('personnal');

const handleTab = (payload: any) => {
	activeTab.value = payload as string;
	router.replace({ query: { tab: activeTab.value } });
};

onMounted(() => {
	activeTab.value = (query.value.tab as string) ?? 'personnal';
});

watch(isError, (newVal) => {
	if (newVal) router.push('/employees/all-employees');
});
</script>
<template>
	<ContentWrapper>
		<Title>Employee Detail</Title>
		<Tabs :model-value="activeTab" @update:model-value="handleTab">
			<div class="flex gap-3 mt-4">
				<div class="border w-[268px] rounded-2xl p-4 relative">
					<DropdownMenu>
						<DropdownMenuTrigger class="absolute top-4 right-4">
							<IconFromSvg :icon="MenuDots" class="rotate-90" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" class="rounded-2xl">
							<DropdownMenuItem class="rounded-xl pr-4 py-3">
								<IconFromSvg :icon="AchiveDown" />Archive</DropdownMenuItem
							>
							<DropdownMenuItem
								class="rounded-xl text-red-500 focus:text-red-500 pr-4 py-3">
								<IconFromSvg :icon="Trash" />Delete</DropdownMenuItem
							>
						</DropdownMenuContent>
					</DropdownMenu>
					<div>
						<div class="flex flex-col items-center gap-3">
							<UserAvatar class="w-[120px] h-[120px]" />
							<Title>{{ personalInformation?.name }}</Title>
							<p>{{ workInformation?.position.title }}</p>
							<StatusTag
								:status="workInformation?.level || ''"
								class="bg-blue-50 hover:bg-blue-50 text-blue-500" />
						</div>
						<Separator class="my-4" />
						<ScrollArea class="h-[calc(100vh-524px)] pr-1">
							<TabsList class="flex flex-col gap-2 w-full bg-white">
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="personnal">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'personnal'"
											:icon="UserRoundedBold"
											class="!w-6 !h-6" />
										<IconFromSvg v-else :icon="UserRounded" class="!w-6 !h-6" />
										Personnal information
									</div>
								</TabsTrigger>
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="work">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'work'"
											:icon="CaseRoundBold"
											class="!w-6 !h-6" />
										<IconFromSvg v-else :icon="CaseRound" class="!w-6 !h-6" />
										Work information
									</div>
								</TabsTrigger>
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="salary">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'salary'"
											:icon="DollarBold"
											class="!w-6 !h-6" />
										<IconFromSvg v-else :icon="Dollar" class="!w-6 !h-6" />
										Salary information
									</div>
								</TabsTrigger>
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="contract">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'contract'"
											:icon="DocumentAddBold"
											class="!w-6 !h-6" />
										<IconFromSvg v-else :icon="DocumentAdd" class="!w-6 !h-6" />
										Contract details
									</div>
								</TabsTrigger>
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="insurance">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'insurance'"
											:icon="HealthBold"
											class="!w-6 !h-6" />
										<IconFromSvg v-else :icon="Health" class="!w-6 !h-6" />
										Insurance information
									</div>
								</TabsTrigger>
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="bank">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'bank'"
											:icon="MoneyBagBold"
											class="!w-6 !h-6" />
										<IconFromSvg v-else :icon="MoneyBag" class="!w-6 !h-6" />
										Bank information
									</div>
								</TabsTrigger>
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="attendance">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'attendance'"
											:icon="Chair2Bold"
											class="!w-6 !h-6" />
										<IconFromSvg v-else :icon="Chair2" class="!w-6 !h-6" />
										Attendance history
									</div>
								</TabsTrigger>
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="leave">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'leave'"
											:icon="ExitBold"
											class="!w-6 !h-6" />
										<IconFromSvg v-else :icon="Exit" class="!w-6 !h-6" />
										Leave history
									</div>
								</TabsTrigger>
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="performance">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'performance'"
											:icon="ChartBold"
											class="!w-6 !h-6" />
										<IconFromSvg v-else :icon="Chart" class="!w-6 !h-6" />
										Performance
									</div>
								</TabsTrigger>
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="assets">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'assets'"
											:icon="LibraryBold"
											class="!w-6 !h-6" />
										<IconFromSvg v-else :icon="Library" class="!w-6 !h-6" />
										Assets
									</div>
								</TabsTrigger>
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="training">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'training'"
											:icon="PresentationBold"
											class="!w-6 !h-6" />
										<IconFromSvg
											v-else
											:icon="Presentation"
											class="!w-6 !h-6" />
										Training
									</div>
								</TabsTrigger>
								<TabsTrigger
									class="py-2 px-3 text-slate-600 w-full justify-start rounded-xl data-[state=active]:shadow-none data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
									value="history">
									<div class="flex items-center gap-2">
										<IconFromSvg
											v-if="activeTab === 'history'"
											:icon="ClockCircleBold"
											class="!w-6 !h-6" />
										<IconFromSvg v-else :icon="ClockCircle" class="!w-6 !h-6" />
										History
									</div>
								</TabsTrigger>
							</TabsList>
						</ScrollArea>
					</div>
				</div>
				<div class="border flex-1 rounded-2xl p-4">
					<TabsContent class="mt-0 h-full" value="personnal">
						<PersonalInformationTab />
					</TabsContent>
					<TabsContent class="mt-0 h-full" value="work">
						<WorkInformationTab />
					</TabsContent>
					<TabsContent class="mt-0 h-full" value="salary">
						<SalaryInformationTab />
					</TabsContent>
					<TabsContent class="mt-0 h-full" value="contract">
						<ContractDetailTab />
					</TabsContent>
					<TabsContent class="mt-0 h-full" value="insurance">
						<InsuranceInformationTab />
					</TabsContent>
					<TabsContent class="mt-0 h-full" value="bank">
						<BankInformationTab />
					</TabsContent>
					<TabsContent class="mt-0 h-full" value="attendance">
						<AttendanceHistoryTab />
					</TabsContent>
					<TabsContent class="mt-0 h-full" value="leave">
						<LeaveHistoryTab />
					</TabsContent>
					<TabsContent class="mt-0 h-full" value="performance">
						<PerformanceTab />
					</TabsContent>
					<TabsContent class="mt-0 h-full" value="assets"> <AssetsTab /> </TabsContent>
					<TabsContent class="mt-0 h-full" value="training">
						<TrainingTab />
					</TabsContent>
					<TabsContent class="mt-0 h-full" value="history">
						<HistoryTab />
					</TabsContent>
				</div>
			</div>
		</Tabs>
	</ContentWrapper>
</template>
