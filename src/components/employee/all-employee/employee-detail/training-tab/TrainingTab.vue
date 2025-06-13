<script lang="ts" setup>
import Left from '@/assets/icons/Outline/AltArrowLeft.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import ChartSquare from '@/assets/icons/Outline/ChartSquare.svg';
import HandStar from '@/assets/icons/Outline/HandStars.svg';
import Medal from '@/assets/icons/Outline/MedalRibbonsStar.svg';
import Notebook from '@/assets/icons/Outline/NotebookBookmark.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import Graph from '@/assets/icons/Outline/PresentationGraph.svg';
import ShieldUser from '@/assets/icons/Outline/ShieldUser.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import ScrollBar from '@/components/ui/scroll-area/ScrollBar.vue';
import { useAppStore } from '@/stores/app.store';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { ref } from 'vue';
import { trainingTabColumn } from './columns';

const appStore = useAppStore();

const isView = ref(false);
const isEdit = ref(false);

const table = useVueTable({
	data: [
		{
			training_program: 'Leadership Essentials',
			status: 'Completed',
			start_day: '2024-01-15',
			end_day: '2024-03-15',
			training_type: 'Online',
			skill_acquired: 'Team Management, Communication',
			certification: 'Leadership Certificate',
			mentorship_or_coaching: 'Yes',
		},
		{
			training_program: 'Advanced Data Analysis',
			status: 'In Progress',
			start_day: '2025-02-01',
			end_day: '2025-05-01',
			training_type: 'On-site',
			skill_acquired: 'SQL, Power BI, Data Visualization',
			certification: 'Pending',
			mentorship_or_coaching: 'No',
		},
	],
	columns: trainingTabColumn,
	getCoreRowModel: getCoreRowModel(),
});

const handleView = () => {
	isView.value = true;
};

const handleBackToTable = () => {
	isView.value = false;
};

const handleEdit = () => {
	isEdit.value = true;
	isView.value = false;
};

const handleBackToView = () => {
	isEdit.value = false;
	isView.value = true;
};
</script>
<template>
	<div class="h-full">
		<Title v-if="!isView && !isEdit" class="text-xl"> Training and development information </Title>

		<div v-if="isEdit" class="flex flex-col gap-2 h-full">
			<Title class="text-xl">Management program</Title>
			<div class="flex-1">
				<form class="grid grid-cols-2 gap-6 mt-4">
					<FormInput
						name="training_program"
						label="Training program"
						placeholder="Enter training program"
						class="w-full" />
					<FormSelectCalendar name="start_date" :required="true" label="Start date" />
					<FormSelectCalendar name="end_date" :required="true" label="End date" />
					<FormSelect
						name="training_type"
						label="Training type"
						:list="[]"
						:required="true"
						placeholder="Select training type" />
					<FormSelect
						name="status"
						label="Status"
						:list="[]"
						:required="true"
						placeholder="Select status" />
					<FormInput
						name="certification"
						label="Certification"
						placeholder="Enter certification"
						class="w-full" />
					<FormInput
						name="skill_acquired"
						label="Mentorship / Coaching"
						placeholder="Enter skill acquired"
						class="w-full" />
				</form>
			</div>

			<div class="flex justify-end gap-2">
				<Button variant="outline" class="py-3 px-6 h-auto rounded-2xl" @click="handleBackToView">
					Back
				</Button>
				<Button class="py-3 px-6 h-auto rounded-2xl hover:bg-blue-600"> Save </Button>
			</div>
		</div>

		<div v-else-if="isView" class="flex flex-col gap-2 h-full">
			<div>
				<Button variant="ghost" class="p-2 h-auto rounded-full" @click="handleBackToTable">
					<IconFromSvg :icon="Left" class="!w-6 !h-6" />
				</Button>
			</div>
			<Title class="text-xl">Management program</Title>
			<div class="flex-1">
				<div class="grid grid-cols-2 gap-6 mt-4 items-start">
					<InformationItem :icon="Graph" label="Training program" value="Management program" />
					<InformationItem :icon="Calendar" label="Start date" value="May 22, 2025" />
					<InformationItem :icon="Calendar" label="End date" value="May 24, 2025" />
					<InformationItem :icon="Notebook" label="Training type" value="Online course" />
					<InformationItem :icon="ChartSquare" label="Status" value="Incomplete" />
					<InformationItem :icon="HandStar" label="Skills acquired" value="Management skills" />
					<InformationItem :icon="Medal" label="Certification" value="-" />
					<InformationItem :icon="ShieldUser" label="Mentorship / Coaching" value="-" />
				</div>
			</div>
			<div class="flex justify-end gap-2">
				<Button
					class="rounded-2xl py-3 px-6 h-auto bg-blue-50 text-blue-500 hover:bg-blue-50"
					@click="handleEdit">
					<IconFromSvg :icon="Pen2" />Edit
				</Button>
			</div>
		</div>

		<ScrollArea
			v-else
			class="mt-4 border rounded-2xl p-1 pb-3 w-[calc(100vw-620px)] transition-all duration-300 ease-in-out"
			:class="appStore.isSmallSidebar && 'w-[calc(100vw-488px)]'">
			<DataTable :table="table" @row:click="handleView" />
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	</div>
</template>
