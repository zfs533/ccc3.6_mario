System.register(["__unresolved_0", "@formatjs/ecma402-abstract"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _CanonicalCodeForDisplayNames, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_formatjsEcma402Abstract) {
      _req = _formatjsEcma402Abstract.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.CanonicalCodeForDisplayNames = void 0;

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        var UNICODE_REGION_SUBTAG_REGEX = /^([a-z]{2}|[0-9]{3})$/i;
        var ALPHA_4 = /^[a-z]{4}$/i;

        function isUnicodeRegionSubtag(region) {
          return UNICODE_REGION_SUBTAG_REGEX.test(region);
        }

        function isUnicodeScriptSubtag(script) {
          return ALPHA_4.test(script);
        }

        function CanonicalCodeForDisplayNames(type, code) {
          if (type === 'language') {
            return (0, ecma402_abstract_1.CanonicalizeLocaleList)([code])[0];
          }

          if (type === 'region') {
            if (!isUnicodeRegionSubtag(code)) {
              throw RangeError('invalid region');
            }

            return code.toUpperCase();
          }

          if (type === 'script') {
            if (!isUnicodeScriptSubtag(code)) {
              throw RangeError('invalid script');
            }

            return "".concat(code[0].toUpperCase()).concat(code.slice(1).toLowerCase());
          }

          (0, ecma402_abstract_1.invariant)(type === 'currency', 'invalid type');

          if (!(0, ecma402_abstract_1.IsWellFormedCurrencyCode)(code)) {
            throw RangeError('invalid currency');
          }

          return code.toUpperCase();
        }

        exports.CanonicalCodeForDisplayNames = CanonicalCodeForDisplayNames; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _CanonicalCodeForDisplayNames = module.exports.CanonicalCodeForDisplayNames;
      }, () => ({
        '@formatjs/ecma402-abstract': _req
      }));
    }
  };
});
//# sourceMappingURL=c1f1f79b7707c302e03b536eb231d8031c4b6dcb.js.map