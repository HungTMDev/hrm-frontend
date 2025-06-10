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
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { useBranch } from '@/composables/branch/useBranch';
import { useDepartment } from '@/composables/department/useDepartment';
import { usePosition } from '@/composables/position/usePosition';
import { listJobLevel, listWorkHour } from '@/constants';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { workInformationSchema } from './schema';
import { useListUser } from '@/composables/user/useUser';
import FormMarkdown from '@/components/form/FormMarkdown.vue';

const { data: branches } = useBranch();
const { data: departments } = useDepartment();
const { data: positions } = usePosition();
const { data: users } = useListUser();

const isEdit = ref(false);
const isShowSalary = ref(false);

const workHour = computed(() => {
	const arrStart = workInformation.value?.shift_start.split(':') || [];
	arrStart.pop();
	const arrEnd = workInformation.value?.shift_end.split(':') || [];
	arrEnd.pop();

	const value = `${arrStart.join(':')}-${arrEnd.join(':')}`;

	const workHour = listWorkHour.find((item) => item.value === value);
	return workHour;
});
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

const { mutate: editWorkInformation } = useEditWorkInformation();

const onSubmit = handleSubmit((values) => {
	const [start, end] = values.work_hour.split('-');

	const payload: WorkInformationPayload = {
		...values,
		job_description: (values.job_description as string[])?.join('\n'),
		shift_start_time: start,
		shift_end_time: end,
	};

	editWorkInformation({
		employeeId: employeeId.value,
		id: workInformation.value?.id ?? '',
		payload,
	});
});

const handleEdit = () => {
	isEdit.value = true;
};

const handleCancel = () => {
	isEdit.value = false;
};

const toggleSalary = () => {
	isShowSalary.value = !isShowSalary.value;
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
						:list="listBranch"
						:model-value="workInformation?.branch.id"
						name="branch_id"
						label="Branch"
						placeholder="Select branch" />
					<FormSelect
						:required="true"
						:icon="Buildings"
						:list="listDepartment"
						:model-value="workInformation?.department.id"
						name="department_id"
						label="Department"
						placeholder="Select department" />
					<FormSelect
						:required="true"
						:icon="UsersGroup"
						:model-value="workInformation?.team.id"
						:list="[]"
						name="team_id"
						label="Team"
						placeholder="Select team" />
					<FormSelect
						:required="true"
						:icon="Buildings"
						:list="listPosition"
						:model-value="workInformation?.position.id"
						label="Position"
						name="position_id"
						placeholder="Select position" />
					<FormSelect
						:icon="Chart2"
						:required="true"
						:model-value="workInformation?.level"
						:list="listJobLevel"
						name="level"
						label="Level"
						placeholder="Select level" />
					<FormSelect
						:required="true"
						:icon="UserGroup"
						:model-value="workInformation?.manager.id"
						name="manager_id"
						label="Manager"
						:list="listUser"
						placeholder="Select manager" />
					<FormCurrency
						:icon="Dollar"
						:required="true"
						placeholder="Enter salary"
						name="salary"
						label="Salary" />
					<FormSelectCalendar
						:required="true"
						:model-value="workInformation?.start_date"
						name="start_date"
						label="Joining date" />
					<FormSelectCalendar
						name="end_date"
						:model-value="workInformation?.end_date ?? undefined"
						label="End date" />
					<FormSelect
						:required="true"
						:icon="ChartSquare"
						:model-value="workInformation?.work_status"
						:list="[]"
						name="work_status"
						label="Work status"
						placeholder="Select work status" />
					<FormSelect
						:required="true"
						:icon="ClockCircle"
						:list="listWorkHour"
						:model-value="workHour?.value"
						name="work_hour"
						label="Work hour"
						placeholder="Select work hour" />
					<FormSelect
						:required="true"
						:icon="MapPoint"
						:model-value="workInformation?.work_location"
						:list="[]"
						name="work_location"
						label="Work location"
						placeholder="Select work location" />
				</div>
				<div class="mt-4">
					<FormMarkdown
						:model-value="workInformation?.job_description.split('\n')"
						name="job_description"
						label="Job description"
						type="bullet" />
				</div>
			</form>
			<div v-else>
				<div class="grid items-start grid-cols-2 gap-6">
					<InformationItem
						:icon="Building3"
						label="Branch"
						:value="workInformation?.branch.name" />
					<InformationItem
						:icon="Buildings"
						label="Department"
						:value="workInformation?.department.name" />
					<InformationItem
						:icon="UserCircle"
						label="Position"
						:value="workInformation?.position.title" />
					<InformationItem
						:icon="Chart2"
						label="Level"
						:value="formatStatus(workInformation?.level || '')" />
					<InformationItem
						:icon="UserGroup"
						label="Line manager"
						:value="workInformation?.manager.name" />
					<InformationItem
						:icon="CalendarIcon"
						label="Joining date"
						:value="formatISOStringToLocalDateTime(workInformation?.start_date).date" />
					<InformationItem
						:icon="ChartSquare"
						label="Work status"
						:value="formatStatus(workInformation?.work_status || '')" />
					<InformationItem
						:icon="ClockCircle"
						label="Working hours"
						:value="workHour?.label" />
					<InformationItem
						:icon="CalendarIcon"
						label="Work status end date"
						:value="formatISOStringToLocalDateTime(workInformation?.end_date).date" />
					<div class="grid grid-cols-2 items-start">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="Dollar" />
							Salary
						</div>
						<div class="hover:cursor-pointer" @click="toggleSalary">
							<span v-if="!isShowSalary" class="text-black">********</span>
							<span v-else class="text-black"> 10.000.000 </span>
						</div>
					</div>
					<div class="grid grid-cols-2 items-start">
						<div class="flex gap-2 items-center">
							<IconFromSvg :icon="MapPoint" />
							Working location
						</div>
						<span class="text-black">
							{{ workInformation?.work_location }}
						</span>
					</div>
				</div>
				<div class="mt-6">
					<h3 class="flex gap-2 items-center">
						<IconFromSvg :icon="Clipboard" />Job description
					</h3>
					<ul class="list-disc list-inside mt-2 text-black ml-2 grid gap-1">
						<li
							v-for="(item, index) in workInformation?.job_description.split('\n') ||
							[]"
							:key="index">
							{{ item }}
						</li>
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
