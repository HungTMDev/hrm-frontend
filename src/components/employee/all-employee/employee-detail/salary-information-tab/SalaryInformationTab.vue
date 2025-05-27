<script lang="ts" setup>
import InformationItem from '@/components/common/InformationItem.vue';
import Title from '@/components/common/Title.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Dollar from '@/assets/icons/Outline/Dollar Minimalistic.svg';
import WalletMoney from '@/assets/icons/Outline/Wallet Money.svg';
import HandMoney from '@/assets/icons/Outline/Hand Money.svg';
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import Health from '@/assets/icons/Outline/Health.svg';
import WadOfMoney from '@/assets/icons/Outline/Wad Of Money.svg';
import { formatCurrency } from '@/lib/utils';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { salaryHistoryColumns } from './columns';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import { ref } from 'vue';
import Button from '@/components/ui/button/Button.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import FormCurrency from '@/components/form/FormCurrency.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';

const isEdit = ref(false);

const table = useVueTable({
	data: [],
	columns: salaryHistoryColumns,
	getCoreRowModel: getCoreRowModel(),
});

const formSchema = toTypedSchema(z.object({}));

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
		<Title class="text-xl">Salary information</Title>

		<ScrollArea class="text-slate-600 pr-3 h-[calc(100vh-400px)]">
			<form v-if="isEdit" id="form" @submit="onSubmit">
				<div class="grid grid-cols-2 gap-y-4 gap-x-6">
					<FormCurrency
						:required="true"
						:icon="Dollar"
						name="basic_salary"
						label="Basic salary"
						placeholder="Enter basic salary" />
					<FormSelect
						:required="true"
						:icon="WalletMoney"
						name="salary_type"
						label="Salary type"
						:list="[]"
						placeholder="Select salary type" />
					<FormCurrency
						:icon="HandMoney"
						name="bonus_or_commission"
						label="Bonus / Commission"
						placeholder="Enter bonus or commission" />
					<FormCurrency
						:icon="WadOfMoney"
						name="allowances"
						label="Allowances"
						placeholder="Enter allowances" />
					<FormCurrency
						:icon="WadOfMoney"
						name="deduction"
						label="Deduction"
						placeholder="Enter deduction" />
					<FormSelectCalendar
						:required="true"
						name="salara_review_date"
						label="Salary review date" />
				</div>
			</form>
			<div v-else>
				<div class="grid items-start grid-cols-2 gap-6">
					<InformationItem
						:icon="Dollar"
						label="Base salary"
						:value="formatCurrency(15000000)" />
					<InformationItem :icon="WalletMoney" label="Salary type" value="Monthly" />
					<InformationItem
						:icon="HandMoney"
						label="Bonus / Commission"
						:value="formatCurrency(5000000)" />
					<InformationItem
						:icon="WadOfMoney"
						label="Allowance"
						:value="formatCurrency(5000000)" />
					<InformationItem
						label="Deduction"
						:icon="WadOfMoney"
						:value="formatCurrency(1000000)" />
					<InformationItem
						:icon="CalendarIcon"
						label="Salary review date"
						value="27 October, 2025" />
					<div class="grid grid-cols-2 items-start">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Health" />
							Insurance
						</div>
						<ul class="text-black truncate">
							<li>Social Insurance,</li>
							<li>Health Insurance,</li>
							<li>Accident Insurance</li>
						</ul>
					</div>
				</div>
				<Separator class="my-6" />
				<div>
					<Title class="text-xl text-black">Salary history</Title>
					<div>
						<DataTable :table="table" />
						<DataTablePagination :table="table" />
					</div>
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
