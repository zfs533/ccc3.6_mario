package com.zq.douying;

import android.app.Activity;
import android.content.Context;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

enum  DevStatus {
    LOCAL_DEV,  // 内网
    OUT_DEV,    // 外网
    OFFICIAL,   // 正式
}

public class UpdateInfo {

    private String TAG = "sss";
    private Activity mActivity;
    boolean isGetUrl = true;
    boolean isGetUpdateInfo = true;
    String OFFICIAL = "https://dfe.hapha.cn/api/v1/";
    String OUT_DEV = "https://douyin-api.ybunx.com/api/v1/";
    String pid = "A";
    private Update versionUpdateManager;
    private final DevStatus _dev  = DevStatus.OFFICIAL;
    private final ArrayList<String> urlLists = new ArrayList(Arrays.asList("https://dfe.hapha.cn",
            "https://api.h-gpro.com",
            "https://baq.fbafb.cn",
            "https://faw.douying8.com"));

    private final ArrayList<String> OUT_DEVLists = new ArrayList(Arrays.asList("https://douyin-api.ybunx.com"));
    public ArrayList<String> webDomains;

    public String gameServers() {
        String dev = null;
        if (_dev==DevStatus.OUT_DEV){
            dev=OUT_DEV;
        }else if (_dev==DevStatus.OFFICIAL){
            dev=OFFICIAL;
        }
        return  dev;
    }

    public void initParamsAndValues(Activity activity ,Update versionUpdate) {
        mActivity = activity;
        versionUpdateManager=versionUpdate;

    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public void getHttpUrl() {
        RequestQueue mQueue = Volley.newRequestQueue(mActivity);
        ArrayList<String> arrauList=null;
        if (_dev==DevStatus.OUT_DEV){
            arrauList=OUT_DEVLists;
        }else if (_dev==DevStatus.OFFICIAL){
            arrauList=urlLists;
        }
        ArrayList<String> apiDomains = SharePreferenceUtils.getArrayList(mActivity,"apiDomains");
        logd( "apiDomains: "+apiDomains);
        if (apiDomains != null&&!apiDomains.isEmpty()){
             arrauList=apiDomains;
            logd( "arrauList: "+arrauList);
        }
        for (int i = 0; i < arrauList.size(); i++) {
            String url = arrauList.get(i);
            StringRequest stringRequest = new StringRequest(url + "/api/v1/speedtest",
                    response -> {
                        if (isGetUrl && response.contains("success")) {
                            isGetUrl = false;
                            logd( "-----------------getHttpUrl  " + response);
                            logd( "-----------------getHttpUrl  " + url);
                            selectResourceUrl(url);
                        }
                    }, error -> {
                Log.e(TAG, error.getMessage(), error);
            });
            mQueue.add(stringRequest);
        }
    }


    @RequiresApi(api = Build.VERSION_CODES.O)
    public void selectResourceUrl(String url) {
        RequestQueue mQueue = Volley.newRequestQueue(mActivity);
        StringRequest stringRequest = new StringRequest(url + "/api/v1/system/domains?pid=" + pid,
                response -> {
                    logd("-----------------selectResourceUrl" + response);
                    Gson gson = new GsonBuilder().serializeNulls().create();
                    if (_dev==DevStatus.OUT_DEV){
                        DateA date = gson.fromJson(response, DateA.class);
                        logd( "-----------------selectResourceUrl  " + url);
                        if (date.errorCode==0){
                            webDomains=date.data.webDomains;
                            setLostUrl(date.data.apiDomains,OUT_DEVLists);
                        }
                    }else {
                        Date date = gson.fromJson(response, Date.class);
                        logd( "-----------------selectResourceUrl  " + url);
                        if (date.errorCode==0){
                            String strUrl = AESUtil32.decrypt(date.data);
                            logd( "strUrl: " + strUrl);
                            DateUrl dateUrl = gson.fromJson(strUrl, DateUrl.class);
                            webDomains=dateUrl.webDomains;
                            setLostUrl(dateUrl.apiDomains,urlLists);
                        }
                    }
                    logd( "webDomains: " + webDomains);
                    getUpdateInfo();
                }, error -> {
            Log.e(TAG, error.getMessage(), error);
        });
        mQueue.add(stringRequest);
    }
    @RequiresApi(api = Build.VERSION_CODES.O)
    public void   getUpdateInfo(){
        RequestQueue mQueue = Volley.newRequestQueue(mActivity);
        if (webDomains.isEmpty()) return;
        logd( "----------------getUpdateInfo  " +webDomains);
        for (int i = 0; i < webDomains.size(); i++) {
            String url = webDomains.get(i);
            StringRequest stringRequest = new StringRequest(url + "/version.json",
                    response -> {
                        if (isGetUpdateInfo&&!response.isEmpty()) {
                            isGetUpdateInfo = false;
                            logd("----------------getUpdateInfoUrl "+url );
                            logd( "----------------getUpdateInfo  " + response);
                            Gson gson = new GsonBuilder().serializeNulls().create();
                            versionDate date = gson.fromJson(response, versionDate.class);
                            logd("getUpdateInfo: "+date.apkVersion.name);
                            if (date.apkVersion.mNative!=null&&date.apkVersion.mNative){
                                versionUpdateManager.updateVersion =date.apkVersion.name;
                                versionUpdateManager.checkUpdateVersion();
                                versionUpdateManager.downloadURL=url+"/apk/app-"+date.apkVersion.name+".apk";
                            }else {
                                Log.e(TAG, "--------version.json: 没有mNative字段" );
                            }
                        }
                    }, error -> {
                Log.e(TAG, error.getMessage(), error);
            });
            mQueue.add(stringRequest);
        }
    }

    public void setLostUrl(ArrayList<String> apiDomains,ArrayList<String> lostUrl){
        apiDomains.addAll(lostUrl);
        logd("setLostUrl: "+apiDomains);
        SharePreferenceUtils.putArrayList(mActivity,"apiDomains",apiDomains);
    }


    public void logd(String str){
        if (_dev==DevStatus.OUT_DEV){
            Log.d(TAG, "----logd: "+str);
        }
    }


}


class Date {
    public String data;
    public int errorCode;
    public String message;
}


class DateA {
    public DateUrl data;
    public int errorCode;
    public String message;
}


class DateUrl {
    public ArrayList<String> webDomains;
    public ArrayList<String> apiDomains;
}


class versionDate {
    public String version;
    public String buildTime;
    public apkVersionDate apkVersion;
}

class apkVersionDate {
    public String name;
    public String code;
    public Boolean mNative;
}


