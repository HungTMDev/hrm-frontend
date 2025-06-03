<script lang="ts" setup>
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { JOB_STATUS_STYLE } from '@/constants';
import { cn } from '@/lib/utils';
import type { ComboboxType } from '@/types';
import type { HTMLAttributes } from 'vue';

interface Prop {
	modelValue: string;
	class?: HTMLAttributes['class'];
	list: ComboboxType[];
}

defineProps<Prop>();

const emits = defineEmits<{
	(e: 'update', payload: string): void;
}>();

const handleUpdate = (payload: any) => {
	emits('update', payload);
};
</script>
<template>
	<div>
		<Select :model-value="modelValue" @update:model-value="handleUpdate">
			<SelectTrigger
				class="w-[120px] rounded-2xl py-2 px-3 h-auto border-none focus:ring-0 focus:ring-offset-0"
				:class="cn(JOB_STATUS_STYLE[modelValue])">
				<SelectValue placeholder="Select" />
			</SelectTrigger>
			<SelectContent class="rounded-2xl">
				<SelectGroup>
					<SelectItem
						v-for="(item, index) in list"
						:key="index"
						:value="item.value"
						class="rounded-xl py-2">
						{{ item.label }}
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	</div>
</template>
