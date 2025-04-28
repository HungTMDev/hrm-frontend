<script setup lang="ts">
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatDateValueToLocalDate } from '@/lib/utils';
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date';
import { onBeforeMount, ref } from 'vue';
import CalendarCustom from '../custom/CalendarCustom.vue';
import IconFromSvg from './IconFromSvg.vue';

const value = ref<DateValue>();

onBeforeMount(() => {
	const dateValue = today(getLocalTimeZone());
	value.value = dateValue;
});
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				:class="
					cn(
						'w-[150px] justify-start text-left font-normal rounded-2xl gap-3',
						!value && 'text-muted-foreground',
					)
				">
				<IconFromSvg :icon="Calendar" />
				{{ value ? formatDateValueToLocalDate(value) : 'Pick a date' }}
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-auto p-0 rounded-2xl" align="end">
			<CalendarCustom v-model="value" initial-focus />
		</PopoverContent>
	</Popover>
</template>
