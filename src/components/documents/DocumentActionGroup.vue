<script lang="ts" setup>
import Button from '../ui/button/Button.vue';
import Download from '@/assets/icons/Outline/DownloadMinimalistic.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import Trash from '@/assets/icons/Outline/TrashBinMinimalistic.svg';
import IconFromSvg from '../common/IconFromSvg.vue';

const emit = defineEmits<{
	(e: 'edit', payload: any): void;
	(e: 'delete', payload: any): void;
	(e: 'download'): void;
}>();

const handleDownload = () => {
	emit('download');
};

const handleEdit = (payload: any) => {
	emit('edit', payload);
};

const handleDelete = (payload: any) => {
	emit('delete', payload);
};
</script>
<template>
	<div class="flex gap-2">
		<Button
			class="h-fit p-2 bg-green-50 hover:bg-green-100 text-green-500 rounded-xl"
			@click="handleDownload">
			<IconFromSvg :icon="Download" />
		</Button>
		<Button
			class="h-fit p-2 bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-xl"
			@click="handleEdit">
			<IconFromSvg :icon="Pen2" />
		</Button>
		<Button
			class="h-fit p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl"
			@click="handleDelete">
			<IconFromSvg :icon="Trash" />
		</Button>
	</div>
</template>
