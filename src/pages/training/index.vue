<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import RadarChart from '@/components/common/RadarChart.vue';
import { CORE_CAPACITY_LABEL } from '@/constants';
import type { ChartData, ChartOptions } from 'chart.js';
import { ref } from 'vue';

const chartData = ref<ChartData<'radar', (number | null)[], unknown>>({
	labels: CORE_CAPACITY_LABEL,
	datasets: [
		{
			label: 'Điểm hiện tại',
			data: [4, 3, 5, 5, 5, 4, 4, 3, 5, 5, 5, 5, 5],
			backgroundColor: 'rgba(54, 162, 235, 0.2)',
			borderColor: '#0E6EED',
			borderWidth: 2,
			fill: true,
			pointBackgroundColor: '#0E6EED',
			pointBorderColor: '#ffffff',
			pointBorderWidth: 0.5,
		},
		{
			label: 'Cầu thủ B',
			data: [4, 3, 5, 1, 2, 5, 4, 3, 4, 5, 5, 3, 5],
			backgroundColor: 'rgba(248, 173, 52, 0.15)',
			borderColor: '#F8AD34',
			borderWidth: 2,
			fill: true,
			pointBackgroundColor: '#F8AD34',
			pointBorderColor: '#ffffff',
			pointBorderWidth: 0.5,
		},
	],
});

const chartOptions = ref<ChartOptions>({
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		r: {
			beginAtZero: true,
			grid: {
				color: 'rgba(0, 0, 0, 0.1)',
			},
			angleLines: {
				color: 'rgba(0, 0, 0, 0.2)',
			},
			ticks: {
				display: false,
			},
			pointLabels: {
				font: {
					size: 10,
					weight: 'bold', // Tùy chọn: làm đậm chữ
				},
			},
		},
	},
	plugins: {
		tooltip: {
			enabled: false,
			external: ({ chart, tooltip }) => {
				let tooltipEl = document.getElementById('chart-tooltip');

				if (!tooltipEl) {
					tooltipEl = document.createElement('div');
					tooltipEl.id = 'chart-tooltip';
					tooltipEl.className =
						'absolute bg-white shadow-xl rounded-lg px-3 py-1 flex items-start flex-col gap-2 hidden max-w-[250px] text-wrap';
					document.body.appendChild(tooltipEl);
				}

				// Nếu tooltip không hiển thị, ẩn đi bằng display: none
				if (!tooltip.opacity) {
					tooltipEl.style.display = 'none';
					return;
				}

				// Hiển thị tooltip bằng display: block
				tooltipEl.style.display = 'flex';

				const dataIndex = tooltip.dataPoints[0].dataIndex;
				const labels = chart.data.labels?.[dataIndex] as string[];

				let tooltipHTML = `<div class="text-gray-600 font-semibold text-sm ">${labels.join(' ')}</div>`;

				tooltip.dataPoints.forEach((point) => {
					const dataset = chart.data.datasets[point.datasetIndex];
					const value = dataset.data[point.dataIndex];

					tooltipHTML += `
          <div class="flex items-center gap-2 text-xs w-full">
            <span class="w-2.5 h-2.5 rounded-full" style="background:${dataset.borderColor}"></span>
            <span class="text-gray-600 flex-1">${dataset.label}</span>
            <span class="font-semibold text-black">${value}</span>
          </div>
        `;
				});

				tooltipEl.innerHTML = tooltipHTML;

				const position = chart.canvas.getBoundingClientRect();
				tooltipEl.style.left = `${position.left + window.pageXOffset + tooltip.caretX - tooltipEl.clientWidth / 2}px`;
				tooltipEl.style.top = `${position.top + window.pageYOffset + tooltip.caretY - tooltipEl.clientHeight - 10}px`;
			},
		},
	},
});
</script>
<template>
	<ContentWrapper class="w-1/2">
		<RadarChart :chartData="chartData" :chartOptions="chartOptions" />
	</ContentWrapper>
</template>
