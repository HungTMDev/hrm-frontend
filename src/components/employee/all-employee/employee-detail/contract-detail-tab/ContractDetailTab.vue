<script lang="ts" setup>
import Left from '@/assets/icons/Outline/AltArrowLeft.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import ChartSquare from '@/assets/icons/Outline/ChartSquare.svg';
import DocumentAdd from '@/assets/icons/Outline/DocumentAdd.svg';
import FileText from '@/assets/icons/Outline/FileText.svg';
import File from '@/assets/icons/Outline/File.svg';
import Notes from '@/assets/icons/Outline/Notes.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import FormArray from '@/components/form/FormArray.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import FormUpload from '@/components/form/FormUpload.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import ScrollBar from '@/components/ui/scroll-area/ScrollBar.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useAppStore } from '@/stores/app.store';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { contractDetailColumns } from './columns';
import { contractDetailSchema } from './schema';

const appStore = useAppStore();

const data = [
	{
		name: 'Contract 1',
		start_date: '2022-01-01',
		end_date: '2022-12-31',
		status: 'Active',
		file: 'contract.pdf',
		created_by: 'John Doe',
		created_date: '2022-01-01',
		notes: 'sadasd ád ád ahgsdj adjkh akjshdk hádkj hakjdh ká hdkjashdkj ádadkjsd kahsk dj',
		items: [
			{
				name: 'Shop 1',
				start_date: '2022-01-01',
				end_date: '2022-12-31',
				status: 'Active',
				file: 'contract.pdf',
			},
			{
				name: 'Shop 2',
				start_date: '2022-01-01',
				end_date: '2022-12-31',
				status: 'Active',
				file: 'contract.pdf',
			},
		],
	},
];

const isView = ref(false);
const isEdit = ref(false);
const dataSent = ref<any>();

const formSchema = toTypedSchema(contractDetailSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	console.log(values);
});

const handleOpenView = (payload: any, edit?: boolean) => {
	dataSent.value = payload;
	if (edit) {
		isEdit.value = true;
		return;
	}
	isView.value = true;
};

const table = useVueTable({
	data: data,
	columns: contractDetailColumns(handleOpenView),
	enableRowSelection: true,
	getCoreRowModel: getCoreRowModel(),
	getSubRows: (row) => row.items || [],
});

const handleCancel = () => {
	isEdit.value = false;
	isView.value = true;
};

const handleBack = () => {
	isView.value = false;
};

