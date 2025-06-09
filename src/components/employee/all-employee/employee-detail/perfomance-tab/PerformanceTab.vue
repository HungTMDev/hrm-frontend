<script lang="ts" setup>
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import Chart from '@/assets/icons/Outline/Chart.svg';
import ChatRound from '@/assets/icons/Outline/ChatRoundLine.svg';
import DocumentText from '@/assets/icons/Outline/DocumentText.svg';
import File from '@/assets/icons/Outline/File.svg';
import ListCheck from '@/assets/icons/Outline/ListCheckMinimalistic.svg';
import Medal from '@/assets/icons/Outline/MedalRibbonStar.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import Title from '@/components/common/Title.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import FormUpload from '@/components/form/FormUpload.vue';
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';

const isEdit = ref(false);

const handleCancel = () => {
	isEdit.value = false;
};

const handleEdit = () => {
	isEdit.value = true;
};
</script>
<template>
	<div class="h-full flex flex-col gap-3">
		<div class="flex-1">
			<Title class="text-xl">Performance</Title>

			<div v-if="isEdit">
				<form class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
					<FormSelect
						:icon="Chart"
						:required="true"
						name="performance_rating"
						label="Performance rating"
						placeholder="Select performance rating"
						:list="[]" />
					<FormSelectCalendar
						:required="true"
						name="evaluation_date"
						label="Evaluation date" />
					<FormInput
						:icon="ListCheck"
						:required="true"
						name="kpi_met"
						label="KPIs met"
						class="w-full"
						placeholder="Enter KPIs met" />
					<FormUpload
						:required="true"
						name="feedback"
						label="Feedback manager"
						type="file" />
					<FormInput
						:icon="DocumentText"
						:required="true"
						class="w-full"
						name="improvement_plan"
						placeholder="Enter improvement plan"
						label="Improvement plan" />
					<FormInput
						:icon="Medal"
						:required="true"
						name="promotions_rewards"
						class="w-full"
						placeholder="Enter promotions and rewards"
						label="Promotions and rewards" />
				</form>
			</div>

			<div v-else class="grid grid-cols-2 gap-x-6 gap-y-4 text-slate-600 mt-4">
				<InformationItem :icon="Chart" label="Performance rating" value="Excellent" />
				<InformationItem
					:icon="CalendarIcon"
					label="Evaluation date"
					value="24 April, 2025" />
				<InformationItem :icon="ListCheck" label="KPIs met" value="-" />
				<div class="grid grid-cols-2 items-center">
					<div class="flex gap-2 items-center">
						<IconFromSvg :icon="ChatRound" />
						Feedback from manager
					</div>
					<a
						href="#"
						target="_blank"
						rel=""
						class="flex items-center gap-2 bg-blue-50 text-blue-500 w-fit px-2 py-1 rounded-xl font-medium"
						><IconFromSvg :icon="File" class="!w-4 !h-4" />feedback.pdf</a
					>
				</div>
				<InformationItem :icon="DocumentText" label="Improvement plan" value="-" />
				<InformationItem :icon="Medal" label="Promotions and rewards" value="-" />
			</div>
		</div>
		<div class="flex justify-end items-center gap-2">
			<Button
				v-if="!isEdit"
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
