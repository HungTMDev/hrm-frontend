import { h, type Component } from 'vue';
import { toast, type Action } from 'vue-sonner';
import CheckCircle from '@/assets/icons/Bold/CheckCircle.svg';
import InfoCircle from '@/assets/icons/Bold/InfoCircle.svg';
import CloseCircle from '@/assets/icons/Bold/CloseCircle.svg';
import DangerTriangle from '@/assets/icons/Bold/DangerTriangle.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';

export const useCustomToast = () => {
	const showToast = (
		options: {
			message: string;
			description?: string;
			type?: 'success' | 'error' | 'warning' | 'info' | 'loading' | 'dismiss';
			icon?: any;
			action?: Action | Component;
		},
		loadingToast?: string | number,
	) => {
		const icons = {
			success: h(IconFromSvg, { icon: CheckCircle, class: 'text-green-500' }),
			error: h(IconFromSvg, { icon: CloseCircle, class: 'text-red-500' }),
			warning: h(IconFromSvg, { icon: DangerTriangle, class: 'text-yellow-300' }),
			info: h(IconFromSvg, { icon: InfoCircle, class: 'text-blue-500' }),
		};

		if (options.type === 'loading') {
			return toast.loading(options.message);
		}

		if (options.type === 'dismiss') {
			toast.dismiss(loadingToast);
			return;
		}

		toast(options.message, {
			description: options.description,
			icon: options.icon || icons[options?.type || 'info'],
			action: options.action,
		});
	};

	return { showToast };
};
