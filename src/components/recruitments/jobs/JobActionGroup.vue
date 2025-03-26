<script setup lang="ts">
import { Button } from '@/components/ui/button';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import MenuDots from '@/assets/icons/Bold/Menu Dots.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Trash.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';

const emit = defineEmits<{
	(e: 'edit', payload: any): void;
	(e: 'delete', payload: any): void;
}>();

const handleEdit = () => {
	emit('edit', undefined);
};

const handleDelete = () => {
	emit('delete', undefined);
};
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="ghost" class="p-2">
				<IconFromSvg :icon="MenuDots" class="rotate-90" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-32 rounded-2xl" align="end">
			<DropdownMenuItem class="rounded-2xl py-3" @click="handleEdit">
				<IconFromSvg :icon="Pen2" />
				<span>Edit</span>
			</DropdownMenuItem>
			<DropdownMenuItem class="rounded-2xl p-3" @click="handleDelete">
				<IconFromSvg :icon="Trash" class="text-red-500" />
				<span class="text-red-500">Delete</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
