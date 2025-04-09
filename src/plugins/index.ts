import axios from 'axios';
import { axiosConfig } from '@/plugins/axiosConfig.ts';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const axiosClient = axios.create({
	baseURL: axiosConfig.baseURL,
});

axiosClient.interceptors.request.use(
	function (config) {
		NProgress.start();
		config.headers['Content-Type'] = 'application/json';
		config.headers['Accept'] = 'application/json';
		config.headers['Access-Control-Allow-Origin'] = '*';

		const accessToken = localStorage.getItem(axiosConfig.key.accessToken);
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

axiosClient.interceptors.response.use(
	(response) => {
		NProgress.done();
		return response;
	},
	(error) => {
		NProgress.done();
		return Promise.reject(error);
	},
);
export default axiosClient;
