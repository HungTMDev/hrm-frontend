export const axiosConfig = {
	baseURL: import.meta.env.VITE_API_URL || 'http://172.16.3.106:3250/api/v1',
	uploadFileURL: import.meta.env.VITE_UPLOAD_URL || 'http://localhost:3000/api/v1',
	driveGetFileURL: import.meta.env.VITE_GOOGLE_IMAGE,
	path: {
		refreshToken: '/auth/refresh-token',
	},
	key: {
		accessToken: 'access_token',
		refreshToken: 'refresh_token',
		account: 'user',
	},
	retryStatusCodes: [401],
};
