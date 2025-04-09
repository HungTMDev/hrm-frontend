<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import CaseRound from '@/assets/icons/Outline/Case Round Minimalistic.svg';
import Dollar from '@/assets/icons/Outline/Dollar Minimalistic.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Ranking from '@/assets/icons/Outline/Ranking.svg';
import Routing3 from '@/assets/icons/Outline/Routing 3.svg';
import SquareAcademic from '@/assets/icons/Outline/Square Academic Cap.svg';
import UserHand from '@/assets/icons/Outline/User Hands.svg';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import FormUpload from '@/components/form/FormUpload.vue';
import Button from '@/components/ui/button/Button.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import Input from '@/components/ui/input/Input.vue';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetFooter from '@/components/ui/sheet/SheetFooter.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { candidateSchema } from '../candidate.schema';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';

const formSchema = toTypedSchema(candidateSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(() => {});
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<form id="form" @submit="onSubmit" class="flex-1 overflow-y-auto">
			<FormField name="fullname" v-slot="{ componentField }">
				<FormItem>
					<FormControl>
						<Input
							v-bind="componentField"
							class="focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-[28px] px-0 placeholder:text-gray-200 font-semibold p-2"
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
					name="phoneNumber"
					label="Phone number"
					:required="true"
					class="w-full"
					placeholder="Enter phone number"
					:icon="Iphone" />
				<FormInput
					name="email"
					label="Email address"
					:required="true"
					class="w-full"
					placeholder="Enter email address"
					:icon="Letter" />
				<FormSelect
					name="branch"
					label="Branch"
					:list="[]"
					:required="true"
					class="w-full p-3"
					:icon="Building3"
					placeholder="Select company branch" />
				<FormSelect
					name="job"
					label="Job"
					:list="[]"
					:required="true"
					class="w-full p-3"
					:icon="CaseRound"
					placeholder="Select job" />
				<FormSelect
					name="stage"
					label="Stage"
					:list="[]"
					:required="true"
					class="w-full p-3"
					:icon="Routing3"
					placeholder="Select hiring stage" />
				<FormCalendar
					name="dob"
					label="Date of birth"
					:list="[]"
					:required="true"
					class="w-full p-3"
					:icon="Calendar"
					placeholder="Enter phone number" />
				<FormSelect
					name="gender"
					label="Gender"
					:list="[]"
					:required="true"
					class="w-full p-3"
					:icon="UserHand"
					placeholder="Select gender" />
				<FormSelect
					name="workExperience"
					label="Work experience"
					:list="[]"
					:required="true"
					class="w-full p-3"
					:icon="Ranking"
					placeholder="Select work experience" />
				<FormSelect
					name="educationLevel"
					label="Education level"
					:list="[]"
					:required="true"
					class="w-full p-3"
					:icon="SquareAcademic"
					placeholder="Select education level" />
				<FormInput
					name="expectedSalary"
					label="Expected salary"
					:required="true"
					class="w-full p-3"
					:icon="Dollar"
					placeholder="Enter expected salary" />
				<FormUpload name="cv" label="CV" :required="true" />
				<FormUpload name="photo" label="Photo" :required="true" type="photo" />
			</div>

			<div class="mt-4 flex flex-col gap-4">
				<FormTextarea
					name="coverLetter"
					label="Cover letter"
					:required="true"
					class="w-full rounded-2xl h-[300px]"
					placeholder="Enter cover letter" />

				<FormTextarea
					name="preliminaryAssessment"
					label="Preliminary assessment"
					:required="true"
					class="w-full rounded-2xl h-[300px]"
					placeholder="Write a preliminary assessment" />
			</div>
		</form>
	</ScrollArea>
	<SheetFooter>
		<Button form="form" class="rounded-2xl h-auto py-3.5 px-5 bg-blue-500 hover:bg-blue-600"
			>Submit</Button
		>
	</SheetFooter>
</template>
