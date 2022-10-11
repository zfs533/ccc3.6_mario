# yarn version --prerelease
rm -rf ./www
rm -rf ./node_modules/.cache/pwa/icon
yarn run build:test --pid=A
yarn run generate:test --pid=A

find www -name index.html | xargs -I {} dirname {} | grep "www/" | xargs rm -r

./node_modules/.bin/cordova-hcp build

rsync -avP ./www/* root@156.255.101.41:/var/www/dy/