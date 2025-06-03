<script lang="ts" setup>
import CallApiButton from '@/components/common/CallApiButton.vue';
import Title from '@/components/common/Title.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { listLeaveShift, listLeaveTimeType } from '@/constants';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { leaveRequestSchema } from '../schema';
import SortByTime from '@/assets/icons/Outline/Sort By Time.svg';
import StopWatch from '@/assets/icons/Outline/Stopwatch Play.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import FormTime from '@/components/form/FormTime.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormUpload from '@/components/form/FormUpload.vue';
import FormArray from '@/components/form/FormArray.vue';
import FormInput from '@/components/form/FormInput.vue';
import Button from '@/components/ui/button/Button.vue';
import type { LeaveRequest } from '@/types/center-request';

const props = defineProps<{
	data?: LeaveRequest;
}>();

const emits = defineEmits<{
	(e: 'back'): void;
}>();

const formSchema = toTypedSchema(leaveRequestSchema);

const { handleSubmit, values } = useForm({
	validationSchema: formSchema,
	initialValues: {
		cc: [''],
	},
});

const onSubmit = handleSubmit((values) => {
	console.log(values);
});
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<Title class="text-black">Leave request</Title>
		<form id="form" @submit="onSubmit" class="mt-4">
			<FormTextarea label="Leave reason" name="leave_reason" :required="true" class="h-56" />
			<SheetHeader>
				<SheetTitle></SheetTitle>
				<SheetDescription></SheetDescription>
			</SheetHeader>
			<div class="grid grid-cols-2 gap-6">
				<FormSelect
					name="leave_time_type"
					label="Leave time type"
					:icon="SortByTime"
					:required="true"
					:list="listLeaveTimeType" />
				<FormSelect
					v-if="values.leave_time_type === 'HALF_DAY'"
					name="leave_shift"
					label="Leave shift"
					:required="true"
					:icon="StopWatch"
					:list="listLeaveShift" />

				<FormCalendar
					v-if="
						values.leave_time_type === 'FULL_DAY' ||
						values.leave_time_type === 'HOURLY' ||
						values.leave_time_type === 'HALF_DAY'
					"
					name="date"
					label="Date"
					:required="true" />

				<FormTime
					v-if="values.leave_time_type === 'HOURLY'"
					name="start_time"
					label="Start time"
					:required="true" />

				<FormTime
					v-if="values.leave_time_type === 'HOURLY'"
					name="end_time"
					label="End time"
					:required="true" />

				<FormCalendar
					v-if="values.leave_time_type === 'MANY_DAY'"
					name="start_date"
					label="Start date"
					:required="true" />
				<FormCalendar
					v-if="values.leave_time_type === 'MANY_DAY'"
					name="end_date"
					label="End date"
					:required="true" />

				<FormUpload name="attached_file" type="file" label="Attached file" />

				<FormArray
					name="cc"
					label="CC'd"
					:init-value="''"
					:required="true"
					label-size="xs"
					button-label="Add more email">
					<template #default="{ baseName }">
						<FormInput
							label=""
							:name="`${baseName}`"
							:icon="Letter"
							class="w-full"
							placeholder="Enter email"
							:required="true" />
					</template>
				</FormArray>
			</div>
		</form>
	</ScrollArea>
	<div class="flex justify-end gap-2 mt-4">
		<Button
			v-if="data"
			variant="outline"
			class="h-auto py-3 px-8 rounded-2xl"
			@click="emits('back')"
			>Back</Button
		>
		<CallApiButton variant="outline" class="h-auto py-3 px-8 rounded-2xl"> Save </CallApiButton>
		<CallApiButton
			form="form"
			class="bg-blue-500 hover:bg-blue-600 rounded-2xl h-auto py-3 px-10 text-white">
			Send
		</CallApiButton>
	</div>
</template>
