System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, BUILD, EDITOR, assetManager, settings, Settings, mainName, pluginName, resourceBundlePath, resourceListPath, runtimeBundleName, ResourceDataManager, _crd;

  function _reportPossibleCrUseOfResourceBundle(extras) {
    _reporterNs.report("ResourceBundle", "./l10n-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourceList(extras) {
    _reporterNs.report("ResourceList", "./l10n-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmainName(extras) {
    _reporterNs.report("mainName", "./localization-global", _context.meta, extras);
  }

  function _reportPossibleCrUseOfpluginName(extras) {
    _reporterNs.report("pluginName", "./localization-global", _context.meta, extras);
  }

  function _reportPossibleCrUseOfresourceBundlePath(extras) {
    _reporterNs.report("resourceBundlePath", "./localization-global", _context.meta, extras);
  }

  function _reportPossibleCrUseOfresourceListPath(extras) {
    _reporterNs.report("resourceListPath", "./localization-global", _context.meta, extras);
  }

  function _reportPossibleCrUseOfruntimeBundleName(extras) {
    _reporterNs.report("runtimeBundleName", "./localization-global", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      assetManager = _cc.assetManager;
      settings = _cc.settings;
      Settings = _cc.Settings;
    }, function (_ccEnv) {
      BUILD = _ccEnv.BUILD;
      EDITOR = _ccEnv.EDITOR;
    }, function (_unresolved_2) {
      mainName = _unresolved_2.mainName;
      pluginName = _unresolved_2.pluginName;
      resourceBundlePath = _unresolved_2.resourceBundlePath;
      resourceListPath = _unresolved_2.resourceListPath;
      runtimeBundleName = _unresolved_2.runtimeBundleName;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0a95a0kirtJnJnMnZWSRaFn", "resource-data-manager", undefined);

      __checkObsolete__(['AssetManager', 'assetManager', 'JsonAsset', 'settings', 'Settings']);

      _export("default", ResourceDataManager = class ResourceDataManager {
        async readResourceList() {
          if (EDITOR) {
            return Editor.Message.request(_crd && mainName === void 0 ? (_reportPossibleCrUseOfmainName({
              error: Error()
            }), mainName) : mainName, 'get-resource-list');
          } else if (BUILD) {
            console.log(`[${_crd && pluginName === void 0 ? (_reportPossibleCrUseOfpluginName({
              error: Error()
            }), pluginName) : pluginName}] this is build env`);
            return this.runtimeLoad(_crd && resourceListPath === void 0 ? (_reportPossibleCrUseOfresourceListPath({
              error: Error()
            }), resourceListPath) : resourceListPath);
          } else {
            return this.previewLoad(_crd && resourceListPath === void 0 ? (_reportPossibleCrUseOfresourceListPath({
              error: Error()
            }), resourceListPath) : resourceListPath);
          }
        }

        async readResourceBundle(tags) {
          if (EDITOR) {
            return this.editorLoad(tags);
          } else if (BUILD) {
            return this.runtimeLoad(_crd && resourceBundlePath === void 0 ? (_reportPossibleCrUseOfresourceBundlePath({
              error: Error()
            }), resourceBundlePath) : resourceBundlePath);
          } else {
            return this.previewLoad(_crd && resourceBundlePath === void 0 ? (_reportPossibleCrUseOfresourceBundlePath({
              error: Error()
            }), resourceBundlePath) : resourceBundlePath);
          }
        }
        /**
         * 编辑器模式下使用
         * @param locales
         */


        async editorLoad(locales) {
          return Editor.Message.request(_crd && mainName === void 0 ? (_reportPossibleCrUseOfmainName({
            error: Error()
          }), mainName) : mainName, 'get-resource-bundle', locales);
        }
        /**
         * 构建后运行时使用
         * @param fileName
         */


        async runtimeLoad(fileName) {
          const bundle = await this.getBundle(_crd && runtimeBundleName === void 0 ? (_reportPossibleCrUseOfruntimeBundleName({
            error: Error()
          }), runtimeBundleName) : runtimeBundleName);
          if (!bundle) return undefined;
          const jsonAsset = await this.getResource(bundle, fileName);
          if (!jsonAsset || !jsonAsset.json) return undefined;
          return jsonAsset.json;
        }
        /**
         * 浏览器预览使用
         * @param urlPath
         */


        async previewLoad(urlPath) {
          try {
            return await (await fetch(`${_crd && mainName === void 0 ? (_reportPossibleCrUseOfmainName({
              error: Error()
            }), mainName) : mainName}/${urlPath}`)).json();
          } catch (e) {
            return undefined;
          }
        }

        async checkBundle(bundleName) {
          const queryResult = settings.querySettings(Settings.Category.ASSETS, 'preloadBundles');
          const bundle = queryResult == null ? void 0 : queryResult.find(it => it.bundle === bundleName);
          return !!bundle;
        }

        async getBundle(bundleName) {
          return new Promise(resolve => {
            assetManager.loadBundle(bundleName, (error, bundle) => {
              if (error) {
                resolve(undefined);
              } else {
                resolve(bundle);
              }
            });
          });
        }

        async getResource(bundle, resourceName) {
          return new Promise(resolve => {
            bundle.load(resourceName, (error, asset) => {
              if (error) {
                resolve(undefined);
              } else {
                resolve(asset);
              }
            });
          });
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b7fa5bd92059daf269cba9690458b8c855f41a57.js.map