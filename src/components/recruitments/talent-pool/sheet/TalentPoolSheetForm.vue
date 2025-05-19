<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import CaseRound from '@/assets/icons/Outline/Case Round Minimalistic.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Ranking from '@/assets/icons/Outline/Ranking.svg';
import SquareAcademic from '@/assets/icons/Outline/Square Academic Cap.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import UserHand from '@/assets/icons/Outline/User Hands.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import UploadField from '@/components/common/UploadField.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
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
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { talentPoolSchema } from '../talent-pool.schema';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import { genderCombobox } from '@/constants';

defineProps<{
	data?: any;
}>();

const formSchema = toTypedSchema(talentPoolSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(() => {});
</script>
<template>
	<ScrollArea class="flex-1 pr-3">
		<form id="form" @submit="onSubmit" class="flex-1 overflow-y-auto">
			<FormField name="name" v-slot="{ componentField }">
				<FormItem>
					<FormControl>
						<Input
							v-bind="componentField"
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
					name="job_title"
					label="Job title"
					:required="true"
					class="w-full"
					placeholder="Enter job title"
					:icon="CaseRound" />
				<FormInput
					name="phone_number"
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
					label="City"
					:list="[]"
					:required="true"
					:icon="Building3"
					placeholder="Select city" />
				<FormSelectCalendar
					name="dob"
					label="Date of birth"
					:required="true"
					:icon="Calendar"
					class="w-full" />
				<FormSelect
					name="gender"
					label="Gender"
					:list="genderCombobox"
					:required="true"
					:icon="UserHand"
					placeholder="Select gender" />
				<FormSelect
					name="workExperience"
					label="Work experience"
					:list="[]"
					:required="true"
					:icon="Ranking"
					placeholder="Select work experience" />
				<FormSelect
					name="educationLevel"
					label="Education level"
					:list="[]"
					:required="true"
					:icon="SquareAcademic"
					placeholder="Select education level" />
				<UploadField name="attachment" label="Attachment" :required="true" />
				<UploadField name="photo" label="Photo" :required="true" type="photo" />
			</div>
		</form>
		<div class="mt-4 text-sm">
			<div>
				<span class="font-medium">Candidate evaluation</span>
			</div>
			<div class="border rounded-2xl p-4 mt-2">
				<div class="flex gap-2 items-center">
					<UserAvatar class="w-10 h-10" />
					<div class="flex-1">
						<h4 class="text-base font-medium text-black">Le Thi Linh Ly</h4>
						<span class="text-xs">March 5, 2025</span>
					</div>
					<ActionGroupCommon
						:actions="[
							{
								label: 'Edit',
								icon: Pen2,
							},
							{
								label: 'Delete',
								icon: Trash,
								style: 'text-red-500',
							},
						]" />
				</div>
				<p class="text-black mt-2">
					The candidate exhibits a keen eye for design and a solid grasp of graphic design
					principles. Their portfolio showcases a variety of creative projects,
					demonstrating proficiency in tools like Adobe Illustrator and Photoshop. They
					have experience collaborating with clients to bring their visions to life, which
					is essential for our team. Overall, they seem to be a strong contender for the
					Graphic Designer position.
				</p>
			</div>
		</div>
	</ScrollArea>
	<SheetFooter>
		<Button form="form" class="rounded-2xl h-auto py-3.5 px-5 bg-blue-500 hover:bg-blue-600">
			Submit
		</Button>
	</SheetFooter>
</template>
