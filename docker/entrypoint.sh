#!/bin/sh

cd app

if [ $1 ]
then
  command=$1
else
  command="run"
fi

if [ $command = "build" ]
then
  npm install
  npm build
  exit
fi

if [ $command = "run" ]
then
  npm install
  npm run dev
  exit
fi

echo "No se reconoce el comando ingresado"
