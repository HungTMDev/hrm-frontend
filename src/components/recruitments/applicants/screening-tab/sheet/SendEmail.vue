<script setup lang="ts">
import Down from '@/assets/icons/Outline/AltArrowDown.svg';
import Dollar from '@/assets/icons/Outline/DollarMinimalistic.svg';
import File from '@/assets/icons/Outline/File.svg';
import LetterOpened from '@/assets/icons/Outline/LetterOpened.svg';
import MapPoint from '@/assets/icons/Outline/MapPointWave.svg';
import UserCircle from '@/assets/icons/Outline/UserCircle.svg';
import User from '@/assets/icons/Outline/User.svg';
import CommonCombobox from '@/components/common/CommonCombobox.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import UploadField from '@/components/common/UploadField.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormCombobox from '@/components/form/FormCombobox.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormTime from '@/components/form/FormTime.vue';
import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue';
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue';
import Label from '@/components/ui/label/Label.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import Separator from '@/components/ui/separator/Separator.vue';
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCandidate } from '@/composables/recruitment/applicant/useCandidate';
import { useSendEmail } from '@/composables/recruitment/applicant/useUpdateApplicant';
import { formatCurrency } from '@/lib/utils';
import { toTypedSchema } from '@vee-validate/zod';
import Handlebars from 'handlebars';
import { useForm } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { thanksEmailSchema } from '../schema';
import { useCustomToast } from '@/lib/customToast';

const emits = defineEmits<{
	(e: 'cancel'): void;
}>();

const { showToast } = useCustomToast();
const { data: candidatesData } = useCandidate();
const { mutate } = useSendEmail();

const renderedHtml = ref('');
const templateSelected = ref<string>();
const schema = ref<any>(thanksEmailSchema);

const candidates = computed(() => {
	return (
		candidatesData.value?.map((item) => ({
			label: item.full_name,
			value: item.id,
		})) || []
	);
});
const formSchema = computed(() => toTypedSchema(schema.value));
const dataFill = computed(() => ({
	subject: '',
	recipient: candidatesData.value?.find((item) => item.id === values.recipient)?.full_name,
	position: values.position,
	confirmation_before_date: values.confirmation_before_date,
	confirmation_before_time: values.confirmation_before_time,
	interview_date: values.interview_date,
	interview_time: values.interview_time,
	work_location: values.work_location,
	start_date: values.start_date,
	start_time: values.start_time,
	salary: formatCurrency(values.salary || ''),
	title: values.title,
}));

