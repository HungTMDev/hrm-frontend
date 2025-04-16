<script setup lang="ts">
import Down from '@/assets/icons/Outline/Alt Arrow Down.svg';
import CalendarIcon from '@/assets/icons/Outline/Calendar.svg';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatDateValueToLocalDate } from '@/lib/utils';
import { type DateValue } from '@internationalized/date';
import { ref, type HTMLAttributes } from 'vue';
import IconFromSvg from '../common/IconFromSvg.vue';
import CalendarCustom from '../custom/CalendarCustom.vue';
import type { FormFieldCommon } from '@/types';

interface Prop extends FormFieldCommon {
	class?: HTMLAttributes['class'];
}

const props = defineProps<Prop>();

const emit = defineEmits<{
	(e: 'update:value', payload: { fieldName: string; data: string | undefined }): void;
}>();

const placeholder = ref();
const value = ref<DateValue>();
const isOpen = ref(false);

const handlePick = (fieldName: string) => {
	emit('update:value', { fieldName, data: value.value?.toString() });
};

const handleOpen = (open: boolean) => {
	isOpen.value = open;
};
</script>

<template>
	<FormField v-slot="{ errors, field }" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel>{{ label }}</FormLabel>
			<Popover :open="isOpen" @update:open="handleOpen">
				<PopoverTrigger as-child>
					<FormControl>
						<Button
							variant="outline"
							:class="
								cn(
									'w-[240px] gap-3 ps-3 p-3 h-auto text-start font-normal rounded-2xl border justify-start focus:border-blue-200',
									!value && 'text-muted-foreground',
									errors.length > 0 && 'border-destructive',
									props.class,
								)
							">
							<IconFromSvg :icon="CalendarIcon" class="text-gray-200" />
							<span
								:class="[
									value ? 'text-slate-600' : 'text-gray-200',
									'flex-1 font-normal',
								]"
								>{{
									value ? formatDateValueToLocalDate(value) : 'dd/MM/yyyy'
								}}</span
							>
							<span>
								<IconFromSvg
									:icon="Down"
									:class="[isOpen ? 'rotate-180' : 'rotate-0', 'duration-200']" />
							</span>
						</Button>
						<input hidden />
					</FormControl>
				</PopoverTrigger>
				<PopoverContent class="w-auto p-0 rounded-2xl">
					<CalendarCustom
						v-model:placeholder="placeholder"
						v-model="value"
						calendar-label="Date of birth"
						initial-focus
						@update:model-value="handlePick(field.name)" />
				</PopoverContent>
			</Popover>
			<FormMessage />
		</FormItem>
	</FormField>
</template>
