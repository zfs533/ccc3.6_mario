System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, ___esModule, _LookupSupportedLocales, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.LookupSupportedLocales = void 0;

        var utils_1 = require("./utils");

        var BestAvailableLocale_1 = require("./BestAvailableLocale");
        /**
         * https://tc39.es/ecma402/#sec-lookupsupportedlocales
         * @param availableLocales
         * @param requestedLocales
         */


        function LookupSupportedLocales(availableLocales, requestedLocales) {
          var subset = [];

          for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
            var locale = requestedLocales_1[_i];
            var noExtensionLocale = locale.replace(utils_1.UNICODE_EXTENSION_SEQUENCE_REGEX, '');
            var availableLocale = (0, BestAvailableLocale_1.BestAvailableLocale)(availableLocales, noExtensionLocale);

            if (availableLocale) {
              subset.push(availableLocale);
            }
          }

          return subset;
        }

        exports.LookupSupportedLocales = LookupSupportedLocales; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _LookupSupportedLocales = module.exports.LookupSupportedLocales;
      }, () => ({
        './utils': _req,
        './BestAvailableLocale': _req0
      }));
    }
  };
});
//# sourceMappingURL=ee1fc8e025e03eb958392689fd0db1d390a812e7.js.map