System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _IsValidTimeZoneName, __cjsMetaURL;

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
        exports.IsValidTimeZoneName = void 0;
        /**
         * https://tc39.es/ecma402/#sec-isvalidtimezonename
         * @param tz
         * @param implDetails implementation details
         */

        function IsValidTimeZoneName(tz, _a) {
          var tzData = _a.tzData,
              uppercaseLinks = _a.uppercaseLinks;
          var uppercasedTz = tz.toUpperCase();
          var zoneNames = new Set();
          var linkNames = new Set();
          Object.keys(tzData).map(function (z) {
            return z.toUpperCase();
          }).forEach(function (z) {
            return zoneNames.add(z);
          });
          Object.keys(uppercaseLinks).forEach(function (linkName) {
            linkNames.add(linkName.toUpperCase());
            zoneNames.add(uppercaseLinks[linkName].toUpperCase());
          });
          return zoneNames.has(uppercasedTz) || linkNames.has(uppercasedTz);
        }

        exports.IsValidTimeZoneName = IsValidTimeZoneName; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _IsValidTimeZoneName = module.exports.IsValidTimeZoneName;
      }, {});
    }
  };
});
//# sourceMappingURL=ad314143cbde6f24cdfae5f747c2f73662d32cae.js.map