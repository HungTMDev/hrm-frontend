<script lang="ts" setup>
import Left from '@/assets/icons/Outline/Alt Arrow Left.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import ChartSquare from '@/assets/icons/Outline/Chart Square.svg';
import Clipboard from '@/assets/icons/Outline/Clipboard Text.svg';
import DocumentText from '@/assets/icons/Outline/Document Text.svg';
import Library from '@/assets/icons/Outline/Library.svg';
import Notes from '@/assets/icons/Outline/Notes.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import FormArray from '@/components/form/FormArray.vue';
import FormErrorCustom from '@/components/form/FormErrorCustom.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import Button from '@/components/ui/button/Button.vue';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { assetsColumn } from './columns';
import { assetSchema } from './schema';

const isViewItem = ref(false);
const isEditItem = ref(false);

const table = useVueTable({
	data: [
		{
			asset_id: 'MH-166',
			asset_type: 'Computer display',
			status: 'Good',
			assigned_date: '2025-05-27',
			details: ['Dell S2425H 23.8 inch FHD(1920×1080)'],
			notes: '',
		},
		{
			asset_id: 'CPU-166',
			asset_type: 'Computer CPU',
			status: 'Normal',
			assigned_date: '2025-05-27',
			details: ['CPU Intel Core i5-12400F', 'Mainboard Gigabyte B760M D DDR4'],
			notes: '',
		},
	],
	columns: assetsColumn,
	getCoreRowModel: getCoreRowModel(),
});

const formSchema = toTypedSchema(assetSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	console.log(values);
});

const handleViewItem = (payload: any) => {
	isViewItem.value = true;
};

const handleEditItem = (payload: any) => {
	isViewItem.value = false;
	isEditItem.value = true;
};

const handleBackToTable = () => {
	isViewItem.value = false;
};

const handleBackToView = () => {
	isEditItem.value = false;
	isViewItem.value = true;
};
</script>
<template>
	<div class="h-full">
		<Title v-if="!isViewItem && !isEditItem" class="text-xl">Assets</Title>

		<div v-if="isEditItem" class="flex flex-col gap-2 h-full">
			<Title class="text-xl">MH-166</Title>
			<div class="flex-1">
				<form @submit="onSubmit" class="grid grid-cols-2 gap-6 mt-4">
					<FormInput
						name="asset_id"
						label="Asset ID"
						placeholder="Enter asset ID"
						:required="true"
						class="w-full" />
					<FormSelect
						name="asset_type"
						label="Assets type"
						:list="[]"
						:required="true"
						placeholder="Select assets type" />
					<FormSelect
						name="status"
						label="Status"
						:list="[]"
						:required="true"
						placeholder="Select status" />
					<FormSelectCalendar
						name="assigned_date"
						:required="true"
						label="Assigned date" />
					<div>
						<FormArray name="details" label="Details" :init-value="''" label-size="xs">
							<template #default="{ baseName, index }">
								<FormField v-slot="{ componentField }" :name="baseName[index]">
									<FormItem>
										<FormControl>
											<InputWithIcon
												:icon="DocumentText"
												v-bind="componentField"
												placeholder="Enter a detail"
												class="w-full" />
										</FormControl>
										<FormErrorCustom />
									</FormItem>
								</FormField>
							</template>
						</FormArray>
					</div>
					<FormTextarea name="notes" label="Notes" placeholder="Enter a note" />
				</form>
			</div>

			<div class="flex justify-end gap-2">
				<Button
					variant="outline"
					class="py-3 px-6 h-auto rounded-2xl"
					@click="handleBackToView">
					Back
				</Button>
				<Button class="py-3 px-6 h-auto rounded-2xl hover:bg-blue-600"> Save </Button>
			</div>
		</div>

		<div v-else-if="isViewItem" class="flex flex-col gap-2 h-full">
			<div>
				<Button variant="ghost" class="p-2 h-auto rounded-full" @click="handleBackToTable">
					<IconFromSvg :icon="Left" class="!w-6 !h-6" />
				</Button>
			</div>
			<div class="flex-1">
				<div class="grid grid-cols-2 gap-6 mt-4 items-start">
					<InformationItem :icon="Clipboard" label="Asset ID" value="MH-166" />
					<InformationItem :icon="Library" label="Assets type" value="Computer display" />
					<InformationItem :icon="ChartSquare" label="Status" value="Good" />
					<InformationItem
						:icon="Calendar"
						label="Assigned date"
						value="27 April, 2025" />
					<div class="grid grid-cols-2 items-start">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="DocumentText" />
							Details
						</div>
						<ul class="text-black list-disc list-inside">
							<li>Dell S2425H 23.8 inch FHD(1920x1080)</li>
							<li>Dell S2425H 23.8 inch FHD(1920x1080)</li>
							<li>Dell S2425H 23.8 inch FHD(1920x1080)</li>
							<li>Dell S2425H 23.8 inch FHD(1920x1080)</li>
						</ul>
					</div>
					<InformationItem :icon="Notes" label="Notes" value="-" />
				</div>
			</div>
			<div class="flex justify-end gap-2">
				<Button
					class="rounded-2xl py-3 px-6 h-auto bg-blue-50 text-blue-500 hover:bg-blue-50"
					@click="handleEditItem">
					<IconFromSvg :icon="Pen2" />Edit
				</Button>
			</div>
		</div>

		<div v-else class="border rounded-2xl overflow-hidden p-1 mt-4">
			<DataTable :table="table" @row:click="handleViewItem" />
		</div>
	</div>
</template>
