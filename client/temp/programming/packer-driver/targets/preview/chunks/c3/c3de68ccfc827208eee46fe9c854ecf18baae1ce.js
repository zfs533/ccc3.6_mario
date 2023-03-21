System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _cjsExports, ___esModule, _ResolveLocale, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }, function (_unresolved_4) {
      _req1 = _unresolved_4.__cjsMetaURL;
    }, function (_unresolved_5) {
      _req2 = _unresolved_5.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.ResolveLocale = void 0;

        var LookupMatcher_1 = require("./LookupMatcher");

        var BestFitMatcher_1 = require("./BestFitMatcher");

        var utils_1 = require("./utils");

        var UnicodeExtensionValue_1 = require("./UnicodeExtensionValue");
        /**
         * https://tc39.es/ecma402/#sec-resolvelocale
         */


        function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData, getDefaultLocale) {
          var matcher = options.localeMatcher;
          var r;

          if (matcher === 'lookup') {
            r = (0, LookupMatcher_1.LookupMatcher)(availableLocales, requestedLocales, getDefaultLocale);
          } else {
            r = (0, BestFitMatcher_1.BestFitMatcher)(availableLocales, requestedLocales, getDefaultLocale);
          }

          var foundLocale = r.locale;
          var result = {
            locale: '',
            dataLocale: foundLocale
          };
          var supportedExtension = '-u';

          for (var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++) {
            var key = relevantExtensionKeys_1[_i];
            (0, utils_1.invariant)(foundLocale in localeData, "Missing locale data for ".concat(foundLocale));
            var foundLocaleData = localeData[foundLocale];
            (0, utils_1.invariant)(typeof foundLocaleData === 'object' && foundLocaleData !== null, "locale data ".concat(key, " must be an object"));
            var keyLocaleData = foundLocaleData[key];
            (0, utils_1.invariant)(Array.isArray(keyLocaleData), "keyLocaleData for ".concat(key, " must be an array"));
            var value = keyLocaleData[0];
            (0, utils_1.invariant)(typeof value === 'string' || value === null, "value must be string or null but got ".concat(typeof value, " in key ").concat(key));
            var supportedExtensionAddition = '';

            if (r.extension) {
              var requestedValue = (0, UnicodeExtensionValue_1.UnicodeExtensionValue)(r.extension, key);

              if (requestedValue !== undefined) {
                if (requestedValue !== '') {
                  if (~keyLocaleData.indexOf(requestedValue)) {
                    value = requestedValue;
                    supportedExtensionAddition = "-".concat(key, "-").concat(value);
                  }
                } else if (~requestedValue.indexOf('true')) {
                  value = 'true';
                  supportedExtensionAddition = "-".concat(key);
                }
              }
            }

            if (key in options) {
              var optionsValue = options[key];
              (0, utils_1.invariant)(typeof optionsValue === 'string' || typeof optionsValue === 'undefined' || optionsValue === null, 'optionsValue must be String, Undefined or Null');

              if (~keyLocaleData.indexOf(optionsValue)) {
                if (optionsValue !== value) {
                  value = optionsValue;
                  supportedExtensionAddition = '';
                }
              }
            }

            result[key] = value;
            supportedExtension += supportedExtensionAddition;
          }

          if (supportedExtension.length > 2) {
            var privateIndex = foundLocale.indexOf('-x-');

            if (privateIndex === -1) {
              foundLocale = foundLocale + supportedExtension;
            } else {
              var preExtension = foundLocale.slice(0, privateIndex);
              var postExtension = foundLocale.slice(privateIndex, foundLocale.length);
              foundLocale = preExtension + supportedExtension + postExtension;
            }

            foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
          }

          result.locale = foundLocale;
          return result;
        }

        exports.ResolveLocale = ResolveLocale; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _ResolveLocale = module.exports.ResolveLocale;
      }, () => ({
        './LookupMatcher': _req,
        './BestFitMatcher': _req0,
        './utils': _req1,
        './UnicodeExtensionValue': _req2
      }));
    }
  };
});
//# sourceMappingURL=c3de68ccfc827208eee46fe9c854ecf18baae1ce.js.map