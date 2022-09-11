
# yarn version --prerelease
rm -rf ./www
rm -rf ./node_modules/.cache/pwa/icon
rm -rf ./platforms/android/app/src/main/assets/www

yarn run build:prod --pid=A
yarn run generate:prod  --pid=A
find www -name index.html | xargs -I {} dirname {} | grep "www/" | xargs rm -r

./node_modules/.bin/cordova-hcp build

APK_VERSION=`sed -n '2,$p' config.xml | grep "version=" |awk -F= '{print $2}' | head -n 1| sed  's/"//g'`;

# 证书签名脚本:  密钥 123123.
# keytool -genkey -v -keystore ./build/android-release.keystore -alias release-apk -keyalg RSA -keysize 2048 -validity 10000 -deststoretype pkcs12
cordova build android --release --prod --buildConfig=cordova-build.json

mkdir ./www/apk/
echo "发布最新版本apk安装包"
cp -r ./platforms/android/app/build/outputs/apk/release/app-release.apk ./www/apk/app.apk
echo "发布带版本号apk安装包，防止更新出现缓存问题"
cp ./platforms/android/app/build/outputs/apk/release/app-release.apk ./www/apk/app-$APK_VERSION.apk

ssh root@192.168.0.212 "rm -rf /home/server/wind/public/douyin/dyclient/*"
rsync -avP ./www root@192.168.0.212:/home/server/wind/public/douyin/dyclient/