package com.zq.douying;

import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Message;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;
import androidx.core.content.FileProvider;

import com.qmuiteam.qmui.skin.QMUISkinManager;
import com.qmuiteam.qmui.widget.dialog.QMUIDialog;
import com.qmuiteam.qmui.widget.dialog.QMUIDialogAction;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import de.kolbasa.apkupdater.tools.WindowStatus;

public class Update {

    /*没有权限请求时的requestCode*/
    public static int WBVersionUpdateManagerPermissionCode = 010;
    /*传入的context*/
    private Context mContext;
    /*监听listener*/
    private Update.versionUpdateListener mListener;
    /*最新的版本号*/
    public String updateVersion = "1";
    /*下载链接*/
    public String downloadURL = "https://chen.ybunx.com/apk/app-1.1.0-3.apk";
    /*是否有安装apk的权限*/
    private Boolean haveInstallPermission = true;
    /*下载apk的manager*/
    private DownloadManager downloadManager;
    /*下载完成的接收器*/
    private DownloadManagerReceiver downloadManagerReceiver;

    private static final int DOWNLOAD_COMPLETE = 200;//下载完成
    private static final int PROGRESS = 100;//进度

    private File file = null;

    private NotificationManager notificationManager;
    private NotificationCompat.Builder builder;
    private NotificationClickReceiver notificationClickReceiver;
    private  boolean download=false;

