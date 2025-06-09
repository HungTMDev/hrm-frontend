<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue';
import Download from '@/assets/icons/Outline/DownloadMinimalistic.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import Trash from '@/assets/icons/Outline/TrashBinMinimalistic.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';

const emit = defineEmits<{
	(e: 'edit'): void;
	(e: 'download'): void;
	(e: 'delete'): void;
}>();

const handleDownload = () => {
	emit('download');
};

const handleEdit = () => {
	emit('edit');
};

const handleDelete = () => {
	emit('delete');
};
</script>
<template>
	<div class="flex gap-3">
		<Button
			class="h-fit p-1.5 rounded-xl text-green-500 bg-green-50 hover:bg-green-100"
			@click.stop="handleDownload">
			<IconFromSvg :icon="Download" />
		</Button>
		<Button
			class="h-fit p-1.5 rounded-xl text-blue-500 bg-blue-50 hover:bg-blue-100"
			@click.stop="handleEdit">
			<IconFromSvg :icon="Pen2" />
		</Button>
		<Button
			class="h-fit p-1.5 rounded-xl text-red-500 bg-red-50 hover:bg-red-100"
			@click.stop="handleDelete">
			<IconFromSvg :icon="Trash" />
		</Button>
	</div>
</template>
