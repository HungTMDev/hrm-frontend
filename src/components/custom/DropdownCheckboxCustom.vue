<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
	DropdownMenuCheckboxItem,
	type DropdownMenuCheckboxItemEmits,
	type DropdownMenuCheckboxItemProps,
	useForwardPropsEmits,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import Checkbox from '../ui/checkbox/Checkbox.vue';

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DropdownMenuCheckboxItemEmits>();

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props;

	return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<DropdownMenuCheckboxItem
		v-bind="forwarded"
		:class="
			cn(
				'relative flex gap-2 items-center cursor-default select-none rounded-sm py-1.5 px-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				props.class,
			)
		">
		<span>
			<Checkbox
				:model-value="forwarded.modelValue"
				class="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500" />
		</span>
		<slot />
	</DropdownMenuCheckboxItem>
</template>
