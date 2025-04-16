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

export const createApiEndpoint = (str: string, ...args: any[]): string => {
	let i = 0;
	return str.replace(/%[sdj%]/g, (match) => {
		if (match === '%%') {
			return '%';
		}
		const arg = args[i++];
		switch (match) {
			case '%s':
				return String(arg);
			case '%d':
				return Number(arg).toString();
			case '%j':
				try {
					return JSON.stringify(arg);
				} catch {
					return '[Circular]';
				}
			default:
				return '';
		}
	});
};

export const formatFileSize = (bytes: number, decimals = 2): string => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));
	const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

	return `${size} ${sizes[i]}`;
};

export const getQuarterDateRangeString = (
	quarterStr: string,
): { fromDate: string; toDate: string } => {
	const [q, yearStr] = quarterStr.split(' ');
	const year = parseInt(yearStr);
	const quarter = parseInt(q.replace('Q', ''));

	const startMonth = (quarter - 1) * 3;
	const fromDate = new Date(year, startMonth, 1);

	const endMonth = startMonth + 2;
	const toDate = new Date(year, endMonth + 1, 0);

	const formatDate = (d: Date) =>
		`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

	return {
		fromDate: formatDate(fromDate),
		toDate: formatDate(toDate),
	};
};

export const generateQuarterOptions = (startYear: number, endYear: number): string[] => {
	const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
	const result: string[] = [];

	for (let year = startYear; year <= endYear; year++) {
		for (const quarter of quarters) {
			result.push(`${quarter} ${year}`);
		}
	}

	return result;
};

export const compareQuarters = (q1: string, q2: string): number => {
	const [q1Label, y1] = q1.split(' ');
	const [q2Label, y2] = q2.split(' ');
	const quarter1 = parseInt(q1Label.replace('Q', ''));
	const quarter2 = parseInt(q2Label.replace('Q', ''));
	const year1 = parseInt(y1);
	const year2 = parseInt(y2);

	const index1 = year1 * 4 + quarter1;
	const index2 = year2 * 4 + quarter2;

	return index1 - index2;
};
