<script setup lang="ts">
import Down from '@/assets/icons/Outline/AltArrowDown.svg';
import { cn } from '@/lib/utils';
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import IconFromSvg from '../common/IconFromSvg.vue';

const props = defineProps<
	AccordionTriggerProps & { isSmall?: boolean; class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<AccordionHeader class="flex">
		<AccordionTrigger
			v-bind="delegatedProps"
			:class="
				cn(
					'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
					props.class,
				)
			">
			<slot />
			<slot name="icon" v-if="isSmall">
				<IconFromSvg :icon="Down" class="transition-transform duration-200" />
			</slot>
		</AccordionTrigger>
	</AccordionHeader>
</template>
