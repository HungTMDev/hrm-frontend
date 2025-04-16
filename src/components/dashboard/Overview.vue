<script lang="ts" setup>
import Down from '@/assets/icons/Bold/Alt Arrow Down.svg';
import Up from '@/assets/icons/Bold/Alt Arrow Up.svg';
import { useCounter } from '@vueuse/core';
import { onMounted } from 'vue';
import Description from '../common/Description.vue';
import Badge from '../ui/badge/Badge.vue';
import Separator from '../ui/separator/Separator.vue';
import IconFromSvg from '../common/IconFromSvg.vue';

interface Prop {
	title: string;
	quantity: number;
	percentage: number;
	updated_date?: string;
	icon: any;
}
const props = defineProps<Prop>();

const quantityCount = useCounter(0, { max: props.quantity });
const percentageCount = useCounter(0, {
	max: props.percentage >= 0 ? props.percentage : -props.percentage,
});

const startCounting = () => {
	let intervalQuantity = setInterval(() => {
		quantityCount.inc(5);
		if (quantityCount.count.value >= props.quantity) clearInterval(intervalQuantity);
	}, 50);

	let intervalPercentage = setInterval(() => {
		percentageCount.inc(2);
		const max = props.percentage >= 0 ? props.percentage : -props.percentage;
		if (percentageCount.count.value >= max) clearInterval(intervalPercentage);
	}, 100);
};

onMounted(() => {
	startCounting();
});
</script>
<template>
	<div class="flex flex-col gap-4 h-full">
		<div class="flex items-center gap-2">
			<div class="p-2 bg-blue-50 text-blue-500 rounded-full">
				<IconFromSvg :icon="icon" />
			</div>
			<h3>{{ title }}</h3>
		</div>
		<div class="flex flex-1 justify-between items-center">
			<p class="text-[28px] font-medium">{{ quantityCount.count }}</p>
			<Badge
				:class="[
					'px-2 py-1 flex gap-1 items-center text-xs font-normal',
					percentage < 0
						? 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500'
						: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
				]">
				<!-- <ArrowDown v-if="percentage < 0" :size="16" />
				<ArrowUp v-else :size="16" /> -->
				<IconFromSvg
					v-if="percentage < 0"
					:icon="Down"
					class="fill-current w-4 h-4"
					viewBox="0 0 24 24" />
				<IconFromSvg v-else :icon="Up" class="fill-current w-4 h-4" viewBox="0 0 24 24" />
				{{ percentageCount.count }}%
			</Badge>
		</div>
		<Separator v-if="updated_date" />
		<Description v-if="updated_date">Update: {{ updated_date }}</Description>
	</div>
</template>
