<script setup lang="ts">
import { Button } from '@/components/ui/button';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import MenuDots from '@/assets/icons/Bold/Menu Dots.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import type { IActionGroupType } from '@/types';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
	actions: IActionGroupType[];
	class?: HTMLAttributes['class'];
}>();

const emit = defineEmits();

const handleAction = (action: IActionGroupType) => {
	emit(action.label.toLowerCase().replace(/\s+/g, '-'));
};
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="ghost" class="p-1 h-fit" @click.stop>
				<IconFromSvg :icon="MenuDots" class="rotate-90" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent :class="cn('w-32 rounded-2xl', props.class)" align="end">
			<DropdownMenuItem
				v-for="(action, index) in props.actions"
				:key="index"
				:class="['rounded-2xl py-3']"
				@click="handleAction(action)">
				<IconFromSvg :icon="action.icon" :class="action.style" />
				<span :class="action.style">{{ action.label }}</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
