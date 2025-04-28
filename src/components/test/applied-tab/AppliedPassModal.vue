<script setup lang="ts">
import InformationItem from '@/components/common/InformationItem.vue';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import User from '@/assets/icons/Outline/User.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Iphone from '@/assets/icons/Outline/iPhone.svg';
import FileText from '@/assets/icons/Outline/File Text.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import CommonSelect from '@/components/common/CommonSelect.vue';

const props = defineProps<{
	open: boolean;
	data?: any;
}>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
	(e: 'update:save', payload: any): void;
}>();

const handleClose = (isOpen: boolean) => {
	emit('update:open', isOpen);
};

const handleSave = () => {
	emit('update:save', props.data);
};
</script>

<template>
	<Dialog :open="open" @update:open="handleClose">
		<DialogContent class="sm:max-w-[525px] text-sm">
			<DialogHeader>
				<DialogTitle>Pass CV</DialogTitle>
				<DialogDescription> </DialogDescription>
			</DialogHeader>
			<div class="grid gap-4 py-4">
				<InformationItem :icon="User" label="Name" :value="data?.name || ''" />
				<InformationItem :icon="Letter" label="Email" :value="data?.email || ''" />
				<InformationItem :icon="Iphone" label="Phone" :value="data?.phone || ''" />
				<InformationItem :icon="FileText" label="Job" :value="data?.job || ''" />
				<div :class="'grid grid-cols-2 items-center'">
					<div class="flex gap-2 items-center">
						<IconFromSvg :icon="FileText" />
						CV
					</div>
					<a
						href="#"
						class="bg-blue-50 text-blue-500 px-2 py-1 rounded-2xl flex gap-2 items-center justify-center w-[100px]"
						><IconFromSvg :icon="FileText" />CV</a
					>
				</div>
				<div class="grid grid-cols-2 items-center">
					<div class="flex gap-2 items-center">
						<IconFromSvg :icon="FileText" />
						Interviewer
					</div>
					<CommonSelect
						:list="[
							{
								label: 'Ngô Minh Tuấn',
								value: '1',
							},
							{
								label: 'Ngô Minh Khang',
								value: '2',
							},
						]"
						:multiple="true"
						class="w-full"
						list_size="small" />
				</div>
			</div>
			<DialogFooter>
				<Button
					type="submit"
					@click="handleSave"
					class="rounded-2xl bg-blue-500 hover:bg-blue-600 h-auto py-3.5 px-8">
					Save
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
