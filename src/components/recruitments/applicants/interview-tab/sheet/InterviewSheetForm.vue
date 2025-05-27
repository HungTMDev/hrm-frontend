<script lang="ts" setup>
import Title from '@/components/common/Title.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import type { IApplicantInterview } from '@/types';
import UserRounded from '@/assets/icons/Outline/User Rounded.svg';
import UserCircle from '@/assets/icons/Outline/User Circle.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import Dollar from '@/assets/icons/Outline/Dollar Minimalistic.svg';
import UploadField from '@/components/common/UploadField.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';

defineProps<{
	data?: IApplicantInterview;
}>();
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<Title class="text-[28px] text-black">Candidate evaluation</Title>
		<form>
			<SheetHeader>
				<SheetTitle></SheetTitle>
				<SheetDescription> </SheetDescription>
			</SheetHeader>

			<div class="grid grid-cols-2 gap-6">
				<FormInput
					name="candidate_name"
					label="Candidate name"
					class="w-full"
					:icon="UserRounded"
					:required="true"
					placeholder="Enter candidate name" />
				<FormSelect
					name="position"
					label="Position"
					:list="[]"
					:icon="UserCircle"
					:required="true"
					placeholder="Select position" />
				<FormSelectCalendar name="date_of_birth" label="Date of birth" :required="true" />
				<FormInput
					name="score"
					type="number"
					label="HR fit score (out of 10)"
					:required="true"
					:icon="Chart2"
					class="w-full"
					placeholder="Enter score" />
				<FormInput
					name="expected_salary"
					type="number"
					label="Expected salary"
					:required="true"
					:icon="Dollar"
					class="w-full"
					placeholder="Enter expected salary" />
				<UploadField name="cv" label="CV" />
			</div>

			<div class="mt-6 grid gap-4">
				<FormTextarea
					name="strength"
					label="Strength"
					:required="true"
					class="rounded-2xl h-[200px]"
					placeholder="Enter candidate strength" />
				<FormTextarea
					name="areas"
					label="Areas for improvement"
					:required="true"
					class="rounded-2xl h-[200px]"
					placeholder="Enter areas for improvement" />
			</div>
		</form>
	</ScrollArea>
	<SheetFooter>
		<Button form="form" class="rounded-2xl h-auto py-3.5 px-5 bg-blue-500 hover:bg-blue-600">
			Submit
		</Button>
	</SheetFooter>
</template>
