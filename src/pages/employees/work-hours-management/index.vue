<script lang="ts" setup>
import LineChart from '@/components/common/chart/LineChart.vue';
import CommonCombobox from '@/components/common/CommonCombobox.vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import Title from '@/components/common/Title.vue';
import AttendanceOverview from '@/components/employee/work-hours-management/attendance-management/AttendanceOverview.vue';
import LeaveOverview from '@/components/employee/work-hours-management/leave-management/LeaveOverview.vue';
import OvertimeOverview from '@/components/employee/work-hours-management/overtime-management/OvertimeOverview.vue';

const chartData = {
	labels: [
		'12/04',
		'13/04',
		'14/04',
		'15/04',
		'16/04',
		'17/04',
		'18/04',
		'19/04',
		'20/04',
		'21/04',
	],
	datasets: [
		{
			label: 'Attendance',
			data: [85, 89, 90, 87, 94, 88, 80, 86, 83, 91],
			borderColor: '#0E6EED',
			borderWidth: 2,
			backgroundColor: (ctx: any) => {
				const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
				gradient.addColorStop(0, ' rgba(14, 110, 237, 0.30)');
				gradient.addColorStop(1, 'rgba(14, 110, 237, 0.00)');
				return gradient;
			},
			fill: true,
			tension: 0.3,
			pointBackgroundColor: '#fff',
			pointBorderColor: '#0E6EED',
			pointRadius: 5,
			pointHoverRadius: 6,
		},
	],
};

const chartOptions = {
	responsive: true,
	scales: {
		y: {
			min: 0,
			max: 100,
			ticks: {
				stepSize: 20,
				callback: (value: any) => value + '%',
			},
			grid: {
				drawBorder: false,
			},
		},
		x: {
			grid: {
				drawBorder: false,
			},
		},
	},
	plugins: {
		tooltip: {
			callbacks: {
				label: (context: any) => {
					return ` ${context.dataset.label}: ${context.formattedValue}%`;
				},
			},
			backgroundColor: '#fff',
			titleColor: '#000',
			bodyColor: '#000',
			borderColor: '#E5E7EB',
			borderWidth: 1,
			titleFont: {
				weight: 'bold',
			},
			bodyFont: {
				weight: 'bold',
			},
			padding: 12,
		},
		legend: {
			display: false,
		},
	},
};
</script>
<template>
	<div class="grid grid-cols-5 grid-rows-6 gap-4">
		<ContentWrapper class="col-span-3 row-span-2">
			<div class="mb-8 flex justify-between items-center">
				<Title>Attendance Comparison</Title>
				<CommonCombobox label="Daily" :list="[]" class="w-24 rounded-3xl" />
			</div>
			<div>
				<LineChart
					:chart-data="chartData"
					:chart-options="chartOptions"
					style="width: 100%; height: 250px" />
			</div>
		</ContentWrapper>
		<ContentWrapper class="col-span-2 row-span-3"><LeaveOverview /></ContentWrapper>
		<ContentWrapper class="col-span-3 row-span-4"><AttendanceOverview /></ContentWrapper>
		<ContentWrapper class="col-span-2 row-span-3"><OvertimeOverview /></ContentWrapper>
	</div>
</template>
