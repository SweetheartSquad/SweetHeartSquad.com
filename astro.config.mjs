// @ts-check
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';

import mdx from "@astrojs/mdx";

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://sweetheartsquad.com',
    integrations: [mdx(), sitemap()],
    markdown: {
        rehypePlugins: [[rehypeExternalLinks, { rel: ['nofollow noopener'], target: '_blank' }]],
    }
});
