System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _IsWellFormedCurrencyCode, __cjsMetaURL;

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
        exports.IsWellFormedCurrencyCode = void 0;
        /**
         * This follows https://tc39.es/ecma402/#sec-case-sensitivity-and-case-mapping
         * @param str string to convert
         */

        function toUpperCase(str) {
          return str.replace(/([a-z])/g, function (_, c) {
            return c.toUpperCase();
          });
        }

        var NOT_A_Z_REGEX = /[^A-Z]/;
        /**
         * https://tc39.es/ecma402/#sec-iswellformedcurrencycode
         */

        function IsWellFormedCurrencyCode(currency) {
          currency = toUpperCase(currency);

          if (currency.length !== 3) {
            return false;
          }

          if (NOT_A_Z_REGEX.test(currency)) {
            return false;
          }

          return true;
        }

        exports.IsWellFormedCurrencyCode = IsWellFormedCurrencyCode; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _IsWellFormedCurrencyCode = module.exports.IsWellFormedCurrencyCode;
      }, {});
    }
  };
});
//# sourceMappingURL=6fe0ed12c0464f79c6bd528c82e5df82e306a099.js.map