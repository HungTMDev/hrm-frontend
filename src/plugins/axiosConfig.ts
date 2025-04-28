import { AUTH_API } from '@/constants/api/auth.api';

export const axiosConfig = {
	baseURL: import.meta.env.VITE_API_URL || 'http://172.16.3.106:3250/api/v1',
	uploadFileURL: import.meta.env.VITE_UPLOAD_URL || 'http://localhost:3000/api/v1',
	driveGetFileURL: import.meta.env.VITE_GOOGLE_IMAGE,
	path: {
		refreshToken: AUTH_API.REFRESH_TOKEN,
	},
	key: {
		accessToken: 'access_token',
		refreshToken: 'refresh_token',
		account: 'user',
	},
	retryStatusCodes: [401],
};
