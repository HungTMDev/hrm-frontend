<script lang="ts" setup>
import Title from '@/components/common/Title.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
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
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import Button from '@/components/ui/button/Button.vue';
import { useRoute } from 'vue-router';
import { useGetInsuranceInformation } from '@/composables/employee/useEmployee';
import { formatISOStringToLocalDateTime, formatStatus } from '@/lib/utils';
import { listInsurance } from '@/constants';
import {
	useCreateInsuranceInformation,
	useEditInsuranceInformation,
} from '@/composables/employee/useUpdateEmployee';
import CallApiButton from '@/components/common/CallApiButton.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { useCustomToast } from '@/lib/customToast';
import { employeeKey } from '@/composables/employee/key';
import { insuranceInformationSchema } from './schema';

const route = useRoute();
const queryClient = useQueryClient();
const { showToast } = useCustomToast();

const isEdit = ref(false);
const employeeId = computed(() => route.params.id as string);

const { data: insuranceInformation } = useGetInsuranceInformation(employeeId);

const formSchema = toTypedSchema(insuranceInformationSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const { mutate: editInsuranceInformation, isPending: editing } = useEditInsuranceInformation();
const { mutate: createInsuranceInformation, isPending: creating } = useCreateInsuranceInformation();

const onSubmit = handleSubmit((values) => {
	if (insuranceInformation.value?.length === 0) {
		createInsuranceInformation(
			{
				employeeId: employeeId.value,
				payload: values,
			},
			{
				onSuccess: () => {
					isEdit.value = false;
					queryClient.invalidateQueries({
						queryKey: [employeeKey.insurance, employeeId.value],
					});
					showToast({
						message: 'Success!',
						type: 'success',
					});
				},
			},
		);
		return;
	}

	editInsuranceInformation(
		{
			employeeId: employeeId.value,
			payload: values,
			id: insuranceInformation.value?.[0]?.id ?? '',
		},
		{
			onSuccess: () => {
				isEdit.value = false;
				queryClient.invalidateQueries({
					queryKey: [employeeKey.insurance, employeeId.value],
				});
				showToast({
					message: 'Success!',
					type: 'success',
				});
			},
		},
	);
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
						name="insurance_number"
						label="Insurance number"
						placeholder="Enter insurance number"
						:model-value="insuranceInformation?.[0]?.insurance_number ?? undefined"
						:icon="Card2"
						class="w-full" />
					<FormInput
						name="insurance_provider"
						label="Insurance provider"
						placeholder="Enter insurance provider"
						class="w-full"
						:model-value="insuranceInformation?.[0]?.insurance_provider ?? undefined"
						:icon="Buildings" />
					<FormSelectCalendar
						name="start_date"
						:model-value="insuranceInformation?.[0]?.start_date ?? undefined"
						label="Insurance start date" />
					<FormSelectCalendar
						name="end_date"
						:model-value="insuranceInformation?.[0]?.end_date ?? undefined"
						label="Insurance end date" />
					<FormSelect
						:icon="Health"
						name="insurance_type"
						label="Insurance type"
						:model-value="insuranceInformation?.[0]?.insurance_type ?? undefined"
						:list="listInsurance"
						placeholder="Select insurance type" />
					<FormInput
						type="number"
						:min="0"
						:max="1"
						:step="0.01"
						name="insurance_contribution"
						label="Insurance contribution"
						class="w-full"
						:model-value="insuranceInformation?.[0]?.insurance_contribution ?? undefined"
						placeholder="Enter insurance contribution"
						:icon="Tuning2" />
				</div>
			</form>
			<div v-else>
				<div class="grid items-start grid-cols-2 gap-6">
					<InformationItem
						:icon="Card2"
						label="Insurance number"
						:value="insuranceInformation?.[0]?.insurance_number" />
					<InformationItem
						:icon="Buildings"
						label="Insurance provider"
						:value="insuranceInformation?.[0]?.insurance_provider ?? undefined" />
					<InformationItem
						:icon="CalendarIcon"
						label="Insurance start date"
						:value="formatISOStringToLocalDateTime(insuranceInformation?.[0]?.start_date).date" />
					<InformationItem
						:icon="CalendarIcon"
						label="Insurance end date"
						:value="formatISOStringToLocalDateTime(insuranceInformation?.[0]?.end_date).date" />
					<InformationItem
						:icon="Health"
						label="Insurance type"
						:value="formatStatus(insuranceInformation?.[0]?.insurance_type ?? '')" />
					<InformationItem
						:icon="Tuning2"
						label="Insurance contribution"
						:value="
							insuranceInformation?.[0]?.insurance_contribution
								? `${insuranceInformation?.[0]?.insurance_contribution}%`
								: undefined
						" />
				</div>
			</div>
		</ScrollArea>
		<div class="flex justify-end gap-3">
			<Button
				v-if="!isEdit"
				class="bg-blue-50 text-blue-500 hover:bg-blue-50 h-auto py-3 rounded-2xl px-6"
				@click="handleEdit">
				<template v-if="insuranceInformation?.length === 0"> Create </template>
				<template v-else> <IconFromSvg :icon="Pen2" />Edit </template>
			</Button>
			<Button
				v-if="isEdit"
				variant="outline"
				class="h-auto py-3 px-6 rounded-2xl"
				@click="handleCancel">
				Cancel
			</Button>
			<CallApiButton
				form="form"
				v-if="isEdit"
				:is-loading="editing || creating"
				class="h-auto py-3 px-6 hover:bg-blue-600 rounded-2xl">
				Save
			</CallApiButton>
		</div>
	</div>
</template>
