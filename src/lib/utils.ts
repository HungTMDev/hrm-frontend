import type { Updater } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { DateValue } from 'reka-ui';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
	ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue;
}

export const formatCurrency = (amount: number) => {
	return `đ${amount.toLocaleString('vi-VN')}`;
};

export const formatDateValueToLocalDate = (value: DateValue) => {
	const day = String(value.day).padStart(2, '0');
	const month = String(value.month).padStart(2, '0');

	return `${day}/${month}/${value.year}`;
};
