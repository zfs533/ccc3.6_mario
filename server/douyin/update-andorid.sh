VERSION=`sed -n '2,$p' config.xml | grep "version=" |awk -F= '{print $2}' | head -n 1| sed  's/"//g'`;
 
# yarn version --prerelease
rm -rf ./www
rm -rf ./node_modules/.cache/pwa/icon
rm -rf ./platforms/android/app/src/main/assets/www

yarn run build:test --pid=A
yarn run generate:test --pid=A
find www -name index.html | xargs -I {} dirname {} | grep "www/" | xargs rm -r

./node_modules/.bin/cordova-hcp build

# # 证书签名脚本: 
# # keytool -genkey -v -keystore ./build/android-release.keystore -alias release-apk -keyalg RSA -keysize 2048 -validity 10000 -deststoretype pkcs12
cordova build android 

# echo "复制apk安装包"
mkdir ./www/apk/
cp -r ./platforms/android/app/build/outputs/apk/debug/app-debug.apk ./www/apk/app.apk
cp ./platforms/android/app/build/outputs/apk/debug/app-debug.apk ./www/apk/app-$VERSION.apk

rsync -avP ./www/* root@156.255.101.41:/var/www/dy/