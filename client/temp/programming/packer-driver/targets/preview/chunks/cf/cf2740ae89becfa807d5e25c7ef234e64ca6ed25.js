System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, assetManager, EDITOR, PREVIEW, pluginName, AMPipeLineManager, _crd;

  function _reportPossibleCrUseOfL10nManager(extras) {
    _reporterNs.report("L10nManager", "./l10n-manager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfpluginName(extras) {
    _reporterNs.report("pluginName", "./localization-global", _context.meta, extras);
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
    }, function (_ccEnv) {
      EDITOR = _ccEnv.EDITOR;
      PREVIEW = _ccEnv.PREVIEW;
    }, function (_unresolved_2) {
      pluginName = _unresolved_2.pluginName;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8726d45kThEV4CY9LZpwniC", "asset-manager-initer", undefined);

      __checkObsolete__(['assetManager', 'AssetManager']);

      _export("default", AMPipeLineManager = class AMPipeLineManager {
        constructor() {
          this.initialized = false;
          this.l10n = undefined;
          this._redirectTask = void 0;

          this.redirectTask = task => {
            var input = task.output = task.input;

            for (var i = 0; i < input.length; i++) {
              var _this$l10n$t, _this$l10n;

              var item = input[i];

              if (!item.url || !item.isNative) {
                continue;
              }

              var newUUID = item.uuid;
              var arr = newUUID.split('@');
              var translatedUUID = (_this$l10n$t = (_this$l10n = this.l10n) == null ? void 0 : _this$l10n.t(arr[0])) != null ? _this$l10n$t : arr[0];
              arr[0] = translatedUUID;
              newUUID = arr.join('@');
              var oldUUID = item.uuid;
              var newURL = item.url.replace(oldUUID.slice(0, 2) + "/" + oldUUID, newUUID.slice(0, 2) + "/" + newUUID);
              var redirectLog = "[" + (_crd && pluginName === void 0 ? (_reportPossibleCrUseOfpluginName({
                error: Error()
              }), pluginName) : pluginName) + "]: Change URL \"" + item.url + "\" for asset with UUID \"" + oldUUID + "\" to \"" + newURL + "\"";

              if (oldUUID === newUUID) {
                return;
              }

              if (EDITOR || PREVIEW) {
                console.debug(redirectLog);
                item.url = newURL;
              } else {
                if (!item.config) {
                  return;
                }

                var newAsset = item.config.getAssetInfo(newUUID);

                if (newAsset && !newAsset.redirect) {
                  item.url = newURL;
                  console.debug(redirectLog);
                } else {
                  console.warn("[" + (_crd && pluginName === void 0 ? (_reportPossibleCrUseOfpluginName({
                    error: Error()
                  }), pluginName) : pluginName) + "]: Failed to redirect an asset with UUID \"" + oldUUID + "\" because the asset with UUID \"" + newUUID + "\" could not be found in the bundle named " + item.config.name);
                }
              }
            }

            return;
          };
        }

        initAssetManager(l10n) {
          if (!this.initialized) {
            this.l10n = l10n;
            this._redirectTask = this.redirectTask.bind(this);
            assetManager.transformPipeline.append(this._redirectTask);
            this.initialized = true;
          }
        }

        uninstall() {
          var index = assetManager.transformPipeline.pipes.findIndex(it => it === this._redirectTask);

          if (index >= 0) {
            assetManager.transformPipeline.remove(index);
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=cf2740ae89becfa807d5e25c7ef234e64ca6ed25.js.map