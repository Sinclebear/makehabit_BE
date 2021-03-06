#!/bin/bash

REPOSITORY=/home/ubuntu/build
sudo pm2 kill
cd $REPOSITORY

# nvm 환경변수 등록
# export NVM_DIR="/home/ubuntu/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

cd server
sudo rm -rf node_modules
sudo npm cache clean --force && npm i
sudo pm2 kill
sudo pm2 start server.js --log-date-format "YYYY-MM-DD hh-mm-ss"