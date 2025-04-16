<script lang="ts" setup>
import Down from '@/assets/icons/Bold/Alt Arrow Down.svg';
import UserCross from '@/assets/icons/Outline/User Cross Rounded.svg';
import UserPlus from '@/assets/icons/Outline/User Plus Rounded.svg';
import UserGroup from '@/assets/icons/Outline/Users Group Two Rounded.svg';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Title from '@/components/common/Title.vue';

import SquareAcademic from '@/assets/icons/Outline/Square Academic Cap.svg';
import DoughnutChart from '@/components/common/chart/DoughnutChart.vue';
import GaugeChart from '@/components/common/chart/GaugeChart.vue';
import StackedBarChart from '@/components/common/chart/StackedBarChart.vue';
import AnnotationItem from '@/components/employee/employee-overview/AnnotationItem.vue';
import DepartmentFilter from '@/components/employee/employee-overview/DepartmentFilter.vue';
import TimeFilter from '@/components/employee/employee-overview/TimeFilter.vue';
import { ref } from 'vue';

const chartData = {
	datasets: [
		{
			data: [96.0, 4.0],
			backgroundColor: ['#0E6EED', '#B0D8FF'],
			borderWidth: 0,
			borderRadius: 99999,
			cutout: '40%',
			spacing: 2,
		},
		{
			data: [100],
			backgroundColor: ['#ffffff'],
			borderWidth: 0,
			hoverBackgroundColor: ['#ffffff'],
		},
		{
			data: [35.8, 64.2],
			backgroundColor: ['#A855F7', '#F3E8FF'],
			borderWidth: 0,
			borderRadius: 99999,
			cutout: '40%',
			spacing: 2,
		},
		{
			data: [100],
			backgroundColor: ['#ffffff'],
			borderWidth: 0,
			hoverBackgroundColor: ['#ffffff'],
		},
		{
			data: [9.6, 90.4],
			backgroundColor: ['#45BB25', '#C8F0BD'],
			borderWidth: 0,
			borderRadius: 99999,
			cutout: '40%',
			spacing: 2,
		},
	],
};

const qualificationChartData = {
	datasets: [
		{
			data: [2, 98, 16, 4, 5, 0],
			backgroundColor: ['#0E6EED', '#A855F7', '#45BB25', '#F8AD34', '#F97316', '#EC4899'],
			borderWidth: 0,
			borderRadius: 24,
			cutout: '80%',
			spacing: 2,
		},
	],
};

const gaugeChartData = {
	datasets: [
		{
			data: [3.2, 100 - 3.2],
			backgroundColor: ['#0E6EED', '#E6F2FF'],
			borderWidth: 0,
			cutout: '75%',
			rotation: -90,
			circumference: 180,
			spacing: 3,
			borderRadius: 8,
		},
	],
};

const stackChartData = ref({
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	datasets: [
		{
			label: 'New Employee',
			backgroundColor: '#6366F1',
			borderRadius: 24,
			borderSkipped: false,
			data: [5, 4, 6, 7, 6, 5, 7, 8, 7, 5, 6, 7],
			barThickness: 12,
		},
		{
			label: 'Resigned Employee',
			backgroundColor: '#EC4899',
			borderRadius: 24,
			data: [-2, -2, -3, -3, -2, -2, -2, -2, -6, -3, -2, -2],
			barThickness: 12,
			borderSkipped: false,
		},
	],
});

const centerTextPlugin = {
	id: 'centerText',
	beforeDraw(chart: any) {
		const { width, height, ctx } = chart;
		ctx.save();
		ctx.font = '600 32px Inter';
		ctx.fillStyle = '#000';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		ctx.fillText('125', width / 2, height / 2 - 10);

		ctx.font = '500 16px Inter';
		ctx.fillStyle = '#475569';
		ctx.fillText('Employees', width / 2, height / 2 + 20);

		ctx.restore();
	},
};

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: { display: false },
		tooltip: { enabled: false },
	},
};

