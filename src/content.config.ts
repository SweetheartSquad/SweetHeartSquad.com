import { defineCollection, z } from 'astro:content';

import { glob } from 'astro/loaders';

const games = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/data/games' }),
	schema: z.object({
		title: z.string(),
		tagline: z.string(),
		description: z.string().optional(),
		url: z.string().url(),
		date: z.coerce.date(),
		css: z.string().optional(),
		showcase: z.boolean().optional().default(false),
		embed: z.string().url().optional(),
		downloads: z.array(z.string().url()).optional(),
	})
});

export const collections = { games };
