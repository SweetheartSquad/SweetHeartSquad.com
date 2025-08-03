import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'fs';
import RSS from 'rss';
import slugify from 'slugify';

export const GET: APIRoute = async (context) => {
	const feed = new RSS({
		title: 'SweetHeart Squad',
		site_url: new URL('/', context.site).toString(),
		feed_url: new URL(`/rss.xml`, context.site).toString(),
		image_url: new URL(`/assets/images/SweetHeart Squad - icon.png`, context.site).toString(),
		pubDate: new Date(),
		copyright: `All rights reserved ${new Date().getFullYear()}, SweetHeart Squad`,
		language: 'en',
	});

	const games = await getCollection('games');
	games.sort((a,b) => b.data.date.getTime() - a.data.date.getTime());

	games.forEach(({ id, data: i }) => {
		const url = new URL(`/${id}`, context.site).toString();
		feed.item({
			title: i.title,
			description: [i.tagline ? `<blockquote>${i.tagline}</blockquote>` : '', i.description, `<a href="${i.url}">${i.url}</a>`, `<a href="${url}">${url}</a>`].filter(i => i).join(' '),
			date: i.date,
			url: url,
			enclosure: {
				url: new URL(`/assets/covers/${slugify(i.title, { strict: true })}.png`, context.site).toString(),
				type: `image/png`,
				size: fs.statSync(`./public/assets/covers/${slugify(i.title, { strict: true })}.png`).size,
			},
		});
	});
	return new Response(feed.xml({ indent: true }).replace('?>', '?><?xml-stylesheet href="/rss.css" type="text/css"?>'), {
		headers: {
			'content-type': 'application/xml',
		},
	});
};
