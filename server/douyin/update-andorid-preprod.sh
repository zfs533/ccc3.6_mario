 
# yarn version --prerelease
rm -rf ./www
rm -rf ./node_modules/.cache/pwa/icon
yarn run build:preprod --pid=A
yarn run generate:preprod --pid=A
find www -name index.html | xargs -I {} dirname {} | grep "www/" | xargs rm -r

./node_modules/.bin/cordova-hcp build

APK_VERSION=`sed -n '2,$p' config.xml | grep "version=" |awk -F= '{print $2}' | head -n 1| sed  's/"//g'`;
# # 证书签名脚本: 
# # keytool -genkey -v -keystore ./build/android-release.keystore -alias release-apk -keyalg RSA -keysize 2048 -validity 10000 -deststoretype pkcs12
cordova build android --release --prod --buildConfig=cordova-build.json

# echo "复制apk安装包"
mkdir ./www/apk/
cp -r ./platforms/android/app/build/outputs/apk/release/app-release.apk ./www/apk/app.apk
cp ./platforms/android/app/build/outputs/apk/release/app-release.apk ./www/apk/app-$APK_VERSION.apk

rsync -avP ./www/* root@156.255.101.41:/var/www/dy_preprod