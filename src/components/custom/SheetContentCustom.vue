<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
	DialogClose,
	DialogContent,
	type DialogContentEmits,
	type DialogContentProps,
	DialogOverlay,
	DialogPortal,
	useForwardPropsEmits,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import { sheetVariants, type SheetVariants } from '../ui/sheet';
import IconFromSvg from '../common/IconFromSvg.vue';
import Right from '@/assets/icons/Outline/Alt Arrow Right.svg';

interface SheetContentProps extends DialogContentProps {
	class?: HTMLAttributes['class'];
	side?: SheetVariants['side'];
}

defineOptions({
	inheritAttrs: false,
});

const props = defineProps<SheetContentProps>();

const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
	const { class: _, side, ...delegated } = props;

	return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<DialogPortal>
		<DialogOverlay
			class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
		<DialogContent
			:class="cn(sheetVariants({ side }), props.class)"
			v-bind="{ ...forwarded, ...$attrs }">
			<DialogClose class="w-10 h-10 border rounded-full grid place-items-center">
				<IconFromSvg :icon="Right" />
			</DialogClose>
			<slot />
		</DialogContent>
	</DialogPortal>
</template>
