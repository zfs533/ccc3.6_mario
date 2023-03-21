System.register(["__unresolved_0", "cc", "i18next", "cc/env", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, createInstance, EDITOR, BUILD, game, ResourceDataManager, mainName, pluginName, AMPipeLineManager, L10nManager, _crd, l10n;

  function _reportPossibleCrUseOfcreateInstance(extras) {
    _reporterNs.report("createInstance", "i18next", _context.meta, extras);
  }

  function _reportPossibleCrUseOfi18n(extras) {
    _reporterNs.report("i18n", "i18next", _context.meta, extras);
  }

  function _reportPossibleCrUseOfI18NextInitOptions(extras) {
    _reporterNs.report("I18NextInitOptions", "i18next", _context.meta, extras);
  }

  function _reportPossibleCrUseOfL10nOptions(extras) {
    _reporterNs.report("L10nOptions", "./l10n-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourceData(extras) {
    _reporterNs.report("ResourceData", "./l10n-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfL10nKey(extras) {
    _reporterNs.report("L10nKey", "./l10n-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfL10nValue(extras) {
    _reporterNs.report("L10nValue", "./l10n-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDateTimeFormatOptions(extras) {
    _reporterNs.report("DateTimeFormatOptions", "./icu-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfFormattedValue(extras) {
    _reporterNs.report("FormattedValue", "./icu-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfNumberFormatOptions(extras) {
    _reporterNs.report("NumberFormatOptions", "./icu-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRelativeTimeFormatOptions(extras) {
    _reporterNs.report("RelativeTimeFormatOptions", "./icu-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRelativeTimeFormatUnit(extras) {
    _reporterNs.report("RelativeTimeFormatUnit", "./icu-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStandardOption(extras) {
    _reporterNs.report("StandardOption", "./icu-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTemplate(extras) {
    _reporterNs.report("Template", "./icu-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTextInfoDirection(extras) {
    _reporterNs.report("TextInfoDirection", "./icu-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfL10nListenEvent(extras) {
    _reporterNs.report("L10nListenEvent", "./l10n-listen-event", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourceDataManager(extras) {
    _reporterNs.report("ResourceDataManager", "./resource-data-manager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmainName(extras) {
    _reporterNs.report("mainName", "./localization-global", _context.meta, extras);
  }

  function _reportPossibleCrUseOfpluginName(extras) {
    _reporterNs.report("pluginName", "./localization-global", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAMPipeLineManager(extras) {
    _reporterNs.report("AMPipeLineManager", "./asset-manager-initer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourceBundle(extras) {
    _reporterNs.report("ResourceBundle", "./l10n-options", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourceList(extras) {
    _reporterNs.report("ResourceList", "./l10n-options", _context.meta, extras);
  }

  _export("L10nManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      game = _cc.game;
    }, function (_i18next) {
      createInstance = _i18next.createInstance;
    }, function (_ccEnv) {
      EDITOR = _ccEnv.EDITOR;
      BUILD = _ccEnv.BUILD;
    }, function (_unresolved_2) {
      ResourceDataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      mainName = _unresolved_3.mainName;
      pluginName = _unresolved_3.pluginName;
    }, function (_unresolved_4) {
      AMPipeLineManager = _unresolved_4.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2856a7GSV9Fbb53nOimJ33J", "l10n-manager", undefined);

      __checkObsolete__(['game']);

      _export("L10nManager", L10nManager = class L10nManager {
        /**
         * @zh
         * i18n 实例
         * @en
         * i18next instance
         */
        constructor() {
          this._intl = undefined;
          this._options = {};
          this.resourceList = void 0;
          this.resourceBundle = {};
          this.resourceDataManager = void 0;
          this.amPipeLineManager = void 0;
          this.resourceDataManager = new (_crd && ResourceDataManager === void 0 ? (_reportPossibleCrUseOfResourceDataManager({
            error: Error()
          }), ResourceDataManager) : ResourceDataManager)();
          this.amPipeLineManager = new (_crd && AMPipeLineManager === void 0 ? (_reportPossibleCrUseOfAMPipeLineManager({
            error: Error()
          }), AMPipeLineManager) : AMPipeLineManager)();
        }

        isInitialized() {
          var _this$_intl$isInitial, _this$_intl;

          return (_this$_intl$isInitial = (_this$_intl = this._intl) == null ? void 0 : _this$_intl.isInitialized) != null ? _this$_intl$isInitial : false;
        }

        async createIntl(options) {
          var _ref, _localStorageLanguage, _options$fallbackLang, _options$resources;

          const reloadResult = await this.reloadResourceData();

          if (!reloadResult) {
            return;
          }

          this.amPipeLineManager.initAssetManager(this);
          this._options = options;
          this._intl = (_crd && createInstance === void 0 ? (_reportPossibleCrUseOfcreateInstance({
            error: Error()
          }), createInstance) : createInstance)();
          let localStorageLanguage = undefined;

          if (BUILD) {
            var _l10n$_options$localS;

            localStorageLanguage = localStorage.getItem((_l10n$_options$localS = l10n['_options'].localStorageLanguageKey) != null ? _l10n$_options$localS : L10nManager.LOCAL_STORAGE_LANGUAGE_KEY);
          }

          const defaultLanguage = (_ref = (_localStorageLanguage = localStorageLanguage) != null ? _localStorageLanguage : options.language) != null ? _ref : this.resourceList.defaultLanguage;
          const fallbackLanguage = (_options$fallbackLang = options.fallbackLanguage) != null ? _options$fallbackLang : this.resourceList.fallbackLanguage;
          const resources = (_options$resources = options.resources) != null ? _options$resources : this.resourceBundle;
          const i18nextOptions = {
            lng: defaultLanguage,
            fallbackLng: fallbackLanguage,
            resources: { ...resources
            },
            initImmediate: false,
            load: 'currentOnly'
          };
          await this._intl.init(i18nextOptions);
        }

        cloneIntl(options) {
          if (!this._intl) {
            throw new Error('i18next not init, please use \'l10n.createIntl\'');
          }

          this._intl = this._intl.cloneInstance(options);
        }

        async reloadResourceData() {
          var _this$resourceList$la, _this$resourceList, _this$resourceList2;

          this.resourceList = await this.resourceDataManager.readResourceList();

          if (!this.resourceList) {
            console.log(`[${_crd && pluginName === void 0 ? (_reportPossibleCrUseOfpluginName({
              error: Error()
            }), pluginName) : pluginName}] not found translate language list, skip init l10n`);
            return false;
          }

          this.resourceBundle = await this.resourceDataManager.readResourceBundle((_this$resourceList$la = (_this$resourceList = this.resourceList) == null ? void 0 : _this$resourceList.languages) != null ? _this$resourceList$la : []);

          if (!((_this$resourceList2 = this.resourceList) != null && _this$resourceList2.defaultLanguage)) {
            console.log(`[${_crd && pluginName === void 0 ? (_reportPossibleCrUseOfpluginName({
              error: Error()
            }), pluginName) : pluginName}] not found translate language data, skip init l10n`);
            return false;
          }

          return true;
        }
        /** 初始化 i18next */


        config(options) {
          this.cloneIntl(options);
        }

        async changeLanguage(language) {
          if (!language) {
            console.warn(`[${_crd && pluginName === void 0 ? (_reportPossibleCrUseOfpluginName({
              error: Error()
            }), pluginName) : pluginName}] invalid language tag`);
            return;
          }

          console.log(`[${_crd && pluginName === void 0 ? (_reportPossibleCrUseOfpluginName({
            error: Error()
          }), pluginName) : pluginName}] will change language to`, language);

          if (this._intl) {
            await this._intl.changeLanguage(language);

            if (!EDITOR) {
              localStorage.setItem(L10nManager.LOCAL_STORAGE_LANGUAGE_KEY, language);
              console.log(`[${_crd && pluginName === void 0 ? (_reportPossibleCrUseOfpluginName({
                error: Error()
              }), pluginName) : pluginName}] game will restart`);
              game.restart();
            }
          } else {
            console.log(`[${_crd && pluginName === void 0 ? (_reportPossibleCrUseOfpluginName({
              error: Error()
            }), pluginName) : pluginName}] language data not load, please confirm whether the language data is included in the build`);
          }
        }

        t(key, options) {
          var _this$_intl$isInitial2, _this$_intl2;

          if (!((_this$_intl$isInitial2 = (_this$_intl2 = this._intl) == null ? void 0 : _this$_intl2.isInitialized) != null ? _this$_intl$isInitial2 : false)) return key;
          return this._intl.t(key, options);
        }
        /**
         * 实验性功能暂不开放
         * 数字类ICU
         */


        tn(value, options) {
          var _this$_intl$isInitial3, _this$_intl3, _this$_intl4;

          if (!((_this$_intl$isInitial3 = (_this$_intl3 = this._intl) == null ? void 0 : _this$_intl3.isInitialized) != null ? _this$_intl$isInitial3 : false)) return value.toString();
          const cloneOptions = {};
          Object.assign(cloneOptions, options);

          for (const key of Object.keys(cloneOptions)) {
            if (typeof cloneOptions[key] === 'string' && cloneOptions[key].length === 0) {
              delete cloneOptions[key];
            } else if (typeof cloneOptions[key] === 'number' && cloneOptions[key] === 0) {
              delete cloneOptions[key];
            }
          }

          return new Intl.NumberFormat((_this$_intl4 = this._intl) == null ? void 0 : _this$_intl4.language, cloneOptions).format(value);
        }
        /**
         * 实验性功能暂不开放
         * 日期/时刻类ICU
         */


        td(date, options) {
          var _this$_intl$isInitial4, _this$_intl5, _this$_intl6;

          if (!((_this$_intl$isInitial4 = (_this$_intl5 = this._intl) == null ? void 0 : _this$_intl5.isInitialized) != null ? _this$_intl$isInitial4 : false)) return date.toString();
          const cloneOptions = {};
          Object.assign(cloneOptions, options);

          for (const key of Object.keys(cloneOptions)) {
            if (typeof cloneOptions[key] === 'string' && cloneOptions[key].length === 0) {
              delete cloneOptions[key];
            }
          }

          return new Intl.DateTimeFormat((_this$_intl6 = this._intl) == null ? void 0 : _this$_intl6.language, cloneOptions).format(date);
        }
        /**
         * 实验性功能暂不开放
         * 时长类ICU
         */


        tt(value, unit, options) {
          var _this$_intl$isInitial5, _this$_intl7, _this$_intl8;

          if (!((_this$_intl$isInitial5 = (_this$_intl7 = this._intl) == null ? void 0 : _this$_intl7.isInitialized) != null ? _this$_intl$isInitial5 : false)) return value.toString();
          const cloneOptions = {};
          Object.assign(cloneOptions, options);

          for (const key of Object.keys(cloneOptions)) {
            if (typeof cloneOptions[key] === 'string' && cloneOptions[key].length === 0) {
              delete cloneOptions[key];
            }
          }

          return new Intl.RelativeTimeFormat((_this$_intl8 = this._intl) == null ? void 0 : _this$_intl8.language, cloneOptions).format(value, unit);
        }
        /**
         * 实验性功能暂不开放
         * 数组类ICU
         */


        tl(value) {
          var _this$_intl$isInitial6, _this$_intl9, _this$_intl10;

          if (!((_this$_intl$isInitial6 = (_this$_intl9 = this._intl) == null ? void 0 : _this$_intl9.isInitialized) != null ? _this$_intl$isInitial6 : false)) return value.toString();
          return new Intl.ListFormat((_this$_intl10 = this._intl) == null ? void 0 : _this$_intl10.language).format(value);
        }

        exists(key) {
          var _this$_intl$exists, _this$_intl11;

          return (_this$_intl$exists = (_this$_intl11 = this._intl) == null ? void 0 : _this$_intl11.exists(key)) != null ? _this$_intl$exists : false;
        }

        get currentLanguage() {
          var _this$_intl$language, _this$_intl12;

          return (_this$_intl$language = (_this$_intl12 = this._intl) == null ? void 0 : _this$_intl12.language) != null ? _this$_intl$language : '';
        }

        get languages() {
          var _this$resourceList$la2, _this$resourceList3;

          return (_this$resourceList$la2 = (_this$resourceList3 = this.resourceList) == null ? void 0 : _this$resourceList3.languages) != null ? _this$resourceList$la2 : [];
        }

        direction(language) {
          return (language ? new Intl.Locale(language) : new Intl.Locale(this._intl.language)).textInfo().direction;
        }

        on(event, callback) {
          var _this$_intl13;

          (_this$_intl13 = this._intl) == null ? void 0 : _this$_intl13.on(event, callback);
        }

        off(event, callback) {
          var _this$_intl14;

          (_this$_intl14 = this._intl) == null ? void 0 : _this$_intl14.off(event, callback);
        }

        getResourceBundle(language) {
          var _this$_intl15;

          return (_this$_intl15 = this._intl) == null ? void 0 : _this$_intl15.getResourceBundle(language, L10nManager.DEFAULT_NAMESPACE);
        }

      });

      L10nManager.LOCAL_STORAGE_LANGUAGE_KEY = `${_crd && mainName === void 0 ? (_reportPossibleCrUseOfmainName({
        error: Error()
      }), mainName) : mainName}/language`;
      L10nManager.DEFAULT_NAMESPACE = 'translation';
      L10nManager.l10n = new L10nManager();
      l10n = L10nManager.l10n;

      _export("default", l10n);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=498cabfe9f4133390ebf559c60fbefdb931a994a.js.map