const handleEdit = () => {
	isEdit.value = true;
	isView.value = false;
};
</script>
<template>
	<div>
		<Title v-if="!isEdit && !isView">Contract details</Title>
		<ScrollArea class="h-[calc(100vh-340px)] pr-3">
			<div v-if="isEdit">
				<Title class="text-xl">Contract 2</Title>
				<form id="form" @submit="onSubmit">
					<div class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
						<FormInput
							:required="true"
							name="contract_name"
							label="Contract name"
							class="w-full"
							placeholder="Enter contract name" />
						<FormSelect
							:required="true"
							:list="[]"
							name="contract_type"
							label="Contract type"
							placeholder="Enter contract type" />
						<FormSelectCalendar
							:required="true"
							name="contract_start_date"
							label="Contract start date" />
						<FormSelectCalendar
							:required="true"
							name="contract_end_date"
							label="Contract end date" />
						<FormSelect
							:required="true"
							:list="[]"
							name="contract_status"
							label="Contract status"
							placeholder="Enter contract status" />
						<FormUpload
							:required="true"
							type="file"
							name="contract_file"
							label="Contract file" />
					</div>
					<FormTextarea
						:required="true"
						name="contract_notes"
						label="Contract notes"
						class="h-44"
						placeholder="Enter your notes" />
					<Separator class="my-4" />
					<FormArray
						name="appendixes"
						label="Appendix"
						:init-value="{}"
						:is-separator="true">
						<template #default="{ baseName }">
							<div class="grid grid-cols-2 gap-x-6 gap-y-4">
								<FormInput
									:name="`${baseName}.appendix_name`"
									:required="true"
									label="Appendix name"
									placeholder="Enter appendix name"
									class="w-full" />
								<FormUpload
									:name="`${baseName}.appendix_file`"
									:required="true"
									label="Appendix file"
									type="file" />
								<FormSelectCalendar
									:name="`${baseName}.appendix_start_date`"
									:required="true"
									label="Appendix start date" />
								<FormSelectCalendar
									:name="`${baseName}.appendix_end_date`"
									:required="true"
									label="Appendix end date" />
							</div>
						</template>
					</FormArray>
				</form>
			</div>
			<div v-else-if="isView">
				<Button variant="outline" class="border-none rounded-full p-2" @click="handleBack">
					<IconFromSvg :icon="Left" />
				</Button>
				<div class="mt-4">
					<Title class="text-xl">Contract 2</Title>
					<div class="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-slate-600">
						<InformationItem
							:icon="DocumentAdd"
							label="Contract type"
							value="Probationary contract" />
						<InformationItem
							:icon="CalendarIcon"
							label="Contract start date"
							value="2022-01-01" />
						<InformationItem
							:icon="CalendarIcon"
							label="Contract end date"
							value="2022-01-01" />
						<InformationItem
							:icon="ChartSquare"
							label="Contract status"
							value="Active" />
						<div class="grid grid-cols-2 items-center">
							<div class="flex gap-2 items-center">
								<IconFromSvg :icon="FileText" />
								Contract file
							</div>
							<a
								href="#"
								target="_blank"
								rel=""
								class="flex items-center gap-2 bg-blue-50 text-blue-500 w-fit px-2 py-1 rounded-xl font-medium"
								><IconFromSvg :icon="File" class="!w-4 !h-4" />contract.pdf</a
							>
						</div>
					</div>
					<div class="mt-4">
						<div class="flex gap-2 items-center text-slate-600">
							<IconFromSvg :icon="Notes" />
							Contract notes
						</div>
						<p class="mt-2">-</p>
					</div>
				</div>

				<Separator class="my-8" />

				<div>
					<Title class="text-xl">Appendix 2.1</Title>
					<div class="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-slate-600">
						<div class="grid grid-cols-2 items-center">
							<div class="flex gap-2 items-center">
								<IconFromSvg :icon="FileText" />
								Appendix file
							</div>
							<a
								href="#"
								target="_blank"
								rel=""
								class="flex items-center gap-2 bg-blue-50 text-blue-500 w-fit px-2 py-1 rounded-xl font-medium"
								><IconFromSvg :icon="File" class="!w-4 !h-4" />appendix.pdf</a
							>
						</div>
						<InformationItem
							:icon="CalendarIcon"
							label="Contract start date"
							value="2022-01-01" />
						<InformationItem
							:icon="CalendarIcon"
							label="Contract end date"
							value="2022-01-01" />
					</div>
					<div class="mt-4">
						<div class="flex gap-2 items-center text-slate-600">
							<IconFromSvg :icon="Notes" />
							Appendix notes
						</div>
						<p class="mt-2">-</p>
					</div>
				</div>
			</div>
			<ScrollArea
				v-else
				class="mt-4 border rounded-2xl p-1 pb-3 w-[calc(100vw-650px)] transition-all duration-300 ease-in-out"
				:class="appStore.isSmallSidebar && 'w-[calc(100vw-488px)]'">
				<DataTable :table="table" @row:click="handleOpenView" />
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</ScrollArea>
		<div class="flex justify-end gap-2 items-center mt-4">
			<Button
				v-if="isView"
				class="rounded-2xl h-auto py-3 px-6 bg-blue-50 text-blue-500 hover:bg-blue-50"
				@click="handleEdit">
				<IconFromSvg :icon="Pen2" /> Edit
			</Button>
			<Button
				v-if="isEdit"
				variant="outline"
				class="rounded-2xl h-auto py-3 px-6"
				@click="handleCancel">
				Cancel
			</Button>
			<Button
				v-if="isEdit"
				form="form"
				class="rounded-2xl h-auto py-3 px-8 bg-blue-500 hover:bg-blue-500">
				Save
			</Button>
		</div>
	</div>
</template>
