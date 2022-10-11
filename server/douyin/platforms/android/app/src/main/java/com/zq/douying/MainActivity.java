/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.zq.douying;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import org.apache.cordova.CordovaActivity;

import java.io.IOException;

public class MainActivity extends CordovaActivity
{
    private Update versionUpdateManager;
    private UpdateInfo updateInfo;

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        //getWindow.setStatusBarColor(Color.TRANSPARENT)

        //5.0 全透明实现
//        Window window = getWindow();
//        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
//        window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
//        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
//        window.setStatusBarColor(Color.TRANSPARENT);


        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);

        AndroidBugWorkaround.assistActivity(this);

        /*初始化检查更新manager*/
        versionUpdateManager = new Update(MainActivity.this, new Update.versionUpdateListener() {
            @Override
            public void haveNoInstallPermission(Intent intent, int requestCode) {
                MainActivity.this.startActivityForResult(intent, requestCode);
            }

            @Override
            public void downloadCompleted() throws IOException {
//                Log.d("sss", "downloadCompleted: 下载完成");
                versionUpdateManager.install();
            }

            @Override
            public void alreadyLastVersion() {
//                Log.d("sss","已是最新版本");
            }

            @Override
            public void clickCancel() {
//                Log.d("sss","点击取消");
            }
        });
        /*检查更新*/
        updateInfo=new UpdateInfo();
        updateInfo.initParamsAndValues(this,versionUpdateManager);
        updateInfo.getHttpUrl();

    }



    @Override
    protected void onResume() {
        super.onResume();
        // 注册下载更新的广播
        versionUpdateManager.registerDownloadBroadcast(MainActivity.this);
    }

    @Override
    protected void onPause() {
        super.onPause();

        //解除注册
        versionUpdateManager.unregisterDownloadBroadcast(MainActivity.this);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // 请求完安装权限后的回调
        if (requestCode == Update.WBVersionUpdateManagerPermissionCode && getPackageManager().canRequestPackageInstalls()) {
            try {
                versionUpdateManager.downFile();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}
