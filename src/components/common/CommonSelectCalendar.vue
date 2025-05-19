<script lang="ts" setup>
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatDateValueToLocalDate, formatISOStringToDateValue } from '@/lib/utils';
import type { DateValue } from 'reka-ui';
import { onMounted, ref, type HTMLAttributes } from 'vue';
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import IconFromSvg from './IconFromSvg.vue';
import Down from '@/assets/icons/Outline/Alt Arrow Down.svg';
import SelectCalendar from './SelectCalendar.vue';
import Button from '../ui/button/Button.vue';
import { FormControl } from '../ui/form';

const props = defineProps<{
	modelValue?: string;
	class?: HTMLAttributes['class'];
	isForm?: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string | undefined): void;
}>();

const placeholder = ref();
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
		value.value = formatISOStringToDateValue(props.modelValue);
		emits('update:modelValue', value.value ? value.value.toString() : undefined);
	}
});
</script>
<template>
	<Popover :open="isOpen" @update:open="handleOpen">
		<PopoverTrigger as-child>
			<FormControl v-if="isForm">
				<Button
					variant="outline"
					:class="
						cn(
							'w-full gap-3 ps-3 p-3 h-auto text-start font-normal rounded-2xl border justify-start focus:border-blue-200',
							!value && 'text-muted-foreground',
							props.class,
						)
					">
					<IconFromSvg :icon="CalendarIcon" class="text-gray-200" />
					<span
						:class="[value ? 'text-slate-600' : 'text-gray-200', 'flex-1 font-normal']"
						>{{ value ? formatDateValueToLocalDate(value) : 'dd/mm/yyyy' }}</span
					>
					<span>
						<IconFromSvg
							:icon="Down"
							:class="[isOpen ? 'rotate-180' : 'rotate-0', 'duration-200']" />
					</span>
				</Button>
				<input hidden />
			</FormControl>
			<Button
				v-else
				variant="outline"
				:class="
					cn(
						'w-full gap-3 ps-3 p-3 h-auto text-start font-normal rounded-2xl border justify-start focus:border-blue-200',
						!value && 'text-muted-foreground',
						props.class,
					)
				">
				<IconFromSvg :icon="CalendarIcon" class="text-gray-200" />
				<span :class="[value ? 'text-slate-600' : 'text-gray-200', 'flex-1 font-normal']">{{
					value ? formatDateValueToLocalDate(value) : 'dd/mm/yyyy'
				}}</span>
				<span>
					<IconFromSvg
						:icon="Down"
						:class="[isOpen ? 'rotate-180' : 'rotate-0', 'duration-200']" />
				</span>
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-auto p-0 rounded-2xl">
			<SelectCalendar
				v-model:placeholder="placeholder"
				v-model="value"
				initial-focus
				@update:model-value="handlePick" />
		</PopoverContent>
	</Popover>
</template>
