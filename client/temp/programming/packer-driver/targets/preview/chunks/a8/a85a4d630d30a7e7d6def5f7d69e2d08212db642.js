System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, ___esModule, _FormatNumericToParts, __cjsMetaURL;

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
        exports.FormatNumericToParts = void 0;

        var PartitionNumberPattern_1 = require("./PartitionNumberPattern");

        var _262_1 = require("../262");

        function FormatNumericToParts(nf, x, implDetails) {
          var parts = (0, PartitionNumberPattern_1.PartitionNumberPattern)(nf, x, implDetails);
          var result = (0, _262_1.ArrayCreate)(0);

          for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            result.push({
              type: part.type,
              value: part.value
            });
          }

          return result;
        }

        exports.FormatNumericToParts = FormatNumericToParts; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _FormatNumericToParts = module.exports.FormatNumericToParts;
      }, () => ({
        './PartitionNumberPattern': _req,
        '../262': _req0
      }));
    }
  };
});
//# sourceMappingURL=a85a4d630d30a7e7d6def5f7d69e2d08212db642.js.map