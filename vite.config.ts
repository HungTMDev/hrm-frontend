import { defineConfig, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';
import svgLoader from 'vite-svg-loader';

// https://vite.dev/config/
export default defineConfig(({ mode }): UserConfig => {
	const ENV = loadEnv(mode, process.cwd());
	const port = ENV.VITE_PORT || 8080;
	return {
		css: {
			postcss: {
				plugins: [tailwind(), autoprefixer()],
			},
		},
		plugins: [vue(), svgLoader()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		server: {
			port: +port,
		},
		preview: {
			port: +port,
		},
	};
});
