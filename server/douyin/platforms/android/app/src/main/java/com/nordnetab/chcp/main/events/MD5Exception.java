package com.nordnetab.chcp.main.events;

import com.nordnetab.chcp.main.model.ChcpError;

/**
 * Created by Nikolay Demyankov on 28.08.15.
 *
 * Event is send when error occurred while copying assets from bundle onto external storage.
 */
public class MD5Exception extends Exception {

    /**
     * Class constructor
     */
    public MD5Exception(String message){
        //出现异常打印的语句
        super(message);
    }
}