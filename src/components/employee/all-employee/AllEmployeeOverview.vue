<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Tuning from '@/assets/icons/Outline/Tuning.svg';
import UserPlus from '@/assets/icons/Outline/UserPlus.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import Button from '@/components/ui/button/Button.vue';
import router from '@/routers';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { ref } from 'vue';

const data = [
	{
		id: 351613,
		name: 'Trần Song Quynh',
		email: 'songquynh@lutech.ltd',
		position: 'UI/UX Designer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351614,
		name: 'Nguyễn Đức Phát',
		email: 'ducphat@lutech.ltd',
		position: 'UI/UX Designer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351615,
		name: 'Trịnh Minh Hưng',
		email: 'minhhung@lutech.ltd',
		position: 'Back-end Developer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351616,
		name: 'Ngô Công Linh',
		email: 'conglinh@lutech.ltd',
		position: 'Android Developer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351617,
		name: 'Huỳnh Minh Huy',
		email: 'minhhuy@lutech.ltd',
		position: 'Graphic Designer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351618,
		name: 'Lê Tất Tuấn',
		email: 'tattuan@lutech.ltd',
		position: 'Back-end Developer',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351619,
		name: 'Nguyễn Thanh Long',
		email: 'thanhlong@lutech.ltd',
		position: 'Product Owner',
		department: 'Design',
		status: 'Full-time',
	},
	{
		id: 351620,
		name: 'Lê Quang Phúc',
		email: 'quangphuc@lutech.ltd',
		position: 'Graphic Designer',
		department: 'Design',
		status: 'Full-time',
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

const handleCloseAlert = (open: boolean) => {
	openAlert.value = open;
};

const table = useVueTable({
	data,
	columns: [],
	getCoreRowModel: getCoreRowModel(),
});

const handleNavigate = () => {
	router.push('/employees/all-employee');
};
</script>
<template>
	<div>
		<div class="flex justify-between items-center">
			<Title>Employees</Title>
			<Button variant="link" class="text-blue-500" @click="handleNavigate">View all</Button>
		</div>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				class="py-2 flex-1 rounded-full"
				:icon="Magnifer"
				placeholder="Search emloyee..." />
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
		<AlertPopup :open="openAlert" @update:open="handleCloseAlert" />
	</div>
</template>
