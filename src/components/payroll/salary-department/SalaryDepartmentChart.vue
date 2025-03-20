<script setup lang="ts">
import { ref } from 'vue';
import { Chart } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	type ChartOptions,
	type ChartData,
} from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
);

// Dữ liệu biểu đồ (ref để có thể cập nhật)
const chartData = ref<ChartData<'bar' | 'line'>>({
	labels: ['Design', 'Marketing', 'Development', 'Product', 'Back Office', 'E-Commerce'],
	datasets: [
		{
			type: 'bar',
			label: 'Employee count',
			backgroundColor: '#0E6EED',
			borderRadius: 10, // Bo góc cột
			data: [8, 12, 15, 10, 11, 18],
			yAxisID: 'y',
			barThickness: 20,
			borderSkipped: false,
		},
		{
			type: 'line',
			label: 'Total salary',
			borderColor: '#FCD9A2',
			backgroundColor: '#FCD9A2',
			pointBackgroundColor: 'white',
			pointBorderColor: '#F8AD34',
			pointBorderWidth: 2,
			pointRadius: 5,
			tension: 0.4,
			fill: false,
			data: [78000000, 90000000, 120000000, 100000000, 85000000, 130000000],
			yAxisID: 'y1',
		},
	],
});

// Cấu hình biểu đồ
const chartOptions = ref<ChartOptions<'bar' | 'line'>>({
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: 'top',
			labels: {
				usePointStyle: true,
			},
		},
		tooltip: {
			yAlign: 'bottom',
			callbacks: {
				label: (tooltipItem) => {
					let value = tooltipItem.raw as number;
					if (tooltipItem.datasetIndex === 1) {
						return `₫${value.toLocaleString()}`;
					}
					return [value.toString()];
				},
			},
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			title: {
				display: true,
				text: 'Employee count',
			},
		},
		y1: {
			position: 'right',
			title: {
				display: true,
				text: 'Total salary (₫)',
			},
			beginAtZero: true,
			grid: {
				drawOnChartArea: false,
			},
		},
	},
});
</script>

<template>
	<div style="height: 300px">
		<Chart :data="chartData" :options="chartOptions" type="bar" />
	</div>
</template>
