<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import ChartSquare from '@/assets/icons/Outline/ChartSquare.svg';
import Dollar from '@/assets/icons/Outline/DollarMinimalistic.svg';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import Button from '@/components/ui/button/Button.vue';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import Input from '@/components/ui/input/Input.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { SheetClose, SheetDescription, SheetFooter, SheetTitle } from '@/components/ui/sheet';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { salaryDefinitionSchema } from '../salary-definition.schema';

const formSchema = toTypedSchema(salaryDefinitionSchema);

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
			<FormField name="jobTitle" v-slot="{ componentField }">
				<FormItem>
					<FormControl>
						<Input
							v-bind="componentField"
							class="focus-visible:ring-0 text-black focus-visible:ring-offset-0 border-none text-[28px] px-0 placeholder:text-gray-200 font-semibold p-2"
							placeholder="Job title" />
					</FormControl>
					<FormErrorCustom />
				</FormItem>
			</FormField>
			<div class="grid gap-6 mt-8">
				<FormSelect
					name="level"
					label="Level"
					:required="true"
					:list="[]"
					:icon="ChartSquare"
					placeholder="Select level" />
				<FormInput
					type="number"
					name="averageSalary"
					label="Average salary"
					:required="true"
					class="w-full"
					placeholder="Enter average salary"
					:icon="Dollar" />
				<FormSelect
					name="department"
					label="Department"
					:required="true"
					:list="[]"
					:icon="Buildings"
					placeholder="Select department" />
				<FormSelect
					name="branch"
					label="Branch"
					:required="true"
					:list="[]"
					:icon="Building3"
					placeholder="Select branch" />
				<FormSelect
					name="quarter"
					label="Quarter"
					:required="true"
					:list="[]"
					:icon="Calendar"
					placeholder="Select quarter" />
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