const barChartOptions = ref({
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: true,
			position: 'top',
			labels: {
				usePointStyle: true,
				boxWidth: 8,
				font: {
					family: "'Inter', sans-serif",
				},
			},
		},
		tooltip: {
			callbacks: {
				label: (tooltipItem: any) => {
					return `${tooltipItem.dataset.label}: ${Math.abs(tooltipItem.raw)}`;
				},
			},
			titleFont: {
				family: "'Inter', sans-serif",
				size: 16,
			},
			bodyFont: {
				family: "'Inter', sans-serif",
				size: 14,
			},
			backgroundColor: '#fff',
			titleColor: '#000',
			bodyColor: '#000',
			borderColor: '#ddd',
			borderWidth: 1,
			padding: 10,
			cornerRadius: 8,
			shadowOffsetX: 2,
			shadowOffsetY: 2,
			shadowBlur: 10,
			shadowColor: 'rgba(0, 0, 0, 0.1)',
		},
	},
	scales: {
		x: {
			stacked: true,
			grid: { display: false },
			ticks: {
				font: {
					family: "'Inter', sans-serif",
					size: 14,
				},
			},
		},
		y: {
			stacked: true,
			grid: { color: '#eee' },
			ticks: {
				stepSize: 1,
				callback: (value: any) => Math.abs(value),
				font: {
					family: "'Inter', sans-serif",
					size: 14,
				},
			},
		},
	},
});
</script>
<template>
	<ContentWrapper>
		<Title>Employee Overview</Title>
		<div class="flex gap-2 justify-end">
			<TimeFilter />
			<DepartmentFilter
				:list="[
					{
						label: 'Design',
						value: 'design',
					},
					{
						label: 'Marketing',
						value: 'marketing',
					},
					{
						label: 'Development',
						value: 'development',
					},
				]" />
		</div>
		<div class="mt-4 grid grid-cols-3 gap-4">
			<div class="p-6 border rounded-3xl col-span-3">
				<div class="flex items-center gap-2">
					<div class="p-2 bg-blue-50 text-blue-500 rounded-full">
						<IconFromSvg :icon="UserGroup" />
					</div>
					<h3 class="flex-1 text-xl font-semibold">Total Employee</h3>
				</div>
				<div class="flex 2xl:gap-20 gap-14 py-8 px-10">
					<div class="flex flex-col gap-4 2xl:px-12">
						<div class="w-[400px] h-[400px]">
							<DoughnutChart :data="chartData" :options="chartOptions" />
						</div>
						<div class="flex justify-between items-center">
							<p class="text-base font-medium">Total</p>
							<p><span class="text-[32px] font-semibold">125</span> Employees</p>
						</div>
					</div>
					<div class="flex-1 grid grid-cols-2 gap-x-6 gap-y-10">
						<AnnotationItem
							color="#0E6EED"
							:growth-percentage="-9.1"
							:total="120"
							:total-percentage="96.0"
							title="Working" />
						<AnnotationItem
							color="#B0D8FF"
							:growth-percentage="-28.3"
							:total="43"
							:total-percentage="4.0"
							title="Not working" />
						<AnnotationItem
							color="#A855F7"
							:growth-percentage="-9.1"
							:total="120"
							:total-percentage="35.8"
							title="Male" />
						<AnnotationItem
							color="#F3E8FF"
							:growth-percentage="6.9"
							:total="77"
							:total-percentage="64.2"
							title="Female" />
						<AnnotationItem
							color="#45BB25"
							:growth-percentage="-6.4"
							:total="12"
							:total-percentage="9.6"
							title="Leader/Manager" />
						<AnnotationItem
							color="#C8F0BD"
							:growth-percentage="12.8"
							:total="113"
							:total-percentage="90.4"
							title="Member" />
					</div>
				</div>
			</div>
			<div class="col-span-2 border rounded-3xl p-6">
				<div class="flex items-center gap-2">
					<div class="p-2 bg-blue-50 text-blue-500 rounded-full">
						<IconFromSvg :icon="SquareAcademic" />
					</div>
					<h3 class="flex-1 text-xl font-semibold">Employee by Qualification</h3>
				</div>
				<div class="flex items-center gap-10 2xl:gap-28 mt-6 2xl:px-20">
					<div class="w-[240px] h-[240px] lg:w-[300px] lg:h-[300px]">
						<DoughnutChart
							:data="qualificationChartData"
							:options="chartOptions"
							:plugins="[centerTextPlugin]" />
					</div>
					<div class="flex-1">
						<div class="flex flex-col gap-6">
							<div class="flex justify-between">
								<div class="flex gap-2 items-center">
									<div class="w-6 h-6 bg-blue-500 rounded-full"></div>
									<span class="text-slate-600">Master's Degree</span>
								</div>
								<p class="text-base font-medium">
									1.6% <span class="text-slate-600 text-sm">(2 Employees)</span>
								</p>
							</div>
							<div class="flex justify-between">
								<div class="flex gap-2 items-center">
									<div class="w-6 h-6 bg-purple-500 rounded-full"></div>
									<span class="text-slate-600">Bachelor’s Degree</span>
								</div>
								<p class="text-base font-medium">
									78.4% <span class="text-slate-600 text-sm">(98 Employees)</span>
								</p>
							</div>
							<div class="flex justify-between">
								<div class="flex gap-2 items-center">
									<div class="w-6 h-6 bg-green-500 rounded-full"></div>
									<span class="text-slate-600">College Diploma</span>
								</div>
								<p class="text-base font-medium">
									12.8% <span class="text-slate-600 text-sm">(16 Employees)</span>
								</p>
							</div>
							<div class="flex justify-between">
								<div class="flex gap-2 items-center">
									<div class="w-6 h-6 bg-yellow-500 rounded-full"></div>
									<span class="text-slate-600">Intermediate Level</span>
								</div>
								<p class="text-base font-medium">
									3.2% <span class="text-slate-600 text-sm">(4 Employees)</span>
								</p>
							</div>
							<div class="flex justify-between">
								<div class="flex gap-2 items-center">
									<div class="w-6 h-6 bg-orange-500 rounded-full"></div>
									<span class="text-slate-600">Vocational Training</span>
								</div>
								<p class="text-base font-medium">
									4.0% <span class="text-slate-600 text-sm">(5 Employees)</span>
								</p>
							</div>
							<div class="flex justify-between">
								<div class="flex gap-2 items-center">
									<div class="w-6 h-6 bg-pink-500 rounded-full"></div>
									<span class="text-slate-600">Unskilled Labor</span>
								</div>
								<p class="text-base font-medium">
									0% <span class="text-slate-600 text-sm">(0 Employees)</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="border rounded-3xl p-6">
				<div class="flex items-center gap-2">
					<div class="p-2 bg-blue-50 text-blue-500 rounded-full">
						<IconFromSvg :icon="UserCross" />
					</div>
					<h3 class="flex-1 text-xl font-semibold">Resigned Employee</h3>
				</div>
				<div class="relative w-full">
					<GaugeChart
						:chart-data="gaugeChartData"
						:chart-options="chartOptions"
						:value="3.2" />

					<span
						class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32px] font-semibold flex items-center gap-2 justify-center">
						<IconFromSvg :icon="Down" />3.2%
					</span>
				</div>
			</div>
			<div class="col-span-2 border rounded-3xl p-6">
				<div class="flex items-center gap-2">
					<div class="p-2 bg-blue-50 text-blue-500 rounded-full">
						<IconFromSvg :icon="UserPlus" />
					</div>
					<h3 class="flex-1 text-xl font-semibold">New Employee - Resigned Employee</h3>
				</div>
				<div class="h-[300px]">
					<StackedBarChart
						:chart-data="stackChartData"
						:chart-options="barChartOptions" />
				</div>
			</div>
		</div>
	</ContentWrapper>
</template>
