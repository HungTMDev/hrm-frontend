<script lang="ts" setup>
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Chart2 from '@/assets/icons/Outline/Chart2.svg';
import ChartSquare from '@/assets/icons/Outline/ChartSquare.svg';
import DocumentAdd from '@/assets/icons/Outline/DocumentAdd.svg';
import Dollar from '@/assets/icons/Outline/DollarMinimalistic.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import UserCircle from '@/assets/icons/Outline/UserCircle.svg';
import UserID from '@/assets/icons/Outline/UserId.svg';
import UserGroup from '@/assets/icons/Outline/UsersGroupTwoRounded.svg';
import UploadField from '@/components/common/UploadField.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import Button from '@/components/ui/button/Button.vue';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import Input from '@/components/ui/input/Input.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { SheetClose, SheetDescription, SheetFooter, SheetTitle } from '@/components/ui/sheet';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { employeePayrollSchema } from '../employee-payroll.schema';

const formSchema = toTypedSchema(employeePayrollSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values: any) => {
	console.log(values);
});
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<SheetTitle></SheetTitle>
		<SheetDescription></SheetDescription>
		<form id="form" @submit="onSubmit">
			<FormField name="employeeName" v-slot="{ componentField }">
				<FormItem>
					<FormControl>
						<Input
							v-bind="componentField"
							class="focus-visible:ring-0 text-black focus-visible:ring-offset-0 border-none text-[28px] px-0 placeholder:text-gray-200 font-semibold p-2"
							placeholder="Employee name" />
					</FormControl>
					<FormErrorCustom />
				</FormItem>
			</FormField>
			<h3 class="text-base font-semibold text-black my-6">Payroll information</h3>
			<div class="grid grid-cols-2 gap-x-8 gap-y-4">
				<FormInput
					name="salary"
					label="Salary"
					:icon="Dollar"
					class="w-full"
					placeholder="Enter salary"
					:required="true" />
				<FormSelect
					name="salaryStatus"
					label="Salary status"
					:list="[]"
					:icon="ChartSquare"
					:required="true"
					placeholder="Select salary status" />
				<FormSelect
					name="payrollStatus"
					label="Payroll status"
					:list="[]"
					:icon="ChartSquare"
					:required="true"
					placeholder="Select payroll status" />
				<UploadField name="payrollFile" label="Payroll file" />
			</div>
			<Separator class="my-6" />
			<h3 class="text-base font-semibold text-black mb-6">Employment information</h3>
			<div class="grid grid-cols-2 gap-x-8 gap-y-4">
				<FormSelect
					name="branch"
					label="Branch"
					:list="[]"
					:icon="Building3"
					:required="true"
					placeholder="Select company branch" />
				<FormSelect
					name="department"
					label="Department"
					:list="[]"
					:icon="Buildings"
					:required="true"
					placeholder="Select department" />
				<FormInput
					name="role"
					label="Role"
					:icon="UserCircle"
					class="w-full"
					placeholder="Enter job title"
					:required="true" />
				<FormSelect
					name="level"
					label="Level"
					:list="[]"
					:icon="Chart2"
					:required="true"
					placeholder="Select level" />
				<FormInput
					name="employeeId"
					label="Employee ID"
					:icon="UserID"
					class="w-full"
					placeholder="Enter employee ID"
					:required="true" />
				<FormInput
					name="workEmail"
					label="Work email address"
					:icon="Letter"
					class="w-full"
					placeholder="Enter work email address"
					:required="true" />
				<FormSelect
					name="workType"
					label="Status"
					:list="[]"
					:icon="ChartSquare"
					:required="true"
					placeholder="Select work type" />
				<FormCalendar name="joiningDate" label="Joining date" :required="true" class="w-full" />
				<FormInput
					name="lineManager"
					label="Line manager"
					:icon="UserGroup"
					class="w-full"
					placeholder="Enter line manager"
					:required="true" />
				<FormSelect
					name="contractType"
					label="Contract type"
					:list="[]"
					:icon="DocumentAdd"
					placeholder="Select contract type"
					:required="true" />
				<UploadField name="contractFile" label="Contract file" />
			</div>
		</form>
	</ScrollArea>
	<SheetFooter>
		<SheetClose as-child>
			<Button variant="outline" class="h-auto py-3.5 px-6 rounded-2xl"> Cancel </Button>
		</SheetClose>
		<Button
			form="form"
			type="submit"
			class="bg-blue-500 hover:bg-blue-600 h-auto py-3.5 px-8 rounded-2xl">
			Save
		</Button>
	</SheetFooter>
</template>
