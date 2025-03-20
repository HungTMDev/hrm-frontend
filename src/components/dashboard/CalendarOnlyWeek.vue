<script setup lang="ts">
import Left from '@/assets/icons/Outline/Alt Arrow Left.svg';
import Right from '@/assets/icons/Outline/Alt Arrow Right.svg';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { addDays, addWeeks, format, isSameDay, startOfWeek, subWeeks } from 'date-fns';
import { computed, ref } from 'vue';

const selectedDate = ref(new Date());
const startOfCurrentWeek = computed(() => startOfWeek(selectedDate.value, { weekStartsOn: 1 }));

const weekDays = computed(() =>
	Array.from({ length: 7 }).map((_, i) => addDays(startOfCurrentWeek.value, i)),
);

const selectDate = (date: Date) => {
	selectedDate.value = date;
};

const prevWeek = () => {
	selectedDate.value = subWeeks(selectedDate.value, 1);
};

const nextWeek = () => {
	selectedDate.value = addWeeks(selectedDate.value, 1);
};
</script>

<template>
	<Card class="p-4 w-full text-center border-none">
		<CardContent class="p-2">
			<div class="flex justify-between items-center">
				<h2 class="font-semibold">{{ format(selectedDate, 'MMMM d, yyyy') }}</h2>
				<div class="flex gap-2">
					<button
						class="text-blue-500 p-1 hover:bg-blue-100 bg-blue-50 rounded-xl"
						@click="prevWeek">
						<!-- <ChevronLeft /> -->
						<component :is="Left" class="fill-current"></component>
					</button>
					<button
						class="text-blue-500 p-1 hover:bg-blue-100 bg-blue-50 rounded-xl"
						@click="nextWeek">
						<!-- <ChevronRight /> -->
						<component :is="Right" class="fill-current"></component>
					</button>
				</div>
			</div>

			<div class="grid grid-cols-7 mt-2 gap-1 text-sm">
				<span
					v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
					:key="day"
					class="text-gray-500">
					{{ day }}
				</span>
			</div>

			<div class="grid grid-cols-7 mt-1 gap-1 place-items-center">
				<Button
					v-for="day in weekDays"
					:key="day.toDateString()"
					:class="{
						'bg-blue-500 text-white hover:bg-blue-500 hover:text-white': isSameDay(
							day,
							selectedDate,
						),
					}"
					variant="ghost"
					class="rounded-full w-8 h-8"
					@click="selectDate(day)">
					{{ format(day, 'd') }}
				</Button>
			</div>
		</CardContent>
	</Card>
</template>
