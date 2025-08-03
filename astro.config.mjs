// @ts-check
import mdx from "@astrojs/mdx";
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeShiftHeading from 'rehype-shift-heading';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: process.env.NODE_ENV === "development" ? 'http://localhost:4321' : 'https://sweetheartsquad.com',
    integrations: [mdx(), sitemap()],
    markdown: {
        rehypePlugins: [
            [rehypeExternalLinks, { rel: ['nofollow noopener'], target: '_blank' }],
            [rehypeShiftHeading, { shift: 1 }],
        ],
    }
});
