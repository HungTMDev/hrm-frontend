<script lang="ts" setup>
import { Bar } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	type ChartData,
} from 'chart.js';
import type { ExtendedDataPoint } from 'node_modules/vue-chartjs/dist/typedCharts';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

defineProps<{
	chartData: ChartData<'bar', (number | [number, number] | null)[] | ExtendedDataPoint[], unknown>;
	chartOptions: any;
}>();
</script>
<template>
	<Bar :data="chartData" :options="chartOptions" />
</template>
