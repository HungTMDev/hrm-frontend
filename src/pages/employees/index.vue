<script lang="ts" setup>
import UserCheck from '@/assets/icons/Outline/User Check.svg';
import UserCross from '@/assets/icons/Outline/User Cross.svg';
import UserGroup from '@/assets/icons/Outline/Users Group Two Rounded.svg';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DoughnutChart from '@/components/common/chart/DoughnutChart.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Title from '@/components/common/Title.vue';
import Overview from '@/components/dashboard/Overview.vue';
import ListEmployee from '@/components/employee/list-employee/ListEmployee.vue';
import UpcomingEvents from '@/components/employee/upcoming-event/UpcomingEvents.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import router from '@/routers';

const data = {
	datasets: [
		{
			data: [48, 42, 30],
			backgroundColor: ['#0E6EED', '#45BB25', '#F8AD34'],
			borderWidth: 0,
			borderRadius: 24,
			cutout: '80%',
			spacing: 2,
		},
	],
};

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: { display: false },
		tooltip: { enabled: false },
	},
};

const centerTextPlugin = {
	id: 'centerText',
	beforeDraw(chart: any) {
		const { width, height, ctx } = chart;
		ctx.save();
		ctx.font = '600 32px Inter';
		ctx.fillStyle = '#000';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		ctx.fillText('120', width / 2, height / 2 - 10);

		ctx.font = '500 16px Inter';
		ctx.fillStyle = '#475569';
		ctx.fillText('Total Employees', width / 2, height / 2 + 20);

		ctx.restore();
	},
};

const handleNavigate = () => {
	router.push('/employees/employee-overview');
};
</script>
<template>
	<div class="grid grid-cols-3 grid-rows-6 gap-4">
		<div class="col-span-2 row-span-2 grid grid-cols-3 grid-rows-2 gap-4">
			<ContentWrapper class="col-span-2 row-span-2">
				<div class="flex items-center gap-2">
					<div class="p-2 bg-blue-50 text-blue-500 rounded-full">
						<IconFromSvg :icon="UserGroup" />
					</div>
					<h3 class="flex-1">Total Employee</h3>
					<Button variant="link" class="text-blue-500" @click="handleNavigate"
						>View more</Button
					>
				</div>
				<div class="mt-4 flex 2xl:gap-20 gap-4 items-center px-10">
					<div class="w-[180px] h-[180px] 2xl:w-[250px] 2xl:h-[250px]">
						<DoughnutChart
							:data="data"
							:options="chartOptions"
							:plugins="[centerTextPlugin]" />
					</div>
					<div class="flex flex-col gap-4 2xl:flex-1">
						<div class="flex items-center gap-2 text-sm 2xl:w-4/5">
							<div class="w-5 h-5 rounded-full bg-blue-500"></div>
							<span class="text-slate-600 flex-1">Permanent Employee</span>
							<span class="font-medium">48</span>
						</div>
						<div class="flex items-center gap-2 text-sm 2xl:w-4/5">
							<div class="w-5 h-5 rounded-full bg-green-500"></div>
							<span class="text-slate-600 flex-1">Contract Employee</span>
							<span class="font-medium">42</span>
						</div>
						<div class="flex items-center gap-2 text-sm 2xl:w-4/5">
							<div class="w-5 h-5 rounded-full bg-yellow-500"></div>
							<span class="text-slate-600 flex-1">Internship / Training</span>
							<span class="font-medium">30</span>
						</div>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper>
				<Overview title="New Employee" :percentage="32" :quantity="16" :icon="UserCheck" />
			</ContentWrapper>
			<ContentWrapper>
				<Overview
					title="Resigned Employee"
					:percentage="-3"
					:quantity="3"
					:icon="UserCross" />
			</ContentWrapper>
		</div>
		<ContentWrapper class="row-span-3"><UpcomingEvents /></ContentWrapper>
		<ContentWrapper class="col-span-2 row-span-4"><ListEmployee /></ContentWrapper>
		<ContentWrapper class="row-span-3">
			<div class="flex justify-between items-center">
				<Title>Contract Signing Reminder</Title>
				<span
					class="w-5 h-5 rounded-full bg-red-500 text-white grid place-items-center text-sm">
					4
				</span>
			</div>
			<Separator class="my-4" />
			<div class="flex flex-col gap-4">
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
			</div>
		</ContentWrapper>
	</div>
</template>
