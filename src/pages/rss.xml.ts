import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'fs';
import RSS from 'rss';
import slugify from 'slugify';

export const GET: APIRoute = async () => {
	const feed = new RSS({
		title: 'SweetHeart Squad',
		site_url: 'https://sweetheartsquad.com',
		feed_url: `${'https://sweetheartsquad.com'}/rss.xml`,
		image_url: `${'https://sweetheartsquad.com'}/assets/image/SweetHeart Squad - icon.png`,
		pubDate: new Date(),
		copyright: `All rights reserved ${new Date().getFullYear()}, SweetHeart Squad`,
		language: 'en',
	});

	const games = await getCollection('games');
	games.sort((a,b) => b.data.date.getTime() - a.data.date.getTime());

	games.forEach(({ data: i }) => {
		feed.item({
			title: i.title,
			description: [i.tagline ? `<blockquote>${i.tagline}</blockquote>` : '', i.description, `<a href="${i.url}">${i.url}</a>`].filter(i => i).join(' '),
			date: i.date,
			url: i.url,
			enclosure: {
				url: `https://sweetheartsquad.com/assets/covers/${slugify(i.title, { strict: true })}.png`,
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
