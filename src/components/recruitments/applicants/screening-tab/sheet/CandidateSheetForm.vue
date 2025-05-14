<script lang="ts" setup>
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import CaseRound from '@/assets/icons/Outline/Case Round Minimalistic.svg';
import Dollar from '@/assets/icons/Outline/Dollar Minimalistic.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import UserHand from '@/assets/icons/Outline/User Hands.svg';
import MultipleUploadField from '@/components/common/MultipleUploadField.vue';
import UploadField from '@/components/common/UploadField.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormCombobox from '@/components/form/FormCombobox.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import Button from '@/components/ui/button/Button.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import Input from '@/components/ui/input/Input.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetFooter from '@/components/ui/sheet/SheetFooter.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import { useListJob } from '@/composables/recruitment/job/useJob';
import { genderCombobox } from '@/constants';
import { useCustomToast } from '@/lib/customToast';
import type { IApplicant, IJob } from '@/types';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { candidateSchema } from '../schema';

defineProps<{
	data?: IApplicant;
}>();

const { showToast } = useCustomToast();
const { data: jobs } = useListJob();

const attaches = ref<File[]>();
const avatar = ref<File>();

const listJob = computed(() => {
	return (
		jobs.value?.map((item: IJob) => ({
			label: item.title,
			value: item.id,
		})) || []
	);
});

const formSchema = toTypedSchema(candidateSchema);

const { handleSubmit, setFieldValue } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	if (!attaches.value || attaches.value?.length === 0) {
		showToast({
			message: 'Please upload attaches',
			type: 'error',
		});
		return;
	}
	if (!avatar.value) {
		showToast({
			message: 'Please upload avatar',
			type: 'error',
		});
		return;
	}
	console.log(values);
});

const setValue = (payload: { fieldName: any; data: any }) => {
	setFieldValue(payload.fieldName, payload.data);
};
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<form id="form" @submit="onSubmit" class="flex-1 overflow-y-auto">
			<FormField name="full_name" v-slot="{ componentField }">
				<FormItem>
					<FormControl>
						<Input
							v-bind="componentField"
							:model-value="data?.candidate.full_name"
							class="focus-visible:ring-0 text-black focus-visible:ring-offset-0 border-none text-[28px] px-0 placeholder:text-gray-200 font-semibold p-2"
							placeholder="Full name" />
					</FormControl>
					<FormErrorCustom />
				</FormItem>
			</FormField>
			<SheetHeader>
				<SheetTitle></SheetTitle>
				<SheetDescription> </SheetDescription>
			</SheetHeader>

			<div class="grid grid-cols-2 gap-x-8 gap-y-4">
				<FormInput
					name="phone_number"
					label="Phone number"
					class="w-full"
					placeholder="Enter phone number"
					:required="true"
					:icon="Iphone"
					:model-value="data?.candidate.phone_number" />
				<FormInput
					name="email"
					label="Email address"
					:required="true"
					class="w-full"
					placeholder="Enter email address"
					:icon="Letter"
					:model-value="data?.candidate.email" />
				<FormCombobox
					name="job_id"
					label="Job"
					:list="listJob"
					:required="true"
					:icon="CaseRound"
					list-size="md"
					placeholder="Select job"
					:model-value="data?.job.id" />
				<FormSelectCalendar
					name="date_of_birth"
					label="Date of birth"
					:required="true"
					:icon="Calendar"
					class="w-full"
					@update:value="setValue"
					:model-value="data?.candidate.date_of_birth" />
				<FormSelectCalendar
					name="applied_at"
					label="Applied at"
					:required="true"
					:icon="Calendar"
					class="w-full"
					@update:value="setValue"
					:model-value="data?.applied_at" />
				<FormInput
					type="number"
					name="expected_salary"
					label="Expected salary"
					:required="true"
					class="w-full"
					:icon="Dollar"
					placeholder="Enter expected salary"
					:model-value="data?.expected_salary" />
				<FormCombobox
					name="gender"
					label="Gender"
					list-size="md"
					:list="genderCombobox"
					:icon="UserHand"
					placeholder="Select gender"
					@update:model-value="setValue" />

				<FormCombobox
					name="referred_by"
					label="Referred by"
					:list="[]"
					list-size="md"
					:icon="UserHand"
					placeholder="Select referred" />
				<MultipleUploadField
					name="attaches"
					label="Attaches"
					@update:value="(payload) => (attaches = payload)" />
				<UploadField
					name="avatar"
					label="Avatar"
					type="photo"
					@update:value="(payload) => (avatar = payload)" />
			</div>

			<div class="mt-4 flex flex-col gap-4">
				<FormTextarea
					name="cover_letter"
					label="Cover letter"
					:required="true"
					:model-value="data?.cover_letter"
					class="w-full rounded-2xl h-[300px]"
					placeholder="Enter cover letter" />

				<FormTextarea
					name="notes"
					label="Notes"
					:required="true"
					:model-value="data?.notes"
					class="w-full rounded-2xl h-[300px]"
					placeholder="Write a note" />
			</div>
		</form>
	</ScrollArea>
	<SheetFooter>
		<Button form="form" class="rounded-2xl h-auto py-3.5 px-5 bg-blue-500 hover:bg-blue-600"
			>Submit</Button
		>
	</SheetFooter>
</template>
