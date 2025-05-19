<script setup lang="ts">
import Down from '@/assets/icons/Outline/Alt Arrow Down.svg';
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatDateValueToLocalDate, formatISOStringToDateValue } from '@/lib/utils';
import { type DateValue } from '@internationalized/date';
import { onMounted, ref, type HTMLAttributes } from 'vue';
import CalendarCustom from '../custom/CalendarCustom.vue';
import IconFromSvg from './IconFromSvg.vue';

const props = defineProps<{
	modelValue?: string;
	class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string | undefined): void;
}>();

const value = ref<DateValue>();
const isOpen = ref(false);

const handleOpen = (open: boolean) => {
	isOpen.value = open;
};

const handlePick = () => {
	emits('update:modelValue', value.value ? value.value.toString() : undefined);
};

onMounted(() => {
	if (props.modelValue) {
		value.value = formatISOStringToDateValue(props.modelValue as string);
		emits('update:modelValue', value.value ? value.value.toString() : undefined);
	}
});
</script>

<template>
	<Popover :open="isOpen" @update:open="handleOpen">
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				:class="
					cn(
						' justify-start text-left font-normal w-full h-auto p-3 rounded-2xl',
						!value
							? 'text-gray-200 hover:text-gray-200'
							: 'text-slate-600 hover:text-slate-600',
						props.class,
					)
				">
				<IconFromSvg :icon="CalendarIcon" class="text-gray-200" />
				<span :class="[value ? 'text-black' : 'text-gray-200', 'flex-1 font-normal']">{{
					value ? formatDateValueToLocalDate(value) : 'dd/mm/yyyy'
				}}</span>
				<span>
					<IconFromSvg
						:icon="Down"
						:class="[isOpen ? 'rotate-180' : 'rotate-0', 'duration-200']" />
				</span>
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-auto p-0">
			<CalendarCustom v-model="value" initial-focus @update:model-value="handlePick" />
		</PopoverContent>
	</Popover>
</template>
