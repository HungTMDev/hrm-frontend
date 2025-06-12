<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Card from '@/assets/icons/Outline/Card.svg';
import HomeAdd from '@/assets/icons/Outline/HomeAdd.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import UserId from '@/assets/icons/Outline/UserId.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import Title from '@/components/common/Title.vue';
import FormInput from '@/components/form/FormInput.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useGetBankInformation } from '@/composables/employee/useEmployee';
import { bankInformationSchema } from '../../employee.schema';
import {
	useCreateBankInformation,
	useEditBankInformation,
} from '@/composables/employee/useUpdateEmployee';
import { useQueryClient } from '@tanstack/vue-query';
import { useCustomToast } from '@/lib/customToast';
import { employeeKey } from '@/composables/employee/key';
import CallApiButton from '@/components/common/CallApiButton.vue';

const route = useRoute();
const queryClient = useQueryClient();
const { showToast } = useCustomToast();

const isEdit = ref(false);

const employeeId = computed(() => route.params.id as string);

const { data: bankInformation } = useGetBankInformation(employeeId);

const formSchema = toTypedSchema(bankInformationSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const { mutate: editBankInformation, isPending: editing } = useEditBankInformation();
const { mutate: createBankInformation, isPending: creating } = useCreateBankInformation();

const onSubmit = handleSubmit((values) => {
	if (!bankInformation.value) {
		createBankInformation(
			{
				employeeId: employeeId.value,
				payload: values,
			},
			{
				onSuccess: () => {
					isEdit.value = false;
					queryClient.invalidateQueries({
						queryKey: [employeeKey.bank, employeeId.value],
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

	editBankInformation(
		{
			employeeId: employeeId.value,
			payload: values,
			id: bankInformation.value?.id ?? '',
		},
		{
			onSuccess: () => {
				isEdit.value = false;
				queryClient.invalidateQueries({
					queryKey: [employeeKey.bank, employeeId.value],
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
		<Title>Bank information</Title>
		<ScrollArea class="text-slate-600 pr-3 flex-1">
			<form v-if="isEdit" id="form" @submit="onSubmit">
				<div class="grid grid-cols-2 gap-y-4 gap-x-6">
					<FormInput
						:required="true"
						:icon="Building3"
						:model-value="bankInformation?.bank_name"
						name="bank_name"
						label="Bank name"
						placeholder="Enter Bank name"
						class="w-full" />
					<FormInput
						:required="true"
						:model-value="bankInformation?.account_number"
						name="account_number"
						label="Account number"
						placeholder="Enter account number"
						class="w-full"
						:icon="Card" />
					<FormInput
						:required="true"
						:model-value="bankInformation?.account_holder_name"
						name="account_holder_name"
						label="Account holder name"
						class="w-full"
						placeholder="Enter account holder name"
						:icon="UserId" />
					<FormInput
						:required="true"
						:model-value="bankInformation?.bank_branch"
						name="bank_branch"
						label="Bank branch"
						class="w-full"
						placeholder="Enter bank branch"
						:icon="HomeAdd" />
				</div>
			</form>
			<div v-else>
				<div class="grid items-start grid-cols-2 gap-6">
					<InformationItem
						:icon="Building3"
						label="Bank name"
						:value="bankInformation?.bank_name" />
					<InformationItem
						:icon="Card"
						label="Account number"
						:value="bankInformation?.account_number" />
					<InformationItem
						:icon="UserId"
						label="Account holder name"
						:value="bankInformation?.account_holder_name" />
					<InformationItem
						:icon="HomeAdd"
						label="Bank branch"
						:value="bankInformation?.bank_branch" />
				</div>
			</div>
		</ScrollArea>
		<div class="flex justify-end gap-3">
			<Button
				v-if="!isEdit"
				class="bg-blue-50 text-blue-500 hover:bg-blue-50 h-auto py-3 rounded-2xl px-6"
				@click="handleEdit">
				<template v-if="!bankInformation"> Create </template>
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
				:is-loading="editing"
				class="h-auto py-3 px-6 hover:bg-blue-600 rounded-2xl">
				Save
			</CallApiButton>
		</div>
	</div>
</template>
