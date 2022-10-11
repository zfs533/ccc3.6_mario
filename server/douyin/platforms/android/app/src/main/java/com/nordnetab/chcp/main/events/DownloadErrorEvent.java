package com.nordnetab.chcp.main.events;

import com.nordnetab.chcp.main.model.ChcpError;


/**
 * Created by Nikolay Demyankov on 28.08.15.
 *
 * Event is send when error occurred while copying assets from bundle onto external storage.
 */
public class DownloadErrorEvent extends PluginEventImpl {

    public static final String EVENT_NAME = "chcp_downloadError";

    /**
     * Class constructor
     */
    public DownloadErrorEvent(String erroe) {
        super(EVENT_NAME, ChcpError.setChcpError(erroe));
    }
}