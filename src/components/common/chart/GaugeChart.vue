<script lang="ts" setup>
import { Doughnut } from 'vue-chartjs';

defineProps<{
	chartData: any;
	chartOptions: any;
	value?: number;
	maxValue?: number;
}>();
</script>
<template>
	<Doughnut :data="chartData" :options="chartOptions" />
</template>
