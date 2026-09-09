import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';

export default {
	kit: {
		adapter: adapter(),
		// Increase body size limit to 100MB for large CSV files
		bodySize: {
			maxRequestBodySize: 104857600, // 100MB
			maxRequestBodySizeBeforeError: 104857600
		}
	}
};
