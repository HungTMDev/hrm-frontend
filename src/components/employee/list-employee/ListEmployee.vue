<script lang="ts" setup>
import Tuning from '@/assets/icons/Outline/Tuning.svg';
import UserPlus from '@/assets/icons/Outline/User Plus.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import Button from '@/components/ui/button/Button.vue';
import type { Employee } from '@/types';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { Search } from 'lucide-vue-next';
import { ref } from 'vue';
import { employeeColumn } from './employee.column';
import EmployeeDialog from './EmployeeDialog.vue';

const data: Employee[] = [
	{
		id: 351613,
		name: 'Trần Song Quynh',
		email: 'songquynh@lutech.ltd',
		position: 'UI/UX Designer',
	},
	{
		id: 351614,
		name: 'Nguyễn Đức Phát',
		email: 'ducphat@lutech.ltd',
		position: 'UI/UX Designer',
	},
	{
		id: 351615,
		name: 'Trịnh Minh Hưng',
		email: 'minhhung@lutech.ltd',
		position: 'Back-end Developer',
	},
	{
		id: 351616,
		name: 'Ngô Công Linh',
		email: 'conglinh@lutech.ltd',
		position: 'Android Developer',
	},
	{
		id: 351617,
		name: 'Huỳnh Minh Huy',
		email: 'minhhuy@lutech.ltd',
		position: 'Graphic Designer',
	},
	{
		id: 351618,
		name: 'Lê Tất Tuấn',
		email: 'tattuan@lutech.ltd',
		position: 'Back-end Developer',
	},
	{
		id: 351619,
		name: 'Nguyễn Thanh Long',
		email: 'thanhlong@lutech.ltd',
		position: 'Product Owner',
	},
	{
		id: 351620,
		name: 'Lê Quang Phúc',
		email: 'quangphuc@lutech.ltd',
		position: 'Graphic Designer',
	},
];

const openDialog = ref(false);
const openAlert = ref(false);

const handleEdit = () => {
	openDialog.value = true;
};

const handleDelete = () => {
	openAlert.value = true;
};

const handleCloseDialog = (open: boolean) => {
	openDialog.value = open;
};

const handleCloseAlert = (open: boolean) => {
	openAlert.value = open;
};

const table = useVueTable({
	data,
	columns: employeeColumn(handleEdit, handleDelete),
	getCoreRowModel: getCoreRowModel(),
});
</script>
<template>
	<div>
		<div>
			<Title>Employees</Title>
		</div>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon class="py-2 flex-1" :icon="Search" placeholder="Search emloyee..." />
			<Button variant="outline" class="w-fit rounded-full">
				<IconFromSvg :icon="Tuning" /> Filter
			</Button>
			<Button class="bg-blue-500 hover:bg-blue-600 rounded-2xl h-auto font-medium">
				<IconFromSvg :icon="UserPlus" class="!w-6 !h-6" /> Add new
			</Button>
		</div>
		<div>
			<DataTable :table="table" />
		</div>
		<EmployeeDialog :open="openDialog" @update:open="handleCloseDialog" />
		<AlertPopup :open="openAlert" @update:open="handleCloseAlert" />
	</div>
</template>
