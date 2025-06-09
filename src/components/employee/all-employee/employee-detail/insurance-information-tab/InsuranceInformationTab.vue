<script lang="ts" setup>
import Title from '@/components/common/Title.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import Card2 from '@/assets/icons/Outline/Card2.svg';
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Health from '@/assets/icons/Outline/Health.svg';
import Tuning2 from '@/assets/icons/Outline/Tuning2.svg';
import InformationItem from '@/components/common/InformationItem.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import { insuranceInformationSchema } from './schema';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import Button from '@/components/ui/button/Button.vue';

const isEdit = ref(false);

const formSchema = toTypedSchema(insuranceInformationSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	console.log(values);
});

const handleEdit = () => {
	isEdit.value = true;
};

const handleCancel = () => {
	isEdit.value = false;
};
</script>
<template>
	<div class="flex flex-col gap-6 h-full">
		<Title>Insurance information</Title>
		<ScrollArea class="text-slate-600 pr-3 flex-1">
			<form v-if="isEdit" id="form" @submit="onSubmit">
				<div class="grid grid-cols-2 gap-y-4 gap-x-6">
					<FormInput
						name="insurance_name"
						label="Insurance name"
						placeholder="Enter insurance name"
						:icon="Card2"
						class="w-full" />
					<FormInput
						name="insurance_provider"
						label="Insurance provider"
						placeholder="Enter insurance provider"
						class="w-full"
						:icon="Buildings" />
					<FormSelectCalendar name="insurance_start_date" label="Insurance start date" />
					<FormSelectCalendar name="insurance_end_date" label="Insurance end date" />
					<FormSelect
						:icon="Health"
						name="insurance_type"
						label="Insurance type"
						:list="[]"
						placeholder="Select insurance type" />
					<FormInput
						name="insurance_contribution"
						label="Insurance contribution"
						class="w-full"
						placeholder="Enter insurance contribution"
						:icon="Tuning2" />
				</div>
			</form>
			<div v-else>
				<div class="grid items-start grid-cols-2 gap-6">
					<InformationItem :icon="Card2" label="Insurance number" value="048020001296" />
					<InformationItem :icon="Buildings" label="Insurance provider" value="-" />
					<InformationItem
						:icon="CalendarIcon"
						label="Insurance start date"
						value="27 April, 2025" />
					<InformationItem
						:icon="CalendarIcon"
						label="Insurance end date"
						value="27 April, 2025" />
					<InformationItem
						:icon="Health"
						label="Insurance type"
						value="Health insurance" />
					<InformationItem :icon="Tuning2" label="Insurance contribution" value="30%" />
				</div>
			</div>
		</ScrollArea>
		<div class="flex justify-end gap-3">
			<Button
				v-if="!isEdit"
				class="bg-blue-50 text-blue-500 hover:bg-blue-50 h-auto py-3 rounded-2xl px-6"
				@click="handleEdit">
				<IconFromSvg :icon="Pen2" />Edit
			</Button>
			<Button
				v-if="isEdit"
				variant="outline"
				class="h-auto py-3 px-6 rounded-2xl"
				@click="handleCancel">
				Cancel
			</Button>
			<Button
				form="form"
				v-if="isEdit"
				class="h-auto py-3 px-6 hover:bg-blue-600 rounded-2xl">
				Save
			</Button>
		</div>
	</div>
</template>
