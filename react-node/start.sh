#!/bin/bash

if [ $1 == 'stop' ] 
then
  pm2 stop pro.json
  kill -9 `lsof -t -i:7405`
elif [ $1 == 'start' ] 
then
  pm2 start pro.json
else
   echo "参数错误"  
fi