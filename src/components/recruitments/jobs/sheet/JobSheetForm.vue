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
import FormTextarea from '@/components/form/FormTextarea.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { DEPARTMENTS, EDUCATION_LEVEL, EMPLOYMENT_TYPE, JOB_LEVEL } from '@/constants';
import QuillEditor from '@/components/common/QuillEditor.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import type { Job } from '@/types';

defineProps<{
	data?: Job;
}>();

const formSchema = toTypedSchema(jobSchema);

const { handleSubmit, setFieldValue } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values: any) => {
	console.log(values);
});

const setValue = (fieldName: any, value: any) => {
	setFieldValue(fieldName, value);
};
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<form id="form" @submit="onSubmit">
			<FormField name="jobName" v-slot="{ componentField }">
				<FormItem>
					<FormControl>
						<Input
							v-bind="componentField"
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
					class="w-full py-2.5"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormSelect
					name="branch"
					label="Branch"
					:list="[
						{
							label: 'Đà Nẵng',
							value: 'dn',
						},
						{
							label: 'Hà Nội',
							value: 'hn',
						},
					]"
					:icon="Building3"
					:required="true"
					placeholder="Select company branch"
					class="w-full py-2.5"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormSelect
					name="department"
					label="Department"
					:list="DEPARTMENTS"
					:required="true"
					:icon="Building"
					placeholder="Select department"
					class="w-full py-2.5"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
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
					:list="JOB_LEVEL"
					:icon="Chart2"
					:multiple="true"
					placeholder="Select level"
					class="w-full py-2.5"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormSelect
					name="employmentType"
					label="Employment type"
					:required="true"
					:list="EMPLOYMENT_TYPE"
					:icon="Case"
					placeholder="Select employment type"
					class="w-full py-2.5"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
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
					:required="true"
					:icon="Calendar"
					placeholder="dd/MM/yyyy"
					class="w-full py-2.5"
					@update:value="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormSelect
					name="educationLevel"
					label="Education level"
					:required="true"
					:list="EDUCATION_LEVEL"
					:icon="SqureAcademic"
					placeholder="Select education level"
					class="w-full py-2.5"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormSelect
					name="workExperience"
					label="Work experience"
					:list="[
						{
							label: '1 year',
							value: '1-year',
						},
						{
							label: '2 years',
							value: '2-years',
						},
						{
							label: '3 years',
							value: '3-years',
						},
						{
							label: '4 years',
							value: '4-years',
						},
						{
							label: '5 years',
							value: '5-years',
						},
					]"
					:required="true"
					:icon="Ranking"
					placeholder="Select work experience"
					class="w-full py-2.5"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormSelect
					name="gender"
					label="Gender"
					:list="[]"
					:icon="UserHand"
					placeholder="Select gender"
					class="w-full py-2.5"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
				<FormSelect
					name="appearance"
					label="Appearance"
					:list="[]"
					:icon="MagicStick3"
					placeholder="Select appearance"
					class="w-full py-2.5"
					@update:modelValue="(payload) => setValue(payload.fieldName, payload.data)" />
			</div>
			<div class="mt-6">
				<FormTextarea
					label="Job description"
					name="jobDesc"
					placeholder="A detailed job description"
					class="rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 h-72" />
				<div class="mt-3">
					<FormField v-slot="{ componentField }" name="requiredSkill">
						<FormItem>
							<FormLabel>Skill required</FormLabel>
							<FormControl>
								<QuillEditor
									v-bind="componentField"
									placeholder="Essential skills needed for the job" />
							</FormControl>
							<FormDescription />
							<FormErrorCustom />
						</FormItem>
					</FormField>
				</div>
			</div>
		</form>
	</ScrollArea>
	<div class="text-end mt-4">
		<Button
			form="form"
			class="bg-blue-500 hover:bg-blue-600 rounded-2xl h-auto py-3.5 px-10 text-white">
			Submit
		</Button>
	</div>
</template>