    @SuppressLint("HandlerLeak")
    private Handler handler =  new  Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            switch (msg.what) {
                case DOWNLOAD_COMPLETE:
                    Toast.makeText(mContext, "下载完成,准备安装！", Toast.LENGTH_SHORT).show();
                    try {
                        install();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    break;
                case PROGRESS:
//                    String result = (String) msg.obj;
                    break;
            }
        }
    };


    /**
     * 初始化
     *
     * @param context  context
     * @param listener listener
     */
    public Update(Context context, Update.versionUpdateListener listener) {
        this.mContext = context;
        this.mListener = listener;
    }

    /**
     * 检查版本更新
     */
    @RequiresApi(api = Build.VERSION_CODES.O)
    public void checkUpdateVersion() {
        // 等于1意味着服务器版本号大于当前版本号, 需要弹出提示更新
        // 如果弹出过当前最新版本的提示, 则不再弹出
        if (compareVersion(updateVersion, getVersionName()) == 1) {
            //版本判断
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                //获取是否有安装未知来源应用的权限
                haveInstallPermission = mContext.getPackageManager().canRequestPackageInstalls();
            }
            showUpdateTipdialog(updateVersion);
        } else {
            mListener.alreadyLastVersion();
        }
    }

    /**
     * 获取当前apk的版本号
     *
     * @return
     */
    public String getVersionCode() {
        String versionCode = "1";
        try {
            //获取软件版本号，对应AndroidManifest.xml下android:versionCode
            versionCode = String.valueOf(mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0).versionCode);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return versionCode;
    }


    /**
     * 获取当前apk的版本名
     *
     * @return
     */
    public String getVersionName() {
        String versionName = "1";
        try {
            //获取软件版本号，对应AndroidManifest.xml下android:versionName
            versionName = mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0).versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        Log.d("sss", "getVersionName: "+versionName);
        return versionName;
    }


    /**
     * 版本号比较
     *
     * @param version1 服务器版本号
     * @param version2 当前版本号
     * @return 0代表相等，1代表version1大于version2，-1代表version1小于version2
     */
    private int compareVersion(String version1, String version2) {
       if (version1.equals(version2)){
           return 0;
       }
       return 1;
    }

    /**
     * 展示版本更新提示
     * @param serverVersion 服务器版本号
     */
    private void showUpdateTipdialog(String serverVersion) {
        new QMUIDialog.MessageDialogBuilder(mContext)
                .setTitle("检查到有新版本")
                .setMessage("最新版本："+serverVersion+ "\n"+"点击立即更新体验最新内容，\n更新不影响观影，下载完成后点击安装即可！")
                .setCanceledOnTouchOutside(false)
                .setSkinManager(QMUISkinManager.defaultInstance(mContext))
                .addAction("取消", new QMUIDialogAction.ActionListener() {
                    @Override
                    public void onClick(QMUIDialog dialog, int index) {
                        mListener.clickCancel();
                        dialog.dismiss();
                    }
                })
                .addAction(0, "立即更新", QMUIDialogAction.ACTION_PROP_POSITIVE, new QMUIDialogAction.ActionListener() {
                    @RequiresApi(api = Build.VERSION_CODES.O)
                    @Override
                    public void onClick(QMUIDialog dialog, int index) {
                        dialog.dismiss();
                        if (!haveInstallPermission) {
                            Uri packageURI = Uri.parse("package:" + mContext.getPackageName());
                            Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, packageURI);
                            mListener.haveNoInstallPermission(intent, WBVersionUpdateManagerPermissionCode);
                        } else {
                            //下载更新
//                            downloadAPK(serverVersion, downloadURL);
                            try {
                                downFile();
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }).show();
    }


    /**
     * 后台在下面一个Apk 下载完成后返回下载好的文件
     * @param
     * @return
     */
    public File downFile() {
      String  httpUrl=downloadURL;
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL url = new URL(httpUrl);
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");
                    connection.setConnectTimeout(5000);
                    FileOutputStream fileOutputStream = null;
                    InputStream inputStream;
                    if (connection.getResponseCode() == 200) {
                        inputStream = connection.getInputStream();
                        if (inputStream != null) {
                            final int appLength = connection.getContentLength();
                            file = getFile(httpUrl);
                            fileOutputStream = new FileOutputStream(file);
                            byte[] buffer = new byte[1024];
                            int length = 0;
                            int total = 0;
                            int time=0;
                            initNotification();
                            registerReceiver();
                            while ((length = inputStream.read(buffer)) != -1) {
                                //写入文件中
                                fileOutputStream.write(buffer, 0, length);
                                //统计进度
                                total += length;
                                int result = (int) (total * 1.0 / appLength * 100);
                                Message message = handler.obtainMessage();
                                message.what = PROGRESS;
                                message.obj = result;
                                if (result>time){
                                    time=result;
//                                    Log.d("sss", "run: "+result);
                                    updateNotification(result);
                                }
                                handler.sendMessage(message);
                            }
                            fileOutputStream.close();
                            fileOutputStream.flush();
                        }
                        inputStream.close();
                    }
                    //下载完成,开始安装
                    Message message = handler.obtainMessage();
                    message.what = DOWNLOAD_COMPLETE;
                    download=true;
                    builder.setContentText("下载完成 点击安装");
                    builder.setAutoCancel(true);
                    handler.sendMessage(message);
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();
        return file;
    }


    /**
     * 安装apk
     */
    public void install() throws IOException {
        Intent intent;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            intent = new Intent(Intent.ACTION_VIEW);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.setData(getUpdate(mContext, file));
        } else {
            intent = new Intent(Intent.ACTION_VIEW);
            intent.setDataAndType(getUpdate(mContext, file), "application/vnd.android.package-archive");
        }
        if (WindowStatus.isWindowed(mContext)) {
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        }
        mContext.startActivity(intent);
    }


    private Uri getUpdate(Context context, File update) throws IOException {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            String fileProvider = context.getPackageName() + ".apkupdater.provider";
            return FileProvider.getUriForFile(context, fileProvider, update);

        } else {
            File externalPath = new File(context.getExternalCacheDir(), update.getName());
            copy(update, externalPath);
            return Uri.fromFile(externalPath);
        }
    }

    public void copy(File src, File dst) throws IOException {
        try (InputStream in = new FileInputStream(src)) {
            try (OutputStream out = new FileOutputStream(dst)) {
                byte[] buf = new byte[1024];
                int len;
                while ((len = in.read(buf)) > 0) {
                    out.write(buf, 0, len);
                }
            }
        }
    }


    /**
     * 根据传过来url创建文件
     */
    public File getFile(String url) {
        // 使用缓存目录,这个时候不需要申请存储权限
        // 目录不存在，那么创建
        File dir = new File(mContext.getFilesDir(), "update");
        if (!dir.exists()) {
            dir.mkdir();
        }
        // 创建文件
        return new File(dir, getFilePath(url));
    }

    /**
     * 截取出url后面的apk的文件名
     *
     * @param url
     * @return
     */
    public String getFilePath(String url) {
        return url.substring(url.lastIndexOf("/") + 1);
    }

    /**
     * 注册广播
     *
     * @param context context
     */
    public void registerDownloadBroadcast(Context context) {
        //注册广播
        downloadManagerReceiver = new DownloadManagerReceiver();
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
        context.registerReceiver(downloadManagerReceiver, intentFilter);
    }

    /**
     * 取消注册广播
     *
     * @param context context
     */
    public void unregisterDownloadBroadcast(Context context) {
        //解除注册
        context.unregisterReceiver(downloadManagerReceiver);
    }

    /**
     * 广播接收器
     */
    public class DownloadManagerReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            //下载完成
            if (DownloadManager.ACTION_DOWNLOAD_COMPLETE.equals(action)) {
                //获取 downloadmanager 下载任务id
                long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
                //安装应用
                try {
                    mListener.downloadCompleted();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * manager的回调接口
     */
    public interface versionUpdateListener {
        /**
         * 没有安装权限
         */
        void haveNoInstallPermission(Intent intent, int requestCode);

        /**
         * 下载完成
         */
        void downloadCompleted() throws IOException;

        /**
         * 已经是最新版本
         */
        void alreadyLastVersion();

        /**
         * 点击取消
         */
        void clickCancel();
    }

    /**
     * 初始化通知
     */
    private void initNotification() {
        try {
            notificationManager = (NotificationManager) mContext.getSystemService(Context.NOTIFICATION_SERVICE);
            // Android8.0及以后的方式
            if (Build.VERSION.SDK_INT >= 26) {
                // 创建通知渠道
                NotificationChannel notificationChannel = new NotificationChannel("download_channel", "下载",
                        NotificationManager.IMPORTANCE_DEFAULT);
                notificationChannel.enableLights(false); //关闭闪光灯
                notificationChannel.enableVibration(false); //关闭震动
                notificationChannel.setSound(null, null); //设置静音
                notificationManager.createNotificationChannel(notificationChannel);
            }
            builder = new NotificationCompat.Builder(mContext, "download_channel");
            builder.setContentTitle("已下载(0%)") //设置标题
                    .setSmallIcon(mContext.getApplicationInfo().icon) //设置小图标
                    .setLargeIcon(BitmapFactory.decodeResource(mContext.getResources(),
                            mContext.getApplicationInfo().icon)) //设置大图标
                    .setPriority(NotificationCompat.PRIORITY_MAX) //设置通知的优先级
                    .setAutoCancel(false) //设置通知被点击一次不自动取消
                    .setSound(null) //设置静音
                    .setContentText("正在下载，请稍后...") //设置内容
                    .setProgress(100, 0, false) //设置进度条
                    .setContentIntent(createIntent()); //设置点击事件
            notificationManager.notify(100, builder.build());
        } catch (Exception x) {
            Log.e("sss", "initNotification error=" + x);
        }
    }

    /**
     * 刷新通知
     *
     * @param progress 百分比，此值小于0时不刷新进度条
     */
    private void updateNotification(int progress) {
        if (builder == null) {
            return;
        }
        if (progress >= 0) {
            builder.setContentTitle("已下载(" + progress + "%)");
            builder.setProgress(100, progress, false);
        }
        notificationManager.notify(100, builder.build());
    }


    /**
     * 设置通知点击事件
     *
     * @return 点击事件
     */
    private PendingIntent createIntent() {
        Intent intent = new Intent(mContext.getPackageName() + ".apkupdater.provider");
        intent.setPackage(mContext.getPackageName());
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(mContext, 0, intent,
                PendingIntent.FLAG_UPDATE_CURRENT);
        return pendingIntent;
    }

    /**
     * 注册通知点击监听
     */
    private void registerReceiver() {
        notificationClickReceiver = new NotificationClickReceiver();
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(mContext.getPackageName() + ".apkupdater.provider");
        mContext.registerReceiver(notificationClickReceiver, intentFilter);
    }

    /**
     * 处理通知栏点击事件
     */
    public class NotificationClickReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (!(mContext.getPackageName() + ".apkupdater.provider").equals(action)) {
                return;
            }
            try {
                if (download){
                    install();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
