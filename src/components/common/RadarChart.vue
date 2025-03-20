<script lang="ts" setup>
import { defineProps } from 'vue';
import { Radar } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	RadialLinearScale,
	PointElement,
	LineElement,
	type ChartData,
	Filler,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler);

defineProps<{
	chartData: ChartData<'radar', (number | null)[], unknown>;
	chartOptions: any;
}>();
</script>

<template>
	<Radar :data="chartData" :options="chartOptions" />
</template>
