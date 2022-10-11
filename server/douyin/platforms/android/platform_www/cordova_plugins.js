cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-hot-code-push-plugin.chcp",
      "file": "plugins/cordova-hot-code-push-plugin/www/chcp.js",
      "pluginId": "cordova-hot-code-push-plugin",
      "clobbers": [
        "chcp"
      ]
    },
    {
      "id": "cordova-plugin-camera.Camera",
      "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "file": "plugins/cordova-plugin-camera/www/Camera.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    },
    {
      "id": "cordova-plugin-apkupdater.ApkUpdater",
      "file": "plugins/cordova-plugin-apkupdater/www/ApkUpdater.js",
      "pluginId": "cordova-plugin-apkupdater",
      "clobbers": [
        "window.ApkUpdater"
      ]
    },
    {
      "id": "cordova-plugin-apkupdater.API",
      "file": "plugins/cordova-plugin-apkupdater/www/API.js",
      "pluginId": "cordova-plugin-apkupdater"
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open"
      ]
    },
    {
      "id": "cordova-base64-to-gallery.object.assign-polyfill",
      "file": "plugins/cordova-base64-to-gallery/www/object.assign-polyfill.js",
      "pluginId": "cordova-base64-to-gallery"
    },
    {
      "id": "cordova-base64-to-gallery.base64ToGallery",
      "file": "plugins/cordova-base64-to-gallery/www/base64ToGallery.js",
      "pluginId": "cordova-base64-to-gallery",
      "clobbers": [
        "cordova.base64ToGallery"
      ]
    },
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "cordova-plugin-screen-orientation.screenorientation",
      "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
      "pluginId": "cordova-plugin-screen-orientation",
      "clobbers": [
        "cordova.plugins.screenorientation"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-hot-code-push-plugin": "1.5.3",
    "cordova-plugin-camera": "6.0.0",
    "cordova-plugin-device": "2.1.0",
    "cordova-plugin-splashscreen": "6.0.1",
    "cordova-plugin-apkupdater": "4.0.0",
    "cordova-plugin-inappbrowser": "5.0.0",
    "cordova-base64-to-gallery": "4.1.3",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-screen-orientation": "3.0.2",
    "cordova-plugin-statusbar": "3.0.0"
  };
});