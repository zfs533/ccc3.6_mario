System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, ___esModule, _LookupMatcher, __cjsMetaURL;

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
        exports.LookupMatcher = void 0;

        var utils_1 = require("./utils");

        var BestAvailableLocale_1 = require("./BestAvailableLocale");
        /**
         * https://tc39.es/ecma402/#sec-lookupmatcher
         * @param availableLocales
         * @param requestedLocales
         * @param getDefaultLocale
         */


        function LookupMatcher(availableLocales, requestedLocales, getDefaultLocale) {
          var result = {
            locale: ''
          };

          for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
            var locale = requestedLocales_1[_i];
            var noExtensionLocale = locale.replace(utils_1.UNICODE_EXTENSION_SEQUENCE_REGEX, '');
            var availableLocale = (0, BestAvailableLocale_1.BestAvailableLocale)(availableLocales, noExtensionLocale);

            if (availableLocale) {
              result.locale = availableLocale;

              if (locale !== noExtensionLocale) {
                result.extension = locale.slice(noExtensionLocale.length + 1, locale.length);
              }

              return result;
            }
          }

          result.locale = getDefaultLocale();
          return result;
        }

        exports.LookupMatcher = LookupMatcher; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _LookupMatcher = module.exports.LookupMatcher;
      }, () => ({
        './utils': _req,
        './BestAvailableLocale': _req0
      }));
    }
  };
});
//# sourceMappingURL=8151d8b5643f28bc54e77367ee9c35a9ff88a505.js.map