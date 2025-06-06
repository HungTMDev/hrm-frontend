<script lang="ts" setup>
import CheckCircle from '@/assets/icons/Bold/Check Circle.svg';
import Close from '@/assets/icons/Outline/Close.svg';
import DangerCircle from '@/assets/icons/Outline/Danger Circle.svg';
import Upload from '@/assets/icons/Outline/Upload Minimalistic.svg';
import { useCustomToast } from '@/lib/customToast';
import type { FormFieldCommon } from '@/types';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import IconFromSvg from '../common/IconFromSvg.vue';
import ProgressCircle from '../common/ProgressCircle.vue';
import UserAvatar from '../common/UserAvatar.vue';
import Button from '../ui/button/Button.vue';
import Label from '../ui/label/Label.vue';

interface Prop extends Omit<FormFieldCommon, 'modelValue'> {
	type?: 'file' | 'photo';
	allowedTypes?: string[];
	modelValue?: File[];
}
const props = defineProps<Prop>();

const emits = defineEmits<{
	(e: 'update:value', payload: File[] | undefined): void;
}>();

const { showToast } = useCustomToast();

const fileInputRef = ref<HTMLInputElement>();
const selectedFiles = ref<File[]>([]);
const fileStates = ref<
	{ error?: number; errorMessage?: string; uploadProgress: number; previewUrl?: string }[]
>([]);

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

const validateFile = (file: File): { isValid: boolean; errorMessage?: string } => {
	if (!allowedTypes.value.includes(file.type)) {
		return {
			isValid: false,
			errorMessage: `Invalid file type: ${file.type}`,
		};
	}

	if (file.size > 10 * 1024 * 1024) {
		return {
			isValid: false,
			errorMessage: `File size exceeds 10MB (${Math.round(file.size / (1024 * 1024))}MB)`,
		};
	}

	return { isValid: true };
};

const simulateUpload = (index: number) => {
	if (!fileStates.value[index]) return Promise.resolve();

	return new Promise<void>((resolve) => {
		const interval = setInterval(() => {
			if (fileStates.value[index]) {
				fileStates.value[index].uploadProgress += 20;

				if (fileStates.value[index].uploadProgress >= 100) {
					fileStates.value[index].uploadProgress = 100;
					clearInterval(interval);
					resolve();
				}
			} else {
				clearInterval(interval);
				resolve();
			}
		}, 100);
	});
};

const processFile = async (files: File[]) => {
	if (!files || files.length === 0) {
		return;
	}

	const newFileStates: typeof fileStates.value = [];
	const validFiles: File[] = [];

	// First pass: validate all files
	for (const file of files) {
		const validation = validateFile(file);

		if (validation.isValid) {
			validFiles.push(file);
			newFileStates.push({ uploadProgress: 0 });
		} else {
			newFileStates.push({
				error: 1,
				uploadProgress: 0,
				errorMessage: validation.errorMessage,
			});

			showToast({
				message: validation.errorMessage || 'File validation failed',
				type: 'error',
			});
		}
	}

	fileStates.value = newFileStates;
	selectedFiles.value = files;

	for (let i = 0; i < files.length; i++) {
		if (!fileStates.value[i].error) {
			await simulateUpload(i);

			if (fileStates.value[i].uploadProgress === 100) {
				fileStates.value[i].previewUrl = URL.createObjectURL(files[i]);
			}
		}
	}

	emits('update:value', validFiles.length > 0 ? validFiles : undefined);
};

const handleFileUpload = (event: Event) => {
	const input = event.target as HTMLInputElement;
	if (!input.files || input.files.length === 0) return;

	const files = Array.from(input.files);
	processFile(files);
};

const handleRemoveFile = (index: number) => {
	if (fileStates.value[index]?.previewUrl) {
		URL.revokeObjectURL(fileStates.value[index].previewUrl);
	}

	selectedFiles.value.splice(index, 1);
	fileStates.value.splice(index, 1);

	if (selectedFiles.value.length === 0 && fileInputRef.value) {
		fileInputRef.value.value = '';
	}

	const validFiles = selectedFiles.value.filter((_, i) => !fileStates.value[i]?.error);

	emits('update:value', validFiles.length > 0 ? validFiles : undefined);
};

const handleDrop = (event: DragEvent) => {
	event.preventDefault();

	if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
		const files = Array.from(event.dataTransfer.files);
		processFile(files);
	}
};

const handleDragOver = (event: DragEvent) => {
	event.preventDefault();
};

const handleDragLeave = (event: DragEvent) => {
	event.preventDefault();
};

// const resetUpload = () => {
// 	fileStates.value.forEach((state) => {
// 		if (state.previewUrl) {
// 			URL.revokeObjectURL(state.previewUrl);
// 		}
// 	});

