#! /bin/bash
#set -x
set -u
set -o errexit


branch_name=`git symbolic-ref --short -q HEAD`
gitusername=`git config user.name`
echo user:$gitusername 
echo branch:$branch_name 
if [ $branch_name != "master" ]; then
    echo "branch must be master"
    exit
fi

echo ">building for prod."

echo ">building start."
npm run build:prod

dist="/home/server/wind/public/douyin/admin-client"
ip=192.168.0.212

echo ">prod dist:${dist}"
echo ">remove old dist."
ssh root@$ip "rm -rf $dist"
echo ">copy to dist."
scp -r ./dist/ "root@$ip:$dist"
ssh root@$ip "chown -R nobody.nogroup $dist"
echo ">build for prod finish."
