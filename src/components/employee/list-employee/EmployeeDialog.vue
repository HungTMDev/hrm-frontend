<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Prop {
	open: boolean;
}

const props = defineProps<Prop>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
}>();

const handleOpen = (isOpen: boolean) => {
	emit('update:open', isOpen);
};
</script>

<template>
	<Dialog :open="open" @update:open="handleOpen">
		<DialogContent class="sm:max-w-[525px]">
			<DialogHeader>
				<DialogTitle>Edit profile</DialogTitle>
				<DialogDescription>
					Make changes to your profile here. Click save when you're done.
				</DialogDescription>
			</DialogHeader>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right"> Name </Label>
					<Input id="name" default-value="Pedro Duarte" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="username" class="text-right"> Username </Label>
					<Input id="username" default-value="@peduarte" class="col-span-3" />
				</div>
			</div>
			<DialogFooter>
				<Button type="submit"> Save changes </Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
