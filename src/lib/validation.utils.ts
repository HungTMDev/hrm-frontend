import { z } from 'zod';

const PASSWORD_FORMAT = /^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/;

export class ZUtils {
	static password = () => {
		return z
			.string()
			.regex(PASSWORD_FORMAT, {
				message:
					'Password must contain only letters, numbers, and at least one special character (!@#$%^&*(),.?":{}|<>)',
			})
			.min(6, 'Password must be at least 6 characters.')
			.max(50, 'Password must not exceed 50 characters.');
	};
	static email = () => {
		return z.string().email({ message: 'The value is not a valid email address.' });
	};
}
