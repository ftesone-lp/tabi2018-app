#!/bin/bash

# script directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# port
if [ $1 ]
then
    PORT=$1
else
    PORT=8080
fi

# docker run
docker run -it --rm -v "$DIR/../..":/code -p$PORT:8080 tabi2018/ftesone-app:latest
