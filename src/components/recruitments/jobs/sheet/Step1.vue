<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import CheckList from '@/assets/icons/Outline/Checklist Minimalistic.svg';
import MagicStick3 from '@/assets/icons/Outline/Magic Stick 3.svg';
import Ranking from '@/assets/icons/Outline/Ranking.svg';
import SqureAcademic from '@/assets/icons/Outline/Square Academic Cap 2.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';
import UserHand from '@/assets/icons/Outline/User Hands.svg';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormDescription from '@/components/ui/form/FormDescription.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import Input from '@/components/ui/input/Input.vue';
import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { jobSchema } from '../job.schema';
import Button from '@/components/ui/button/Button.vue';

const props = defineProps<{
	step: number;
}>();

const emit = defineEmits<{
	(e: 'update:step', payload: number): void;
}>();

const formSchema = toTypedSchema(jobSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values: any) => {
	console.log(values);
});

const handleNext = () => {
	emit('update:step', props.step + 1);
};

const handleBack = () => {
	emit('update:step', props.step - 1);
};
</script>
<template>
	<form id="step1" @submit="onSubmit">
		<FormField name="jobName">
			<FormItem>
				<FormControl>
					<Input
						class="focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-[28px] px-0 placeholder:text-gray-200 font-semibold p-2"
						placeholder="Add new job" />
				</FormControl>
				<FormDescription />
				<FormErrorCustom />
			</FormItem>
		</FormField>

		<SheetHeader>
			<SheetTitle></SheetTitle>
			<SheetDescription></SheetDescription>
		</SheetHeader>

		<div class="grid grid-cols-2 gap-6">
			<FormSelect
				name="jobStatus"
				label="Job status"
				:list="[
					{
						value: 'Opening',
						label: 'Opening',
					},
					{
						value: 'Pending',
						label: 'Pending',
					},
					{
						value: 'Closed',
						label: 'Closed',
					},
				]"
				:icon="ChartSqare"
				:required="true"
				placeholder="Select job status"
				class="w-full py-2.5" />
			<FormSelect
				name="branch"
				label="Branch"
				:list="[]"
				:icon="Building3"
				:required="true"
				placeholder="Select company branch"
				class="w-full py-2.5" />
			<FormSelect
				name="department"
				label="Department"
				:list="[]"
				:required="true"
				:icon="Building"
				placeholder="Select department"
				class="w-full py-2.5" />
			<FormInput
				name="role"
				:required="true"
				label="Job status"
				:icon="UserCircle"
				placeholder="Enter job title"
				class="w-full py-2.5" />
			<FormSelect
				name="level"
				label="Level"
				:required="true"
				:list="[]"
				:icon="Chart2"
				placeholder="Select level"
				class="w-full py-2.5" />
			<FormSelect
				name="employmentType"
				label="Employment type"
				:required="true"
				:list="[]"
				:icon="Case"
				placeholder="Select employment type"
				class="w-full py-2.5" />
			<FormInput
				name="quantity"
				:required="true"
				label="Quantity"
				:icon="CheckList"
				placeholder="Enter quantity"
				class="w-full py-2.5" />
			<FormCalendar
				name="expectedClosingDate"
				label="Expected closing date"
				:list="[]"
				:icon="Calendar"
				placeholder="dd/MM/yyyy"
				class="w-full py-2.5" />
			<FormSelect
				name="educationLevel"
				label="Education level"
				:required="true"
				:list="[]"
				:icon="SqureAcademic"
				placeholder="Select education level"
				class="w-full py-2.5" />
			<FormSelect
				name="workExperience"
				label="Work experience"
				:list="[]"
				:required="true"
				:icon="Ranking"
				placeholder="Select work experience"
				class="w-full py-2.5" />
			<FormSelect
				name="gender"
				label="Gender"
				:list="[]"
				:icon="UserHand"
				placeholder="Select gender"
				class="w-full py-2.5" />
			<FormSelect
				name="appearance"
				label="Appearance"
				:list="[]"
				:icon="MagicStick3"
				placeholder="Select appearance"
				class="w-full py-2.5" />
		</div>
		<div class="text-end mt-4">
			<Button
				@click="handleNext"
				class="bg-blue-500 hover:bg-blue-600 rounded-2xl h-auto py-3.5 px-10 text-white">
				Next
			</Button>
		</div>
	</form>
</template>
