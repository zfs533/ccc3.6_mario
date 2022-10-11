package it.nexxa.base64ToGallery;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Calendar;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;

import org.json.JSONArray;
import org.json.JSONException;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;

import androidx.core.app.ActivityCompat;

/**
 * Base64ToGallery.java
 * <p>
 * Android implementation of the Base64ToGallery for iOS.
 * Inspirated by Joseph's "Save HTML5 Canvas Image to Gallery" plugin
 * http://jbkflex.wordpress.com/2013/06/19/save-html5-canvas-image-to-gallery-phonegap-android-plugin/
 *
 * @author Vegard Løkken <vegard@headspin.no>
 */
public class Base64ToGallery extends CordovaPlugin {

    // Consts
    public static final String EMPTY_STR = "";

    @Override
    public boolean execute(String action, JSONArray args,
                           CallbackContext callbackContext) throws JSONException {

        String base64 = args.optString(0);
        String filePrefix = args.optString(1);
        boolean mediaScannerEnabled = args.optBoolean(2);

        // isEmpty() requires API level 9
        if (base64.equals(EMPTY_STR)) {
            callbackContext.error("Missing base64 string");
        }

        // Create the bitmap from the base64 string
        byte[] decodedString = Base64.decode(base64, Base64.DEFAULT);
        Bitmap bmp = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

        if (bmp == null) {
            callbackContext.error("The image could not be decoded");

        } else {
            // Save the image
//            File imageFile = savePhoto(bmp, filePrefix);
//            Log.d("sss", "execute: " + imageFile);
//
//            if (imageFile == null) {
//                callbackContext.error("Error while saving image");
//            }
//
//            // Update image gallery
//            if (mediaScannerEnabled) {
//                scanPhoto(imageFile);
//            }

            MediaStore.Images.Media.insertImage(
                    this.cordova.getContext().getContentResolver(), bmp,
                    "douyin", "douyin"
            );
            callbackContext.success("成功");
        }

        return true;
    }

    private File savePhoto(Bitmap bmp, String prefix) {
        File retVal = null;

        try {
            String deviceVersion = Build.VERSION.RELEASE;
            Calendar c = Calendar.getInstance();
            String date = EMPTY_STR
                    + c.get(Calendar.YEAR)
                    + c.get(Calendar.MONTH)
                    + c.get(Calendar.DAY_OF_MONTH)
                    + c.get(Calendar.HOUR_OF_DAY)
                    + c.get(Calendar.MINUTE)
                    + c.get(Calendar.SECOND);

            int check = deviceVersion.compareTo("2.3.3");

            File folder;

            verifyStoragePermissions(this.cordova.getActivity());
            /*
             * File path = Environment.getExternalStoragePublicDirectory(
             * Environment.DIRECTORY_PICTURES ); //this throws error in Android
             * 2.2
             */
            if (check >= 1) {
                folder = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);

                if (!folder.exists()) {
                    folder.mkdirs();
                }

            } else {
                folder = Environment.getExternalStorageDirectory().getAbsoluteFile();
            }

            // 首先保存图片
//            String storePath = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator;
            final File appDir = this.cordova.getContext().getExternalFilesDir(Environment.DIRECTORY_PICTURES);
            File imageFile = new File(appDir.getParent());
            if (!imageFile.exists()) {
                imageFile.mkdir();
            }
            File file = new File(appDir, "douyin.png");
            FileOutputStream out = new FileOutputStream(file);
            bmp.compress(Bitmap.CompressFormat.PNG, 100, out);
            out.flush();
            out.close();

            retVal = file;

        } catch (Exception e) {
            Log.e("Base64ToGallery", "An exception occured while saving image: " + e.toString());
        }

        return retVal;
    }


    private final int REQUEST_EXTERNAL_STORAGE = 1;
    private String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE};

    public void verifyStoragePermissions(Activity activity) {
        // Check if we have write permission
        int permission = ActivityCompat.checkSelfPermission(activity,
                Manifest.permission.WRITE_EXTERNAL_STORAGE);
        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(activity, PERMISSIONS_STORAGE,
                    REQUEST_EXTERNAL_STORAGE);
        }
    }


    /**
     * Invoke the system's media scanner to add your photo to the Media Provider's database,
     * making it available in the Android Gallery application and to other apps.
     */
    private void scanPhoto(File imageFile) {
        Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        Uri contentUri = Uri.fromFile(imageFile);

        mediaScanIntent.setData(contentUri);
        cordova.getActivity().sendBroadcast(mediaScanIntent);
    }
}
