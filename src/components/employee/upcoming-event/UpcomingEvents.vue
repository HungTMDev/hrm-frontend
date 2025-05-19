<script lang="ts" setup>
import Left from '@/assets/icons/Outline/Alt Arrow Left.svg';
import Right from '@/assets/icons/Outline/Alt Arrow Right.svg';
import Confetti from '@/assets/icons/Outline/Confetti Minimalistic.svg';
import Medal from '@/assets/icons/Outline/Medal Ribbon Star.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Title from '@/components/common/Title.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import { addWeeks, format, isWithinInterval, startOfWeek } from 'date-fns';
import { computed, ref } from 'vue';

const currentWeekStart = ref(startOfWeek(new Date(), { weekStartsOn: 1 }));

const changeWeek = (direction: any) => {
	currentWeekStart.value = addWeeks(currentWeekStart.value, direction);
};

const events = ref([
	{ date: new Date(2025, 2, 2), type: 'birthday', image: 'https://via.placeholder.com/40' },
	{ date: new Date(2025, 2, 5), type: 'anniversary', image: 'https://via.placeholder.com/40' },
	{ date: new Date(2025, 2, 5), type: 'birthday', image: 'https://via.placeholder.com/40' },
	{ date: new Date(2025, 2, 6), type: 'birthday', image: 'https://via.placeholder.com/40' },
	{ date: new Date(2025, 2, 6), type: 'anniversary', image: 'https://via.placeholder.com/40' },
]);

const days = computed(() => {
	return Array.from({ length: 7 }, (_, i) => {
		const date = addWeeks(currentWeekStart.value, 0);
		return {
			label: format(addWeeks(date, 0).setDate(date.getDate() + i), 'EEE'),
			date: format(addWeeks(date, 0).setDate(date.getDate() + i), 'd'),
		};
	});
});

const filteredEvents = computed(() => {
	return events.value.filter((event) =>
		isWithinInterval(event.date, {
			start: currentWeekStart.value,
			end: addWeeks(currentWeekStart.value, 0).setDate(currentWeekStart.value.getDate() + 6),
		}),
	);
});
</script>

<template>
	<div class="">
		<!-- Header -->
		<div class="flex justify-between items-center mb-4">
			<Title>Upcoming Events</Title>
			<div class="flex space-x-2">
				<button
					@click="changeWeek(-1)"
					class="p-1 rounded-xl bg-blue-50 hover:bg-blue-50 text-blue-500">
					<IconFromSvg :icon="Left" />
				</button>
				<button
					@click="changeWeek(1)"
					class="p-1 rounded-xl bg-blue-50 hover:bg-blue-50 text-blue-500">
					<IconFromSvg :icon="Right" />
				</button>
			</div>
		</div>

		<!-- Events List -->
		<div>
			<div
				v-for="(day, index) in days"
				:key="index"
				class="flex items-start space-x-2 mb-3 gap-1">
				<div class="w-10 text-gray-500 text-sm font-semibold text-center">
					{{ day.label }} <br />
					<span class="text-lg text-black">{{ day.date }}</span>
				</div>
				<div class="w-px bg-gray-300 h-10"></div>
				<div class="flex space-x-2">
					<div
						v-for="(event, idx) in filteredEvents.filter(
							(e: any) => format(e.date, 'd') === day.date,
						)"
						:key="idx">
						<div class="relative">
							<UserAvatar class="w-11 h-11" />
							<span
								v-if="event.type === 'birthday'"
								class="absolute -top-1 -left-1 w-6 h-6 flex items-center justify-center rounded-full text-blue-500 text-xs bg-blue-50">
								<IconFromSvg :icon="Confetti" />
							</span>
							<span
								v-else
								class="absolute -top-1 -left-1 w-6 h-6 flex items-center justify-center rounded-full text-green-500 text-xs bg-green-50">
								<IconFromSvg :icon="Medal" />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Legend -->
		<div class="flex items-center space-x-4 mt-4">
			<div class="flex items-center">
				<span
					class="w-8 h-8 bg-blue-50 rounded-full mr-2 text-blue-500 grid place-items-center">
					<IconFromSvg :icon="Confetti" />
				</span>
				<span class="text-xs text-gray-500">Birthday</span>
			</div>
			<div class="flex items-center">
				<span
					class="w-8 h-8 bg-green-50 rounded-full mr-2 text-green-500 grid place-items-center">
					<IconFromSvg :icon="Medal" />
				</span>
				<span class="text-xs text-gray-500">Anniversary</span>
			</div>
		</div>
	</div>
</template>
