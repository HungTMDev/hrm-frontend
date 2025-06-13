<script lang="ts" setup>
import CheckCircle from '@/assets/icons/Bold/CheckCircle.svg';
import Close from '@/assets/icons/Outline/Close.svg';
import DangerCircle from '@/assets/icons/Outline/DangerCircle.svg';
import Restart from '@/assets/icons/Outline/Restart.svg';
import Upload from '@/assets/icons/Outline/UploadMinimalistic.svg';
import { useCustomToast } from '@/lib/customToast';
import type { FormFieldCommon } from '@/types';
import { computed, ref } from 'vue';
import IconFromSvg from '../common/IconFromSvg.vue';
import ProgressCircle from '../common/ProgressCircle.vue';
import UserAvatar from '../common/UserAvatar.vue';
import Button from '../ui/button/Button.vue';
import Label from '../ui/label/Label.vue';

interface Prop extends FormFieldCommon {
	type?: 'file' | 'photo';
	allowedTypes?: string[];
}
const props = defineProps<Prop>();

const emits = defineEmits<{
	(e: 'update:value', payload: File | undefined): void;
}>();

const { showToast } = useCustomToast();

const fileInputRef = ref<HTMLInputElement>();
const selectedFile = ref<File>();
const uploadProgress = ref(0);
const error = ref<any>();
const previewUrl = ref<string>();
const allowedTypes = computed(() =>
	props.allowedTypes
		? props.allowedTypes
		: props.type === 'photo'
			? ['image/png', 'image/jpeg']
			: [
					'application/pdf',
					'application/msword',
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				],
);
const placeholder = computed(() =>
	props.type === 'photo' ? 'Only .png or .jpg' : 'Only .pdf, .doc or .docx',
);

const handleFileUpload = (event: any) => {
	error.value = undefined;
	uploadProgress.value = 10;
	const file = event.target.files[0];
	processFile(file);
};

const processFile = (file: any) => {
	if (!file) {
		uploadProgress.value = 0;
		return;
	}

	selectedFile.value = file;

	if (!allowedTypes.value.includes(file.type)) {
		error.value = 1;
		uploadProgress.value = 0;
		showToast({
			message: 'Invalid file type!',
			type: 'error',
		});
		return;
	}

	if (file.size > 10 * 1024 * 1024) {
		error.value = 1;
		uploadProgress.value = 0;
		showToast({
			message: 'File size exceeds 10MB.',
			type: 'error',
		});
		return;
	}

	emits('update:value', selectedFile.value);

	const interval = setInterval(() => {
		uploadProgress.value += 20;
		if (uploadProgress.value >= 100) {
			uploadProgress.value = 0;
			previewUrl.value = URL.createObjectURL(selectedFile.value!);
			clearInterval(interval);
		}
	}, 300);
};

const handleRemoveFile = () => {
	selectedFile.value = undefined;
	uploadProgress.value = 0;

	if (fileInputRef.value) {
		fileInputRef.value.value = '';
	}
};

const handleDrop = (event: DragEvent) => {
	event.preventDefault();
	error.value = undefined;
	uploadProgress.value = 10;

	const file = event.dataTransfer?.files[0];
	processFile(file);
};

const handleDragOver = (event: DragEvent) => {
	event.preventDefault();
};

const handleDragLeave = (event: DragEvent) => {
	event.preventDefault();
};

const handleReset = () => {
	processFile(selectedFile.value);
};
</script>
<template>
	<div class="flex flex-col gap-2">
		<h6 class="text-sm font-medium">{{ label }}</h6>
		<div v-if="error" class="flex gap-2 items-center px-4 py-2 bg-red-50 rounded-2xl">
			<div>
				<IconFromSvg :icon="DangerCircle" class="text-red-500" />
			</div>
			<div class="flex-1 flex flex-col gap-1">
				<p class="text-sm text-black">{{ selectedFile?.name }}</p>
				<p class="text-sm text-red-500">Failed</p>
			</div>
			<Button type="button" variant="ghost" class="p-0 hover:bg-red-50" @click="handleReset">
				<IconFromSvg :icon="Restart" class="text-red-500" />
			</Button>
		</div>
		<div
			v-else-if="selectedFile && uploadProgress === 0"
			class="flex gap-2 items-center px-4 py-2 rounded-2xl border">
			<IconFromSvg :icon="CheckCircle" class="text-green-500" />
			<UserAvatar v-if="type === 'photo'" :url="previewUrl" class="w-10 h-10 rounded-xl" />
			<p class="text-sm text-black flex-1 truncate">{{ selectedFile?.name }}</p>
			<Button type="button" variant="ghost" class="p-0 hover:bg-white" @click="handleRemoveFile"
				><IconFromSvg :icon="Close"
			/></Button>
		</div>
		<div v-if="selectedFile && uploadProgress === 0" class="text-center !mt-0">or</div>
		<div v-if="selectedFile && uploadProgress === 0" class="flex justify-center !mt-0">
			<Label :for="name" class="w-fit hover:cursor-pointer !text-slate-600">
				<div class="border rounded-2xl p-3">Choose new file</div>
			</Label>
		</div>
		<Label
			v-else
			:for="name"
			class="!mt-0 hover:cursor-pointer !text-slate-600"
			@dragover="handleDragOver"
			@dragleave="handleDragLeave"
			@drop="handleDrop">
			<div
				class="border border-dashed h-36 rounded-2xl grid place-items-center hover:bg-slate-50 hover:border-blue-100">
				<div v-if="selectedFile" class="flex flex-col items-center gap-2">
					<ProgressCircle :progress="uploadProgress" />
					<p class="text-center">Uploading {{ selectedFile?.name }}</p>
					<p class="text-gray-200 text-xs font-normal">
						<span>{{ Math.floor(selectedFile?.size / 1024) }}</span> KB -
						<span>{{ uploadProgress }}</span
						>% completed
					</p>
				</div>
				<div v-else class="flex flex-col items-center gap-2">
					<div class="w-10 h-10 bg-gray-50 rounded-xl grid place-items-center">
						<IconFromSvg :icon="Upload" class="!w-6 !h-6" />
					</div>
					<p><span class="text-blue-500">Choose file</span>, or drag and drop</p>
					<p class="text-gray-200 font-normal">Max file size 10MB. {{ placeholder }}</p>
				</div>
			</div>
		</Label>

		<input ref="fileInputRef" :id="name" type="file" class="hidden" @change="handleFileUpload" />
	</div>
</template>
