System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, ___esModule, _BestFitMatcher, __cjsMetaURL;

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
        exports.BestFitMatcher = void 0;

        var BestAvailableLocale_1 = require("./BestAvailableLocale");

        var utils_1 = require("./utils");
        /**
         * https://tc39.es/ecma402/#sec-bestfitmatcher
         * @param availableLocales
         * @param requestedLocales
         * @param getDefaultLocale
         */


        function BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale) {
          var minimizedAvailableLocaleMap = {};
          var availableLocaleMap = {};
          var canonicalizedLocaleMap = {};
          var minimizedAvailableLocales = new Set();
          availableLocales.forEach(function (locale) {
            var minimizedLocale = new Intl.Locale(locale).minimize().toString();
            var canonicalizedLocale = Intl.getCanonicalLocales(locale)[0] || locale;
            minimizedAvailableLocaleMap[minimizedLocale] = locale;
            availableLocaleMap[locale] = locale;
            canonicalizedLocaleMap[canonicalizedLocale] = locale;
            minimizedAvailableLocales.add(minimizedLocale);
            minimizedAvailableLocales.add(locale);
            minimizedAvailableLocales.add(canonicalizedLocale);
          });
          var foundLocale;

          for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
            var l = requestedLocales_1[_i];

            if (foundLocale) {
              break;
            }

            var noExtensionLocale = l.replace(utils_1.UNICODE_EXTENSION_SEQUENCE_REGEX, '');

            if (availableLocales.has(noExtensionLocale)) {
              foundLocale = noExtensionLocale;
              break;
            }

            if (minimizedAvailableLocales.has(noExtensionLocale)) {
              foundLocale = noExtensionLocale;
              break;
            }

            var locale = new Intl.Locale(noExtensionLocale);
            var maximizedRequestedLocale = locale.maximize().toString();
            var minimizedRequestedLocale = locale.minimize().toString(); // Check minimized locale

            if (minimizedAvailableLocales.has(minimizedRequestedLocale)) {
              foundLocale = minimizedRequestedLocale;
              break;
            } // Lookup algo on maximized locale


            foundLocale = (0, BestAvailableLocale_1.BestAvailableLocale)(minimizedAvailableLocales, maximizedRequestedLocale);
          }

          if (!foundLocale) {
            return {
              locale: getDefaultLocale()
            };
          }

          return {
            locale: availableLocaleMap[foundLocale] || canonicalizedLocaleMap[foundLocale] || minimizedAvailableLocaleMap[foundLocale] || foundLocale
          };
        }

        exports.BestFitMatcher = BestFitMatcher; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _BestFitMatcher = module.exports.BestFitMatcher;
      }, () => ({
        './BestAvailableLocale': _req,
        './utils': _req0
      }));
    }
  };
});
//# sourceMappingURL=c740e732a9b4a9fa8eb3fc3b87141a3ec0cc4daf.js.map