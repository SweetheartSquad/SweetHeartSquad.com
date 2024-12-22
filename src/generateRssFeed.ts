import fs from "fs";
import RSS from "rss";
import { games } from './games';

export default async function generateRssFeed() {
	const feed = new RSS({
		title: "SweetHeart Squad",
		site_url: 'https://sweetheartsquad.com',
		feed_url: `${'https://sweetheartsquad.com'}/rss.xml`,
		image_url: `${'https://sweetheartsquad.com'}/assets/image/SweetHeart Squad - icon.png`,
		pubDate: new Date(),
		copyright: `All rights reserved ${new Date().getFullYear()}, SweetHeart Squad`,
		language: "en",
	});

	games.forEach((i) => {
		feed.item({
			title: i.title,
			description: [
				i.tagline ? `<blockquote>${i.tagline}</blockquote>` : "",
				i.description,
				`<a href="${i.url}">${i.url}</a>`,
			]
				.filter((i) => i)
				.join(" "),
			date: new Date(i.date).toString() === "Invalid Date" ? undefined : i.date,
			url: i.url,
			enclosure: {
				url: `${'https://sweetheartsquad.com'}${i.urlVideo
					.split("/")
					.map(encodeURIComponent)
					.join("/")}`,
			}
		});
	});
	fs.writeFileSync(
		"./public/rss.xml",
		feed
			.xml({ indent: true })
			.replace("?>", '?><?xml-stylesheet href="/rss.css" type="text/css"?>')
	);
}
