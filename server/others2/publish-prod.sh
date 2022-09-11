

rm -rf ./www
rm -rf ./node_modules/.cache/pwa/icon
yarn run build:prod
yarn run generate:prod 
find www -name index.html | xargs -I {} dirname {} | grep "www/" | xargs rm -r

./node_modules/.bin/cordova-hcp build

ssh root@192.168.0.212 "rm -rf /home/server/wind/public/douyin/dyclient/*"
rsync -avP ./www root@192.168.0.212:/home/server/wind/public/douyin/dyclient/
# 发布发布正式版本
