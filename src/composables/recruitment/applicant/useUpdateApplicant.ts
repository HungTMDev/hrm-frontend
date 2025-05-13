import { useCustomToast } from '@/lib/customToast';
import { sendEmail } from '@/services/recruitment/applicant';
import { useMutation } from '@tanstack/vue-query';

export const useSendEmail = () => {
	const { showToast } = useCustomToast();
	return useMutation({
		mutationFn: async (payload: { email: string; html: string }) =>
			await sendEmail(payload.email, payload.html),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
		},
	});
};
