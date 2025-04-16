<script lang="ts" setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

defineProps<{
	data: ChartData<'doughnut', number[], unknown>;
	options: any;
	plugins?: any;
}>();
</script>
<template>
	<Doughnut :data="data" :options="options" :plugins="plugins" />
</template>
