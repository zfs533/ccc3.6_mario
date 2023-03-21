System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _CurrencyDigits, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.CurrencyDigits = void 0;

        var _262_1 = require("../262");
        /**
         * https://tc39.es/ecma402/#sec-currencydigits
         */


        function CurrencyDigits(c, _a) {
          var currencyDigitsData = _a.currencyDigitsData;
          return (0, _262_1.HasOwnProperty)(currencyDigitsData, c) ? currencyDigitsData[c] : 2;
        }

        exports.CurrencyDigits = CurrencyDigits; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _CurrencyDigits = module.exports.CurrencyDigits;
      }, () => ({
        '../262': _req
      }));
    }
  };
});
//# sourceMappingURL=47c473e652dfe87ab39d89ed1496aeacec64837b.js.map