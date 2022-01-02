#!/bin/bash

for i in ./assets/video/*.gif
	do ffmpeg -y -i "$i" -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "${i%.*}.mp4";
done