const { handleSubmit, values, setFieldValue } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(() => {
	mutate(
		{
			email: 'admin@lutech.ltd',
			content: renderedHtml.value.replace(/"/g, "'"),
			subject: dataFill.value.subject,
		},
		{
			onSuccess: () => {
				showToast({
					message: 'Sent email success!',
					type: 'success',
				});
			},
		},
	);
});

watch(dataFill, () => {
	const rawTemplate = '';
	const compiled = Handlebars.compile(rawTemplate);
	renderedHtml.value = compiled(dataFill.value);
});

const handleSelectTemplate = (payload: any) => {
	templateSelected.value = payload as string;
	schema.value = '';
};

const setValue = (payload: { fieldName: any; data: any }) => {
	if (
		payload.fieldName === 'interview_time' ||
		payload.fieldName === 'confirmation_before_time' ||
		payload.fieldName === 'start_time'
	) {
		const arr = payload.data.split(':');
		arr.pop();
		setFieldValue(payload.fieldName, arr.join(':'));
		return;
	}
	setFieldValue(payload.fieldName, payload.data);
};

const handleCancel = () => {
	emits('cancel');
};
</script>

<template>
	<SheetHeader>
		<SheetTitle class="text-[28px] font-semibold">Send email to candidate</SheetTitle>
		<SheetDescription></SheetDescription>
	</SheetHeader>
	<ScrollArea class="flex-1 pr-3">
		<div>
			<h3 class="text-base font-semibold text-black">Template</h3>
			<div class="grid gap-2 mt-4">
				<Label>Email template</Label>
				<CommonCombobox
					label="Template"
					class="w-80"
					list-size="md"
					:is-search="true"
					:list="[]"
					:icon="LetterOpened"
					@update:model-value="handleSelectTemplate" />
			</div>
		</div>
		<Separator class="my-6" />
		<div>
			<h3 class="text-base font-semibold text-black">Information required</h3>
			<form id="form" @submit="onSubmit">
				<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
					<FormCombobox
						:list="candidates"
						name="recipient"
						label="Recipient"
						:required="true"
						:icon="User"
						:is-search="true" />
					<FormCombobox
						v-if="
							templateSelected === 'invitation_email_to_receive_jobs' ||
							templateSelected === 'interview_invitation_email'
						"
						:list="[
							{
								label: 'Software Engineer',
								value: 'Software Engineer',
							},
						]"
						name="position"
						label="Position"
						:required="true"
						:icon="UserCircle" />

					<FormCombobox
						v-if="templateSelected === 'invitation_email_to_receive_jobs'"
						:list="[
							{
								label: 'Data Analyst',
								value: 'Data Analyst',
							},
						]"
						name="title"
						label="Title"
						:required="true"
						:icon="UserCircle" />

					<FormCalendar
						v-if="templateSelected === 'interview_invitation_email'"
						name="interview_date"
						label="Interview date"
						class="w-full"
						@update:value="setValue" />
					<FormTime
						v-if="templateSelected === 'interview_invitation_email'"
						name="interview_time"
						label="Interview time"
						:required="true"
						@update:value="setValue" />

					<FormCalendar
						v-if="templateSelected === 'interview_invitation_email'"
						name="confirmation_before_date"
						label="Confirmation before (date)"
						class="w-full"
						@update:value="setValue" />
					<FormTime
						v-if="templateSelected === 'interview_invitation_email'"
						name="confirmation_before_time"
						label="Confirmation before (time)"
						:required="true"
						@update:value="setValue" />

					<FormCombobox
						v-if="
							templateSelected === 'invitation_email_to_receive_jobs' ||
							templateSelected === 'interview_invitation_email'
						"
						:list="[
							{
								label: 'Tầng 4, Tòa nhà Hanvico (217 Lê Duẩn, Thanh Khê, Đà Nẵng)',
								value: 'Tầng 4, Tòa nhà Hanvico (217 Lê Duẩn, Thanh Khê, Đà Nẵng)',
							},
						]"
						name="work_location"
						label="Location"
						:required="true"
						:icon="MapPoint"
						list_size="md" />
					<FormCalendar
						v-if="templateSelected === 'invitation_email_to_receive_jobs'"
						name="start_date"
						label="Start date"
						class="w-full" />
					<FormTime
						v-if="templateSelected === 'invitation_email_to_receive_jobs'"
						name="start_time"
						label="Start time"
						:required="true" />
					<FormInput
						v-if="templateSelected === 'invitation_email_to_receive_jobs'"
						name="salary"
						type="number"
						label="Salary"
						class="w-full"
						placeholder="Enter salary"
						:icon="Dollar"
						:required="true" />
					<UploadField
						v-if="templateSelected === 'invitation_email_to_receive_jobs'"
						name="offer_letter"
						label="Offer letter" />
				</div>
			</form>

			<Separator v-if="templateSelected" class="my-6" />

			<div v-if="templateSelected">
				<h3 class="text-base font-semibold text-black">Email preview</h3>
				<div class="border p-3 rounded-2xl mt-4 text-sm text-black">
					<div v-html="renderedHtml"></div>
				</div>
			</div>
		</div>
	</ScrollArea>

	<SheetFooter>
		<Button variant="outline" class="h-auto py-3.5 px-6 rounded-2xl" @click="handleCancel"
			>Cancel</Button
		>
		<Button form="form" class="h-auto py-3.5 px-6 rounded-2xl bg-blue-500 hover:bg-blue-600"
			>Send
			<DropdownMenu>
				<DropdownMenuTrigger as-child>
					<Button variant="ghost" class="h-fit p-0 hover:bg-blue-600 hover:text-white">
						<IconFromSvg :icon="Down" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent class="w-56 rounded-2xl p-1" side="top" align="end">
					<DropdownMenuItem class="py-3 rounded-2xl">
						<IconFromSvg :icon="File" />
						<span>Save as draft</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu></Button
		>
	</SheetFooter>
</template>
