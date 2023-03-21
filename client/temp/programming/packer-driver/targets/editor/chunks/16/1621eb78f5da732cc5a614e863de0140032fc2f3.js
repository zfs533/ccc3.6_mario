System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _CanonicalizeTimeZoneName, __cjsMetaURL;

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
        exports.CanonicalizeTimeZoneName = void 0;
        /**
         * https://tc39.es/ecma402/#sec-canonicalizetimezonename
         * @param tz
         */

        function CanonicalizeTimeZoneName(tz, _a) {
          var tzData = _a.tzData,
              uppercaseLinks = _a.uppercaseLinks;
          var uppercasedTz = tz.toUpperCase();
          var uppercasedZones = Object.keys(tzData).reduce(function (all, z) {
            all[z.toUpperCase()] = z;
            return all;
          }, {});
          var ianaTimeZone = uppercaseLinks[uppercasedTz] || uppercasedZones[uppercasedTz];

          if (ianaTimeZone === 'Etc/UTC' || ianaTimeZone === 'Etc/GMT') {
            return 'UTC';
          }

          return ianaTimeZone;
        }

        exports.CanonicalizeTimeZoneName = CanonicalizeTimeZoneName; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _CanonicalizeTimeZoneName = module.exports.CanonicalizeTimeZoneName;
      }, {});
    }
  };
});
//# sourceMappingURL=1621eb78f5da732cc5a614e863de0140032fc2f3.js.map