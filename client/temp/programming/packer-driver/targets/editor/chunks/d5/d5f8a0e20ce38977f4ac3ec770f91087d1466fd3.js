System.register(["__unresolved_0", "__unresolved_1", "@formatjs/ecma402-abstract"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, ___esModule, _FormatDateTimeToParts, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_formatjsEcma402Abstract) {
      _req0 = _formatjsEcma402Abstract.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.FormatDateTimeToParts = void 0;

        var PartitionDateTimePattern_1 = require("./PartitionDateTimePattern");

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");
        /**
         * https://tc39.es/ecma402/#sec-formatdatetimetoparts
         *
         * @param dtf
         * @param x
         * @param implDetails
         */


        function FormatDateTimeToParts(dtf, x, implDetails) {
          var parts = (0, PartitionDateTimePattern_1.PartitionDateTimePattern)(dtf, x, implDetails);
          var result = (0, ecma402_abstract_1.ArrayCreate)(0);

          for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            result.push({
              type: part.type,
              value: part.value
            });
          }

          return result;
        }

        exports.FormatDateTimeToParts = FormatDateTimeToParts; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _FormatDateTimeToParts = module.exports.FormatDateTimeToParts;
      }, () => ({
        './PartitionDateTimePattern': _req,
        '@formatjs/ecma402-abstract': _req0
      }));
    }
  };
});
//# sourceMappingURL=d5f8a0e20ce38977f4ac3ec770f91087d1466fd3.js.map