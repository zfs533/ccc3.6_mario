System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, BUILD, EDITOR, assetManager, settings, Settings, mainName, pluginName, resourceBundlePath, resourceListPath, runtimeBundleName, ResourceDataManager, _crd;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
        readResourceList() {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (EDITOR) {
              return Editor.Message.request(_crd && mainName === void 0 ? (_reportPossibleCrUseOfmainName({
                error: Error()
              }), mainName) : mainName, 'get-resource-list');
            } else if (BUILD) {
              console.log("[" + (_crd && pluginName === void 0 ? (_reportPossibleCrUseOfpluginName({
                error: Error()
              }), pluginName) : pluginName) + "] this is build env");
              return _this.runtimeLoad(_crd && resourceListPath === void 0 ? (_reportPossibleCrUseOfresourceListPath({
                error: Error()
              }), resourceListPath) : resourceListPath);
            } else {
              return _this.previewLoad(_crd && resourceListPath === void 0 ? (_reportPossibleCrUseOfresourceListPath({
                error: Error()
              }), resourceListPath) : resourceListPath);
            }
          })();
        }

        readResourceBundle(tags) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            if (EDITOR) {
              return _this2.editorLoad(tags);
            } else if (BUILD) {
              return _this2.runtimeLoad(_crd && resourceBundlePath === void 0 ? (_reportPossibleCrUseOfresourceBundlePath({
                error: Error()
              }), resourceBundlePath) : resourceBundlePath);
            } else {
              return _this2.previewLoad(_crd && resourceBundlePath === void 0 ? (_reportPossibleCrUseOfresourceBundlePath({
                error: Error()
              }), resourceBundlePath) : resourceBundlePath);
            }
          })();
        }
        /**
         * 编辑器模式下使用
         * @param locales
         */


        editorLoad(locales) {
          return _asyncToGenerator(function* () {
            return Editor.Message.request(_crd && mainName === void 0 ? (_reportPossibleCrUseOfmainName({
              error: Error()
            }), mainName) : mainName, 'get-resource-bundle', locales);
          })();
        }
        /**
         * 构建后运行时使用
         * @param fileName
         */


        runtimeLoad(fileName) {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            var bundle = yield _this3.getBundle(_crd && runtimeBundleName === void 0 ? (_reportPossibleCrUseOfruntimeBundleName({
              error: Error()
            }), runtimeBundleName) : runtimeBundleName);
            if (!bundle) return undefined;
            var jsonAsset = yield _this3.getResource(bundle, fileName);
            if (!jsonAsset || !jsonAsset.json) return undefined;
            return jsonAsset.json;
          })();
        }
        /**
         * 浏览器预览使用
         * @param urlPath
         */


        previewLoad(urlPath) {
          return _asyncToGenerator(function* () {
            try {
              return yield (yield fetch((_crd && mainName === void 0 ? (_reportPossibleCrUseOfmainName({
                error: Error()
              }), mainName) : mainName) + "/" + urlPath)).json();
            } catch (e) {
              return undefined;
            }
          })();
        }

        checkBundle(bundleName) {
          return _asyncToGenerator(function* () {
            var queryResult = settings.querySettings(Settings.Category.ASSETS, 'preloadBundles');
            var bundle = queryResult == null ? void 0 : queryResult.find(it => it.bundle === bundleName);
            return !!bundle;
          })();
        }

        getBundle(bundleName) {
          return _asyncToGenerator(function* () {
            return new Promise(resolve => {
              assetManager.loadBundle(bundleName, (error, bundle) => {
                if (error) {
                  resolve(undefined);
                } else {
                  resolve(bundle);
                }
              });
            });
          })();
        }

        getResource(bundle, resourceName) {
          return _asyncToGenerator(function* () {
            return new Promise(resolve => {
              bundle.load(resourceName, (error, asset) => {
                if (error) {
                  resolve(undefined);
                } else {
                  resolve(asset);
                }
              });
            });
          })();
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=113bdd154c6b6cae14ceb948b6c5aed41390bafb.js.map