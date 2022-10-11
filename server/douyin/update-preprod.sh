# 发布测试服 预发布正式环境

rm -rf ./www
rm -rf ./node_modules/.cache/pwa/icon
yarn run build:preprod --pid=A
yarn run generate:preprod --pid=A

find www -name index.html | xargs -I {} dirname {} | grep "www/" | xargs rm -r

./node_modules/.bin/cordova-hcp build
# yarn version --prerelease

rsync -avP ./www/* root@156.255.101.41:/var/www/dy_preprod