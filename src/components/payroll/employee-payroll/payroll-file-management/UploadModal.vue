<script setup lang="ts">
import CheckCircle from '@/assets/icons/Bold/Check Circle.svg';
import DangerCircle from '@/assets/icons/Bold/Danger Circle.svg';
import FileText from '@/assets/icons/Bold/File Text.svg';
import Close from '@/assets/icons/Outline/Close.svg';
import Restart from '@/assets/icons/Outline/Restart.svg';
import Upload from '@/assets/icons/Outline/Upload Minimalistic.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Label from '@/components/ui/label/Label.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { formatFileSize } from '@/lib/utils';
import { usePayrollStore } from '@/stores/payroll.store';
import { ref } from 'vue';

const payrollStore = usePayrollStore();

const files = ref<File[]>([]);
const fileStates = ref<
	{
		name: string;
		size: number;
		success: undefined | boolean;
		error: undefined | boolean;
		url: undefined;
	}[]
>([]);

const handleChange = (e: any) => {
	files.value.push(...e.target.files);

	fileStates.value = files.value.map((file) => {
		return {
			name: file.name,
			size: file.size,
			success: undefined,
			error: undefined,
			url: undefined,
		};
	});
};

const handleRemoveFile = (fileName: string) => {
	const index = files.value.findIndex((file) => file.name === fileName);
	files.value.splice(index, 1);

	fileStates.value = files.value.map((file) => {
		return {
			name: file.name,
			size: file.size,
			success: undefined,
			error: undefined,
			url: undefined,
		};
	});
};

const handleOpenDialog = (open: boolean) => {
	if (!open) {
		files.value = [];
		fileStates.value = [];
	}
};

const handleUpload = async () => {
	const res = await payrollStore.uploadPayrollFile(files.value);
	fileStates.value.forEach((file: any) => {
		const index = res.findIndex((item: any) => item.fileName === file.name);
		if (index !== -1) {
			file.error = true;
		}
	});
	console.log(fileStates.value);
};
</script>

<template>
	<AlertDialog @update:open="handleOpenDialog">
		<AlertDialogTrigger as-child>
			<Button class="rounded-2xl bg-blue-500 hover:bg-blue-600 font-normal">
				<IconFromSvg :icon="Upload" /> Upload files
			</Button>
		</AlertDialogTrigger>
		<AlertDialogContent class="pr-3">
			<AlertDialogHeader>
				<AlertDialogTitle>File upload</AlertDialogTitle>
				<AlertDialogDescription> </AlertDialogDescription>
			</AlertDialogHeader>
			<div class="flex flex-col gap-4">
				<div class="h-60 pr-3">
					<!-- <div
						class="w-full h-full border border-dashed rounded-2xl grid place-items-center">
						<div class="flex flex-col gap-2 items-center">
							<ProgressCircle />
							<p class="text-sm font-medium">Uploading</p>
							<span class="text-xs font-normal text-gray-200"
								>4/16 files - 25% completed</span
							>
						</div>
					</div> -->

					<Label for="multipleUpload" class="hover:cursor-pointer group">
						<div
							class="w-full h-full border border-dashed group-hover:border-blue-500 rounded-2xl grid place-items-center">
							<div class="flex flex-col items-center gap-2">
								<div
									class="w-10 h-10 bg-gray-50 rounded-xl grid place-items-center">
									<IconFromSvg :icon="Upload" class="!w-6 !h-6" />
								</div>
								<p>
									<span class="text-blue-500">Choose file</span>, or drag and drop
								</p>
								<p class="text-gray-200 font-normal">Max file size 10MB</p>
							</div>
						</div>
					</Label>
					<input
						id="multipleUpload"
						type="file"
						multiple
						class="hidden"
						@change="handleChange" />
				</div>
				<div v-if="files.length > 0" class="h-60">
					<ScrollArea class="h-full pr-3">
						<div class="grid gap-2">
							<div
								v-for="(file, index) in fileStates"
								:key="index"
								class="flex items-center gap-4 py-2 px-4 border rounded-2xl h-14">
								<IconFromSvg
									v-if="file.success"
									:icon="CheckCircle"
									class="text-green-500" />
								<IconFromSvg
									v-else-if="file.error"
									:icon="DangerCircle"
									class="text-red-500" />
								<IconFromSvg v-else :icon="FileText" class="text-blue-500" />
								<div class="flex-1">
									<p class="text-sm font-medium truncate">{{ file.name }}</p>
									<span v-if="file.error" class="text-xs font-normal text-red-500"
										>Failed</span
									>
									<span
										v-if="!file.success && !file.error"
										class="text-xs font-normal text-gray-200"
										>{{ formatFileSize(file.size) }}
									</span>
								</div>
								<button v-if="file.error">
									<IconFromSvg :icon="Restart" />
								</button>
								<button v-else @click="handleRemoveFile(file.name)">
									<IconFromSvg :icon="Close" />
								</button>
							</div>
						</div>
					</ScrollArea>
				</div>
			</div>
			<AlertDialogFooter class="pr-3">
				<AlertDialogCancel class="h-auto py-3 px-5 rounded-2xl">Cancel</AlertDialogCancel>
				<!-- <CallApiButton
					@click="handleUpload"
					:is-loading="payrollStore.isUploading"
					class="h-auto py-3 px-5 rounded-2xl bg-blue-500 hover:bg-blue-600 font-normal">
					Upload
				</CallApiButton> -->
				<AlertDialogAction
					class="h-auto py-3 px-5 rounded-2xl bg-blue-500 hover:bg-blue-600 font-normal">
					Continue
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>