// 	selectedFiles.value = [];
// 	fileStates.value = [];

// 	if (fileInputRef.value) {
// 		fileInputRef.value.value = '';
// 	}

// 	emits('update:value', undefined);
// };

onBeforeUnmount(() => {
	fileStates.value.forEach((state) => {
		if (state.previewUrl) {
			URL.revokeObjectURL(state.previewUrl);
		}
	});
});

watch(
	() => props.modelValue,
	(newVal) => {
		selectedFiles.value = newVal ?? [];
		selectedFiles.value.forEach((file, index) => {
			fileStates.value[index] = {
				previewUrl: URL.createObjectURL(file),
				uploadProgress: 100,
			};
		});

		emits('update:value', newVal);
	},
);
</script>
<template>
	<div class="flex flex-col gap-2">
		<h6 class="text-sm font-medium">{{ label }}</h6>
		<div
			v-for="(file, index) in selectedFiles"
			:key="`file-${index}`"
			class="flex gap-2 items-center px-4 py-2 rounded-2xl"
			:class="{ 'bg-red-50': fileStates[index]?.error, border: !fileStates[index]?.error }">
			<!-- Error state -->
			<template v-if="fileStates[index]?.error">
				<div>
					<IconFromSvg :icon="DangerCircle" class="text-red-500" />
				</div>
				<div class="flex-1 flex flex-col gap-1 overflow-hidden">
					<p class="text-sm text-black truncate">{{ file.name }}</p>
					<p class="text-sm text-red-500">Failed</p>
				</div>
				<Button
					type="button"
					variant="ghost"
					class="p-0 hover:bg-red-50"
					@click="handleRemoveFile(index)">
					<IconFromSvg :icon="Close" class="text-red-500" />
				</Button>
			</template>

			<!-- Uploading state -->
			<template
				v-else-if="
					fileStates[index]?.uploadProgress > 0 && fileStates[index]?.uploadProgress < 100
				">
				<div class="flex items-center gap-2 flex-1">
					<ProgressCircle :progress="fileStates[index].uploadProgress" />
					<div class="flex flex-col">
						<p class="text-sm text-black truncate">{{ file.name }}</p>
						<p class="text-gray-200 text-xs">
							{{ Math.floor(file.size / 1024) }} KB -
							{{ fileStates[index].uploadProgress }}% completed
						</p>
					</div>
				</div>
				<Button
					type="button"
					variant="ghost"
					class="p-0 hover:bg-white"
					@click="handleRemoveFile(index)">
					<IconFromSvg :icon="Close" />
				</Button>
			</template>

			<!-- Success state -->
			<template v-else-if="fileStates[index]?.uploadProgress === 100">
				<IconFromSvg :icon="CheckCircle" class="text-green-500" />
				<UserAvatar
					v-if="type === 'photo' && fileStates[index].previewUrl"
					:url="fileStates[index].previewUrl"
					class="w-10 h-10 rounded-xl" />
				<p class="text-sm text-black flex-1 truncate">{{ file.name }}</p>
				<Button
					type="button"
					variant="ghost"
					class="p-0 hover:bg-white"
					@click="handleRemoveFile(index)">
					<IconFromSvg :icon="Close" />
				</Button>
			</template>
		</div>

		<!-- New file selection options -->
		<template v-if="selectedFiles.length > 0">
			<div class="text-center">or</div>
			<div class="flex justify-center">
				<Label :for="name" class="w-fit hover:cursor-pointer !text-slate-600">
					<div class="border rounded-2xl p-3">Choose new file</div>
				</Label>
			</div>
		</template>

		<!-- Drop zone / File selection -->
		<Label
			v-else
			:for="name"
			class="!mt-0 hover:cursor-pointer !text-slate-600"
			@dragover="handleDragOver"
			@dragleave="handleDragLeave"
			@drop="handleDrop">
			<div
				class="border border-dashed h-36 rounded-2xl grid place-items-center hover:bg-slate-50 hover:border-blue-100">
				<div class="flex flex-col items-center gap-2">
					<div class="w-10 h-10 bg-gray-50 rounded-xl grid place-items-center">
						<IconFromSvg :icon="Upload" class="!w-6 !h-6" />
					</div>
					<p><span class="text-blue-500">Choose file</span>, or drag and drop</p>
					<p class="text-gray-200 text-sm">Max file size 10MB. {{ placeholder }}</p>
				</div>
			</div>
		</Label>

		<input
			ref="fileInputRef"
			:id="name"
			type="file"
			class="hidden"
			@change="handleFileUpload"
			multiple />
	</div>
</template>
