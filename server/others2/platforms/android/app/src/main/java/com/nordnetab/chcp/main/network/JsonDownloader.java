package com.nordnetab.chcp.main.network;

import android.util.Log;

import com.nordnetab.chcp.main.events.DownloadErrorEvent;
import com.nordnetab.chcp.main.model.ChcpError;
import com.nordnetab.chcp.main.utils.URLConnectionHelper;
import com.nordnetab.chcp.main.utils.URLUtility;

import org.greenrobot.eventbus.EventBus;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.Map;

/**
 * Created by Nikolay Demyankov on 22.07.15.
 * <p/>
 * Helper class to download JSON and convert it into appropriate object.
 * Used internally.
 *
 * @see DownloadResult
 */
abstract class JsonDownloader<T> {

    private final String downloadUrl;
    private final Map<String, String> requestHeaders;

    /**
     * Create instance of the object from json string.
     *
     * @param json loaded JSON string
     * @return instance of the object, created from the JSON string
     */
    protected abstract T createInstance(String json);

    /**
     * Class constructor
     *
     * @param url url from which JSON should be loaded
     */
    public JsonDownloader(final String url, final Map<String, String> requestHeaders) {
        this.downloadUrl = url;
        this.requestHeaders = requestHeaders;
    }

    /**
     * Perform download.
     *
     * @return result of the download
     * @see DownloadResult
     */
    public DownloadResult<T> download() {
        DownloadResult<T> result = null;
        try {
            String json = downloadJson();
            T value = createInstance(json);

            result = new DownloadResult<T>(value);
        } catch (Exception e) {
            e.printStackTrace();
            int num = 0;
            while (num < 2) {
                num++;
//                Log.d("ssss", "downloadFiles: 重试失败:" + num);
                try {
                    String json = downloadJson();
                    T value = createInstance(json);
                    result = new DownloadResult<T>(value);
                    EventBus.getDefault().post(new DownloadErrorEvent("下载错误重试文件：" + downloadUrl + " 重试次数：" + num + " 成功"));
//                    Log.d("ssss", "downloadFiles: 成功:" + num);
                    return result;
                } catch (Exception err) {
                    if (num == 2) {
                        EventBus.getDefault().post(new DownloadErrorEvent("下载错误重试文件：" + downloadUrl + " 重试次数：" + num + " 失败"));
                        return new DownloadResult<T>(err);
                    }
                }
            }
        }
        return result;
    }

    private String downloadJson() throws Exception {
        final StringBuilder jsonContent = new StringBuilder();

        final URLConnection urlConnection = URLConnectionHelper.createConnectionToURL(downloadUrl, requestHeaders);
        final InputStreamReader streamReader = new InputStreamReader(urlConnection.getInputStream());
        final BufferedReader bufferedReader = new BufferedReader(streamReader);

        final char data[] = new char[1024];
        int count;
        while ((count = bufferedReader.read(data)) != -1) {
            jsonContent.append(data, 0, count);
        }
        bufferedReader.close();

        return jsonContent.toString();
    }
}
