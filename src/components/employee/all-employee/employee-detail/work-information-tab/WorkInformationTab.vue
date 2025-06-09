<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import Chart2 from '@/assets/icons/Outline/Chart2.svg';
import ChartSquare from '@/assets/icons/Outline/ChartSquare.svg';
import Clipboard from '@/assets/icons/Outline/ClipboardList.svg';
import ClockCircle from '@/assets/icons/Outline/ClockCircle.svg';
import MapPoint from '@/assets/icons/Outline/MapPointWave.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import UserCircle from '@/assets/icons/Outline/UserCircle.svg';
import UserGroup from '@/assets/icons/Outline/UsersGroupRounded.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import Title from '@/components/common/Title.vue';
import FormMarkdown from '@/components/form/FormMarkdown.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { useBranch } from '@/composables/branch/useBranch';
import { useDepartment } from '@/composables/department/useDepartment';
import { usePosition } from '@/composables/position/usePosition';
import { useListUser } from '@/composables/user/useUser';
import { listJobLevel, listWorkHour } from '@/constants';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { workInformationSchema } from './schema';

const { data: branches } = useBranch();
const { data: departments } = useDepartment();
const { data: positions } = usePosition();
const { data: users } = useListUser();

const isEdit = ref(false);

const listBranch = computed(
	() => branches.value?.map((item) => ({ label: item.name, value: item.id })) || [],
);
const listDepartment = computed(
	() => departments.value?.map((item) => ({ label: item.name, value: item.id })) || [],
);
const listPosition = computed(
	() => positions.value?.map((item) => ({ label: item.name, value: item.id })) || [],
);
const listUser = computed(
	() => users.value?.map((item) => ({ label: item.name, value: item.id })) || [],
);

const formSchema = toTypedSchema(workInformationSchema);

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
		<Title class="text-xl">Work information</Title>
		<ScrollArea class="text-slate-600 pr-3 h-[calc(100vh-400px)]">
			<form v-if="isEdit" id="form" @submit="onSubmit">
				<div class="grid grid-cols-2 gap-y-4 gap-x-6">
					<FormSelect
						:required="true"
						:icon="Building3"
						name="branch_id"
						label="Branch"
						:list="listBranch"
						placeholder="Select branch" />
					<FormSelect
						:required="true"
						:icon="Buildings"
						name="department_id"
						label="Department"
						:list="listDepartment"
						placeholder="Select department" />
					<FormSelect
						:required="true"
						:icon="Buildings"
						name="position_id"
						label="Position"
						:list="listPosition"
						placeholder="Select position" />
					<FormSelect
						:icon="Chart2"
						name="level"
						label="Level"
						:list="listJobLevel"
						placeholder="Select level" />
					<FormSelect
						:required="true"
						:icon="UserGroup"
						name="line_manager_id"
						label="Line manager"
						:list="listUser"
						placeholder="Select line manager" />
					<FormSelectCalendar :required="true" name="joining_date" label="Joining date" />
					<FormSelect
						:required="true"
						:icon="ChartSquare"
						name="work_status"
						label="Work status"
						:list="[]"
						placeholder="Select work status" />
					<FormSelect
						:required="true"
						:icon="ClockCircle"
						name="working_hours"
						label="Working hours"
						:list="listWorkHour"
						placeholder="Select working hours" />
					<FormSelectCalendar
						:required="true"
						name="work_status_end_date"
						label="Work status end date" />
					<FormSelect
						:required="true"
						:icon="MapPoint"
						name="work_location"
						label="Work location"
						:list="[]"
						placeholder="Select work location" />
				</div>
				<div class="mt-4">
					<FormMarkdown
						:model-value="[
							'Analyzing data trends to identify patterns and insights.',
							'Analyzing data trends to identify patterns and insights.',
						]"
						name="job_description"
						label="Job description"
						type="bullet" />
				</div>
			</form>
			<div v-else>
				<div class="grid items-start grid-cols-2 gap-6">
					<InformationItem :icon="Building3" label="Branch" value="Đà Nẵng" />
					<InformationItem :icon="Buildings" label="Department" value="Data" />
					<InformationItem :icon="UserCircle" label="Position" value="Data Analyst" />
					<InformationItem :icon="Chart2" label="Level" value="Junior" />
					<InformationItem
						:icon="UserGroup"
						label="Line manager"
						value="Nguyễn Thanh Long" />
					<InformationItem
						:icon="CalendarIcon"
						label="Joining date"
						value="27 April, 2025" />
					<InformationItem :icon="ChartSquare" label="Work status" value="Intern" />
					<InformationItem
						:icon="ClockCircle"
						label="Working hours"
						value="8:15 AM - 5:45 PM" />
					<InformationItem
						:icon="CalendarIcon"
						label="Work status end date"
						value="27 April, 2026" />
					<div class="grid grid-cols-2 items-start">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="MapPoint" />
							Working location
						</div>
						<span class="text-black">
							Tầng 4, Tòa nhà Hanvico (217 Lê Duẩn, Thanh Khê, Đà Nẵng)
						</span>
					</div>
				</div>
				<div class="mt-6">
					<h3 class="flex gap-2 items-center">
						<IconFromSvg :icon="Clipboard" />Job description
					</h3>
					<ul class="list-disc list-inside mt-2 text-black ml-2 grid gap-1">
						<li>Analyzing data trends to identify patterns and insights.</li>
						<li>Analyzing data trends to identify patterns and insights.</li>
						<li>Analyzing data trends to identify patterns and insights.</li>
						<li>Analyzing data trends to identify patterns and insights.</li>
					</ul>
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
