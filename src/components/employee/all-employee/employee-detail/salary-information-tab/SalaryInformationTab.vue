<script lang="ts" setup>
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import Dollar from '@/assets/icons/Outline/DollarMinimalistic.svg';
import HandMoney from '@/assets/icons/Outline/HandMoney.svg';
import WidgetAdd from '@/assets/icons/Outline/WidgetAdd.svg';
import User from '@/assets/icons/Outline/User.svg';
import Health from '@/assets/icons/Outline/Health.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import WadOfMoney from '@/assets/icons/Outline/WadOfMoney.svg';
import WalletMoney from '@/assets/icons/Outline/WalletMoney.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import FormCurrency from '@/components/form/FormCurrency.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { formatCurrency, formatISOStringToLocalDateTime, formatStatus } from '@/lib/utils';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { salaryHistoryColumns } from './columns';
import { useRoute } from 'vue-router';
import { useGetSalaryHistory, useGetSalaryInformation } from '@/composables/employee/useEmployee';
import { listInsurance, listSalaryType } from '@/constants';
import { salaryInformationSchema } from './schema';
import { useListUser } from '@/composables/user/useUser';
import {
	useCreateSalaryInformation,
	useEditSalaryDetails,
} from '@/composables/employee/useUpdateEmployee';
import { employeeKey } from '@/composables/employee/key';
import { useQueryClient } from '@tanstack/vue-query';
import { useCustomToast } from '@/lib/customToast';
import CallApiButton from '@/components/common/CallApiButton.vue';

const route = useRoute();
const queryClient = useQueryClient();
const { showToast } = useCustomToast();
const { data: users } = useListUser();

const isEdit = ref(false);
const employeeId = computed(() => route.params.id as string);
const listUser = computed(
	() =>
		users.value
			?.filter((item) => item.roles.includes('CEO'))
			.map((item) => ({ label: item.name, value: item.id })) || [],
);

const { data: salaryInformation } = useGetSalaryInformation(employeeId);
const { data: salaryHistory } = useGetSalaryHistory(employeeId);

const table = useVueTable({
	get data() {
		return salaryHistory.value ?? [];
	},
	columns: salaryHistoryColumns,
	getCoreRowModel: getCoreRowModel(),
});

const formSchema = toTypedSchema(salaryInformationSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const { mutate: editSalaryDetails, isPending: editing } = useEditSalaryDetails();
const { mutate: createSalaryDetails, isPending: creating } = useCreateSalaryInformation();

const onSubmit = handleSubmit((values) => {
	if (!salaryInformation.value) {
		createSalaryDetails(
			{
				employeeId: employeeId.value,
				payload: values,
			},
			{
				onSuccess: () => {
					isEdit.value = false;
					queryClient.invalidateQueries({
						queryKey: [employeeKey.salary, employeeId.value],
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

	editSalaryDetails(
		{
			employeeId: employeeId.value,
			payload: values,
			id: salaryInformation.value?.id ?? '',
		},
		{
			onSuccess: () => {
				isEdit.value = false;
				queryClient.invalidateQueries({
					queryKey: [employeeKey.salary, employeeId.value],
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
		<Title class="text-xl">Salary information</Title>

		<ScrollArea class="text-slate-600 pr-3 h-[calc(100vh-400px)]">
			<form v-if="isEdit" id="form" @submit="onSubmit">
				<div class="grid grid-cols-2 gap-y-4 gap-x-6">
					<FormCurrency
						:required="true"
						:icon="Dollar"
						:model-value="salaryInformation?.base_salary"
						name="base_salary"
						label="Basic salary"
						placeholder="Enter basic salary" />
					<FormSelect
						:required="true"
						:icon="WalletMoney"
						:model-value="salaryInformation?.salary_type"
						name="salary_type"
						label="Salary type"
						:list="listSalaryType"
						placeholder="Select salary type" />
					<FormCurrency
						:icon="HandMoney"
						:model-value="salaryInformation?.commission"
						name="commission"
						label="Bonus / Commission"
						placeholder="Enter bonus or commission" />
					<FormCurrency
						:icon="WadOfMoney"
						:model-value="salaryInformation?.allowance.amount"
						name="allowance.amount"
						label="Allowances"
						placeholder="Enter allowances" />
					<FormCurrency
						:icon="WadOfMoney"
						:model-value="salaryInformation?.deduction.amount"
						name="deduction.amount"
						label="Deduction"
						placeholder="Enter deduction" />
					<FormSelectCalendar
						:required="true"
						:model-value="salaryInformation?.effective_date"
						name="effective_date"
						label="Salary review date" />
					<FormSelect
						:icon="Health"
						name="insurance"
						label="Insurance"
						:model-value="salaryInformation?.insurance"
						:required="true"
						:list="listInsurance"
						:multiple="true"
						placeholder="Select insurance" />
					<FormCurrency
						:icon="WidgetAdd"
						:model-value="salaryInformation?.benefits.amount"
						name="benefits.amount"
						label="Orther benefit"
						placeholder="Enter orther benefit" />
					<FormSelect
						name="approver_id"
						label="Approved by"
						:model-value="salaryInformation?.approver_id"
						:required="true"
						:icon="User"
						:list="listUser"
						placeholder="Select approved by" />
				</div>
			</form>
			<div v-else>
				<div class="grid items-start grid-cols-2 gap-6">
					<InformationItem
						:icon="Dollar"
						label="Base salary"
						:value="formatCurrency(salaryInformation?.base_salary ?? 0)" />
					<InformationItem
						:icon="WalletMoney"
						label="Salary type"
						:value="formatStatus(salaryInformation?.salary_type ?? '')" />
					<InformationItem
						:icon="HandMoney"
						label="Bonus / Commission"
						:value="formatCurrency(salaryInformation?.commission ?? 0)" />
					<InformationItem
						:icon="WadOfMoney"
						label="Allowance"
						:value="formatCurrency(salaryInformation?.allowance.amount ?? 0)" />
					<InformationItem
						label="Deduction"
						:icon="WadOfMoney"
						:value="formatCurrency(salaryInformation?.deduction.amount ?? 0)" />
					<InformationItem
						:icon="CalendarIcon"
						label="Salary review date"
						:value="formatISOStringToLocalDateTime(salaryInformation?.effective_date).date" />
					<div class="grid grid-cols-2 items-start">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Health" />
							Insurance
						</div>
						<ul class="text-black truncate">
							<li v-for="(item, index) in salaryInformation?.insurance ?? []" :key="index">
								{{ formatStatus(item) }}
							</li>
						</ul>
					</div>
					<InformationItem
						label="Orther benefit"
						:icon="WadOfMoney"
						:value="formatCurrency(salaryInformation?.benefits.amount ?? 0)" />
				</div>
				<!-- <Separator class="my-6" />
				<div>
					<Title class="text-xl text-black">Salary history</Title>
					<div>
						<DataTable :table="table" />
						<DataTablePagination :table="table" />
					</div>
				</div> -->
			</div>
		</ScrollArea>
		<div class="flex justify-end gap-3">
			<Button
				v-if="!isEdit"
				class="bg-blue-50 text-blue-500 hover:bg-blue-50 h-auto py-3 rounded-2xl px-6"
				@click="handleEdit">
				<template v-if="!salaryInformation"> Create </template>
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
				:is-loading="editing || creating"
				v-if="isEdit"
				class="h-auto py-3 px-6 hover:bg-blue-600 rounded-2xl">
				Save
			</CallApiButton>
		</div>
	</div>
</template>
