#!/bin/bash

EXE="mongod.exe"
result=$(tasklist | findstr "mongod.exe")

for i in $result;
do
  if [ $i = $EXE ]
  then
    echo Mongo is running.
    exit 0
  fi
done
echo Mongo not running. Starting...
start mongod
sleep 5
exit 0
