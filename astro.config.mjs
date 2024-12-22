// @ts-check
import { defineConfig } from 'astro/config';
import generateRssFeed from './src/generateRssFeed';

// https://astro.build/config
export default defineConfig({
	site: 'https://sweetheartsquad.com',
	integrations: [
		{
			name: "rss",
			hooks: {
				"astro:server:start": generateRssFeed,
				"astro:build:start": generateRssFeed,
			},
		},
	],
});
