<script setup lang="ts">
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import img from '@/assets/images/delete_img.png';
import CallApiButton from './CallApiButton.vue';

defineProps<{
	open: boolean;
	title?: string;
	description?: string;
	isLoading?: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'confirm'): void;
}>();

const handleOpen = (open: boolean) => {
	emit('update:open', open);
};

const handleConfirm = () => {
	emit('confirm');
};
</script>

<template>
	<AlertDialog :open="open" @update:open="handleOpen">
		<AlertDialogContent class="flex flex-col gap-2 items-center w-[450px]">
			<div class="w-36">
				<img :src="img" alt="" class="w-full" />
			</div>
			<AlertDialogHeader class="flex flex-col gap-1 items-center">
				<AlertDialogTitle class="text-base text-center">{{
					title ? title : 'Are you sure you want to delete?'
				}}</AlertDialogTitle>
				<AlertDialogDescription class="text-sm text-slate-600">
					{{ description || '' }}</AlertDialogDescription
				>
			</AlertDialogHeader>
			<AlertDialogFooter class="w-full flex mt-4">
				<AlertDialogCancel
					@click="() => handleOpen(false)"
					class="w-full rounded-2xl h-auto p-3">
					Cancel
				</AlertDialogCancel>
				<CallApiButton
					:is-loading="isLoading"
					class="w-full rounded-2xl h-auto p-3 bg-red-500 hover:bg-red-600 text-white"
					@click="handleConfirm"
					>Delete</CallApiButton
				>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>
