#!/bin/bash

if ! [ -x "$(command -v ffmpeg)" ]; then
  echo 'Error: ffmpeg was not found, go get it https://www.ffmpeg.org/download.html' >&2
  exit 1
fi

for i in ./public/assets/video/*.gif; do
	ffmpeg -y -i "$i" -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "${i%.*}.mp4";
	sizeGif=`stat -c%s "$i"`
	sizeVid=`stat -c%s "${i%.*}.mp4"`
	if (($sizeGif>$sizeVid));then
		rm "$i"
	else
		rm "${i%.*}.mp4"
	fi
done

for i in ./public/assets/video/*.gif; do
	ffmpeg -y -i "$i" -frames:v 1 "${i%.*}.png";
done
for i in ./public/assets/video/*.mp4; do
	ffmpeg -y -i "$i" -frames:v 1 "${i%.*}.png";
done
