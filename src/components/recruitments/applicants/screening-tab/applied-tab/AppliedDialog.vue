<script setup lang="ts">
import CallApiButton from '@/components/common/CallApiButton.vue';
import CommonCombobox from '@/components/common/CommonCombobox.vue';
import UploadField from '@/components/common/UploadField.vue';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import Label from '@/components/ui/label/Label.vue';
import { useListJob } from '@/composables/recruitment/job/useJob';
import { useUpLoadApplicantForJob } from '@/composables/recruitment/job/useUpdateJob';
import { computed, reactive } from 'vue';

const { data: jobs } = useListJob();

defineProps<{
	open: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
}>();

const data = reactive<{
	job_id?: string;
	file?: File;
}>({});
const list = computed(
	() =>
		jobs.value
			?.filter((item) => item.status === 'OPENING')
			.map((item) => ({
				label: item.title,
				value: item.id,
			})) || [],
);

const { mutate, isPending } = useUpLoadApplicantForJob();

const handleOpen = (isOpen: boolean) => {
	data.job_id = undefined;
	data.file = undefined;
	emits('update:open', isOpen);
};

const handleSelectJob = (payload: any) => {
	data.job_id = payload as string;
};

const handleSelectFile = (payload: File | undefined) => {
	data.file = payload;
};

const handleUpload = () => {
	if (data.job_id && data.file) {
		mutate(
			{ job_id: data.job_id, file: data.file },
			{
				onSuccess: () => {
					handleOpen(false);
				},
			},
		);
	}
};
</script>

<template>
	<Dialog :open="open" @update:open="handleOpen">
		<DialogContent class="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Upload candidates for job</DialogTitle>
				<DialogDescription> </DialogDescription>
			</DialogHeader>
			<div>
				<div class="flex flex-col gap-2 mb-4">
					<Label>Job</Label>
					<CommonCombobox
						:list="list"
						label="Job"
						list-size="md"
						class="w-full rounded-2xl h-auto p-3"
						@update:model-value="handleSelectJob" />
				</div>

				<UploadField
					name="file"
					label="File"
					:allowed-types="['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']"
					@update:value="handleSelectFile" />
			</div>
			<DialogFooter>
				<CallApiButton
					:is-loading="isPending"
					class="h-auto py-3.5 px-8 rounded-2xl bg-blue-500 hover:bg-blue-600"
					@click="handleUpload"
					>Upload</CallApiButton
				>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
