System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _BestAvailableLocale, __cjsMetaURL;

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
        exports.BestAvailableLocale = void 0;
        /**
         * https://tc39.es/ecma402/#sec-bestavailablelocale
         * @param availableLocales
         * @param locale
         */

        function BestAvailableLocale(availableLocales, locale) {
          var candidate = locale;

          while (true) {
            if (availableLocales.has(candidate)) {
              return candidate;
            }

            var pos = candidate.lastIndexOf('-');

            if (!~pos) {
              return undefined;
            }

            if (pos >= 2 && candidate[pos - 2] === '-') {
              pos -= 2;
            }

            candidate = candidate.slice(0, pos);
          }
        }

        exports.BestAvailableLocale = BestAvailableLocale; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _BestAvailableLocale = module.exports.BestAvailableLocale;
      }, {});
    }
  };
});
//# sourceMappingURL=0baecdc2bc7359edb563554792efebb099bf9e06.js.map