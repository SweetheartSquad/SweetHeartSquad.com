# SweetHeart Squad site

![icon](./public/assets/images/SweetHeart%20Squad%20-%20icon.png)

[sweetheartsquad.com](https://sweetheartsquad.com)

## Development

```sh
npm i # installs dependencies
npm start # starts dev server
npm run build # creates production build
```

### Adding a game

1. Add an entry to [`./src/games.ts`](./src/games.ts)
2. Add a `.mp4` (or `.gif`) cover to the [`./public/assets/video`](./public/assets/video) folder
3. Run [`./convert.sh`](./convert.sh) (this will convert `.gif` covers to `.mp4` covers and extract the first frame as a `.png`)

## Release

Push changes to `main` branch. The workflow will automatically update the live site.
