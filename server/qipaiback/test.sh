#! /bin/bash
#set -x
set -o errexit

echo "开始打包"

path=/var/www/douyin
tarname=dist.tar.gz
ip=156.255.101.41


# tar zvcf $tarname dist/$dept/
# echo "remove remote sources..."
# ssh root@$ip "cd $path && rm -rf *"
# echo "scp to remote..."
# scp $tarname root@$ip:$path/$tarname
# echo "remove local tar"
# rm -f $tarname
# ssh root@$ip "cd $path && tar zxf $tarname && cp -R dist/* . && rm -rf dist && rm -f $tarname"
# echo "update finish..."

echo "path:$path"
npm run build:stage

echo ">remove old dist."
ssh root@$ip "rm -rf $path"
echo ">copy to dist."
scp -r ./dist/ "root@$ip:$path"
ssh root@$ip "chown -R nobody.nogroup $path"
echo ">抖荫主后台测试版打包上传完成."