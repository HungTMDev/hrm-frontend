<script setup lang="ts">
import Left from '@/assets/icons/Outline/Alt Arrow Left.svg';
import Right from '@/assets/icons/Outline/Alt Arrow Right.svg';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import CalendarCustom from '@/components/custom/CalendarCustom.vue';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Input from '@/components/ui/input/Input.vue';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { parseDateTime } from '@/lib/utils';
import { CalendarDate, getLocalTimeZone, today, type DateValue } from '@internationalized/date';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref, type Ref } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { z } from 'zod';

const events: Ref<any[]> = ref([
	{
		id: '1',
		title: 'Event 1',
		start: '2025-04-17 10:00',
		end: '2025-04-17 12:00',
	},
]);
const isOpenDialog = ref(false);
const currentDate = ref<DateValue | undefined>(today(getLocalTimeZone()) as DateValue) as any;

const formSchema = toTypedSchema(
	z.object({
		title: z.string().min(1),
	}),
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((value) => {
	const event = events.value.find((e) => e.done === false);
	if (event) {
		event.title = value.title;
		event.done = true;
	}
	isOpenDialog.value = false;
});

const handlePick = (payload: DateValue | undefined) => {
	currentDate.value = payload;
};

const handleDragToCreate = (value: any) => {
	isOpenDialog.value = true;

	const { date: startDate, time: startTime } = parseDateTime(value.start);
	const { date: endDate, time: endTime } = parseDateTime(value.end);

	const start = `${startDate} ${startTime}`;
	const end = `${endDate} ${endTime}`;

	events.value.push({
		id: value._eid,
		title: '',
		start,
		end,
		done: false,
	});
};

const handleCellClick = (e: any) => {
	let date;
	if (e instanceof Date) {
		date = new Date(e);
	} else {
		date = new Date(e.date);
	}

	const d = date.getDate();
	const m = date.getMonth() + 1;
	const y = date.getFullYear();

	const value = new CalendarDate(y, m, d);
	currentDate.value = value;
};

const handleCloseDialog = (open: boolean) => {
	events.value = events.value.filter((e) => e.done !== false);
	isOpenDialog.value = open;
};

const handleChangeDuration = async (payload: any) => {
	const id = payload.event.id;
	const { date: startDate, time: startTime } = parseDateTime(payload.event.start);
	const { date: endDate, time: endTime } = parseDateTime(payload.event.end);

	const start = `${startDate} ${startTime}`;
	const end = `${endDate} ${endTime}`;

	const event = events.value.find((e) => e.id === id);
	if (event) {
		event.start = start;
		event.end = end;
	}
};
</script>

<template>
	<ContentWrapper class="flex gap-8">
		<CalendarCustom
			v-model="currentDate"
			:weekday-format="'short'"
			class="rounded-md border w-fit h-fit"
			@update:model-value="handlePick" />
		<div class="flex-1">
			<vue-cal
				:events="events"
				:selected-date="currentDate?.toString()"
				:disable-views="['years', 'year', 'month']"
				:time-from="8 * 60"
				:time-to="19 * 60"
				:time-step="30"
				:snap-to-time="15"
				:editable-events="{
					title: false,
					drag: true,
					resize: true,
					delete: true,
					create: true,
				}"
				@event-drag-create="handleDragToCreate"
				@cell-click="handleCellClick"
				@event-drop="handleChangeDuration"
				@event-duration-change="handleChangeDuration">
				<template #title="{ title }">
					<h1 class="text-xl text-center font-medium">
						{{ title }}
					</h1>
				</template>
				<template #no-event>
					<span></span>
				</template>
				<template #arrow-prev>
					<Button variant="ghost" class="hover:bg-inherit px-2">
						<IconFromSvg :icon="Left" />
					</Button>
				</template>
				<template #arrow-next>
					<Button variant="ghost" class="hover:bg-inherit px-2">
						<IconFromSvg :icon="Right" />
					</Button>
				</template>
				<template #event="{ event, view }">
					<Popover>
						<PopoverTrigger as-child>
							<div
								class="flex h-full text-white rounded w-full flex-col justify-start items-center hover:cursor-pointer bg-blue-400 hover:bg-blue-400 border-white border">
								<span class="w-full truncate">{{ event.title }}</span>
								<div class="flex gap-1 flex-wrap justify-center">
									<span>{{ parseDateTime(event.start).time }}</span>
									-
									<span>{{ parseDateTime(event.end).time }}</span>
								</div>
							</div>
						</PopoverTrigger>
						<PopoverContent v-if="view !== 'day'" class="w-80 text-sm" side="right">
							<h3 class="text-base font-semibold">{{ event.title }}</h3>
							<div class="grid gap-2 mt-4">
								<div class="grid grid-cols-4">
									<Label>Date:</Label>
									<span class="col-span-2">{{
										parseDateTime(event.start).date
									}}</span>
								</div>
								<div class="grid grid-cols-4">
									<Label>Time:</Label>
									<span class="col-span-2"
										>{{ parseDateTime(event.start).time }} -
										{{ parseDateTime(event.end).time }}</span
									>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</template>
			</vue-cal>
		</div>
	</ContentWrapper>
	<Dialog :open="isOpenDialog" @update:open="handleCloseDialog">
		<DialogContent class="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Create event</DialogTitle>
				<DialogDescription> </DialogDescription>
			</DialogHeader>
			<form id="form" @submit="onSubmit" class="grid gap-4 py-4">
				<FormField v-slot="{ componentField }" name="title">
					<FormItem>
						<FormLabel>Title</FormLabel>
						<FormControl>
							<Input placeholder="Enter title" v-bind="componentField" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</form>
			<DialogFooter>
				<Button form="form" type="submit" class="hover:bg-blue-600"> Save changes </Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>

<style>
.vuecal {
	@apply rounded overflow-hidden;
}
/* Green-theme. */
.vuecal__menu,
.vuecal__cell-events-count {
	@apply bg-blue-500 text-white;
}
.vuecal__title-bar {
	@apply bg-blue-50;
}
.vuecal__cell--today,
.vuecal__cell--current {
	@apply bg-blue-50 bg-opacity-50;
}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
	@apply bg-blue-50 bg-opacity-50;
}
.vuecal__cell--selected:before {
	@apply border-blue-500;
}
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
	@apply bg-blue-100 bg-opacity-50;
}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
	@apply bg-blue-100 bg-opacity-50;
}
.vuecal__body {
	@apply h-[630px] overflow-auto;
}
.vuecal__event {
	@apply bg-inherit rounded;
}
.vuecal__cell {
	@apply pr-2 pl-[1px];
}
.vuecal__event-delete {
	@apply hidden;
}
</style>
