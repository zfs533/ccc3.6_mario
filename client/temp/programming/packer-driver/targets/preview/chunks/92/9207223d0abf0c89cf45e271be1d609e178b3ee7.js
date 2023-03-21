System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _FormatDateTime, __cjsMetaURL;

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
        exports.FormatDateTime = void 0;

        var PartitionDateTimePattern_1 = require("./PartitionDateTimePattern");
        /**
         * https://tc39.es/ecma402/#sec-formatdatetime
         * @param dtf DateTimeFormat
         * @param x
         */


        function FormatDateTime(dtf, x, implDetails) {
          var parts = (0, PartitionDateTimePattern_1.PartitionDateTimePattern)(dtf, x, implDetails);
          var result = '';

          for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            result += part.value;
          }

          return result;
        }

        exports.FormatDateTime = FormatDateTime; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _FormatDateTime = module.exports.FormatDateTime;
      }, () => ({
        './PartitionDateTimePattern': _req
      }));
    }
  };
});
//# sourceMappingURL=9207223d0abf0c89cf45e271be1d609e178b3ee7.js.map