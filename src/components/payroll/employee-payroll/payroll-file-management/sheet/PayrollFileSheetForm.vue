<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { SheetClose, SheetDescription, SheetFooter, SheetTitle } from '@/components/ui/sheet';
import { toTypedSchema } from '@vee-validate/zod';
import { payrollFileSchema } from '../payroll-file.schema';
import { useForm } from 'vee-validate';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import Input from '@/components/ui/input/Input.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import UploadField from '@/components/common/UploadField.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormInput from '@/components/form/FormInput.vue';

const formSchema = toTypedSchema(payrollFileSchema);

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
			<FormField name="title" v-slot="{ componentField }">
				<FormItem>
					<FormControl>
						<Input
							v-bind="componentField"
							class="focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-black text-[28px] px-0 placeholder:text-gray-200 font-semibold p-2"
							placeholder="Title" />
					</FormControl>
					<FormErrorCustom />
				</FormItem>
			</FormField>
			<div class="grid gap-4">
				<UploadField label="Payroll file" name="" />
				<FormSelect name="status" label="Status" :list="[]" :required="true" />
				<FormCalendar name="payrollPeriod" label="Payroll period" class="w-full" />
				<FormCalendar name="uploadDate" label="Upload date" class="w-full" />
				<FormInput name="createdBy" label="Created by" class="w-full" :required="true" />
				<FormInput name="fileName" label="File name" class="w-full" :required="true" />
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
