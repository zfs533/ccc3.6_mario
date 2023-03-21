System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _FormatDateTimeRange, __cjsMetaURL;

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
        exports.FormatDateTimeRange = void 0;

        var PartitionDateTimeRangePattern_1 = require("./PartitionDateTimeRangePattern");

        function FormatDateTimeRange(dtf, x, y, implDetails) {
          var parts = (0, PartitionDateTimeRangePattern_1.PartitionDateTimeRangePattern)(dtf, x, y, implDetails);
          var result = '';

          for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            result += part.value;
          }

          return result;
        }

        exports.FormatDateTimeRange = FormatDateTimeRange; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _FormatDateTimeRange = module.exports.FormatDateTimeRange;
      }, () => ({
        './PartitionDateTimeRangePattern': _req
      }));
    }
  };
});
//# sourceMappingURL=3fab3fd2f858b60aaea5083293dfc12243088aff.js.map