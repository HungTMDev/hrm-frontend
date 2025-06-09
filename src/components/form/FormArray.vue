<script lang="ts" setup>
import AddCircle from '@/assets/icons/Outline/AddCircle.svg';
import type { FormFieldCommon } from '@/types';
import { FieldArray } from 'vee-validate';
import IconFromSvg from '../common/IconFromSvg.vue';
import { Button } from '../ui/button';
import Separator from '../ui/separator/Separator.vue';
import { cn } from '@/lib/utils';

interface Props extends FormFieldCommon {
	initValue: any;
	isSeparator?: boolean;
	labelSize?: 'xs' | 'sm' | 'md' | 'lg';
	buttonLabel?: string;
}

defineProps<Props>();
</script>
<template>
	<FieldArray v-slot="{ fields, push, remove }" :name="name">
		<div class="space-y-4">
			<div v-for="(field, index) in fields" :key="`${name}-${field.key}`">
				<div class="flex justify-between items-center">
					<h3
						:class="
							cn(
								'font-semibold text-base',
								labelSize === 'sm' && 'text-base',
								labelSize === 'md' && 'text-xl',
								labelSize === 'lg' && 'text-[22px]',
								labelSize === 'xs' && 'text-sm',
							)
						">
						{{ label }} {{ index + 1 }}
					</h3>
					<Button
						v-if="required && index !== 0"
						type="button"
						variant="link"
						class="text-red-500 text-xs h-auto p-0"
						@click="remove(index)">
						Remove
					</Button>
				</div>

				<slot :index="index" :baseName="`${name}[${index}]`" />

				<Separator v-if="isSeparator" class="my-8" />
			</div>

			<Button
				type="button"
				variant="outline"
				class="text-sm w-full rounded-2xl h-12 mt-2 !text-slate-600"
				@click="push(initValue)">
				<IconFromSvg :icon="AddCircle" />
				{{ buttonLabel ?? `Add ${label.toLowerCase()}` }}
			</Button>
		</div>
	</FieldArray>
</template>
