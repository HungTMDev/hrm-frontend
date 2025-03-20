<script lang="ts" setup>
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Button from '@/components/ui/button/Button.vue';

const emit = defineEmits<{
	(e: 'edit'): void;
	(e: 'delete'): void;
}>();

const handleEdit = () => {
	emit('edit');
};

const handleDelete = () => {
	emit('delete');
};
</script>
<template>
	<div class="flex gap-2 items-center">
		<Button
			class="p-2 h-fit bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500 rounded-xl"
			@click="handleEdit">
			<IconFromSvg :icon="Pen2" />
		</Button>
		<Button
			class="p-2 h-fit bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-xl"
			@click="handleDelete">
			<IconFromSvg :icon="Trash" />
		</Button>
	</div>
</template>
