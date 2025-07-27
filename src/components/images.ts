const images = Object.fromEntries(Object.entries(import.meta.glob<{ default: ImageMetadata }>(
	"/src/data/games/*.{jpeg,jpg,png,gif,webp}",
)).map(([k,v]) => [k.split('.').slice(0,-1).join('.'), v]));

export async function getImg(key: string): Promise<undefined | ImageMetadata> {
	return (await images[key]?.())?.default;
}
