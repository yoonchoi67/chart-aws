#!/bin/bash
set -e
user="ubuntu"

rm -rf .git
rm -rf .gitignore
git config --global user.email "choijong@grinnell.edu"
git config --global user.name "Yoon Choi"
mv .gitignore_cicd .gitignore
git init .
# git config receive.denyCurrentBranch updateInstead
git add .
git commit -m "Deploying"
git remote add production ssh://$user@$AWS_HOST/~/webapp
git push --force production master

ssh $user@$AWS_HOST "cd ~/webapp && \
sudo service nginx restart
pm2 kill
NODE_ENV=production pm2 start /home/ubuntu/webapp/backend/index.js
source /home/ubuntu/env/bin/activate
cd /home/ubuntu/webapp/cb-backend
pip3 install -r ~/webapp/cb-backend/requirements.txt
pm2 start /home/ubuntu/webapp/cb-backend/chartbeyond.py
exit"