System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _CanonicalizeLocaleList, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.CanonicalizeLocaleList = void 0;
        /**
         * http://ecma-international.org/ecma-402/7.0/index.html#sec-canonicalizelocalelist
         * @param locales
         */

        function CanonicalizeLocaleList(locales) {
          // TODO
          return Intl.getCanonicalLocales(locales);
        }

        exports.CanonicalizeLocaleList = CanonicalizeLocaleList; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _CanonicalizeLocaleList = module.exports.CanonicalizeLocaleList;
      }, {});
    }
  };
});
//# sourceMappingURL=ff5ee5fabceaa91539d4f3a5b0a59fd24bdd9c8c.js.map